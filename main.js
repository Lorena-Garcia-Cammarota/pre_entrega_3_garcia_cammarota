// Titulo de la venta de tiendas de mascotas
const title = document.getElementById("title");
title.innerHTML = `<h1>Lara Pet Market</h1>`;

// Formulario de Saludo
const formContainer = document.getElementById("formContainer");
formContainer.innerHTML = `
    <form id="welcome-form">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" placeholder="Escriba su nombre">
        <span id="nombre-error" class="error"></span>

        <label for="nombremascota">Nombre de su mascota:</label>
        <input type="text" id="nombremascota" name="nombremascota" placeholder="Nombre de su mascota">
        <span id="nombremascota-error" class="error"></span>

        <button type="button" id="submitbutton">Enviar</button>
    </form>`;

// Función de saludar
function saludar() {
    const nombreInput = document.getElementById('nombre');
    const nombremascotaInput = document.getElementById('nombremascota');
    const nombreError = document.getElementById('nombre-error');
    const nombremascotaError = document.getElementById('nombremascota-error');
    const mensajeSaludar = document.getElementById('mensajeSaludar');
    const datosUsuario = document.getElementById('datosUsuario');

    let nombre = nombreInput.value.trim();
    let nombremascota = nombremascotaInput.value.trim();

    nombreError.innerText = '';
    nombreError.style.display = 'none';
    nombremascotaError.innerText = '';
    nombremascotaError.style.display = 'none';
    mensajeSaludar.innerText = '';
    mensajeSaludar.style.display = 'none';

    if (nombre === "" || !isNaN(nombre)) {
        nombreError.innerText = "Por favor, ingrese un nombre válido.";
        nombreError.style.display = 'block';
        return;
    }

    if (nombremascota === "" || !isNaN(nombremascota)) {
        nombremascotaError.innerText = "Por favor, ingrese un nombre válido para su mascota.";
        nombremascotaError.style.display = 'block';
        return;
    }

    nombre = nombre.toUpperCase();
    nombremascota = nombremascota.toUpperCase();

    mensajeSaludar.textContent = `Bienvenido/a ${nombre} y ${nombremascota} a Lara Pet Market`;
    mensajeSaludar.style.display = 'block';
}

const submitButton = document.getElementById('submitbutton');
submitButton.addEventListener('click', saludar);

const subtitulo = document.getElementById("subtitulo");
subtitulo.innerHTML = `<h2>Venta de árticulos para tu mascota</h2>`;

// Creación de productos
const Producto = function(codigo, nombre, precio, stock, imagen) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
    this.imagen = imagen;
};

// Instanciación de los productos
let producto1 = new Producto(1, "cama", 1200, 25, 'assets/images/cama.png');
let producto2 = new Producto(2, "platos", 250, 100, 'assets/images/platos.png');
let producto3 = new Producto(3, "bolsas", 100, 50, 'assets/images/bolsas.png');
let producto4 = new Producto(4, "collarperro", 300, 50, 'assets/images/collarperro.png');
let producto5 = new Producto(5, "collargato", 280, 50, 'assets/images/collargato.png');
let producto6 = new Producto(6, "correas", 300, 50, 'assets/images/correas.png');
let producto7 = new Producto(7, "jugueteperro", 250, 10, 'assets/images/jugueteperro.png');
let producto8 = new Producto(8, "juguetegato", 320, 10, 'assets/images/juguetegato.png');

let lista = [producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8];

localStorage.setItem('productos', JSON.stringify(lista));

const productosGuardados = JSON.parse(localStorage.getItem('productos'));

// Función para renderizar un producto en el contenedor especificado
function renderizarProducto(producto, contenedor) {
    const html = `
        <div class="producto">
            <img src="${producto.imagen}" alt="${producto.nombre}" data-precio="${producto.precio}" data-stock="${producto.stock}">
            <p>Nombre: ${producto.nombre}</p>
            <p>Precio: $${producto.precio}</p>
            <p>Stock: ${producto.stock}</p>
            <input type="number" value="1" min="1" max="${producto.stock}">
            <button class="agregar-al-carrito">Agregar</button>
        </div>
    `;
    contenedor.insertAdjacentHTML('beforeend', html);
}

