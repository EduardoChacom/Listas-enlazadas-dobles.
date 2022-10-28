class Producto {
  constructor(codigo, nombre, cantidad, costo) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.cantidad = cantidad;
    this.costo = costo;
    this.next = null;
    this.prev = null;
  }
}

class Inventario {
  constructor() {
    this.primero = null;
    this.ultimo = null;
  }

  agregarProducto(nuevo){
    if (!this.primero) {
        this.primero = nuevo;
        this.ultimo = nuevo;
    } else if (this.primero.codigo > nuevo.codigo) {
        let aux = this.primero
        nuevo.next = this.primero;
        this.primero.prev = nuevo;
        this.primero = nuevo;
        this.ultimo = aux;
    }   else if (this.ultimo.codigo < nuevo.codigo) {
        this.ultimo.next = nuevo;
        nuevo.prev = this.ultimo;
        this.ultimo = nuevo;
    } else {
        let aux = this.primero;
        while (aux.next != null) {
            if (aux.next.codigo > nuevo.codigo) {
                nuevo.next = aux.next;
                nuevo.prev = aux;
                aux.next.prev = nuevo;
                aux.next = nuevo;
                break;
            } else {
                aux = aux.next;
            }
        }
    }
}

  buscarProducto(codigoProducto) {
    let aux = this.primero;

    while (aux != null) {
        if (aux.codigo == codigoProducto) {
            return aux;
        } else {
            aux = aux.next;
        }
    }
    return false;
}

  eliminarProducto(codigoProducto) {
   if(this.primero == null){
    return false;
   } else if (this.primero.codigoProducto == codigoProducto){
    this.primero = this.primero.next;
    return true;
   }

   let aux = this.primero;
   while(aux != null){
    if(aux.next.codigoProducto == codigoProducto){
      aux.next = aux.next.next;
      return true;
    } else{
      aux = aux.next;
    }
   }
   return false;
  }

  listado() {
    if (this._productos.length == 0) return 'vacio';
    let string = '';
    for (let i = 0; i < this._productos.length; i++) {
      const element = this._productos[i];
      string += `\ncodigo: ${element.codigo}\nnombre: ${element.nombre}\ncantidad: ${element.cantidad}\ncosto: ${element.costo}\n`;
    }
    return string;
  }

  listadoInverso() {
    let aux = this._productos;
    let productosInverso = [];
    for (let i = this._productos.length - 1; i >= 0; i--) {
      productosInverso.push(this._productos[i]);
    }
    this._productos = productosInverso;
    let resultado = this.listado();
    this._productos = aux;
    return resultado;
  }
}


const inventario = new Inventario();
const btnAgregar = document.getElementById("btnAgregar");
const btnBuscar = document.getElementById("btnBuscar");

const tabla = document.getElementById("tabla");

const btnModoAgregar = document.getElementById("modoAgregar");
const btnModoBuscar = document.getElementById("modoBuscar");

const formAgregar = document.getElementById("formAgregar");
const formBuscar = document.getElementById("formBuscar");
const formContenedor = document.getElementById("formContenedor");


const inpBuscar = document.getElementById("buscar");
const busquedaContenedor = document.getElementById("busqueda");
const targetaBusqueda = document.getElementById("targetaBusqueda");
const busquedaLbCodigo = document.getElementById('busquedaCodigo');
const busquedaLbNombre = document.getElementById('busquedaNombre');
const busquedaLbCantidad = document.getElementById('busquedaCantidad');
const busquedaLbCosto = document.getElementById('busquedaCosto');

const btnEliminar = document.getElementById("eliminar");

const agregarInpCodigo = document.querySelector('#codigo');
const agregarInpNombre = document.querySelector('#nombre');
const agregarInpCantidad = document.querySelector('#cantidad');
const agregarInpCosto = document.querySelector('#costo');



formBuscar.remove();
targetaBusqueda.remove();


btnAgregar.addEventListener('click', function (e) {
  e.preventDefault();
  const existente = inventario.buscarProducto(parseInt(agregarInpCodigo.value));

  if (!existente) {
    const productoNuevo = new Producto(agregarInpCodigo.value, agregarInpNombre.value, agregarInpCantidad.value, agregarInpCosto.value);

    inventario.agregarProducto(productoNuevo);
    crearFilaDeTabla('Agregado', productoNuevo.codigo, productoNuevo.nombre);
  }
});

let codigo = 0;

btnBuscar.addEventListener('click', function (e) {
  e.preventDefault();
  codigo = inpBuscar.value;
  console.log(inventario.listado());
  console.log(inventario.listadoInverso());
  const producto = inventario.buscarProducto(codigo);

  if (producto) {
    busquedaLbCodigo.innerHTML = producto.codigo;
    busquedaLbNombre.innerHTML = producto.nombre;
    busquedaLbCantidad.innerHTML = producto.cantidad;
    busquedaLbCosto.innerHTML = producto.costo
    busquedaContenedor.append(targetaBusqueda);
  } else {
    targetaBusqueda.remove();
  }
});

btnEliminar.addEventListener('click', function (e) {
  e.preventDefault();
  const productoAEliminar = inventario.buscarProducto(codigo);
  crearFilaDeTabla('Eliminado', productoAEliminar.codigo, productoAEliminar.nombre);
  inventario.eliminarProducto(codigo);
  targetaBusqueda.remove();
});

btnModoBuscar.addEventListener("click", function (e) {
  e.preventDefault();

  formAgregar.remove();
  formContenedor.append(formBuscar);
});

btnModoAgregar.addEventListener("click", function (e) {
  e.preventDefault();

  formBuscar.remove();
  formContenedor.append(formAgregar);
});

function crearFilaDeTabla(accion, codigo, nombre) {
  const tRow = document.createElement('tr');
  const accionTDate = document.createElement('td');
  const codigoTDate = document.createElement('td');
  const nombreTDate = document.createElement('td');

  accionTDate.innerHTML = accion;
  codigoTDate.innerHTML = codigo;
  nombreTDate.innerHTML = nombre;

  tRow.append(accionTDate);
  tRow.append(codigoTDate);
  tRow.append(nombreTDate);

  tabla.prepend(tRow);
}

