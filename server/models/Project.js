const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const { Schema } = mongoose;

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  repo: {
    type: String,
    required: true
  },
  poster: {
    type: Schema.Types.ObjectId,
    ref: 'User'   
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
  closed: {
    type: Boolean,
    default: false
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  tags: [String],
  requests: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  teamSize: {
    type: Number
  }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
