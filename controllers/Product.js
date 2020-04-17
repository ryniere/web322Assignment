/*********************Product ROUTES***************************/
const express = require('express')
const router = express.Router();
const productModel  = require("../models/Product");


////Route to fetch all tasks
router.get("/list",(req,res)=>
{
    //pull from the database , get the results that was returned and then inject that results into
    //the taskDashboard

    productModel.find()
    .then((products)=>{


        //Filter out the information that you want from the array of documents that was returned into
        //a new array

        //Array 300 documents meaning that the array has 300 elements 

  
        const filteredProduct =   products.map(product=>{

                return {

                    id: product._id,
                    title:product.title,
                    description:task.description,
                    dueDate :product.dueDate,
                    status : product.status,
                    priority : product.priority
                }
        });

        res.render("productsList",{
            category: 'All Products',
            data : filteredProduct
        });

    })
    .catch(err=>console.log(`Error happened when pulling from the database :${err}`));

    
});



module.exports=router;