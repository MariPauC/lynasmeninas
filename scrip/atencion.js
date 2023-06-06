const AtentionForm = document.querySelector('#atencion-form')
const db = firebase.firestore();
const fecha = new Date();

//Guarda los datos almacenados - Registro
AtentionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Obtenemos la referencia a cada uno de nuestros elementos del formulario
    const name = document.querySelector('#name_at').value;
    const mail = document.querySelector('#mail_at').value;
    const type = document.querySelector('#select_at').value;
    const description = document.querySelector('#description_at').value;
    const actualDate = fecha.toLocaleDateString();


    //Guardar la información registrada en una constante 
    const data = {
        'Nombre': name,
        'Correo': mail,
        'PQR': type,
        'Descripcion': description,
        'Fecha': actualDate,
    };

    collecionAtencion(data);
    //limpiar formulario
    AtentionForm.reset();
})

function collecionAtencion(data) {
    var AtenRef = db.collection("Atencion"); //Nombre de la coleccion
    Atenid = AtenRef.doc();
    Atenid.set(data); //Identificador 
}