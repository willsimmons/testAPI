//sample of a mongoDB model in mongoose

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: String,
  colors: String,
});

module.exports = mongoose.model('Item', ItemSchema);
