const User = require('../models/user.model');
const expressJwt = require('express-jwt');
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');

exports.requireSignin = expressJwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] });

exports.facebookController = (req, res) => {
  console.log('FACEBOOK LOGIN REQ BODY', req.body);
  const { accessToken } = req.body;

  const url = `https://graph.facebook.com/v9.0/me/?fields=id,name,email&access_token=${accessToken}`;

  return (
    fetch(url, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        const { email, name } = response;
        User.findOne({ email }).exec((err, user) => {
          if(user) {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
              expiresIn: '7d'
            });
            const { _id, email, name } = user;
            return res.json({
              ...{ _id, email, name },
              token,
            });
          } else {
            let password = email + process.env.JWT_SECRET;
            user = new User({ name, email });
            user.save((err, data) => {
              if(err) {
                console.log('ERROR FACEBOOK LOGIN ON USER SAVE', err);
                return res.status(400).json({
                  error: 'User signup failed with facebook'
                });
              }
              const token = jwt.sign(
                { _id: data._id },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
              );
              const { _id, email, name } = data;
              return res.json({
                ...{ _id, email, name },
                token,
              });
            });

          }
        });
      })
      .catch(error => {
        res.json({
          error: 'Facebook login failed. Try again later.'
        });
      })
  );
}