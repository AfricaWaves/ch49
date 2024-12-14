// Datos de productos
const productos = [
    {
        id: 1,
        nombre: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        precio: 109.95,
        imagen: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
    },
    {
        id: 2,
        nombre: "Mens Casual Premium Slim Fit T-Shirts",
        precio: 22.3,
        imagen: "https://images.pexels.com/photos/5451294/pexels-photo-5451294.jpeg"
    },
    {
        id: 3,
        nombre: "John Hardy Women's Legends Naga Gold & Silver Dragon Bracelet",
        precio: 695,
        imagen: "https://images.pexels.com/photos/2672021/pexels-photo-2672021.jpeg"
    }
];

// DOM
const divProductos = document.getElementById("divProductos");
const listaCarrito = document.getElementById("listaCarrito");
const totalCarrito = document.getElementById("totalCarrito");
const carrito = [];

function mostrarProductos() {
    divProductos.innerHTML = "";  // Limpiar los productos 
    productos.forEach(producto => {
        divProductos.insertAdjacentHTML("beforeend", `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">Precio: $${producto.precio}</p>
                        <button class="btn btn-primary btn-agregar" data-id="${producto.id}">
                            Agregar al Carrito
                        </button>
                    </div>
                </div>
            </div>
        `);
    });
    activarBotones();
}


function activarBotones() {
    document.querySelectorAll(".btn-agregar").forEach(boton => {
        boton.addEventListener("click", () => {
            const idProducto = parseInt(boton.getAttribute("data-id"));
            const producto = productos.find(prod => prod.id === idProducto);

            if (producto) {
                carrito.push(producto);
                actualizarCarrito();
            }
        });
    });
}

// Actualizar el carrito
function actualizarCarrito() {
    listaCarrito.innerHTML = ""; 
    let total = 0;

    carrito.forEach((producto, index) => {
        const item = document.createElement("li");
        item.className = "list-group-item d-flex justify-content-between align-items-center";
        item.textContent = `${producto.nombre} - $${producto.precio}`;
        
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.className = "btn btn-danger btn-sm";
        btnEliminar.addEventListener("click", () => {
            carrito.splice(index, 1);
            actualizarCarrito();
        });

        item.appendChild(btnEliminar);  // El ApendChild agrega el botón de eliminar
        listaCarrito.appendChild(item);
        total += producto.precio;
    });

    totalCarrito.textContent = total.toFixed(2);  // Actualizar el total
}


mostrarProductos();
