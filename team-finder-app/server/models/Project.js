const mongoose = require('mongoose');

const { Schema } = mongoose;

const memberSchema = require('./Member');
const tagSchema = require('./Tag');

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
  },
  poster: {
    type: String,
  },
  edited: {
    type: Boolean,
    default: false
  },
  profile: {
    type: String,
  },
  description: {
    type: String
  },
  projectImg: {
    type: String
  },
  teamSize: {
    type: Number,
    required: true,
    min: 1
  },
  members: [memberSchema],
  tags: [tagSchema],
});

const Project = mongoose.model('Product', projectSchema);

module.exports = Project;
