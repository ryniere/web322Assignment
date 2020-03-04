const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const app = express();

//handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const categoryModel = require("./model/category");
const productModel = require("./model/product");

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))

//loading static assests middleware
app.use(express.static("public"));

//define your routes for the exam here

app.get("/", (req, res) => {
    res.render("home", {
        title: "Home",
        categories: categoryModel.getAllCategories(),
        bestSellerProducts: productModel.getBestSellerProducts()
    })
});

app.get("/login", (req, res) => {
    res.render("login", {
        title: "Login",
    })

});

app.get("/signup", (req, res) => {
    res.render("signup", {
        title: "Signup",
    })

});

app.get("/products", (req, res) => {


    res.render("productsList", {
        title: "productsList",
        category: 'All Products',
        products: productModel.getAllProducts()
    })
});

app.get("/productsList", (req, res) => {

    const { category } = req.query;

    res.render("productsList", {
        title: "productsList",
        category: category,
        products: productModel.getProductsByCategory(category)
    })
});


app.post("/submitRequestLoginForm", (req, res) => {

    const errorMessages = {};

    let hasError = false;
    let userEmail = "";

    //validation
    if (req.body.email == "") {
        hasError = true;
        errorMessages.emailMandatory = 'You must enter the email';
    } else {
        userEmail = req.body.email;
    }

    if (req.body.password == "") {
        hasError = true;
        errorMessages.passwordMandatory = 'You must enter the password';
    }

    if (hasError) {

        res.render("login", {
            title: "Login",
            errorMessages
        })

    } else {
        res.render('account', {
            title: "Account",
            userEmail
        });
    }

});

//Handle the post data
app.post("/submitRequesSignupForm", async (req, res) => {

    const errorMessages = {};

    let hasError = false;
    let userEmail = req.body.email;
    let firstName = req.body.name;
    let lastName = req.body.lastName;

    //validation
    if (req.body.name == "") {
        hasError = true;
        errorMessages.nameMandatory = 'You must enter your name';
    }

    if (req.body.email == "") {
        hasError = true;
        errorMessages.emailMandatory = 'You must enter the email';

    } else if (!emailRegex.test(req.body.email)) {
        hasError = true;
        errorMessages.emailMandatory = 'You must enter a valid email';
    } else {
        userEmail = req.body.email;
    }

    if (req.body.password == "") {
        hasError = true;
        errorMessages.passwordMandatory = 'You must enter the password';
    } else if (!passwRegex.test(req.body.password)) {
        hasError = true;
        errorMessages.passwordMandatory = 'The password must be between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter';
    }

    if (req.body.passwordAgain == "") {
        hasError = true;
        errorMessages.passwordAgainMandatory = 'You must confirm the password';
    } else if (!passwRegex.test(req.body.passwordAgain)) {
        hasError = true;
        errorMessages.passwordAgainMandatory = 'The password must be between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter';
    }

    if (hasError) {

        res.render("signup", {
            title: "Signup",
            errorMessages
        })

    } else {

        const msg = {
            to: userEmail,
            from: 'ryniere16@gmail.com',
            subject: `Welcome ${firstName}!`,
            text: `Welcome ${firstName} ${lastName}! We are very excited you signed up!`,
            html: `<p>Welcome ${firstName} ${lastName}! We are very excited you signed up!</p>`
        };
        sgMail.send(msg);

        res.render('account', {
            title: "Account",
            userEmail,
            firstName,
            lastName
        });
    }

});


const PORT = process.env.PORT || 3000;
//This creates an Express Web Server that listens to HTTP Reuqest on port 3000
app.listen(PORT, () => {
    console.log(`Web Server Started`);
});