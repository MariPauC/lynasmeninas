const RegisterForm = document.querySelector('#registro-form')
const db = firebase.firestore();

//Guarda los datos almacenados - Registro
RegisterForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Obtenemos la referencia a cada uno de nuestros elementos del formulario
    const name = document.querySelector('#name_r').value;
    const lastname = document.querySelector('#lastname_r').value;
    const phone = document.querySelector('#phone_r').value;
    const mail = document.querySelector('#mail_r').value;
    const password = document.querySelector('#pass_r').value;

    firebase.auth().createUserWithEmailAndPassword(mail, password)
        .then((userCredential) => {
            var user = userCredential.user;

            //Información del usuario
            var userinfo = firebase.auth().currentUser;
            var emailVerified = userinfo.emailVerified;
            var userid = userinfo.uid;

            alert("Mensaje de confirmación enviado al correo registrado")
            correoVerificacion();

            //Guardar la información registrada en una constante 
            const data = {
                'Nombre': name,
                'Apellido': lastname,
                'Celular': phone,
                'Correo': mail,
                'Administrador': false,
            };

            //Guardar la información de la persona en la base de datos
            GuardarFormulario(data, userid);

            const dataFav = {
                'UsuarioId': userid,
            };

            //Crear el espacio para los datos de favoritos
            crearFavoritos(dataFav)

            //limpiar formulario
            RegisterForm.reset();


        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            //alert("Error al registrar");
        });
})


function crearFavoritos(dataFav) {
    var FavRef = db.collection("Favoritos"); //Nombre de la coleccion
    Favid = FavRef.doc();
    Favid.set(dataFav); //Identificador 
}

function correoVerificacion() {
    firebase.auth().currentUser.sendEmailVerification()
        .then(() => {

        })
        .catch((error) => {
            alert("Error al enviar el correo");
        });
}

//Permite pasar la informacion guardada a la base de datosen firebase
function GuardarFormulario(data, ID) {
    var UserRef = db.collection("Usuarios"); //Nombre de la coleccion
    Userid = UserRef.doc(ID) //Identificador 
    Userid.set(data); //Guardar datos
}

//Cerrar sesion
const logout = document.querySelector('#logout')

logout.addEventListener('click', (e) => {
    e.preventDefault();
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        alert("Hasta luego")
    }).catch((error) => {
        // An error happened.
    });
})

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log('sesion iniciada')
        var emailVerified = user.emailVerified;
        if (emailVerified) {
            console.log('Verificado')
        } else {
            console.log('No verificado')
        }
    } else {
        console.log('sesion cerrada')
    }
})