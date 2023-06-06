const RegisterForm = document.querySelector('#actualizar-form')
const db = firebase.firestore();
const usuariosRef = db.collection('Usuarios')

//Poner la información del usuario en los recuadros
function datosUsuario() {
    var user = firebase.auth().currentUser;
    var uid = user.uid;

    //Crear pasos para mostar la info en los recuadros (Ver como se hace :v)
}


//Actualizar los datos de los usuarios
RegisterForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //Identificar si la sesión esta iniciada
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            //Guardar en variables los datos registrados
            const name = document.querySelector('#name_a').value;
            const lastname = document.querySelector('#lastname_a').value;
            const phone = document.querySelector('#phone_a').value;

            var user = firebase.auth().currentUser;
            var uid = user.uid;

            console.log(uid);

            usuariosRef.doc(uid).update({
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