const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = Schema({
  name: {type: String, required: true},
  quantity: {type: Number},
  isOK: {type: Boolean},
});

const Lesson = mongoose.model('Product', productSchema);

module.exports = Lesson;
