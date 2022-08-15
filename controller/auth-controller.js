const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require('../model/User');

const loginUser = async (req, res, next) => {
    const { password, username } = req.body;

    User.getUser(username, async (user) => {
        const validPassword = await bcrypt.compare(password, user.password);

        if (user && validPassword) {
          const token = jwt.sign({ id: user.id }, "secret")
          res.status(200).cookie('token', token).send('Welcome!');
        } else {
          res.status(401).send('Wrong password or email');
        }
    });
  }

const signUpUser = async (req, res) => {
    const { password, username } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    User.createUser(username, hashedPassword);

    res.sendStatus(201);
}

const authenticationMiddleware = (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        console.log('does not have any token')
      res.sendStatus(403)
    } else {
      jwt.verify(token, "secret", (error, decoded) => {
        if (error) {
            console.log('there was an error')
          res.sendStatus(403)
        } else {
          req.userId = decoded.id;
          next();
        }
      })
    }
  }

const welcomeUser = (req, res) => {
    res.send('Welcome to the secret route');
}

module.exports = { loginUser, signUpUser, authenticationMiddleware, welcomeUser };