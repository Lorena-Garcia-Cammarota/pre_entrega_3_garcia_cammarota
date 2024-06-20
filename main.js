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
function saludar(event) {
    event.preventDefault();
    const nombreInput = document.getElementById('nombre');
    const nombremascotaInput = document.getElementById('nombremascota');
    const nombreError = document.getElementById('nombre-error');
    const nombremascotaError = document.getElementById('nombremascota-error');
    const mensajeSaludar = document.getElementById('mensajeSaludar');

    let nombre = nombreInput.value.trim();
    let nombremascota = nombremascotaInput.value.trim();

    nombreError.innerText = '';
    nombreError.style.display = 'none';
    nombremascotaError.innerText = '';
    nombremascotaError.style.display = 'none';
    mensajeSaludar.innerText = '';
    mensajeSaludar.style.display = 'none';

    if (nombre === "" || !isNaN(nombre)) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, ingrese un nombre válido.',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK'
        });
        return;
    }

    if (nombremascota === "" || !isNaN(nombremascota)) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, ingrese un nombre válido para su mascota.',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK'
        });
        return;
    }

    nombre = nombre.toUpperCase();
    nombremascota = nombremascota.toUpperCase();

    Swal.fire({
        icon: 'success',
        title: 'Bienvenido/a',
        text: `Bienvenido/a ${nombre} y ${nombremascota} a Lara Pet Market`,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
    });
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
let producto1 = new Producto(1, "Cama", 1200, 25, 'assets/images/cama.png');
let producto2 = new Producto(2, "Platos", 250, 100, 'assets/images/platos.png');
let producto3 = new Producto(3, "Bolsas", 100, 50, 'assets/images/bolsas.png');
let producto4 = new Producto(4, "Collar Perro", 300, 50, 'assets/images/collarperro.png');
let producto5 = new Producto(5, "Collar Gato", 280, 50, 'assets/images/collargato.png');
let producto6 = new Producto(6, "Correas", 300, 50, 'assets/images/correas.png');
let producto7 = new Producto(7, "Juguete Perro", 250, 10, 'assets/images/jugueteperro.png');
let producto8 = new Producto(8, "Juguete Gato", 320, 10, 'assets/images/juguetegato.png');

let lista = [producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8];

localStorage.setItem('productos', JSON.stringify(lista));

const productosGuardados = JSON.parse(localStorage.getItem('productos'));

