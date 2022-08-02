const low = require("lowdb");
const fs = require("lowdb/adapters/FileSync");
const adapter = new fs("db.json");
const db = low(adapter);

const Item = {};

Item.getAll = (callback) => {
 const items = db.get("items").value();
 callback(items);
}

Item.postItem = (item) => db.get('items').push({ id: db.get("items").value().length + 1, ...item }).write();

Item.updateItem = (item, id) => db.get('items').find({ id: id }).assign({ ...item }).write();

Item.deleteItem = (id) => db.get('items').remove({ id: id }).write();

module.exports = Item;
