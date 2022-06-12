const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const plantSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 5,
    max: 255,
  },
  description: {
    type: String,
    required: true,
    min: 5,
    max: 255,
  },
  photo: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Plant', plantSchema);
