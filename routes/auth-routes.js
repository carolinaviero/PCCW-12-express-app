const express = require('express');
const router = express.Router();
const { authenticationMiddleware } = require('../controller/auth-controller')
const low = require('lowdb');
const fs = require('lowdb/adapters/FileSync');
const adapter = new fs('db.json');
const db = low(adapter);
const bcrypt = require('bcrypt');

router.post('/login', async (req, res, next) => {
  const user = db.get('users').find({ username: req.body.username }).value();

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  
  if (user && validPassword) {
    res.status(200).cookie('login', 'true').send('Welcome!');
  } else {
    res.status(401).send('Wrong password or email');
  }
});


router.post('/signup', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  db.get('users').push({ id: db.get('users').value().length + 1, password: hashedPassword, username: req.body.username }).write();
  
  res.sendStatus(201);
});

router.get('/secret', authenticationMiddleware, (req, res) => {
    res.send('Welcome to the secret route')
})
   

module.exports = router;