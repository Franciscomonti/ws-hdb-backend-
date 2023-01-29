import  fs from 'fs'
import {uuid} from 'uuidv4';

export default {

    save: (product) => {
        return new Promise((resolve, reject) => {
            try {
                let productsList = JSON.parse(fs.readFileSync(`./data/product.json`));

                if (productsList.find((item) => item.code === product.code)) {
                    resolve('Product code already exists')
                } else if (
                    !!!product.title ||
                    !!!product.price ||
                    !!!product.code ||
                    !!!product.description ||
                    !!!product.stock
                ) {
                    resolve('some data is required') 
                } else {
                    product.id = uuid()
                    fs.writeFileSync(`./data/product.json`, JSON.stringify([...productsList, product], null, 2))
                    resolve(product)
                }
            } catch (error) {
                reject(error);
            }
        })
    },

    getAll: () => {
        return new Promise((resolve, reject) => {
            try {
                const data = JSON.parse(fs.readFileSync(`./data/product.json`));
                resolve(data)
            } catch (error) {
                reject(error);
            }
        })
    }
}