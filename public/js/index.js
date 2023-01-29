const socket = io();

socket.emit("mensaje", "Mensaje enviado desde el cliente al servidor");
socket.on("mesagge", (data) => {
    console.log(data);
});

const form = document.getElementById("form")

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let product = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        code: document.getElementById("code").value,
        stock: document.getElementById("stock").value,
        category: document.getElementById("category").value,
        thumbnails: document.getElementById("thumbnails").value,
    };

    socket.emit("newProduct", product);
    form.reset()
});


socket.on("products", (data) => {
    const productsList = document.getElementById("products_list");
    let products = "";
    data.forEach((e) => {
        products += `
                    <ul>
                        <li>Title: ${e.title}</li>
                        <li>Id: ${e.id} </li>
                        <li>Price: ${e.price} </li>
                        <li>Description: ${e.description} </li>
                        <li>Code: ${e.code} </li>
                        <li>Thumbnail: ${e.thumbnails} </li>
                        <li>Stock: ${e.stock} </li>
                    </ul>
            `
    });
    productsList.innerHTML = products
});


// Product deleted form 

const formDelete = document.getElementById('form_delete')

formDelete.addEventListener('submit', (e) =>{
    e.preventDefault();

    let idToDelete = document.getElementById('id_to_deleted').value;
    socket.emit('deleted', idToDelete)
})