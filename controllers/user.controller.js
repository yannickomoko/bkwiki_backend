const User = require('../models/user.models');
const config = require('../config/config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {NotFoundError} = require('../helpers/utility');


// Register a new User
exports.register = async (req, res) => {
    
    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hasPassword = await bcrypt.hash(req.body.password, salt);

    // Create an user object
    const user = new User({

        username: req.body.username,
        phone: req.body.phone,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: hasPassword
        
    });
    // Save User in the database
    try {
        const id = await User.create(user);
        user.user_id = id;
        delete user.password;
        res.send({status: 200, user, message:'user registered successfull!'});
        
       // console.log(hasPassword);
    }
    catch (err){
        res.status(500).send({message: err});
    }    
};

// Login
exports.login = async (req, res) => {
    try {
        // Check user exist
        const user = await User.login(req.body.phone);
        if (user) {
            const validPass = await bcrypt.compare(req.body.password, user.hasPassword);
            if (validPass) {
                user.password = undefined;
                const jsontoken = sign({ result: user }, config.TOKEN_SECRET, {
                    expiresIn: "1h"
                  });
                  return res.json({
                    success: 1,
                    message: "login successfully",
                    token: jsontoken
                  });
            }
            else {
                return res.json({
                  success: 0,
                  data: "Invalid email or password"
                });
              } 
        }
    }
    catch (err) {
        if( err instanceof NotFoundError ) {
            res.status(401).send(`Mobile/Email or Password is wrong`);
        }
        else {
            let error_data = {
                entity: 'User',
                model_obj: {param: req.params, body: req.body},
                error_obj: err,
                error_msg: err.message
            };
            res.status(500).send("Error retrieving User");
        }
    }   
    
};

// Access auth users only
exports.authuseronly = (req, res) => {
    res.send("Hey,You are authenticated user. So you are authorized to access here.");
};

// Admin users only
exports.adminonly = (req, res) => {
    res.send("Success. Hellow Admin, this route is only for you");
};

exports.forgetpassword = (req, res) => {
    
};