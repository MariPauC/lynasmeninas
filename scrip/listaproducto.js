const db = firebase.firestore();
const tabla = document.getElementById('datosTabla');
var numTabla = 1;

window.addEventListener('DOMContentLoaded', async(e) => {
    db.collection('Productos').onSnapshot((snapshot) => {
        tabla.innerHTML = '';
        snapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
            tabla.innerHTML += `
            <tr>
            <th>${numTabla}</th>
            <td id="titulos">${ doc.data().Nombre }</td>
            <td id="titulos">${ doc.data().Categoria }</td>
            <td class="descripcion"> ${ doc.data().Descripcion } </td>
                    <td id="icono">
                        <a href="#" class="editar">
                            <span class="material-icons-outlined" data-id="${ doc.id }">mode_edit</span>
                        </a>
                    </td>
                    <td id="icono">
                        <a href="#">
                            <span class="material-icons-outlined" data-id="${ doc.id }">content_copy</span>
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

            const btn_editar = document.querySelectorAll('.editar')
            btn_editar.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    console.log(e.target.dataset.id);
                    let idProducto = e.target.dataset.id;
                    localStorage.setItem("IdProduc", idProducto)
                    window.location.href = "productAdmin.html"
                })
            })

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



$(document).ready(function() {
    $("#filtroP").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#datosTabla tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});


function borrarDato(idProducto) {
    db.collection("Productos").doc(idProducto).delete().then(() => {
        console.log("Document successfully deleted!");

    }).catch((error) => {
        console.log("Error removing document: ", error);
    });
}