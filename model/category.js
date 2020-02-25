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