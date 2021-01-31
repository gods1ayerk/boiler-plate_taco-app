const express = require('express');
const router = express.Router();

// Load controllers
const {
  facebookController
} = require('../controllers/auth.controller');

router.post('/facebookLogin', facebookController);
module.exports = router;