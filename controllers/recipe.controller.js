const Recipe = require('../models/recipe.model');

exports.readController = (req, res) => {
  const userId = req.query.userId;
  Recipe.find({user: {_id: userId}}, (err, recipes) => {
      if (err || !recipes) {
          return res.status(400).json({
              error: 'User not found'
          });
      }
      res.json(recipes);
  });
}

exports.upsertController = (req, res) => {
  // console.log('UPDATE RECIPE', req.user, 'UPDATE DATA', req.body);
  const id = req.params.id;
  const {user, name, ingredients, steps } = req.body;

  Recipe.findOne({ _id: id }, (err, recipe) => {
    if (err) {
      return res.status(400).json({ error: 'Recipe not found' });
    }

    if(!recipe) {
      recipe = new Recipe({ user, name, ingredients, steps });
    }

    if(!name) {
      return res.status(400).json({ error: 'Name is required' });
    } else {
      recipe.name = name;
    }
    if(!ingredients || ingredients.length==0) {
      return res.status(400).json({ error: 'At least one ingredient is required' });
    } else {
      recipe.ingredients = ingredients;
    }
    if(!steps || steps.length==0) {
      return res.status(400).json({ error: 'At least one step is required' });
    } else {
      recipe.steps = steps;
    }

    recipe.save((err, updatedRecipe) => {
      if (err) {
        console.log('RECIPE UPDATE ERROR', err);
        return res.status(400).json({ error: 'Recipe update failed'});
      }
      res.json(updatedRecipe);
    });
  });
}

exports.deleteController = (req, res) => {
  Recipe.deleteOne({ _id: req.params.id }, (err, data) => {
    if(err) {
      return res.status(400).json({ error: 'Error deleting recipe' });
    }
    res.json({ msg: 'Success' });
  });
}