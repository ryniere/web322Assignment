
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// //This indicates the shape of the documents that will be entering the database
//   const categorySchema = new Schema({
   
//     title:
//     {
//       type:String,
//       required:true
//     },
//     picture :
//     {
//         type:String,
//         required:true
//     }
//   });

//   /*
//     For every Schema you create(Create a schema per collection), you must also create a model object. 
//     The model will allow you to perform CRUD operations on a given collection!!! 
//   */

//  const categoryModel = mongoose.model('Category', categorySchema);

//  module.exports = categoryModel;

const categories=
{
    fakeDB:[],

    init()
    {

        this.fakeDB.push({title:'Eletronics', image:'images/eletronics.jpg', });
        this.fakeDB.push({title:'Groceries', image:'images/groceries.jpg'});
        this.fakeDB.push({title:'Furniture', image:'images/furniture.jpg'});
        this.fakeDB.push({title:'Valentines Day', image:'images/valentines.jpg'});

    },

    getAllCategories()
    {

        return this.fakeDB;
    }

}

categories.init();
module.exports=categories;