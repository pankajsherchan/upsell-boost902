const mongoose = require('mongoose');

const User = require('../models/user');
const Role = require('../models/role');

const getAllUsers = async (req, res, next) => {
    let users;

    try{
        users = await User.find();
    } catch (err) {
        const error = new Error('Something went wrong! Users could not be found');
        error.code = 500;
        return next(error);
    }

    res.json({users: users.map(user => user.toObject({getters: true}))});
}

const getUserById = async (req, res, next) => {
    
    const userId = req.params.uid;
    
    let user;

    try{
        user = await User.findById(userId);
    }catch(err){
        const error = new Error('Something went wrong! User could not be found');
        error.code = 500;
        return next(error);
    }

    if(!user){
        const error = new Error('User not found.');
        error.code = 404;
        return next(error);
    }

    res.json({user: user.toObject({getters:true})});
}

const createUser = async (req,res,next) => {

    const{email,firstName,lastName,password,phone} = req.body;
    const roleId = "5de1af220bffa8204441d765";

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email});
    } catch (err) {
        const error = new Error('Signing up failed, please try again!');
        error.code = 500;
        return next(error);
    }
    if(existingUser){
        const error = new Error('User already exists, please login instead');
        error.code = 422;
        return next(error);
    } 
    
    const createdUser = new User({
        email,
        firstName,
        lastName,
        password,
        roleId,
        phone
    });

    let role;

    try{
        role = await Role.findById(roleId);
    }
    catch(err){
        const error = new Error('Assigning role failed, please try again');
        error.code = 500;
        return next(error);
    }

    if(!role){
        const error = new Error('Role not found');
        error.code = 404;
        return next(error);
    }

    try{
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdUser.save({ session: sess});
        role.users.push(createdUser);
        await role.save({ session: sess});
        await sess.commitTransaction();
    } catch(err){
        console.log(err);
        return next(err);
    }
    res.json({createdUser: createdUser.toObject({getters: true})});
}

const editUser = async (req, res, next) => {
    const userId = req.body.id;
    const { email, firstName, lastName, password, phone} = req.body;
    let user;
    
    try{
        user = await User.findById(userId);
    } catch(err){
        const error = new Error('Something went wrong. Could not update user.');
        error.code = 500;
        return next(error);
    }

    if(!user){
        const error = new Error('User not found.');
        error.code = 404;
        return next(error);
    }else{
        user.email = email, //Updated Email
        user.firstName=firstName, //Updated First Name
        user.lastName = lastName,  // Updated Last Name
        user.password = password, // Updated Password
        user.phone = phone //Updated Phone Number

        try{
            await user.save();
        } catch (err) {
            const error = new Error('Something went wrong, could not update user');
            error.code = 500;
            return next(error);
        }
    }

    res.json({user: user.toObject({getters: true})});
}

const deleteUser = async (req, res, next) => {
    const userId = req.params.uid;

    let user;

    try{
        user = await User.findById(userId);
    } catch(err){
        const error = new Error('Something went wrong, user could not be found!');
        error.code = 500;
        return next(error);
    }
   
    if(!user){
        const error = new Error('User does not exist');
        error.code = 404;
        return next(error);
    }else{
        try{
            await user.remove();
        } catch(err){
            const error = new Error('Something went wrong, user could not be deleted!');
            error.code = 500;
            return next(error);
        }
    }

    res.json({message: 'Successfully deleted!'});
}

exports.getAllUsers = getAllUsers;
exports.getUserById = getUserById;
exports.createUser = createUser;
exports.editUser = editUser;
exports.deleteUser = deleteUser;