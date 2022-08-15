const low = require("lowdb");
const fs = require("lowdb/adapters/FileSync");
const adapter = new fs("db.json");
const db = low(adapter);

const User = {};

User.getUser = (username, callback) => {
    const user = db.get('users').find({ username }).value();

    callback(user);
};

User.createUser = (username, password) => {
    db.get('users').push({ id: db.get('users').value().length + 1, password, username }).write();
}

module.exports = User;
