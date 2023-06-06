const btnCuenta = document.querySelector('#cuenta');

window.addEventListener('DOMContentLoaded', async(e) => {
    var Activo = localStorage.getItem("UserIn")
    console.log(Activo);
    if (Activo) {
        btnCuenta.addEventListener('click', (e) => {
            window.location.href = "perfil.html"
        })
    }
});