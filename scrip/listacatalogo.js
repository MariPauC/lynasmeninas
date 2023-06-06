const db = firebase.firestore();
const tabla = document.querySelector('#datosTabla');
var numTabla = 1;

window.addEventListener('DOMContentLoaded', async(e) => {
    db.collection('Categorias').onSnapshot((snapshot) => {
        tabla.innerHTML = '';
        snapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
            tabla.innerHTML += `
            <tr>
            <th>${numTabla}</th>
            <td id="titulos">${ doc.data().Nombre }</td>
            <td id="titulos">${ doc.data().Cantidad }</td>
            <td id="icono">
                <a href="#" class="editar">
                    <span class="material-icons-outlined" data-id="${ doc.id }">mode_edit</span>
                </a>
            </td>
            <td id="icono">
                <a href="#" class="borrar">
                    <span class="material-icons-outlined" data-id="${ doc.id }">backspace</span>
                </a>
            </td>
            </tr>

            `;
            numTabla = numTabla + 1;

            /* const btn_editar = document.querySelectorAll('.editar')
             btn_editar.forEach(btn => {
                 btn.addEventListener('click', (e) => {
                     console.log(e.target.dataset.id);
                     let idProducto = e.target.dataset.id;
                     localStorage.setItem("IdCatalogo", idProducto)
                     window.location.href = "productAdmin.html"
                 })
             })*/

            const btn_borrar = document.querySelectorAll('.borrar')
            btn_borrar.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    console.log(e.target.dataset.id);
                    borrarDato(e.target.dataset.id)
                })
            })

        })
    });
});

function borrarDato(idCatalogo) {
    db.collection("Catalogo").doc(idCatalogo).delete().then(() => {
        console.log("Document successfully deleted!");

    }).catch((error) => {
        console.log("Error removing document: ", error);
    });
}