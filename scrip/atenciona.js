const db = firebase.firestore();
const titulo = document.querySelector('.principal');
const formulario = document.getElementById('atencion-form');
let idAten = localStorage.getItem("IdAten");

window.addEventListener('DOMContentLoaded', async(e) => {

    var id = idAten
    console.log(id);
    db.collection("Atencion").doc(id).get().then((doc) => {
        titulo.innerHTML = `
            <h1>Atención - ${ doc.data().PQR}</h1>
        `

        formulario.innerHTML = `
            <label for="fname">Nombre:</label>
            <input type="text" id="name_r" name="fname" value="${ doc.data().Nombre}"><br><br>
            <label for="fmail">Correo:</label>
            <input type="email" id="mail_r" name="fmail" value="${ doc.data().Correo}"><br><br>
            <label for="fdescription">Descripción:</label>
            <input type="description" id="description_r" name="fdescription" value="${ doc.data().Descripcion}"><br><br>
        `
    });

});