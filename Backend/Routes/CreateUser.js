import express from "express";
const router = express.Router();
import User from "../models/User.js"; 
import { body , validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const jwtSecret = "thisIsMyFirstFullStatkWebsite"

//* new create user : 
router.post("/createuser",[
    body('email').isEmail(),
    body('name').isLength({min:5}), 
    body('password','incorrect password').isLength({min:5})  
    ], async (req, res) => {

    const error =validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({ error: error.array() })
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password , salt); 

    try {
        const newUser = await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            location: req.body.location
        });
        res.json({ success: true, user: newUser });
    } catch (err) {
        console.log("Error creating user:", err);
        res.json({ success: false, error: err.message });
    }
});


//* for login if user exsist : 
router.post("/loginuser",[
    body('email' ,).isEmail(),
    body('password','incorrect password').isLength({min:5})  
    ], async (req, res) => {

    let email = req.body.email ;  
    try {
    let userData = await User.findOne({email});

    if(!userData){
       return res.status(400).json({ error: "try login with correct email" })
    }
    
    const pwdCompare = await bcrypt.compare(req.body.password , userData.password)

    if(!pwdCompare){
        return res.status(400).json({ error: "try login with correct password" })
    }
    const data = {
        user:{
            id : userData.id
        }
    }

    const authToken = jwt.sign(data,jwtSecret)
    return res.json({ success:true , authToken:authToken })

    } catch (err) {
        console.log("Error creating user:", err);
        res.json({ success: false, error: err.message });
    }
});




export default router;
