const baseDeDatos = [];

class Producto{
    constructor(id,name,brand,image,category,quantity,price){
        this.id = id;
        this.name = name;
        this.brand = brand;
        this.image = image;
        this.category = category;
        this.quantity = quantity;
        this.price = price;
    }
  }
  
  const product1 = new Producto("1", "Redmi Note 7", "Xiaomi","images/redminote7.webp","celular", 1, 32499);
  baseDeDatos.push(product1);
  const product2 = new Producto("2", "Auricular Basic", "Samsung", "images/au-sam-bla.webp", "accesorio", 1, 1699);
  baseDeDatos.push(product2);
  const product3 = new Producto("3", "Auricular Basic", "Motorola", "images/au-moto-bla.webp", "accesorio", 1, 3999);
  baseDeDatos.push(product3);
  const product4 = new Producto("4", "Moto G7 Plus", "Motorola", "images/motog5.webp", "celular", 1,32999);
  baseDeDatos.push(product4);
  const product5 = new Producto("5", "Samsung S10", "Samsung", "images/s10.webp", "celular",1, 22499);
  baseDeDatos.push(product5);
  const product6 = new Producto("6", "Moto E7 Plus","Motorola", "images/motoe7plus.webp", "celular", 1, 18999);
  baseDeDatos.push(product6);
  const product7 = new Producto("7","Redmi Note 8", "Xiaomi" , "images/redminote8.webp","celular",1, 42699);
  baseDeDatos.push(product7);
  const product8 = new Producto("8","Redmi Note 9","Xiaomi", "images/redminote9.webp", "celular", 1, 46999);
  baseDeDatos.push(product8);
  const product9 = new Producto("9", "Moto Pulse Max", "Motorola", "images/au-pulse-max.webp", "accesorio", 1, 2499);
  baseDeDatos.push(product9);
  const product10 = new Producto("10", "Moto Ear Pace", "Motorola", "images/au-ear-pace.webp", "accesorio", 1, 1499);
  baseDeDatos.push(product10);

  const DOMCards = document.getElementById("container-js");
  const DOMcarrito = document.getElementById("listaCarrito")
  const DOMtotal = document.getElementById("total");
//   const eventComprar = $("#btn-comprar").on("click", btnComprar);
  const eventVaciar = $("#boton-vaciar").on("click", vaciarCarrito);
  const eventModal = $("#carritoModalBoton").on("click", modalCarrito);
  const eventForm = $("#boton-comprar").on("click", mostrarForm);


renderizarProductos();

let carritoDeCompras = [];
let total = 0; 
let subtotal = 0;

//VALIDACIÓN LOCALSTORAGE
if (localStorage.getItem("miCarrito") != null) {
    carritoDeCompras = JSON.parse(localStorage.getItem("miCarrito"));
    mostrarContenidoCarrito();
    document.getElementById("contador-carrito").innerHTML = carritoDeCompras.reduce((acc, el)=> acc + el.quantity,0);
  }

function agregarAlCarrito(id) {
    let productoRepetido = carritoDeCompras.find(produR => produR.id == id);
    if (productoRepetido) {
      productoRepetido.quantity = productoRepetido.quantity + 1;
      localStorage.setItem("miCarrito", JSON.stringify(carritoDeCompras));
      mostrarContenidoCarrito();
    } else {
      let productoAgregado = baseDeDatos.find(produA => produA.id == id);
      carritoDeCompras.push(productoAgregado);
      productoAgregado.quantity = 1;
      localStorage.setItem("miCarrito", JSON.stringify(carritoDeCompras));
      mostrarContenidoCarrito();
    }
    document.getElementById("contador-carrito").innerHTML = carritoDeCompras.reduce((acc, el)=> acc + el.quantity,0);
  }

  function mostrarContenidoCarrito() {
    DOMcarrito.textContent = "";
    carritoDeCompras.forEach(product => {
      const nuevoItem = document.createElement("li");
      const botonEliminar = document.createElement("button");
      nuevoItem.classList.add("itemCarrito", "list-group-item");
      nuevoItem.textContent = `${product.name} ${product.brand} [Precio(u)= $${product.price}] [${product.quantity} Unidades] Subtotal = $${product.price*product.quantity}`;
      botonEliminar.classList.add("btn", "btn-secundary", "boton-eliminar", "btn-outline-dark");
      botonEliminar.setAttribute("type", "button");
      botonEliminar.textContent = ("x");
      botonEliminar.setAttribute("productoId", product.id);
      nuevoItem.appendChild(botonEliminar);
      DOMcarrito.appendChild(nuevoItem);
      botonEliminar.addEventListener("click", eliminarDelCarrito);
      animacionItem(); 
      calcularTotal();
    });
    }

    
