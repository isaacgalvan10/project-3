const db = require('./connection');
const { Project, User } = require('../models');

db.once('open', async () => {
    await User.deleteMany();
    await Project.deleteMany();

    await User.create({
        username: 'Pamela',
        email: 'pamela@gmail.com',
        bio: 'My name is Pamela and I like to draw, idk why Im doing here i dont even code',
        password: 'password',
        github: 'Pamela',
        picture: 'pamela.jpeg'
    });


    await User.create({
        username: 'Abi',
        email: 'abi@gmail.com',
        bio: 'Hello! I am a Full-Stack Web Developer from Mexico. I build websites from scratch to help businesses have an engaging online presentation.',
        password: 'password',
        github: 'Abimael1996',
        picture: 'abi.JPG'
    });


    await User.create({
        username: 'Enoc',
        email: 'enoc@gmail.com',
        password: 'password',
        bio: 'Mechatronics Engineer Grad at C.E.T.I able to make solutions based on automation, currently studying to become a FullStack Developer at Tecnologico de Monterrey',
        github: 'Enrique-Rojas-Villegas',
        picture: 'lernantino.jpeg'
    });


    await User.create({
        username: 'Isaac',
        email: 'isaac@gmail.com',
        bio: 'Remote Frontend web developer leveraging WordPress development experience to build a more intuitive user experience on the web. galvan1522@gmail.com',
        password: 'password',
        github: 'isaacgalvan10',
        picture: 'lernantino.jpeg'
    });


    await User.create({
        username: 'Andre',
        email: 'andre@gmail.com',
        password: 'password',
        bio: 'I am a Full-stack web developer currently coursing the Tecnológico de Monterrey Coding Bootcamp. Specialized in JavaScript problem solving.',
        github: 'AndreV96',
        picture: 'lernantino.jpeg'
    });

    await User.create({
        username: 'Pancho',
        email: 'pancho@gmail.com',
        bio: 'im pancho, o panchito como les guste mas, ami me gusta mas pancho pero diganme como quieran',
        password: 'password',
        github: 'panchito',
        picture: 'pancho.jpeg',
    });

    await User.create({
        username: 'Romina',
        email: 'romina@gmail.com',
        bio: 'solo chingones en mis equipos los demas a chingar a su madre a otro lado',
        password: 'password',
        github: 'Romina',
        picture: 'romina.jpeg'
    });

    await User.create({
        username: 'Sandra',
        email: 'sandra@gmail.com',
        password: 'password',
        bio: 'hello my name is sandra im here to find a partner not to work on projects, hope thats ok with you guys',
        github: 'Sandra',
        picture: 'sandra.jpeg'
    });

    await User.create({
        username: 'Goku',
        email: 'goku@gmail.com',
        password: 'password',
        bio: 'my name is not Goku my uncle created my account but idk how to change my name, im Leonardo and im really good at CSS',
        github: 'Goku',
        picture: 'goku.jpeg'
    });

    console.log('users seeded');
   
    console.log("All done");

    process.exit();
});
