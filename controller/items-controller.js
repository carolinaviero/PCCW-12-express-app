const Item = require('../model/Item')

const getAllItems = (req, res) => {
  Item.getAll((results) => {
    if (!results) {
      res.send("Error retrieving all items")
    }
    res.send(results)
  })
}

const postItem = (req, res) => {
  const item = req.body;

  Item.postItem(item);

  res.send(item);
}

const updateItem = (req, res) => {
  const id = +req.params.id;
  const item = req.body;

  Item.updateItem(item, id);

  res.send(`Updated item with id of ${id}`);
}

const deleteItem = (req, res) => {
  const id = +req.params.id;

  Item.deleteItem(id);

  res.send(`Deleted item with id of ${id}`);
}

module.exports = { getAllItems, postItem, updateItem, deleteItem };
   