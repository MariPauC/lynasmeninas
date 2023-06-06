const db = firebase.firestore();
var contenedor = document.getElementById('ContenedorProductos'); //Leer el espacio donde se van a mostar los datos
var userinfo, cuentaActiva = false;
const getProductos = () => db.collection('Productos').get(); //Obtener todo de la coleccion
const getFavoritos = () => db.collection('Favoritos').get(); //Obtener todo de la coleccion


//Cuando la ventana se abra que se cargen todo de la base de datos
window.addEventListener('DOMContentLoaded', async(e) => {
    const qSFavoritos = await getFavoritos();
    //Recorrer cada documento dentro de la coleccion
    db.collection('Productos').get().then((snapshot) => {
        snapshot.forEach((doc) => {
            contenedor.innerHTML += `
            <div class = "boxProducts">
            <img src =${ doc.data().Foto} width ="auto" height= "318px"> 
            <div> <button class= "favorito" data-id="${ doc.id }" > Favorito </button> </div>
            <div>
            <ul>
                <li>${ doc.data().Nombre }</li>
                <li>${ doc.data().Precio }</li>
            </ul> 
            </div>  
            </div>`

            const btnfavorito = document.querySelectorAll('.favorito')

            btnfavorito.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    var productoId = e.target.dataset.id;
                    añadirFavorito(qSFavoritos, productoId);
                })
            })
        })
    });
});


var favId

function añadirFavorito(qSFavoritos, productoId) {
    if (cuentaActiva) {
        identificarFavorito(qSFavoritos);
        db.collection('Favoritos').doc(favId).update({
            productos: firebase.firestore.FieldValue.arrayUnion(productoId)
        });
    } else {
        //mostar un mensaje de que active la cuenta 
        alert("Inicie sesión o crea una cuenta")
    }
}

//Identificar el ID correspondiente a los favoritos del usuario
function identificarFavorito(qSFavoritos) {
    qSFavoritos.forEach(doc => {
        if (doc.data().UsuarioId == userinfo.uid) {
            favId = doc.id;
        }
    })
}

//----------------------------------------------------Verificar ingreso a la cuenta------------------------------------------------

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log('sesion iniciada')
        var emailVerified = user.emailVerified;
        if (emailVerified) {
            console.log('Verificado')
            cuentaActiva = true;
            userinfo = user;
        } else {
            console.log('No verificado')
            cuentaActiva = false
        }
    } else {
        console.log('sesion cerrada')
        cuentaActiva = false
    }
})