const express = require('express');

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



app.listen(5000,()=>{
    console.log(`Server is running....`);
});