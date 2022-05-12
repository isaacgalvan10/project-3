const { Schema } = require('mongoose');

const tagSchema = new Schema({
  tagId: {
    type: String,
    required: true
  },
  tagName: {
    type: String,
    required: true,
  },
});

module.exports = tagSchema;