const express = require('express');
const router = express.Router();

// Load controller
const { requireSignin } = require('../controllers/auth.controller');
const { readController, upsertController, deleteController } = require('../controllers/recipe.controller');


router.get('/recipe/', requireSignin, readController);
router.put('/recipe/:id?', requireSignin, upsertController);
router.delete('/recipe/:id', requireSignin, deleteController);
module.exports = router;