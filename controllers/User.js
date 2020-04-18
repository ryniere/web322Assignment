/*********************USER ROUTES***************************/
const express = require('express')
const router = express.Router();
const userModel = require("../models/User");
const path = require("path");
const bcrypt = require("bcryptjs");
const sgMail = require('@sendgrid/mail');

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

//Route to direct use to Registration form
router.get("/signup",(req,res)=>
{
    res.render("User/signup");
});

//Route to process user's request and data when user submits registration form
router.post("/signup",(req,res)=>
{ 

    const { name, lastName, email, password, passwordAgain } = req.body;

    const errorMessages = {};

    let hasError = false;

    //validation

    userModel.findOne({email:req.body.email})
    .then((user)=>{

        //there was no matching email
        if(user==null)
        {
            if (name == "") {
                hasError = true;
                errorMessages.nameMandatory = 'You must enter your first name';
            } 
        
            if (lastName == "") {
                hasError = true;
                errorMessages.lastNameMandatory = 'You must enter your last name';
            } 

            if (email == "") {
                hasError = true;
                errorMessages.emailMandatory = 'You must enter the email';

            } else if (!emailRegex.test(email)) {
                hasError = true;
                errorMessages.emailMandatory = 'You must enter a valid email';
            } 

            if (password == "") {
                hasError = true;
                errorMessages.passwordMandatory = 'You must enter the password';
            } else if (!passwRegex.test(password)) {
                hasError = true;
                errorMessages.passwordMandatory = 'The password must be between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter';
            }
        
        
            if (passwordAgain == "") {
                hasError = true;
                errorMessages.passwordAgainMandatory = 'You must retype the password';
            }
        
            if (password != passwordAgain) {
                hasError = true;
                errorMessages.passwordAgainMandatory = 'Passwords does not match';
            } 
        
            if (hasError) {
        
                res.render("User/signup", {
                    errorMessages
                });
            } else {
                const newUser =
                {
                    firstName: name,
                    lastName: lastName,
                    email: email,
                    password: password
                }
            
                const user = new userModel(newUser);
                user.save()
                .then((user)=>{
            
                            const msg = {
                        to: email,
                        from: 'ryniere16@gmail.com',
                        subject: `Welcome ${name}!`,
                        text: `Welcome ${name} ${lastName}! We are very excited you signed up!`,
                        html: `<p>Welcome ${name} ${lastName}! We are very excited you signed up!</p>`
                    };
                    sgMail.send(msg);
            
            
                    req.session.user= user;
                    res.redirect(`/user/profile/`)
                    // req.files.profilePic.name = `pro_pic_${user._id}${path.parse(req.files.profilePic.name).ext}`;
            
                    // req.files.profilePic.mv(`public/uploads/${req.files.profilePic.name}`)
                    // .then(()=>{
            
            
                    //     userModel.updateOne({_id:user._id},{
                    //         profilePic: req.files.profilePic.name
                    //     })
                    //     .then(()=>{
                    //         res.redirect(`/user/profile/${user._id}`)
                    //     })
            
                    // })
                  
                  
                   
                })
                .catch(err=>console.log(`Error while inserting into the data ${err}`));
            }
        }
        //There is a matching email
        else
        {
            hasError = true;
            errorMessages.emailMandatory = 'There is another user registered with this email';
            res.render("User/signup", {
                errorMessages
            });
        }


    })
    .catch(err=>console.log(`Error ${err}`));

    
});

//Route to direct user to the login form
router.get("/login",(req,res)=>
{
    res.render("User/login");
});

//Route to process user's request and data when user submits login form
router.post("/login",(req,res)=>
{
    
    /*
        Here is whre we have to determine if the email and the password exists.
        If it does, create session, assign the user object(document) to session
        then redirect user
    */

   /* const formData = {
        email : req.body.email,
        password: req.body.password
    }*/

    //Check to see if the user's email exist in the database

    const errors=[];

    userModel.findOne({email:req.body.email})
    .then((user)=>{

        //there was no matching email
        if(user==null)
        {
            errors.push("Sorr your email was not found in our database")

            res.render("User/login",{
                errors
            })
        }

        //There is a matching email
        else
        {
            bcrypt.compare(req.body.password,user.password)
            .then((isMatched)=>{

                //password match
                if(isMatched==true)
                {
                   req.session.user= user;

                   res.redirect("/user/profile")
                }

                //no match
                else
                {
                    errors.push("Sorry your password was wrong!")

                    res.render("User/login",{
                      errors
                    })
                }

            })
            .catch(err=>console.log(`Error ${err}`));

        }


    })
    .catch(err=>console.log(`Error ${err}`));


});



router.get("/profile/",(req,res)=>{


    res.render("User/userDashboard");
    
})

router.get("/logout",(req,res)=>{

    req.session.destroy();
    res.redirect("/user/login")
});



module.exports=router;