function renderizarProducto(producto, contenedor) {
    const html = `
        <div class="producto">
            <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen" data-precio="${producto.precio}" data-stock="${producto.stock}">
            <div>
                <p class="producto-nombre">Nombre: ${producto.nombre}</p>
                <p class="producto-precio">Precio: $${producto.precio}</p>
                <p class="producto-stock">Stock: ${producto.stock}</p>
                <input type="number" value="0" min="0" max="${producto.stock}">
                <button class="agregar-al-carrito btn-agregar">Agregar</button>
            </div>
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
async function obtenerProductosDesdeJSON() {
    try {
        const response = await fetch('productos.json');
        if (!response.ok) {
            throw new Error('No se pudo obtener el archivo JSON');
        }
        const productos = await response.json();
        return productos;
    } catch (error) {
        console.error('Error al obtener los productos desde JSON:', error);
        return null;
    }
}

async function main() {
    try {
        const productos = await obtenerProductosDesdeJSON();
        if (productos) {
            console.log('Productos cargados desde JSON:', productos);
            mostrarProductosEnInterfaz(productos);
        } else {
            console.log('No se pudieron cargar los productos desde JSON');
        }
    } catch (error) {
        console.error('Error en la función main:', error);
    }
}

function mostrarProductosEnInterfaz(productos) {
    productos.forEach(producto => {
        console.log(producto.nombre, producto.precio);
        const productoElement = document.createElement('div');
        productoElement.textContent = `${producto.nombre}: $${producto.precio}`;
        document.getElementById('contenedor-productos').appendChild(productoElement);
    });
}

let carrito = [];

// Función para agregar un producto al carrito
function agregarAlCarrito(nombre, precio, cantidad, imagen, stock) {
    const productoEnCarrito = carrito.find(producto => producto.nombre === nombre);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad += cantidad;
        productoEnCarrito.precioTotal += precio * cantidad;
    } else {
        carrito.push({ nombre, precio, cantidad, precioTotal: precio * cantidad, imagen, stock });
    }
    renderizarCarrito();
    actualizarPrecioTotal();
    Toastify({
        text: `Se agregó ${cantidad} ${nombre}${cantidad > 1 ? 's' : ''} al carrito`,
        duration: 3000,
        gravity: 'top',
        position: 'right',
        backgroundColor: '#3b3f5c',
        stopOnFocus: true,
    }).showToast();
    mostrarCarrito();
}

function renderizarCarrito() {
    const contenedorCarrito = document.getElementById('contenedor-carrito');
    contenedorCarrito.innerHTML = '';
    carrito.forEach(producto => {
        const html = `
            <div class="producto-carrito">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
                <div>
                    <p>Nombre: ${producto.nombre}</p>
                    <p>Precio: $${producto.precio}</p>
                    <p>Cantidad: ${producto.cantidad}</p>
                    <button class="agregar-unidad btn-agregar" data-nombre="${producto.nombre}">+</button>
                    <button class="quitar-unidad btn-quitar" data-nombre="${producto.nombre}">-</button>
                    <button class="quitar-del-carrito btn-quitar" data-nombre="${producto.nombre}">Quitar</button>
                    <p>Total: $${producto.precioTotal}</p>
                </div>
            </div>
        `;
        contenedorCarrito.insertAdjacentHTML('beforeend', html);
    });
}

// Función para actualizar el precio total en la interfaz
function actualizarPrecioTotal() {
    const precioTotal = carrito.reduce((total, producto) => total + producto.precioTotal, 0);
    const precioTotalElemento = document.getElementById('precio-total');
    precioTotalElemento.textContent = `Total de la compra: $${precioTotal}`;
}

// Función para mostrar el modal del carrito
function mostrarCarrito() {
    const modal = document.getElementById('modal-carrito');
    modal.style.display = "block";
}

const closeButton = document.querySelector('.close-button');
closeButton.addEventListener('click', () => {
    const modal = document.getElementById('modal-carrito');
    modal.style.display = "none";
});

document.addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('agregar-al-carrito')) {
        const productoElemento = event.target.closest('.producto');
        const nombre = productoElemento.querySelector('.producto-nombre').textContent.split(': ')[1];
        const precio = parseFloat(productoElemento.querySelector('.producto-precio').textContent.split(': $')[1]);
        const cantidad = parseInt(productoElemento.querySelector('input').value);
        const imagen = productoElemento.querySelector('.producto-imagen').src;
        const stock = parseInt(productoElemento.querySelector('.producto-stock').textContent.split(': ')[1]);
        agregarAlCarrito(nombre, precio, cantidad, imagen, stock);
    }
});

document.addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('quitar-del-carrito')) {
        const nombre = event.target.getAttribute('data-nombre');
        carrito = carrito.filter(producto => producto.nombre !== nombre);
        renderizarCarrito();
        actualizarPrecioTotal();
    }
});

document.addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('agregar-unidad')) {
        const nombre = event.target.getAttribute('data-nombre');
        const producto = carrito.find(producto => producto.nombre === nombre);
        if (producto) {
            producto.cantidad += 1;
            producto.precioTotal += producto.precio;
        }
        renderizarCarrito();
        actualizarPrecioTotal();
    }
});

document.addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('quitar-unidad')) {
        const nombre = event.target.getAttribute('data-nombre');
        const producto = carrito.find(producto => producto.nombre === nombre);
        if (producto && producto.cantidad > 1) {
            producto.cantidad -= 1;
            producto.precioTotal -= producto.precio;
        } else if (producto && producto.cantidad === 1) {
            carrito = carrito.filter(producto => producto.nombre !== nombre);
        }
        renderizarCarrito();
        actualizarPrecioTotal();
    }
});

// Función para vaciar el carrito
function vaciarCarrito() {
    Swal.fire({
        icon: 'warning',
        title: '¿Estás seguro?',
        text: '¿Deseas vaciar el carrito?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, vaciar carrito',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            carrito = [];
            renderizarCarrito();
            actualizarPrecioTotal();
            Swal.fire({
                icon: 'success',
                title: 'Carrito vaciado',
                text: '¡El carrito se ha vaciado correctamente!',
                confirmButtonText: 'Aceptar'
            });
        }
    });
}

const botonVaciarCarrito = document.getElementById('vaciar-carrito');
botonVaciarCarrito.addEventListener('click', vaciarCarrito);

// Función para disminuir el stock de los productos comprados
function disminuirStock() {
    carrito.forEach(item => {
        const producto = productosGuardados.find(p => p.nombre === item.nombre);
        if (producto) {
            producto.stock -= item.cantidad;
        }
    });

    // Actualizar el localStorage con el nuevo stock
    localStorage.setItem('productos', JSON.stringify(productosGuardados));
    const contenedorProductos = document.getElementById('contenedor-productos');
    contenedorProductos.innerHTML = '';
    productosGuardados.forEach(producto => {
        renderizarProducto(producto, contenedorProductos);
    });
}

// Función para finalizar la compra
function finalizarCompra() {
    disminuirStock();
    vaciarCarrito();
    const modal = document.getElementById('modal-carrito');
    modal.style.display = "none";

    Swal.fire({
        icon: 'success',
        title: 'Compra realizada',
        text: '¡Gracias por tu compra!',
        confirmButtonText: 'Aceptar'
    })
}

const botonFinalizarCompra = document.getElementById('finalizar-compra');
botonFinalizarCompra.addEventListener('click', finalizarCompra);

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
        Toastify({
            text: 'No se encontró nada',
            duration: 1500,
            newWindow: true,
            close: false,
            gravity: 'top',
            position: 'center',
            backgroundColor: '#3b3f5c', 
            stopOnFocus: true,
        }).showToast();
    }
}

let botonBuscar = document.getElementById("buscarP");
botonBuscar.addEventListener("click", filtrarProductos);

// Función para cambiar entre modo claro y oscuro
function toggleMode() {
    const body = document.body;
    const modeIcon = document.getElementById('mode-icon');

    const isDarkMode = body.classList.contains('dark-mode');
    body.classList.replace(isDarkMode ? 'dark-mode' : 'light-mode', isDarkMode ? 'light-mode' : 'dark-mode');
    modeIcon.textContent = isDarkMode ? '🌞' : '🌙';
}

const toggleModeButton = document.getElementById('toggle-mode');
toggleModeButton.addEventListener('click', toggleMode);
