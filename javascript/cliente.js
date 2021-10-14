//DECLARACIÓN DEL ARRAY//
const clientes = [];

// OBJETO CONSTRUCTOR PARA CLIENTES//
class Cliente{
    constructor(nombreCompleto, edad, dni, direccion, email, telefono){
        this.nombreCompleto = nombreCompleto;
        this.edad = edad;
        this.dni = dni;
        this.direccion = direccion;
        this.email = email;
        this.telefono = telefono;
    }
  }
  
  //FUNCIÓN PARA RECOLECTAR LOS DATOS DEL CLIENTE//
  const validarCliente = () => {
    let nombreCompleto = document.getElementById("nombre").value;
    let edad = document.getElementById("edad").value;
    let dni = document.getElementById("dni").value;
    let direccion = document.getElementById("direccion").value;
    let email = document.getElementById("email").value;
    let telefono = document.getElementById("telefono").value;
    
    if ((edad >= 18) && (telefono.length == 8) && (dni.length == 7 || dni.length == 8)) {
      let datosCliente =     
                 { nombreCompleto: nombreCompleto,
                   edad: edad,
                   dni: dni,
                   direccion: direccion,
                   email: email,
                   telefono: telefono}
      $(".datosCorrectos").show();
      clientes.push(new Cliente(datosCliente));
      localStorage.setItem("clientes", JSON.stringify(clientes));
      $("#capturaDatosCliente").modal("show");
      $(".divForm").fadeOut(1000)
    } else {
        $(".datosIncorrectos").fadeIn(1000);
        $(".datosIncorrectos").fadeOut(1000);
    }
  }
  
