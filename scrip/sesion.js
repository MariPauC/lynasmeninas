//Realizar el ingreso
const signinForm = document.querySelector('#ingreso-form')

signinForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.querySelector('#mail_i').value
    const password = document.querySelector('#pass_i').value

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            console.log('logeado')
            var user = userCredential.user;
            //limpiar formulario

            signinForm.reset();
            alert("Ha ingresado")
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert("Error en el ingreso")
        });
})


//Permite pasar la informacion guardada a la base de datosen firebase
function GuardarFormulario(data, ID) {
    var UserRef = db.collection("Usuarios"); //Nombre de la coleccion
    Userid = UserRef.doc(ID) //Identificador 
    Userid.set(data); //Guardar datos
}