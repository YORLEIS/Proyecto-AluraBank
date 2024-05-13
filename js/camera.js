// camara

// imagen
const botonAbrirCamera = document.querySelector('[data-video-boton]')
// video
const video = document.querySelector("[data-video]")
const campoCamara = document.querySelector("[data-camera]")

// tomar fotos
const botonTomarFoto = document.querySelector("[data-tomar-foto]")
const mensaje= document.querySelector("[data-mensaje]")
const canvas = document.querySelector("[data-video-canvas]")
let imgUrl= ""

// abrir cuenta o enviar
const btnEnviar = document.querySelector("[data-enviar]")


// iniciar camara
botonAbrirCamera.addEventListener("click", async()=>{
    const iniciarVideo = await navigator.mediaDevices.getUserMedia({video:true, 
        audio:false})

        // ocultamos el botonAbrirCamera(que es la img)
        botonAbrirCamera.style.display="none";
        // mostramos la camara
        campoCamara.style.display = 'block',
        // y pasamor a data-video ese valor
        video.srcObject= iniciarVideo
})

// foto tomada y mostrada en el navegador
botonTomarFoto.addEventListener('click', () => {
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    // convierte el contenido del canvas a una URL de datos en formato JPEG
    imgUrl = canvas.toDataURL("image/jpeg");
    // ocultamos el boton y el video
    campoCamara.style.display = "none";
    mensaje.style.display = 'block';
});

btnEnviar.addEventListener('click', ()=>{
// obteniendo datos guardados en el formulario
    const recibirDatos = localStorage.getItem("registro")
    const convertirDatos= JSON.parse(recibirDatos)

    // añadiendo imagen con la propiedad img_url
    convertirDatos.img_url = imgUrl;
    localStorage.setItem("registro", JSON.stringify(convertirDatos))
    
    window.location.href = "./abrir-cuenta-form-3.html"

})