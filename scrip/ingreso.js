const db = firebase.firestore();

//Realizar el ingreso
const signinForm = document.querySelector('#ingreso-form')

signinForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.querySelector('#mail_i').value
    const password = document.querySelector('#pass_i').value

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
            // Signed in
            console.log("Ingreso");

            var userinfo = firebase.auth().currentUser;
            validarAdmi(userinfo.uid);

            //limpiar formulario
            signinForm.reset();
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert("Error en el ingreso")
        });
})

//Identificar administrador
function validarAdmi(userID) {
    console.log(userID)
    db.collection('Usuarios').doc(userID).get().then((doc) => {
        console.log(doc.data().Administrador)
        if (doc.data().Administrador == true) {
            window.location.href = "indexa.html"
        } else {
            window.location.href = "perfil.html"
        }
    });
}

//Identificar si la sesión esta iniciada
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log('sesion iniciada')
    } else {
        console.log('sesion cerrada')
    }
})