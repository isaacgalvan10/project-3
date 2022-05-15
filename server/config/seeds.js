const db = require('./connection');
const { Project, User } = require('../models');

db.once('open', async () => {
    await User.deleteMany();
    await Project.deleteMany();
   
    console.log("All done");

    process.exit();
});
