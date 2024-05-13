export default function esUnCuil(campo) {
    //Esto es un método de cadena en JavaScript que busca y reemplaza todas las ocurrencias de los caracteres "-" y "/" en la cadena con una cadena vacía, es decir, los elimina.
    const cuil = campo.value.replace(/[-\/]/g, "");
    
    if(tieneNumerosRepetidos(cuil)){
        console.log("valores repetidos");
        campo.setCustomValidity("Valores repetidos")
    }else{
        if(validarPrimerosDigitos(cuil) && validarDigitoVerificador(cuil)){
            console.log("cuil valido");
        }else{
            console.log("cuil no existe");
            campo.setCustomValidity("Cuil no existe")
        }
    }
}

// que el usuario no ingrese numero repetidos
function tieneNumerosRepetidos(cuil) {
    const numerosRepetidos = [
        "00000000000",
        "11111111111",
        "22222222222",
        "33333333333",
        "44444444444",
        "55555555555",
        "66666666666",
        "77777777777",
        "88888888888",
        "99999999999"
    ];

    for (let i = 0; i < numerosRepetidos.length; i++) {
        if (cuil.includes(numerosRepetidos[i])) {
            return true;
        }
    }

    return false;
}

// obtrniendo dos primeros digitos
function validarPrimerosDigitos(cuil) {
    let primerosDigitos = cuil.substr(0,2);
    let digitosValidos = ['20', '23', '24', '27', '30', 
    '33', '34'];
    // si tiene los valores , devuelve true o false
    return digitosValidos.includes(primerosDigitos);
}

function validarDigitoVerificador(cuil) {
    let acumulado = 0;
    const factores = [5,4,3,2,7,6,5,4,3,2]

    for (let i = 0; i < 10; i++) {
       acumulado += parseInt(cuil[i], 10) * factores[i];
        
    }
    let validadorTeorico = 11 - (acumulado % 11); //3

    if(validadorTeorico===11){
        validadorTeorico=0
    }else  if(validadorTeorico === 10){
        validadorTeorico=9
    }

    const digitoVerificador = parseInt(cuil[10], 10) //8
   
    return digitoVerificador === validadorTeorico
}