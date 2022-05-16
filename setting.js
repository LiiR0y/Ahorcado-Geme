/*===VARIABLES===*/
let pincel;
let canvas;
let palabra;
let letras = "QWERTYUIOPASDFGHJKLÑZXCVBNM";
let colorTecla = "#212529";
let colorMargen = "rgb(253, 103, 3)";
let inicioX = 200;
let inicioY = 300;
let lon = 35;
let margen = 20;
let pistaText = "";

let listaTeclas = [];
let listaLetras = [];
let listaPalabras = [];

let aciertos = 0;
let errores = 0;


/*===SELECTORES===*/
const iniciarJuego = document.querySelector("#start");
const nuevaPalabra = document.querySelector("#nuevaPalabra");
const agregarPalabra = document.querySelector("#agregarPalabra");

/*===PALABRAS OCULTAS*/
listaPalabras.push("WOLVERINE");
listaPalabras.push("MAGNETO");
listaPalabras.push("SPIDERMAN");
listaPalabras.push("MOONKNIGHT");
listaPalabras.push("HULK");
listaPalabras.push("THOR");
listaPalabras.push("IRONMAN");
listaPalabras.push("HAWKEYE");
listaPalabras.push("VISION");
listaPalabras.push("DEADPOOL");
listaPalabras.push("DAREDEVIL");


/*===COMENZAR JUEGO===*/
function juego(){
    canvas = document.getElementById("pantalla");
        if (canvas && canvas.getContext){
            pincel = canvas.getContext("2d");
            if(pincel){
                teclado();
                pintaPalabra();
                horca(errores);
                canvas.addEventListener("click", selecciona, false);
                } else {
                    alert ("Error al cargar el contexto!");
            }
        }
}
/*===AGREGAR NUEVA PALABRA===*/
function agregaPalabra(){
    listaPalabras = [];
    listaPalabras.push(nuevaPalabra.value)
    console.log(nuevaPalabra.value);
    console.log(listaPalabras);
    nuevaPalabra.value = '';
}
        
/*===CLASES===*/
class Tecla {
    constructor(x, y, ancho, alto, letra){
        this.x = x;
        this.y = y;
        this.ancho = ancho;
        this.alto = alto;
        this.letra = letra;
        this.dibuja = dibujaTecla;
    }
}

class Letra {
    constructor(x, y, ancho, alto, letra){
        this.x = x;
        this.y = y;
        this.ancho = ancho;
        this.alto = alto;
        this.letra = letra;
        this.dibuja = dibujaCajaLetra;
        this.dibujaLetra = dibujaLetra;
    }
}


/*===FUCNIONES===*/
/*===OCULTAR Y MOSTRAR INICIO===*/

function cerrar(){
    contInicio = document.getElementById('inicio');
    contInicio.style.display = 'none'; 
}

function mostrar(){
    contInicio = document.getElementById('inicio');
    contInicio.style.display = '';
}

