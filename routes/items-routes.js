const express = require("express");
const router = express.Router();
const { getAllItems, postItem, updateItem, deleteItem } = require('../controller/items-controller');

router.get('/', getAllItems)
  
router.post('/', postItem);
  
router.put('/:id', updateItem)
  
router.delete('/:id', deleteItem)

module.exports = router;