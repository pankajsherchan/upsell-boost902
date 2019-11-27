const express = require('express');

const router = express.Router();

router.use(express.json());



let DUMMY_USERS = [
    {
        id: 'u1',
        email : 'u1@domain.com',
        firstName : 'Test',
        lastName: 'User1',
        password: 'password',
        role: 'user',
        phone: '123793249'
    },
    {
        id: 'u2',
        email : 'u2@domain.com',
        firstName : 'Test',
        lastName: 'User2',
        password: 'password',
        role: 'manager',
        phone: '718236123'
    }
]

let listUsers = DUMMY_USERS;

//Get All Users
router.get('/', (req, res, next) => {
    const users = listUsers;
    res.json({users});
})

//Create User Or SignUp
router.post('/signUp', (req,res,next) => {

    console.log(req.body.id);

    const number = DUMMY_USERS.length + 1;

    const user = {
        id: 'u'+number,
        email : req.body.email,
        firstName : req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        role: 'User',
        phone: req.body.phone
    };
    DUMMY_USERS.push(user);

    res.json({user});
})

//Get User by id
router.get('/:uid', (req, res, next) => {
    const userId = req.params.uid;
    console.log(userId);
    let users = listUsers;
    console.log(users);
    const user = users.find(u=> u.id === userId);
    console.log(user);

    if(!user){
        const error = new Error('User not found.');
        error.code = 404;
        return next(error);
    }

    res.json({user});
})

//Edit User Profile
router.put('/', (req, res, next) => {
    const userId = req.body.id;

    const user = DUMMY_USERS.find(u=> {
        return u.id === userId;
    })

    if(!user){
        const error = new Error('User not found.');
        error.code = 404;
        return next(error);
    }else{
        user.email = req.body.email, //Updated Email
        user.firstName=req.body.firstName, //Updated First Name
        user.lastName = req.body.lastName,  // Updated Last Name
        user.password = req.body.password, // Updated Password
        user.phone = req.body.phone //Updated Phone Number
    }

    res.json({user});
});

//DELETE user
router.delete('/:uid', (req, res, next) => {
    const userId = req.params.uid;

    const user = DUMMY_USERS.find(u=> {
        return u.id === userId;
    })
   // let users=DUMMY_USERS;

    if(!user){
        const error = new Error('User not found.');
        error.code = 404;
        return next(error);
    }else{
       listUsers= listUsers.filter(u=>u.id!=userId);
    }

    res.json({listUsers});
})
module.exports = {
    router: router,
    Users: DUMMY_USERS
};