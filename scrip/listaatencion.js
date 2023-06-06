const db = firebase.firestore();
const tabla = document.getElementById('datosTabla');
var numTabla = 1;

window.addEventListener('DOMContentLoaded', async(e) => {
    db.collection('Atencion').onSnapshot((snapshot) => {
        tabla.innerHTML = '';
        snapshot.forEach((doc) => {
            tabla.innerHTML += `
            <tr>
                <th>${numTabla}</th>
                <td>${ doc.data().PQR }</td>
                <td id="nombre">${ doc.data().Nombre }</td>
                <td> ${ doc.data().Fecha }</td>
                <td>
                    <a class="detalle" >
                        <span class="material-icons-outlined" data-id="${ doc.id }">notes</span>
                    </a>
                </td>
                <td>
                    <a class="borrar" >
                        <span class="material-icons-outlined" data-id="${ doc.id }">backspace</span>
                    </a>
                </td>
            
            </tr>

            `;
            numTabla = numTabla + 1;
            const btn_detall = document.querySelectorAll('.detalle')
            btn_detall.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    console.log("Npro", e.target.dataset.id)
                    let idDetalle = e.target.dataset.id;
                    localStorage.setItem("IdAten", idDetalle)
                    window.location.href = "atenciona.html"
                })
            })

            const btn_borrar = document.querySelectorAll('.borrar')
            btn_borrar.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    borrarDato(e.target.dataset.id)
                })
            })


        })
    });
});

$(document).ready(function() {
    $("#filtroA").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#datosTabla tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});


function borrarDato(idAtencion) {
    db.collection("Atencion").doc(idAtencion).delete().then(() => {
        console.log("Document successfully deleted!");

    }).catch((error) => {
        console.log("Error removing document: ", error);
    });
}