if (productosGuardados) {
    const contenedorProductos = document.getElementById('contenedor-productos');
    productosGuardados.forEach(producto => {
        renderizarProducto(producto, contenedorProductos);
    });
} else {
    console.log("No hay productos guardados en el localStorage");
}

let carrito = [];

// Función para agregar un producto al carrito
function agregarAlCarrito(nombre, precio, cantidad) {
    const productoEnCarrito = carrito.find(producto => producto.nombre === nombre);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad += cantidad;
        productoEnCarrito.precioTotal += precio * cantidad;
    } else {
        carrito.push({ nombre, precioTotal: precio * cantidad, cantidad });
    }
    actualizarPrecioTotal();
}

// Función para actualizar el precio total en la interfaz
function actualizarPrecioTotal() {
    const precioTotal = carrito.reduce((total, producto) => total + producto.precioTotal, 0);
    const precioTotalElemento = document.getElementById('precio-total');
    precioTotalElemento.textContent = `Total: $${precioTotal}`;
}

// Función para finalizar la compra
function finalizarCompra() {
    const modal = document.getElementById('modal-finalizar-compra');
    modal.style.display = "block";
    vaciarCarrito();
}

const botonFinalizarCompra = document.getElementById('boton-finalizar-compra');
botonFinalizarCompra.addEventListener('click', finalizarCompra);

const cerrarModal = document.getElementById('cerrar-modal');
cerrarModal.addEventListener('click', () => {
    const modal = document.getElementById('modal-finalizar-compra');
    modal.style.display = "none";
});

const closeButton = document.querySelector('.close-button');
closeButton.addEventListener('click', () => {
    const modal = document.getElementById('modal-finalizar-compra');
    modal.style.display = "none";
});

// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    actualizarPrecioTotal();
}

const botonVaciarCarrito = document.getElementById('boton-vaciar-carrito');
botonVaciarCarrito.addEventListener('click', vaciarCarrito);

const botonAgregarAlCarrito = document.getElementById('boton-agregar-al-carrito');

botonAgregarAlCarrito.addEventListener('click', () => {
    const cantidad = parseInt(inputCantidad.value);
    const precioTotal = precio * stock;
    agregarAlCarrito(nombre, precioTotal);
});

document.addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('agregar-al-carrito')) {
        const productoElemento = event.target.closest('.producto');
        const nombre = productoElemento.querySelector('p:nth-child(2)').textContent.split(': ')[1];
        const precio = parseFloat(productoElemento.querySelector('p:nth-child(3)').textContent.split(': $')[1]);
        const cantidad = parseInt(productoElemento.querySelector('input').value);
        agregarAlCarrito(nombre, precio, cantidad);
    }
});

//Buscar productos
function filtrarProductos() {
    const body = document.querySelector("body");
    const input = document.getElementById("buscar").value;
    const buscarProducto = input.trim().toUpperCase();
    const resultado = lista.filter((producto) => producto.nombre.toUpperCase().includes(buscarProducto));

    const existingContainer = document.querySelector(".result-container");
    if (existingContainer) {
        existingContainer.remove();
    }

    if (resultado.length > 0) {
        const container = document.createElement("div");
        container.classList.add("result-container");

        resultado.forEach((producto) => {
            const card = document.createElement("div");
            card.classList.add("product-card");

            const nombre = document.createElement("h2");
            nombre.textContent = producto.nombre;
            card.appendChild(nombre);

            const imagen = document.createElement("img");
            imagen.src = producto.imagen;
            imagen.alt = producto.nombre;
            card.appendChild(imagen);

            const precio = document.createElement("p");
            precio.innerHTML = `Precio: ${producto.precio}`;
            card.appendChild(precio);

            const stock = document.createElement("p");
            stock.innerHTML = `Stock: ${producto.stock}`;
            card.appendChild(stock);

            container.appendChild(card);
        });

        body.appendChild(container);
    } else {
        alert("No se encontró nada");
    }
}

let botonBuscar = document.getElementById("buscarP");
botonBuscar.addEventListener("click", filtrarProductos);
