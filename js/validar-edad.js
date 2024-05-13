export default function esMayorDeEdad(campo) {
    const fechaNacimiento = new Date(campo.value)
    if(!validarEdad(fechaNacimiento)){
        campo.setCustomValidity("Necesitas ser mayor de edad")
    }
  
}

function validarEdad(fecha) {
    // esta instancia da la fecha actual
    const fechaActual = new Date();

    // Calcula la fecha en la que la persona cumpliría 18 años sumando 18 años a la fecha de nacimiento 
    const fechaMas18 = new Date(fecha.getUTCFullYear()+18, fecha.getUTCMonth(), 
    fecha.getUTCDate());

    return fechaActual >= fechaMas18;
}