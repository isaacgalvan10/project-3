const mongoose = require('mongoose');

const { Schema } = mongoose;

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
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
  teamSize: {
    type: Number,
    required: true,
    min: 1,
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
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
