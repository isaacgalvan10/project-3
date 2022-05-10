const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
    },

    password: {
        type: String,
        required: true,
        minlength: 5,
    },

    github: {
        type: String,
    },

    picture: {
        type: String,
    },

    bio: {
        type: String,
    },

    userProjects: [
        {
            projectId: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            tags: [String],
            description: {
                type: String,
                required: true
            }
        }   
    ],

    userPosts: [
        {
            title: {
                type: String,
                required: true
            },
            tags: [String],
            description: {
                type: String,
                required: true
            }
        }   
    ]

},
{
    toJSON: {
        virtuals: true,
        },
}
);

// hash user password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;