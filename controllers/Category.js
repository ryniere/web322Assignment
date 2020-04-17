/*********************Product ROUTES***************************/
const express = require('express')
const router = express.Router();
const categoryModel  = require("../models/Category");


////Route to fetch all tasks
router.get("/list",(req,res)=>
{
    //pull from the database , get the results that was returned and then inject that results into
    //the taskDashboard

    categoryModel.find()
    .then((categories)=>{


        //Filter out the information that you want from the array of documents that was returned into
        //a new array

        //Array 300 documents meaning that the array has 300 elements 

  
        const filteredCategory =   categories.map(category=>{

                return {

                    id: category._id,
                    title: category.title,
                    picture : category.picture
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