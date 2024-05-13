import esUnCuil from "./validar-cuil.js";
import esMayorDeEdad from "./validar-edad.js";
import {tiposError, mensajes} from "./customError.js"

// seleccionando campos del formulario
const camposDeFormulario = document.querySelectorAll("[required]");

// seleccionando formulario completo
const formulario = document.querySelector('[data-formulario]')
formulario.addEventListener("submit", (e)=>{
    e.preventDefault(); 
    const listaRespuestas= {
        // obtenemos los elementos de evento que desencadeno el evento(formulario) que devuelve un listHTML tipo objeto
        nombre: e.target.elements["nombre"].value,
        email : e.target.elements["email"].value,
        identificacion: e.target.elements["identificacion"].value,
        cuil: e.target.elements["cuil"].value,
        fecha_nacimiento: e.target.elements["fecha_nacimiento"].value
    }
    // guardar informacion en el navegador
localStorage.setItem("registro", JSON.stringify(listaRespuestas))

window.location.href="./abrir-cuenta-form-2.html"
})


camposDeFormulario.forEach((campo) => {
  campo.addEventListener("blur", () => verificarCampo(campo));
  campo.addEventListener("invalid", (evento) => evento.preventDefault());
});

function verificarCampo(campo) {
    let mensaje = "";
    // limpiar error, cuando se escribe bien el dato en el form
    campo.setCustomValidity("");
    campo.style.border = "none"
  if (campo.name == "cuil" && campo.value.length >= 11) {
    esUnCuil(campo);
  }

  if (campo.name == "fecha_nacimiento" && campo.value != "") {
    esMayorDeEdad(campo);
  }

// manejando errores del formulario
   tiposError.forEach(error =>{

    if(campo.validity[error]){
        mensaje = mensajes[campo.name][error]
        campo.style.border = "2px solid red"
        console.log(mensaje);
    }
   })

//Esta línea de código busca dentro del elemento padre del campo (campo.parentNode) un elemento que tenga la clase CSS "mensaje-error" usando querySelector(). 
   const mensajeError = campo.parentNode.querySelector(".mensaje-error")

   const validarInputCheck = campo.checkValidity();
//  Esta es una estructura de control condicional que verifica si validarInputCheck es falso (es decir, si el campo no es válido)
   if(!validarInputCheck){
    mensajeError.textContent = mensaje
   }else{
    mensajeError.textContent= ""
   }
}
