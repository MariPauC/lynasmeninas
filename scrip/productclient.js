const db = firebase.firestore();
const ProductoForm = document.querySelector('#centro');
let idProduc = localStorage.getItem("IdProduc");

window.addEventListener('DOMContentLoaded', async(e) => {



    db.collection("Productos").doc(idProduc).get().then((doc) => {
        console.log(doc.data().Nombre);
        ProductoForm.innerHTML =
            `

         <section id="images">
         <article class="producimage">
            <img src=${ doc.data().Foto}>
         </article>
         
        <article class="imagenes2">
        <img src="img/Bralete 1.png">
        <img src="img/bralete 4.png">
        </article>
 
     </section>

        <section>
        <h1>${ doc.data().Nombre}</h1>
        <h2>${doc.data().Precio}</h2>
        <p> ${doc.data().Descripcion}</p>
        <h3>${doc.data().Color} </h3>

        <div id="med">


                <div id="med">
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

                <button id="Amed">
                <a href="/" class="button">A medida</a>
            </button>
                <button id="Añadir">
                <a href="favoritos.html" class="button">Añadir a Favoritos</a>
            </button>
            </section>

               

            
        `


    });
});