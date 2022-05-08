const db = require('./connection');
const { Project, User } = require('../models');

db.once('open', async () => {
    const tags = [
        {
            tagId: '100',
            tagName: 'HTML',
        },
        {
            tagId: '200',
            tagName: 'CSS',
        },
        {
            tagId: '300',
            tagName: 'JavaScript',
        },
        {
            tagId: '400',
            tagName: 'Beginner Friendly',
        },
    ];

    await User.deleteMany();

    await User.create({
        username: 'Pamela',
        email: 'pamela@gmail.com',
        password: 'password',
        github: 'Pamela',
        picture: 'pamela.jpeg'
    });


    await User.create({
        username: 'Abi',
        email: 'abi@gmail.com',
        password: 'password',
        github: 'Abimael1996',
        picture: 'lernantino.jpeg'
    });


    await User.create({
        username: 'Enoc',
        email: 'enoc@gmail.com',
        password: 'password',
        github: 'Enrique-Rojas-Villegas',
        picture: 'lernantino.jpeg'
    });


    await User.create({
        username: 'Isaac',
        email: 'isaac@gmail.com',
        password: 'password',
        github: 'isaacgalvan10',
        picture: 'lernantino.jpeg'
    });


    await User.create({
        username: 'Andre',
        email: 'andre@gmail.com',
        password: 'password',
        github: 'AndreV96',
        picture: 'lernantino.jpeg'
    });

    await User.create({
        username: 'Pancho',
        email: 'pancho@gmail.com',
        password: 'password',
        github: 'panchito',
        picture: 'pancho.jpeg'
    });

    await User.create({
        username: 'Romina',
        email: 'romina@gmail.com',
        password: 'password',
        github: 'Romina',
        picture: 'romina.jpeg'
    });

    await User.create({
        username: 'Sandra',
        email: 'sandra@gmail.com',
        password: 'password',
        github: 'Sandra',
        picture: 'sandra.jpeg'
    });

    await User.create({
        username: 'Goku',
        email: 'goku@gmail.com',
        password: 'password',
        github: 'Goku',
        picture: 'goku.jpeg'
    });

    console.log('users seeded');

    const members = await User.find({ picture: 'lernantino.jpeg' });
    const pancho = await User.find({ picture: 'pancho.jpeg' });
    const romina = await User.find({ picture: 'romina.jpeg' });
    const sandra = await User.find({ picture: 'sandra.jpeg' });
    const goku = await User.find({ picture: 'goku.jpeg' });

    await Project.deleteMany();

    const projects = await Project.insertMany([
        {
            title: 'Job Tracker App',
            date: 'May 5, 2021',
            poster: pancho,
            edited: true,
            description: `This is an app that helps the user keep track of their job applications and reminds them what jobs they have applied to and update the status on their job applications and will remind them to follow up after a interview. I’m looking for a team of 5 with basic HTML, CSS, and JAVASCRIPT knowledge. \n Edit \n We have two spots left! Preferably good with CSS.`,
            projectImg: 'project.png',
            teamSize: 5,
            tags: tags
        },
        {
            title: 'Notes taker App',
            date: 'May 5, 2022',
            poster: romina,
            edited: true,
            description: `This is an app that helps the user keep track of their job applications and reminds them what jobs they have applied to and update the status on their job applications and will remind them to follow up after a interview. I’m looking for a team of 5 with basic HTML, CSS, and JAVASCRIPT knowledge. \n Edit \n We have two spots left! Preferably good with CSS.`,
            projectImg: 'project.png',
            teamSize: 5,
            tags: tags
        },
        {
            title: 'Ecommerce shop',
            date: 'May 5, 2021',
            poster: sandra,
            edited: true,
            description: `This is an app that helps the user keep track of their job applications and reminds them what jobs they have applied to and update the status on their job applications and will remind them to follow up after a interview. I’m looking for a team of 5 with basic HTML, CSS, and JAVASCRIPT knowledge. \n Edit \n We have two spots left! Preferably good with CSS.`,
            projectImg: 'project.png',
            teamSize: 5,
            tags: tags
        },
        {
            title: 'Random Project',
            date: 'May 5, 2021',
            poster: goku,
            edited: true,
            description: `This is an app that helps the user keep track of their job applications and reminds them what jobs they have applied to and update the status on their job applications and will remind them to follow up after a interview. I’m looking for a team of 5 with basic HTML, CSS, and JAVASCRIPT knowledge. \n Edit \n We have two spots left! Preferably good with CSS.`,
            projectImg: 'project.png',
            teamSize: 5,
            tags: tags
        },
    ]);

    console.log('projects seeded');

    for (member of members) {
        projects[0].members.push(member);
        await projects[0].save();
    }

    console.log("All done");

    process.exit();
});