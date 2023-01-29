import express from 'express';
import {engine} from 'express-handlebars'
import { __dirname } from "./utils.js";
import routerProduct from './routes/products.js';
import { Server } from "socket.io";
import fs from "fs";

import controller from './controller/productsController.js';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', engine());
app.set('views', __dirname + '/public/views'); 
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + "/public"));

app.use('/api/products', routerProduct);

const serverHttp =app.listen(PORT, () => {
    console.log(`corriendo en el servidor http://localhost:${PORT}`)
});

serverHttp.on('error', ()=> { console.log('error: ' + error)});



const io = new Server(serverHttp);



io.on('connect', socket=> {
    console.log('connect new client')

    socket.emit("mesagge", "Este mensaje es enviado desde el servidor a todos")

    socket.on("newProduct", (data)=>{
        controller.create(data)
    })

    let products = JSON.parse(fs.readFileSync(`./data/product.json`));

    socket.emit("products", products)
})


