const db = firebase.firestore();
const getFavoritos = () => db.collection('Favoritos').get(); //Obtener todo de la coleccion
var tabla = document.getElementById('tablaFavoritos')
var userinfo, tamLista, favId, listaProductos, cuentaActiva = false

window.addEventListener('DOMContentLoaded', async(e) => {
    const qSFavoritos = await getFavoritos();
    listaProductosFav(qSFavoritos);

    db.collection('Productos').onSnapshot((snapshot) => {
        tabla.innerHTML = '';
        snapshot.forEach((doc) => {
            for (var i = 0; i < tamLista; i++) {
                if (doc.id == listaProductos[i]) {
                    console.log(doc.id, '=>', doc.data());
                    tabla.innerHTML += `
                     <tr class="contProducto">
                     <td><img src =${ doc.data().Foto} ></td>
                        <td id="centro"> 
                            <ul>
                                <li class="nombre">${ doc.data().Nombre }</li>
                                <li>${ doc.data().Precio }</li><br>
                                <li><p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. </p></li>
                            </ul>   
                        </td>
                        <td class ="botones">
                            <select name="tallas"> 
                                <option value="s">S</option>
                                <option value="m">M</option>
                                <option value="l">L</option>
                                <option value="xl">XL</option>
                            </select>
                            <a href="amedida.html"> A medida </a> 
                            <button class= "eliminarFav" data-id="${ doc.id }"> Eliminar    
                        </button></td>
                     </tr>
                    `
                }
            }

            const btn_borrar = document.querySelectorAll('.eliminarFav')
            btn_borrar.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    borrarDato(e.target.dataset.id)
                })
            })

        })
    });

});

function listaProductosFav(qSFavoritos) {
    identificarFavorito(qSFavoritos);
    db.collection('Favoritos').doc(favId).get().then((snapshot) => {
        listaProductos = snapshot.data().productos;
        tamLista = listaProductos.length;
    });
}

//Identificar el ID correspondiente a los favoritos del usuario
function identificarFavorito(qSFavoritos) {
    qSFavoritos.forEach(doc => {
        if (doc.data().UsuarioId == userinfo.uid) {
            favId = doc.id;
        }
    })
}

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

//Eliminar favorito
function borrarDato(idFavorito) {
    db.collection('Favoritos').doc(favId).update({
        productos: firebase.firestore.FieldValue.arrayRemove(idFavorito)
    });
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

//Identificar si la sesión esta iniciada
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log('sesion iniciada')
    } else {
        console.log('sesion cerrada')
    }
})