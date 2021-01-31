const User = require('../models/user.model');

exports.readController = (req, res) => {
  const userId = req.params.id;
  User.findById(userId).exec((err, user) => {
    if(err || !user) {
      return res.status(400).json({ error: 'User not found' });
    }
    res.json(user);
  });
}