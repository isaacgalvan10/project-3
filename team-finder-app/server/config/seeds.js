const db = require('./connection');
const { Project } = require('../models');

db.once('open', async () => {
    const members = [
        {
            memberId: '1',
            picture: 'lernantino.jpeg',
            username: 'Andre',
        },
        {
            memberId: '2',
            picture: 'lernantino.jpeg',
            username: 'Enoc',
        },
        {
            memberId: '3',
            picture: 'lernantino.jpeg',
            username: 'Issac',
        },
    ];

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

    await Project.deleteMany();

    await Project.insertMany([
        {
            title: 'Job Tracker App',
            date: 'May 5, 2021',
            poster: 'lernantino',
            edited: true,
            profile: 'lernantino.jpeg',
            description: `This is an app that helps the user keep track of their job applications and reminds them what jobs they have applied to and update the status on their job applications and will remind them to follow up after a interview. I’m looking for a team of 5 with basic HTML, CSS, and JAVASCRIPT knowledge. \n Edit \n We have two spots left! Preferably good with CSS.`,
            projectImg: 'project.png',
            teamSize: 5,
            members: [...members],
            tags: [...tags]
        },
        {
            title: 'Notes taker App',
            date: 'May 5, 2022',
            poster: 'qwerty',
            edited: true,
            profile: 'lernantino.jpeg',
            description: `This is an app that helps the user keep track of their job applications and reminds them what jobs they have applied to and update the status on their job applications and will remind them to follow up after a interview. I’m looking for a team of 5 with basic HTML, CSS, and JAVASCRIPT knowledge. \n Edit \n We have two spots left! Preferably good with CSS.`,
            projectImg: 'project.png',
            teamSize: 5,
            members: [...members],
            tags: [...tags]
        },
        {
            title: 'Ecommerce shop',
            date: 'May 5, 2021',
            poster: 'qwerty 2',
            edited: true,
            profile: 'lernantino.jpeg',
            description: `This is an app that helps the user keep track of their job applications and reminds them what jobs they have applied to and update the status on their job applications and will remind them to follow up after a interview. I’m looking for a team of 5 with basic HTML, CSS, and JAVASCRIPT knowledge. \n Edit \n We have two spots left! Preferably good with CSS.`,
            projectImg: 'project.png',
            teamSize: 5,
            members: [...members],
            tags: [...tags]
        },
        {
            title: 'Random Project',
            date: 'May 5, 2021',
            poster: 'qwerty 2',
            edited: true,
            profile: 'lernantino.jpeg',
            description: `This is an app that helps the user keep track of their job applications and reminds them what jobs they have applied to and update the status on their job applications and will remind them to follow up after a interview. I’m looking for a team of 5 with basic HTML, CSS, and JAVASCRIPT knowledge. \n Edit \n We have two spots left! Preferably good with CSS.`,
            projectImg: 'project.png',
            teamSize: 5,
            members: [...members],
            tags: [...tags]
        },
    ]);

    console.log('projects seeded');

    process.exit();
});