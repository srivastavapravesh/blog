const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var validator = require("email-validator");
const jwt = require('jsonwebtoken');
 
const config = require('./../configs/');

const AuthController = {
    signUp: async function(req, res) {
           try{
            // Implement validation
           if(!req.body.firstName && !req.body.lastName){
            throw new Error("firstName  & lastName is required");
            }
           if (await mongoose.connection.collection('users').findOne({ email: req.body.email }))
           {
            throw new Error("email  " + req.body.email + " is already taken");   
           }
            let isValidEmail= validator.validate(req.body.email); // true
         
            if(!isValidEmail)
            {
                throw new Error("please enter valid email address");
            }

            // After validation
            user = await mongoose.connection.collection('users').insertOne({
               
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email ,
                pass: bcrypt.hashSync(req.body.pass, 10),
                createdAt: new Date(),
                updateAt: new Date(),
            });
            res.json({ success: true, data: user.ops});
           }
     catch(error) {
        console.log('AuthController -> signUp', error);
         res.json({ success: false, error: error.message });
        }   
    },
    signIn: async function(req, res) {
        try {
            let user = await mongoose.connection.collection('users').findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).send('Incorrect email or password.');
            }
         
            // Then validate the Credentials in MongoDB match
            // those provided in the request
            const validPassword = await bcrypt.compare(req.body.pass, user.pass);
            console.log("Valid Password",validPassword);
            if (!validPassword) {
                return res.status(400).send('Incorrect email or password.');
            }
            
            const token =jwt.sign({_id : user._id, email : user.email, firstName: user.firstName ,lastName : user.lastName},config.security.privateKey);     
            res.json({ success: true, data: user, token: token });              
        } catch(error) {
            console.log('AuthController -> signIn', error);
            res.json({ success: false, error: error.message });
        }   
    },
    // resetPassword: async function(req,res){
    //     try {
            
    //     } catch (error) {
            
    //     }
    // }
};
module.exports = AuthController;
