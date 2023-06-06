const db = firebase.firestore();

const RegisterForm = document.querySelector('#actualizar-form')
const formulario = document.getElementById('actualizar-form');
const usuariosRef = db.collection('Usuarios')

window.addEventListener('DOMContentLoaded', async(e) => {

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log('sesion iniciada')
            var user = firebase.auth().currentUser;

            //Pasar la info de la base de datos
            usuariosRef.doc(user.uid).get().then((doc) => {
                formulario.innerHTML = `
                    <label for="fname">Nombre:</label>
                    <input type="text" id="name_a" name="fname" value="${ doc.data().Nombre}" ><br><br>
                    <label for="flastname">Apellido:</label>
                    <input type="text" id="lastname_a" name="flastname" value="${ doc.data().Apellido}"><br><br>
                    <label for="fphone">Teléfono:</label>
                    <input type="tel" id="phone_a" name="fphone" value="${ doc.data().Celular}"><br><br>
                    <label for="fmail">Correo:</label>
                    <input type="email" id="mail_a" name="fmail" value="${ doc.data().Correo}"><br><br>
                    <button type="submit" id="boton"> Actualizar</button>
                `
            });

        } else {
            console.log('sesion cerrada')
            cuentaActiva = false
        }
    })
});



//Actualizar los datos de los usuarios
RegisterForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //Identificar si la sesión esta iniciada

    //Guardar en variables los datos registrados
    const name = document.querySelector('#name_a').value;
    const lastname = document.querySelector('#lastname_a').value;
    const phone = document.querySelector('#phone_a').value;

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var user = firebase.auth().currentUser;
            usuariosRef.doc(user.uid).update({
                Apellido: lastname,
                Celular: phone,
                Nombre: name
            });
        }
    })

})

//----------------------------------------------------------Eliminar usuario-----------------------------------------------------------------------
const deleteUser = document.querySelector('#delete')

deleteUser.addEventListener('click', (e) => {
    e.preventDefault();
    //Identificar si la sesión esta iniciada
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var user = firebase.auth().currentUser;
            var uid = user.uid;
            db.collection("Usuarios").doc(uid).delete().then(() => {
                console.log("Document successfully deleted!");
                user.delete();
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });

        }
    })
})