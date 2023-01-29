import persistance from '../persistances/product.js'

class Product {
    constructor(id, title, description, code, price, stock, category, thumbnails)
    {
        this.id = id
        this.title = title;
        this.description = description;
        this.code = code;
        this.price = price;
        this.stock = stock;
        this.category = category;
        this.thumbnails = thumbnails;
    }
}

export default {

    create: (data,req, res) => {
        // const data = req.body
        const newProduct = new Product(data.id, data.title, data.description, data.code, data.price, data.stock, data.category, data.thumbnails)
        
        persistance
            .save(newProduct)
            .then(newProduct => res.status(200).json({'Product created': newProduct}))
            .catch(err => res.status(500).json({error: err.message}))
    },

    getAllProducts: (req, res) =>{
        persistance
            .getAll()
            .then(data => res.status(200).render('products', { data }))
            .catch(err => res.status(500).json({error: err.message}))
    }
}