const { Schema } = require('mongoose');

const memberSchema = new Schema({
  memberId: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

module.exports = memberSchema;