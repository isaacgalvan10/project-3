const { Schema } = require('mongoose');

const postSchema = new Schema({
    title: [
        {
        type: String,
        },
    ],
    date: {
        type: Date,
    },

    description: {
        type: String,
    },

    team_members: {
        type: String,
    },

    Technologies: [technologies],

    image: {
        type: String,
    },
});

module.exports = postSchema;