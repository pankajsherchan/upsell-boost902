const express = require('express');
const jwt = require('jsonwebtoken');

let config = require('./config');
const users = require('../routes/users-routes');

const checkUser = (email, password) => {
    let result = false;
    const user = users.Users.find(u=>u.email===email && u.password === password);
    if(user){
        result = true;
    }
    return result;
}

const login = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;

    if(email&&password){
        if(checkUser(email,password)){
            let token = jwt.sign({email: email},
                    config.secret,
                    {
                        expiresIn: '24h'
                    }
                );
            res.json({
                success: true,
                message: 'Authentication successful',
                token: token
            });
        } else{
            const error = new Error('Authentication failed! Email or password is not correct.');
            error.code = 400;
            return next(error);
        }
    }
}

const index = (req, res)=>{
    res.json({
        success: true,
        message: 'Index Page'
    });
}

module.exports = {
    login: login,
    index: index
}