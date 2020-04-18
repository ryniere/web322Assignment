const express = require('express')
const router = express.Router();

const productModel  = require("../models/Product");
const categoryModel = require("../models/Category");

/*GENERAL ROUTES*/
//Route to direct user to home page
router.get("/",(req,res)=>
{

    productModel.find()
    .then((products)=>{


        //Filter out the information that you want from the array of documents that was returned into
        //a new array

        //Array 300 documents meaning that the array has 300 elements 

  
        const filteredProduct =   products.filter((product)=> product.bestSeller)
        .map(product=>{

                return {

                    id: product._id,
                    title:product.title,
                    picture: product.picture,
                    price :product.price,
                    quantity :product.quantity,
                    category : product.category,
                    bestSeller : product.bestSeller
                }
        });

        res.render("General/index", {
            title: "Home",
            categories: categoryModel.getAllCategories(),
            bestSellerProducts:filteredProduct
        })

    })
    .catch(err=>console.log(`Error happened when pulling from the database :${err}`));

        
});


//Route to direct user to about us page
router.get("/about",(req,res)=>
{
    res.render("General/about");
});

module.exports=router;