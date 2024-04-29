//Tienda de articulos de mascotas online

let nombre;
let nombremascota;

while(true){

    nombre = prompt ("Ingrese su nombre").toLowerCase();
    nombremascota = prompt ("Ingrese el nombre de su mascota").toLowerCase();

    if(nombre !=="" && nombremascota !==""){
        alert("Bienvenido/a " + nombre + " y " + nombremascota + " a Lara Pet Market");
        break;
    }else{
        alert("Error. Complete todo los campos solicitados");
        continue;
    }
}

function resultadoProducto(precioProducto, cantidad) {
    return precioProducto * cantidad;
}

let ventaproductos = true;
while (ventaproductos) {
    let producto = prompt("Ingrese el nombre del articulo que desea comprar");

    let precioProducto = parseFloat(prompt("Ingrese el precio del artículo:"));

    let cantidad = parseInt(prompt("Ingrese la cantidad que desea comprar:"));

    let totalProducto = resultadoProducto(precioProducto, cantidad);

    console.log(`El total a pagar por ${cantidad} ${producto}(/s) es de $: ${totalProducto}`);

    let continuar = confirm("¿Desea agregar otro articulo?");
    if (!continuar) {
        ventaproductos = false;
    }
}