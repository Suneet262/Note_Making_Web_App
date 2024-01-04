const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();


const router = express.Router();


//Signup Route
router.post("/signup", async (req,res)=>{
    try {
        const {username, email,password} = req.body;

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({ error: 'Email already registered' });
        }
        
        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        
        
        //Generating a JWT token for user and sending the essential user details to the frontend
        const token = jwt.sign(
            {id : User._id, email},
            process.env.JWT_SECRET,
            {
                expiresIn : "2h"
            }
        );
        
        //Showing the details in the frontend excluding the password
        User.token = token
        User.password = undefined; 

        
        res.status(201).json({ message: 'Signup successful' });
    
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//Login Route

router.post("/login", async (req,res)=>{
    try {
        const {email,password}= req.body;

        const user = await User.findOne({email});
        if(!user){
            res.status(401).json({error: 'User does not exists.....Please signup'});
        }

        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            res.status(401).json({error: 'Invalid Login Credentials'});
        }


        //Generating a JWT token for user and sending the essential user details to the frontend
        const token = jwt.sign(
            {id : User._id, email},
            process.env.JWT_SECRET,
            {
                expiresIn : "2h"
            }
        );

        //Showing the details in the frontend excluding the password
        User.token = token
        User.password = undefined;



        //Cookie Section
        const option = {
            expires : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 ),
            httpOnly : true
        };
        res.status(200).cookie("token", token, option).json({
            success : true,
            token,
            User
        });

        // res.status(200).json(user);
        

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//Logout Route

router.post('/logout', async (req, res) => {
    try {
    
      //Clearing the cookie session by setting an expired date
      res.cookie('token', '' , { expires: new Date(0), httpOnly: true });
    
      res.status(200).json({ success: true, message: 'Logout successful' });
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;