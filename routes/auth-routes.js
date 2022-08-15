const express = require('express');
const router = express.Router();
const { loginUser, signUpUser, authenticationMiddleware, welcomeUser } = require('../controller/auth-controller');

router.post('/login', loginUser);

router.post('/signup', signUpUser);

router.get('/secret', authenticationMiddleware, welcomeUser);
   
module.exports = router;