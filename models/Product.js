const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// //This indicates the shape of the documents that will be entering the database
  const productSchema = new Schema({
   
    title:
    {
      type:String,
      required:true
    },
    description:
    {
      type:String,
      required:true
    },
    price: 
    {
        type:Number,
        required:true
    },
    quantity: 
    {
        type:Number,
        default:20
    },
    picture :
    {
        type:String
    },
    bestSeller :
    {
        type:Boolean,
        default:false
    },
    category:
    {
        type:String,
        required:true
    }
  });

  /*
    For every Schema you create(Create a schema per collection), you must also create a model object. 
    The model will allow you to perform CRUD operations on a given collection!!! 
  */

 const productModel = mongoose.model('Product', productSchema);

 module.exports = productModel;
