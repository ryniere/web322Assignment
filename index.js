const express = require("express");
const  exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');


const app = express();

//handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const categoryModel = require("./model/category");
const productModel = require("./model/product");


//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))

//loading static assests middleware
app.use(express.static("public"));

//define your routes for the exam here

app.get("/",(req,res)=>{
    res.render("home",{
        title: "Home",
        categories: categoryModel.getAllCategories(),
        bestSellerProducts:  productModel.getBestSellerProducts()
})
});

app.get("/login",(req,res)=>{
    res.render("login",{
        title: "Login",
})

});

app.get("/signup",(req,res)=>{
    res.render("signup",{
        title: "Signup",
})

});

app.get("/products",(req,res)=>{


    res.render("productsList",{
        title: "productsList",
        category: 'All Products',
        products: productModel.getAllProducts()
})
});

app.get("/productsList",(req,res)=>{

    const {category} = req.query;

    res.render("productsList",{
        title: "productsList",
        category: category,
        products: productModel.getProductsByCategory(category)
})
});

//Handle the post data
app.post("/submitRequestRydeForm",(req,res)=>{

    const errorMessages = [];

    //validation
    if(req.body.fromAddress=="")
    {
            errorMessages.push("You must enter the address where the ryde will start");
    }

    if(req.body.toAddress=="")
    {
            errorMessages.push("You must enter the address where the ryde will end");
    }

    if(req.body.distance=="")
    {
            errorMessages.push("You must enter the distance");
    }

    //If the user does not enter all the information
    if(errorMessages.length == 0 )
    {
        
            //descturing
            const {fromAddress, toAddress, distance} = req.body;
            const price = (BASE_FARE + (Number(distance) * PRICE_PER_KM) + SERVICE_FEE);

            const totalPrice = (price >= MINIMUN_FARE_CHARGE ? price : MINIMUN_FARE_CHARGE).toFixed(2);

            res.render("confirmationPage",{
                totalPrice, 
                fromAddress, 
                toAddress,
                distance
            });
    }
    //If the user enters all the data and submit the form
    else
    {
        res.render("requestRydeForm",{
            errors : errorMessages
        });
            
    }

});


const PORT=3000;
//This creates an Express Web Server that listens to HTTP Reuqest on port 3000
app.listen(PORT,()=>{
    console.log(`Web Server Started`);
});