function eliminarDelCarrito() {
    let productoQueElimino = this.getAttribute('productoId')
    carritoDeCompras = carritoDeCompras.filter(e => e.id != productoQueElimino)
    localStorage.setItem("miCarrito", JSON.stringify(carritoDeCompras));
    mostrarContenidoCarrito();
    reiniciarForm();
    $(".divForm").fadeOut(1000);
    $(".datosCorrectos").fadeOut(1000);
    calcularTotal();
    document.getElementById("contador-carrito").innerHTML = carritoDeCompras.reduce((acc, el)=> acc + el.quantity,0);
};

//GENERA EL LINK DE MP
// function btnComprar() {
//   if (carritoDeCompras.length === 0) {
//     $("#modalCarritoVacio").modal("show");
//   } else {
//     linkDePago();
//   }
// }

function modalCarrito(e) {
  e.preventDefault();
if (carritoDeCompras.length == 0) {
  $("#modalCarritoVacio").modal("show");
} else if (carritoDeCompras.length > 0) {
  $("#idModalCarrito").modal("show");
}
}

function mostrarForm() {
  if (carritoDeCompras.length != 0){
    $(".divForm").fadeIn(1000);
  } else {
    $("#modalCarritoVacio").modal("show");
  }
} 

function reiniciarForm(){
  document.getElementById("formulario").reset();
  }

function vaciarCarrito() {
  if (carritoDeCompras.length > 0) {
    carritoDeCompras.splice(0, carritoDeCompras.length);
    $("#listaCarrito");
    $("#listaCarrito").html("");
    $("#total").html("");
    $(".datosCorrectos").fadeOut(1000);
    $(".divForm").fadeOut(1000);
    total = 0;
    vaciarLocalStorage();
    reiniciarForm();
    calcularTotal();
    } 
    document.getElementById("contador-carrito").innerHTML = carritoDeCompras.reduce((acc, el)=> acc + el.quantity,0);

}

function vaciarLocalStorage(){
  localStorage.clear();
}

function calcularTotal() {
  JSON.parse(localStorage.getItem("miCarrito"));
  if (carritoDeCompras.length == 0) {
    DOMtotal.textContent = "0";
  } else  {
    total = 0;
    carritoDeCompras.forEach( (productItem) => {
    let subtotal = Number(productItem.price * productItem.quantity);
    total = total + subtotal;
    DOMtotal.textContent = total.toFixed(2);
  });
  }
}

//Animación items//
function  animacionItem() {
    $(".itemCarrito").fadeIn(300)
                  .css("color", "white")
                  .css("border", "solid black 2px")
                  .css("margin", "0.2rem")
                  ;}

//filtramos los productos por categoría
function renderizarProductos(filtro = 'default') {
    let nuevosProductos = (filtro !== "default") ? 
    baseDeDatos.filter(product => product.category == filtro) :
    baseDeDatos;
    // CREO MIS CARDS CON JS //
    let mostrar=``;
    nuevosProductos.forEach((product) => {
    mostrar+=
    `<div class="col">
<div class="divProductos card">
  <img src="${product.image}" class="divProductos__imgCelus" alt="${product.name}">
  <div class="card-body">
    <h5 class="card-title divProductos__celuTitle">${product.name}</h5>
    <h5 class="card-text divProductos__celuTitle">${product.brand}</h5>
    <p class="card-text divProductos__preciosCelus">$${product.price}</p>
    <button id="btn-add" onclick="agregarAlCarrito('${product.id}')" class="btn btn-outline-dark mt-auto">Agregar al Carrito</button>
  </div>
</div>
</div>`  
});
DOMCards.innerHTML = (mostrar);
}