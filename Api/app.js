const express = require('express');
const mongoose = require('mongoose');

const usersRoutes = require('./routes/users-routes');
const postsRoutes = require('./routes/posts-routes');
const loginRoutes = require('./routes/login-routes');

const app = express();

app.use('/api/Users', usersRoutes.router);
app.use('/api/Posts', postsRoutes);
app.use('/',loginRoutes);

app.use((error,req,res,next) => {
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500)
        .json({message: error.message || 'An unknown error has occured'});
});

let url = 'mongodb+srv://Anish99:Bh669zyG1XYxHxjO@phase2-415-n2ctl.mongodb.net/upsell-test?retryWrites=true&w=majority';
mongoose
    .connect(url,{useNewUrlParser: true})
    .then(() => app.listen(5000,()=>{
        console.log(`Server is running....`);
    }))
    .catch(err => {
        console.log(err);
    });
