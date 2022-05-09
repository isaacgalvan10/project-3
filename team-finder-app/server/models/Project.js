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
  poster: {
    username: {
      type: String,
    },
    picture: {
      type: String,
    }
  },
  edited: {
    type: Boolean,
    default: false
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
  members: [
    {
      memberId: {
        type: String
      },
      username: {
        type: String,
        required: true
      },
      picture: {
        type: String
      }
    }
  ],
  tags: [
    {
      tagName: {
        type: String,
        required: true
      }
    }
  ],
  requests: [
    {
      username: {
        type: String,
        required: true
      },
      picture: {
        type: String,
        required: true
      },
      userId: {
        type: String,
        required: true
      },
    }
  ]
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
