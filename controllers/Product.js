/*********************Product ROUTES***************************/
const express = require('express')
const router = express.Router();
const path = require("path");
const productModel  = require("../models/Product");


////Route to fetch all tasks
router.get("/inventory/",(req,res)=>
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
                    price :product.price,
                    quantity :product.quantity,
                    category : product.category,
                    bestSeller : product.bestSeller
                }
        });

        res.render("Product/inventory",{
            data : filteredProduct
        });

    })
    .catch(err=>console.log(`Error happened when pulling from the database :${err}`));

});

router.get("/products/",(req,res)=>
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
                    price :product.price,
                    picture: product.picture,
                    quantity :product.quantity,
                    category : product.category,
                    bestSeller : product.bestSeller
                }
        });

        res.render("Product/productsList",{
            data : filteredProduct
        });

    })
    .catch(err=>console.log(`Error happened when pulling from the database :${err}`));

});


router.get("/productsList/",(req,res)=>
{
    //pull from the database , get the results that was returned and then inject that results into
    //the taskDashboard

    const { category } = req.query

    console.log(category)
    productModel.find({category:category.toLocaleLowerCase()})
    .then((products)=>{


        //Filter out the information that you want from the array of documents that was returned into
        //a new array

        //Array 300 documents meaning that the array has 300 elements 

  
        const filteredProduct =   products.map(product=>{

                return {

                    id: product._id,
                    title:product.title,
                    price :product.price,
                    picture: product.picture,
                    quantity :product.quantity,
                    category : product.category,
                    bestSeller : product.bestSeller
                }
        });

        res.render("Product/productsList",{
            data : filteredProduct
        });

    })
    .catch(err=>console.log(`Error happened when pulling from the database :${err}`));

});

//Route to direct use to Add Task form
router.get("/add",(req,res)=>
{
    res.render("Product/add");
});

//Route to process user's request and data when the user submits the add task form
router.post("/add",(req,res)=>
{

        const bestSeller = req.body.bestSeller === "true" ? true : false;
        const newProduct = {
            title : req.body.title,
            price : req.body.price,
            description: req.body.description,
            quantity : req.body.quantity,
            bestSeller : bestSeller,
            category : req.body.category.toLowerCase()
        }

             /*
        Rules for inserting into a MongoDB database USING MONGOOSE is to do the following :
        1. YOu have to create an instance of the model, you must pass data that you want inserted
         in the form of an object(object literal)
        2. From the instance, you call the save method
     */

     const product =  new productModel(newProduct);
     product.save()
     .then((product)=>{

        req.files.picture.name = `pic_${product._id}${path.parse(req.files.picture.name).ext}`;

        req.files.picture.mv(`public/uploads/${req.files.picture.name}`)
        .then(()=>{

            productModel.updateOne({_id:product._id},{
                picture: req.files.picture.name
            })
            .then(()=>{
                res.redirect("/product/inventory");
            })

        })
         
     })
     .catch(err=>console.log(`Error happened when inserting in the database :${err}`));
});

router.get("/edit/:id",(req,res)=>{

    productModel.findById(req.params.id)
    .then((product)=>{

        const {_id,title,category,price} = product;
        res.render("Product/edit",{
            _id,
            title,
            category,
            price

    })
    .catch(err=>console.log(`Error happened when pulling from the database :${err}`));


});
});



router.put("/update/:id",(req,res)=>{

    const product =
    {
        title : req.body.title,
            price : req.body.price,
            quantity : req.body.quantity,
            category : req.body.category.toLowerCase()
    }

    productModel.updateOne({_id:req.params.id},product)
    .then(()=>{
        res.redirect("/product/inventory");
    })
    .catch(err=>console.log(`Error happened when updating data from the database :${err}`));


});

router.delete("/delete/:id",(req,res)=>{
    
    productModel.deleteOne({_id:req.params.id})
    .then(()=>{
        res.redirect("/product/inventory");
    })
    .catch(err=>console.log(`Error happened when updating data from the database :${err}`));

});




module.exports=router;
