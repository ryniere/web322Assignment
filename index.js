const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const session = require('express-session');


//This loads all our environment variables from the keys.env
require("dotenv").config({path:'./config/keys.env'});

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//import your router objects
const userRoutes = require("./controllers/User");
const generalRoutes = require("./controllers/General");
const productsRoutes = require("./controllers/Product");

const app = express();

// const categoryModel = require("./model/Category");
// const productModel = require("./model/Product");

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))

//loading static assests middleware
app.use(express.static("public"));


//Handlebars middlware
app.engine("handlebars",exphbs());
app.set("view engine","handlebars");

/*
    This is to allow specific forms and/or links that were submitted/pressed
    to send PUT and DELETE request respectively!!!!!!!
*/

//custom middleware functions
app.use((req,res,next)=>{

    if(req.query.method=="PUT")
    {
        req.method="PUT"
    }

    else if(req.query.method=="DELETE")
    {
        req.method="DELETE"
    }

    next();
})

app.use(fileUpload());


app.use(session({secret: `${process.env.SESSION_SECRET}` , resave: false,saveUninitialized: true}));

//custom middleware functions
app.use((req,res,next)=>{

    //res.locals.user is a global handlebars variable. This means that ever single handlebars file can access 
    //that user variable
    res.locals.user = req.session.user;
    next();
});

//MAPs EXPRESS TO ALL OUR  ROUTER OBJECTS
app.use("/",generalRoutes);
app.use("/user",userRoutes);
app.use("/product",productsRoutes);
app.use("/",(req,res)=>{
    res.render("General/404");
});


//define your routes for the exam here

// app.get("/", (req, res) => {
//     res.render("home", {
//         title: "Home",
//         categories: categoryModel.getAllCategories(),
//         bestSellerProducts: productModel.getBestSellerProducts()
//     })
// });

// app.get("/login", (req, res) => {
//     res.render("login", {
//         title: "Login",
//     })

// });

// app.get("/signup", (req, res) => {
//     res.render("signup", {
//         title: "Signup",
//     })

// });

// app.get("/products", (req, res) => {


//     res.render("productsList", {
//         title: "productsList",
//         category: 'All Products',
//         products: productModel.getAllProducts()
//     })
// });

// app.get("/productsList", (req, res) => {

//     const { category } = req.query;

//     res.render("productsList", {
//         title: "productsList",
//         category: category,
//         products: productModel.getProductsByCategory(category)
//     })
// });


// app.post("/submitRequestLoginForm", (req, res) => {

//     const errorMessages = {};

//     let hasError = false;
//     let userEmail = "";

//     //validation
//     if (req.body.email == "") {
//         hasError = true;
//         errorMessages.emailMandatory = 'You must enter the email';
//     } else {
//         userEmail = req.body.email;
//     }

//     if (req.body.password == "") {
//         hasError = true;
//         errorMessages.passwordMandatory = 'You must enter the password';
//     }

//     if (hasError) {

//         res.render("login", {
//             title: "Login",
//             errorMessages
//         })

//     } else {
//         res.render('account', {
//             title: "Account",
//             userEmail
//         });
//     }

// });

// //Handle the post data
// app.post("/submitRequesSignupForm", async (req, res) => {

//     const errorMessages = {};

//     let hasError = false;
//     let userEmail = req.body.email;
//     let firstName = req.body.name;
//     let lastName = req.body.lastName;

//     //validation
//     if (req.body.name == "") {
//         hasError = true;
//         errorMessages.nameMandatory = 'You must enter your name';
//     }

//     if (req.body.email == "") {
//         hasError = true;
//         errorMessages.emailMandatory = 'You must enter the email';

//     } else if (!emailRegex.test(req.body.email)) {
//         hasError = true;
//         errorMessages.emailMandatory = 'You must enter a valid email';
//     } else {
//         userEmail = req.body.email;
//     }

//     if (req.body.password == "") {
//         hasError = true;
//         errorMessages.passwordMandatory = 'You must enter the password';
//     } else if (!passwRegex.test(req.body.password)) {
//         hasError = true;
//         errorMessages.passwordMandatory = 'The password must be between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter';
//     }

//     if (req.body.passwordAgain == "") {
//         hasError = true;
//         errorMessages.passwordAgainMandatory = 'You must confirm the password';
//     } else if (!passwRegex.test(req.body.passwordAgain)) {
//         hasError = true;
//         errorMessages.passwordAgainMandatory = 'The password must be between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter';
//     }

//     if (hasError) {

//         res.render("signup", {
//             title: "Signup",
//             errorMessages
//         })

//     } else {

//         const msg = {
//             to: userEmail,
//             from: 'ryniere16@gmail.com',
//             subject: `Welcome ${firstName}!`,
//             text: `Welcome ${firstName} ${lastName}! We are very excited you signed up!`,
//             html: `<p>Welcome ${firstName} ${lastName}! We are very excited you signed up!</p>`
//         };
//         sgMail.send(msg);

//         res.render('account', {
//             title: "Account",
//             userEmail,
//             firstName,
//             lastName
//         });
//     }

// });


mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log(`Connected to MongoDB Database`);
})
.catch(err=>console.log(`Error occured when connecting to database ${err}`));


const PORT = process.env.PORT;
//This creates an Express Web Server that listens to HTTP Reuqest on port 3000
app.listen(PORT, () => {
    console.log(`Web Server Started`);
});