/*===DIBUJAR TECLAS===*/
function dibujaTecla(){
    pincel.fillStyle = colorTecla;
    pincel.strokeStyle = colorMargen;
    pincel.fillRect(this.x, this.y, this.ancho, this.alto);
    pincel.strokeRect(this.x, this.y, this.ancho, this.alto);   
    pincel.fillStyle = "white";
    pincel.font = "bold 20px courier";
    pincel.fillText(this.letra, this.x+this.ancho/2-5, this.y+this.alto/2+5);
}
/*===DIBUJAR LETRAS===*/
function dibujaLetra(){
    var w = this.ancho;
    var h = this.alto;
    pincel.fillStyle = "red";
    pincel.font = "bold 40px Courier";
    pincel.fillText(this.letra, this.x+w/2-12, this.y+h/2+14);
}
/*===DIBUJA CAJA DE LETRAS===*/
function dibujaCajaLetra(){
    pincel.fillStyle = "white";
    pincel.strokeStyle = "red";
    pincel.fillRect(this.x, this.y, this.ancho, this.alto);
    pincel.strokeRect(this.x, this.y, this.ancho, this.alto);
}
/*===DISTRIBUCION DE TECLADO CON SUS RESPECTIVAS LETRAS*/
function teclado(){
    var ren = 0;
    var col = 0;
    var letra = "";
    var miLetra;
    var x = inicioX;
    var y = inicioY;
    for(var i = 0; i < letras.length; i++){
        letra = letras.substr(i,1);
        miLetra = new Tecla(x, y, lon, lon, letra);
        miLetra.dibuja();
        listaTeclas.push(miLetra);
        x += lon + margen;
        col++;
        if(col==10){
            col = 0;
            ren++;
            if(ren==2){
                x = 280;
            } else {
                x = inicioX;
            }
        }
        y = inicioY + ren * 50;
    }
}
/*===OBETENER PALBARA ALEATORIA===*/
function pintaPalabra(){
    var p = Math.floor(Math.random()*listaPalabras.length);
    palabra = listaPalabras[p];
    var w = canvas.width;
    var len = palabra.length;
    var ren = 0;
    var col = 0;
    var y = 230;
    var lon = 50;
    var x = (w - (lon+margen) *len)/2;
    for(var i=0; i<palabra.length; i++){
        var letra = palabra.substr(i,1);
        var miLetra = new Letra(x, y, lon, lon, letra);
        miLetra.dibuja();
        listaLetras.push(miLetra);
        x += lon + margen;
    }
}
/***** Va dibujando el ahorcado *****/
function horca(errores){
    var imagen = new Image();
    imagen.src = "img/ahorcado"+errores+".jpg";
    imagen.onload = function(){
        pincel.drawImage(imagen, 400, 5, 220, 220);
    }
}



/*===COORDENADAS===*/
function ajusta(xx, yy){
    var posCanvas = canvas.getBoundingClientRect();
    var x = xx-posCanvas.left;
    var y = yy-posCanvas.top;
    return{x:x, y:y}
}
/*===DETECTAR TECLA===*/
function selecciona(e){
    var pos = ajusta(e.clientX, e.clientY);
    var x = pos.x;
    var y = pos.y;
    var tecla;
    var bandera = false;
    for (var i = 0; i < listaTeclas.length; i++){
        tecla = listaTeclas[i];
        if (tecla.x > 0){
            if ((x > tecla.x) && (x < tecla.x + tecla.ancho) && (y > tecla.y) && (y < tecla.y + tecla.alto)){
                break;
            }
        }
    }

    /*===COMPARA LA LETRA CON LA PALABRA OCULTA*/
    if (i < listaTeclas.length){
        for (var i = 0 ; i < palabra.length ; i++){ 
            var letra = palabra.substr(i, 1);
            if (letra == tecla.letra){
                caja = listaLetras[i];
                caja.dibujaLetra();
                aciertos++;
                bandera = true;
            }
        }
        if (bandera == false){
            errores++;
            horca(errores);
            if (errores == 6) gameOver(errores);
        }
        /* ELIMINA LA TECLA QUE SE PERDIO ===*/
        pincel.clearRect(tecla.x - 1, tecla.y - 1, tecla.ancho + 2, tecla.alto + 2);
        tecla.x - 1;
        /*===VERIFICA SI GANO===*/
        if (aciertos == palabra.length) gameOver(errores);
    }
}
/*===BORRAR TECLAS DE PANTALLA Y ENVIAR MENSAJE===*/
function gameOver(errores){
    pincel.clearRect(0, 0, canvas.width, canvas.height);
    pincel.fillStyle = "red";

    pincel.font = "bold 35px Courier";
    if (errores < 6){
        pincel.fillText("¡GANASTE! La palabra es: ", 110, 280);
    } else {
        pincel.fillText("PERDISTE! La palabra era: ", 110, 280);
    }
    pincel.font = "bold 80px Courier";
    lon = (canvas.width - (palabra.length*48))/2;
    pincel.fillText(palabra, lon, 380);
    horca(errores);
}
/*===MOSTRAR Y OCULTAR EL CANVAS===*/
function iniciaJuego(){
    document.getElementById("pantalla").classList.toggle("hidden");
    document.getElementById("reiniciarJuego").classList.toggle("hidden");

    if(listaPalabras.length >= 1 ){
        juego();
        document.querySelector(".containerApp").classList.add("hidden")
    } 
}


/*=== EVENTOS ===*/
iniciarJuego.addEventListener("click", iniciaJuego);
agregarPalabra.addEventListener("click", validaAgregaPalabra);




