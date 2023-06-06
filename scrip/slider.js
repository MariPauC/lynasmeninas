var imagenes= new Array("img/Foto.png","img/Brasiers.png","img/Modelo2.png");
var animacion= new Array("animaLateralDer","animaAbajo","animaLateralIzq");

var visor=document.getElementById("visor");
var visorani=document.getElementById("visor-animado");
var i=0;
var tiempoani="5s";

visor.src=imagenes[i]
visorani.src=imagenes[i+1]
visorani.style.animationName=animacion[i];
visorani.style.animationDuration=tiempoani;
window.setInterval(cambio,5000);

function cambio(){
    if(i>imagenes.length-2)
        i=0;
    else
        i++;

    visor.src=imagenes[i]

    if(i+1>imagenes.length-1)
        visorani.src=imagenes[0]
    else 
        visorani.src=imagenes[i+1]
    
    visorani.style.animationName=animacion[i];
}
