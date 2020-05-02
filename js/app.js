import { API } from './api.js';
import * as UI from './interfaz.js';


UI.formularioBuscar.addEventListener("submit",(e)=>{
    e.preventDefault();

    // obtener datos del formulario
    const artista = document.getElementById('artista').value;
    const cancion = document.getElementById('cancion').value;

    if(artista == '' || cancion ==''){
        // si el ususario deja los campos vacios mostar error
        UI.divmensajes.innerHTML = 'Error....Todos los campos son obligatorios';
        UI.divmensajes.classList.add("error");

        setTimeout(()=>{
            UI.divmensajes.innerHTML = '';
            UI.divmensajes.classList.remove("error");
        },3000)
        
    }else{
        // el formulario esta completo realizar consulta a la API
        const api = new API(artista,cancion);
        api.consultarAPI()
        .then((data)=>{
         if(data.respuesta.lyrics){
        //   la cancion si existe
        const letra = data.respuesta.lyrics;
        UI.divResultado.innerHTML = letra;

         }else{
            //  La cancion no existe
            UI.divmensajes.innerHTML = 'La cancion No existe Prueba con otra Búsqueda';
            UI.divmensajes.classList.add("error");
    
            setTimeout(()=>{
                UI.divmensajes.innerHTML = '';
                UI.divmensajes.classList.remove("error");
                UI.formularioBuscar.reset();
            },3000)
         }
        })
    }
 
})