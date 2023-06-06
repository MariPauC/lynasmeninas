const db = firebase.firestore();
const ProductoForm = document.querySelector('#producto-form');
let idProduc = localStorage.getItem("IdProduc");

window.addEventListener('DOMContentLoaded', async(e) => {

    db.collection("Productos").doc(idProduc).get().then((doc) => {
        ProductoForm.innerHTML = `
        <section>
                <label for="fname">Nombre:</label>
                <input type="text" id="name_p" name="fname" value="${ doc.data().Nombre}"><br><br>
                <label for="fprecio">Precio:</label>
                <input type="text" id="precio_p" name="fprecio" value="${doc.data().Precio}"><br><br>
                <label for="fcategoria">Categoria:</label>
                <input type="text" id="catalogo_p" name="fcategoria" value="${doc.data().Categoria}"><br><br>
                <label for="fdescription">Descripción:</label>
                <input type="description" id="description_r" name="fdescription" value="${doc.data().Descripcion}"><br><br>


                <div id="med">
                    <label for="fcolor">Color:</label><br>
                    <div class="contenedor" id="uno"> </div>
                    <div class="contenedor" id="dos"> </div>
                    <div class="contenedor" id="tres"> </div>
                    <div class="contenedor" id="cuatro"> </div>
                </div>

                <div id="medida">
                    <label for="ftalla">Talla:</label><br>
                    <button class="btn">S</button>
                    <button class="btn">M</button>
                    <button class="btn">L</button>
                    <button class="btn">XL</button>
                </div>

                <a href="listaProductos.html" target="_self" id="boton">Atras</a>

            </section>
            <section>
                <label for="fname">Imagenes: </label>
                <div id="parent">
                    <div id= "child">
                        <img src="https://via.placeholder.com/250" class="img-thumbnail" id='img1' width="250" height="250">
                        <input type="file" class="form-control-file" id="fotoProducto1" accept="image/*" style="content:Pepe">
                    </div>
                </div>
                <button type="submit" id="boton">Guardar</button>
            </section>
        `
        const btn_foto1 = document.querySelector('#fotoProducto1');


        btn_foto1.addEventListener('change', (e) => {
            e.preventDefault();
            const archivo = btn_foto1.files[0];

            const imagen1 = document.querySelector('#img1');
            imagen1.src = URL.createObjectURL(archivo);

        })

    });
});

//--------------------------------------- Guardar fotos--------------------
const imgTP = document.querySelector('#imgTP');
var storage = firebase.storage();
var reader;
var metadata = {
    contentType: 'image/jpeg'
};

function SavephotoTP() {
    var file = ($('#Foto-Tpropiedad'))[0].files[0];
    console.log(file)
    var storageRef = storage.ref(ciclaid.id + '/FotoTarjetaPropiedad');
    var uploadTask = storageRef.put(file, metadata);
    uploadTask.on('state_changer', function(snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
        }
    }, function(error) {
        alert(error);
    }, function() {
        console.log('Imagen subida a firebase')
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL);
            db.collection("Bicicletas").doc(ciclaid.id).update({ FotoTarjetaPropiedad: downloadURL })
            alert("Registro exitoso")
        });
    });
}