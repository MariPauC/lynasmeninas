//Cerrar sesion
const logout = document.querySelector('#logout')

logout.addEventListener('click', (e) => {
    e.preventDefault();
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        alert("Hasta luego")
        window.location.href = "index.html"
    }).catch((error) => {
        // An error happened.
    });
})