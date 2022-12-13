const express=require("express");
const router=express.Router();
const User=require("../modules/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Creating new user through post request
router.post('/createuser', [
    body('email', "Enter valid email id").isEmail(),
    body('password', "Password must be lenght 5").isLength({ min: 5 }),
    body('name').isLength({ min: 3 })
], async (req, res) => {

  // Handling validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    try {

      let user=await User.findOne({email:req.body.email});
      if(user){
        return res.status(400).json({ error : "Sorry a user with email id already exists."})
      }
      
      // Hashing password using bcryptjs with salt
      const salt = bcrypt.genSaltSync(10);
      const SecPass = bcrypt.hashSync(req.body.password, salt);
    
    
    // To create new user
    user=await User.create({
        name: req.body.name,
        email: req.body.email,
        password: SecPass,
      });

    const data={
      user : {
        id : user.id
      }
    }
    const authToken = jwt.sign(data, 'shhhhh');
    // console.log(authToken);
      res.send(authToken);
    // res.send(req.body);


  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
      
  }
  
})

module.exports=router