const mongoose = require('mongoose');

const { Schema } = mongoose;

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
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  edited: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
  },
  projectImg: {
    type: String,
  },
  teamSize: {
    type: Number,
    required: true,
    min: 1,
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  tags: [
    {
      type: String,
      required: true,
    },
  ],
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
