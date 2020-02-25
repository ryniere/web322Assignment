const products =
{
    fakeDB: [],

    init() {

        // Eletronics
        this.fakeDB.push({
            title: 'Macbook 13',
            price: `1349.99`,
            image: 'images/macbook.jpg',
            bestSeller: true,
            category: 'Eletronics'
        });

        this.fakeDB.push({
            title: 'Chromecast',
            price: `45.00`,
            image: 'images/chromecast.png',
            bestSeller: true,
            category: 'Eletronics'
        });

        this.fakeDB.push({
            title: 'Apple TV',
            price: `45.00`,
            image: 'images/appletv.jpeg',
            bestSeller: false,
            category: 'Eletronics'
        });
        this.fakeDB.push({
            title: `TV 65''`,
            price: `1445.00`,
            image: 'images/tv.jpg',
            bestSeller: false,
            category: 'Eletronics'
        });

        this.fakeDB.push({
            title: `TV 45''`,
            price: `345.00`,
            image: 'images/tv.jpg',
            bestSeller: false,
            category: 'Eletronics'
        });
        this.fakeDB.push({
            title: `TV 55''`,
            price: `1245.00`,
            image: 'images/tv.jpg',
            bestSeller: false,
            category: 'Eletronics'
        });

        // Groceries
        this.fakeDB.push({
            title: 'Frosted Flakes',
            price: `6.99`,
            image: 'images/frostedflakes.jpg',
            bestSeller: true,
            category: 'Groceries'
        });

        
        this.fakeDB.push({
            title: 'Betty Crocker Cake Mix',
            price: `2.49`,
            image: 'images/cakeMix.jpeg',
            bestSeller: true,
            category: 'Groceries'
        });

        this.fakeDB.push({
            title: 'Aunt Jemima Belgian Waffle Mix',
            price: `2.25`,
            image: 'images/waffleMix.jpg',
            bestSeller: false,
            category: 'Groceries'
        });

        // Valentines Day
        this.fakeDB.push({
            title: "Valentine's Day Gift Box",
            price: `26.99`,
            image: 'images/valentines.jpg',
            bestSeller: true,
            category: 'Valentines Day'
        });

        
        this.fakeDB.push({
            title: 'Betty Crocker Cake Mix',
            price: `2.49`,
            image: 'images/cakeMix.jpeg',
            bestSeller: true,
            category: 'Valentines Day'
        });

        this.fakeDB.push({
            title: 'Aunt Jemima Belgian Waffle Mix',
            price: `2.25`,
            image: 'images/waffleMix.jpg',
            bestSeller: false,
            category: 'Valentines Day'
        });

        // Furniture
        this.fakeDB.push({
            title: "Sofa",
            price: `126.99`,
            image: 'images/sofa.jpg',
            bestSeller: false,
            category: 'Furniture'
        });

        
        this.fakeDB.push({
            title: 'Chair',
            price: `45.00`,
            image: 'images/chair.jpg',
            bestSeller: true,
            category: 'Furniture'
        });

        this.fakeDB.push({
            title: 'Queen Bed',
            price: `422.25`,
            image: 'images/bed.jpg',
            bestSeller: false,
            category: 'Furniture'
        });

    },

    getAllProducts() {
        return this.fakeDB;
    },

    getBestSellerProducts() {
        return this.fakeDB.filter(product => product.bestSeller);
    },

    getProductsByCategory(category) {
        return this.fakeDB.filter(product => product.category === category);
    }

}

products.init();
module.exports = products;