//Endpoint de integrantes - API
const API_URL = "https://retoolapi.dev/Us3sNv/integrantes";

//Funcion que manda a traer el JSON con el GET 
async function ObtenerIntegrantes() {
    //Paso 1 respuesta del servidor
    const respuesta = await fetch(API_URL)

    //paso 2 Pasamos a JSON la respuesta del servidor
    const data = await respuesta.json(); //Esto es un JSON 

    //Paso 3 Enviamos el JSON a la fucion que genera las filas en la tabla
    MostarDatos(data);


}



//Funcion para crear las filas de la tabla en base a un JSON 
//"datos" representar al JSON donde viene la informacion    
function MostarDatos(datos){


    //Se llama a la tabla con elemento "id" y luego al tbody
    const tabla = document.querySelector("#tabla tbody")

    //Para inyectar codigo HTML usamos "innerHTML"
    tabla.innerHTML = "" //Vaciamos el contenido de la tabla

    datos.forEach (integrante => {
        tabla.innerHTML +=`
            <tr>
                <td>${integrante.id}</td>
                <td>${integrante.nombre}</td>
                <td>${integrante.apellido}</td>
                <td>${integrante.correo}</td>
                <td>    
                    <button onclick="abrirModalEditar('${integrante.id}', '${integrante.nombre}','${integrante.apellido}','${integrante.correo}')">Editar</button>
                    <button onclick="EliminarPersona(${integrante.id})">Eliminar</button>
                    
                </td>
            <tr>
        `;
    });
}

ObtenerIntegrantes();





//Proceso para agregar unh nuevo integrante
const modal = document.getElementById("mdAgregar"); //cuadro de dialogo
const btnAgregar = document.getElementById("btnAgregar"); //Boton para agregar registro
const btnCerrra = document.getElementById("btnCerrar"); //Boton para cerrar registro


btnAgregar.addEventListener("click", ()=>{
    modal.showModal(); //abrir el modal al hacer clic en el boton
});


btnCerrar.addEventListener("click", ()=>{
    modal.close();
});

//Agregar nuevo integrante desde el formulario 
document.getElementById("frmAgregar").addEventListener("submit", async e => {
    e.preventDefault();//"e" representa a "submit". evita que el formulario se envie de un solo.


    //Capturara los valores del formulario
    const nombre = document.getElementById("txtNombre").value.trim();
    const apellido = document.getElementById("txtApellido").value.trim();
    const correo = document.getElementById("txtEmail").value.trim();


    //Validacion basica 
    if(!nombre || !apellido || !correo){
        alert("ingrese los valroes correctamente");
        return; //Para evitar que el codigo se siga ejecutando
    }

    //Llamar a la API para enviar el registro
    const respuesta = await fetch(API_URL, {
        method: "POST", //Tipo de solicitud
        headers:{'Content-Type' : 'application/json'}, //Tipo de datos Enviados
        body: JSON.stringify({nombre,apellido,correo})//Datos Enviados
    });

    //Verificar si la API Responde que los datos fueron enviados correctamente
    if(respuesta.ok){
        alert("El registro fue agregado correctamente");

        //Limpiar el formulario
        document.getElementById("frmAgregar").reset();

        //Cerrar el modal (dialog)
        modal.close();

        //Recargar la tabla 
        ObtenerIntegrantes();
    }
    else{ //En caso de que la API devuelva un codigo diferente a 200-299
        alert("El registro no pudo ser agregado");
    }
});


//Funcion para borrar Registros 
async  function EliminarPersona(id){
    const confirmacion = confirm("¿Realmente quieres Eliminar el registro?");

    //Validamos si el usuario si escogio borrar 
    if(confirmacion){
       await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
       });   

       //Recargar la tabla despues de liminar

       ObtenerIntegrantes();
    }
}


/*Proceso para porder editar un registro*/ 
const modalEditar = document.getElementById("mdEditar");
const btnCerrarEditar = document.getElementById("btnCerrarEditar");

btnCerrarEditar.addEventListener("click", ()=>{
 modalEditar.close(); //Cerramos el modal
});

function abrirModalEditar(id, nombre, apellido,correo){
    //Se agregar los valores del registro en los input 
    document.getElementById("txtIdEditar").value = id;
    document.getElementById("txtNombreEditar").value = nombre;
    document.getElementById("txtApellidoEditar").value = apellido;
    document.getElementById("txtEmailEditar").value = correo;
    

    //Abrimos el modal despues de pasar
    modalEditar.showModal();
}


































































