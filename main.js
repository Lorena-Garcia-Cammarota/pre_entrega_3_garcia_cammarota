//Tienda de venta de articulos de mascotas online

function saludar() {

    while (true) {

        let nombre = prompt("Ingrese su nombre");
        if (nombre === null) {
            alert("No se ingreso el nombre. Complete el campo.");
            continue;
        }

        let nombremascota = prompt("Ingrese el nombre de su mascota");
        if (nombremascota === null) {
            alert("No se ingreso el nombre de la mascota. Por favor, complete nuevamente todos los campos solicitados.");
            continue;
        }
        nombre = nombre.trim().toLowerCase();
        nombremascota = nombremascota.trim().toLowerCase();

        if (nombre !== "" && nombremascota !== "") {
            alert("Bienvenido/a " + nombre + " y " + nombremascota + " a Lara Pet Market");
            break;
        }
    }
}

saludar();


const Producto = function (codigo, nombre, precio, stock) {
    this.codigo = codigo
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
}

let producto1 = new Producto(1, "collar", 120, 100);
let producto2 = new Producto(2, "plato", 150, 100);
let producto3 = new Producto(3, "correa", 200, 35);
let producto4 = new Producto(4, "bolsas", 75, 50);

let lista = [producto1, producto2, producto3, producto4]

console.table(lista);

function filtrarProductos() {
    let palabraClave = prompt("Ingrese el nombre del articulo que desea buscar").toLowerCase().trim();
    let resultado = lista.filter((buscarProducto) => buscarProducto.nombre.toLowerCase().includes(palabraClave));

    if (resultado.length > 0) {
        console.table(resultado);
    } else {
        alert("No existe el articulo que buscas " + palabraClave);
    }
}

function agregarProductos() {

    let codigo = parseInt(prompt("Ingrese un codigo del articulo"));

    let nombre = prompt("Ingrese el nombre del articulo");

    let precio = parseFloat(prompt("Ingrese el precio del articulo:"));

    let stock = parseInt(prompt("Ingrese el stock del articulo:"));

    if (isNaN(codigo) || nombre == "" || isNaN(precio) || isNaN(stock)) {
        alert("Error. Por favor, ingrese datos validos");
        return;
    }

    let producto = new Producto(codigo, nombre, precio, stock);

    if (lista.some((coincide) => coincide.nombre === producto.nombre)) {
        alert("Ya existe un articulo con ese nombre.");
        return;
    }

    if (lista.some((x) => x.codigo === producto.codigo)) {
        alert("Ya existe un articulo con ese codigo");
        return;
    }

    lista.push(producto);
    alert("El articulo ha sido agregado.");

    console.log(lista);
}

function resultadoProducto(precio, stock) {
    return precio * stock;
}

function ventaProductos(lista) {

    let ventaproductos = true;
    let totalVentas = 0;

    while (ventaproductos) {

        let nombre = prompt("Ingrese el nombre del articulo:");
        let stock = parseInt(prompt("Ingrese el stock del articulo:"));

        let productoEncontrado = lista.find((item) => item.nombre.toLowerCase() === nombre.toLowerCase());

        if (productoEncontrado) {
            if (productoEncontrado.stock >= stock) {
                let totalProducto = resultadoProducto(productoEncontrado.precio, stock);
                console.log(`El total a pagar por ${stock} ${nombre}(s) es de $${totalProducto}`);

                totalVentas = totalVentas + totalProducto;
                productoEncontrado.stock = productoEncontrado.stock - stock;
            } else {
                console.log(`No hay suficiente stock de ${nombre}. Stock disponible: ${productoEncontrado.stock}`);
            }
        } else {
            console.log(`No se encontro el articulo ${nombre}.`);
        }

        let continuar = confirm("¿Desea agregar otro articulo?");
        if (!continuar) {
            ventaproductos = false;
        }
    }
    return totalVentas;
}

function sumarTotalesVenta(totalVentas) {
    console.log(`El total de las ventas es de $${totalVentas}`);
}

function mostrarStockFinal(lista) {
    console.log("Stock final de los articulos:");
    console.table(lista.map(producto => ({Codigo:producto.codigo, Nombre:producto.nombre.toLowerCase(), Precio:producto.precio, 'Stock final':producto.stock })));
}

let totalVentas = ventaProductos(lista);
sumarTotalesVenta(totalVentas);
mostrarStockFinal(lista);
