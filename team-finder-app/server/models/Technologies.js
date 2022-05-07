const { Schema } = require('mongoose');

const technologiesSchema = new Schema({
    name: {
        type: String,
    },
});

module.exports = technologiesSchema;