/*===VARIABLES===*/
let palabrita;
let cant_errores = 0;
let cant_aciertos = 0;


/*===SELECTORES===*/
const iniciarJuego = document.querySelector("#start");
const btn = id('jugar');
const imagen = id( 'imagen' );
const btn_letras = document.querySelectorAll( "#letras button" );
const nuevaPalabra = document.querySelector("#nuevaPalabra");
const agregarPalabra = document.querySelector("#agregarPalabra");

const palabras = [
    'WOLVERINE',    
    'MAGNETO',     
    'SPIDERMAN',    
    'MOONKNIGHT',       
    'HULK',     
    'THOR',       
    'IRONMAN',   
    'HAWKEYE',
    'DEADPOOL',
    'DAREDEVIL',
    'VISION',
    'LOKI',     
];


/*===MOSTRAR Y OCULTAR EL PANTALLA DE JUEGO===*/
function iniciaJuego(){
    document.getElementById("pantalla").classList.toggle("hidden");
}

/*===INICIAR JUEGO=== */
btn.addEventListener('click', iniciar );

function iniciar(event){
    imagen.src = 'img/img0.png';
    btn.disabled = true;
    cant_errores = 0;
    cant_aciertos = 0; 

    const parrafo = id( 'palabra_a_adivinar' );
    parrafo.innerHTML = ''; 

    const cant_palabras = palabras.length;
    const valor_al_azar = obtener_random( 0, cant_palabras );

    palabrita = palabras[ valor_al_azar ];
    console.log( palabrita );
    const cant_letras = palabrita.length;

    for( let i = 0; i < btn_letras.length ; i++ ){
        btn_letras[ i ].disabled = false;
    }

    for( let i = 0; i < cant_letras; i++ ){
        const span = document.createElement( 'span' );
        parrafo.appendChild( span );
    }

}

/*===ADIVINAR LETRA*/
for( let i = 0; i < btn_letras.length ; i++ ){
    btn_letras[ i ].addEventListener( 'click', click_letras );
}

function click_letras(event){
    const spans = document.querySelectorAll( '#palabra_a_adivinar span' );
    const button = event.target; 
    button.disabled = true;

    const letra = button.innerHTML.toUpperCase( );
    const palabra = palabrita.toUpperCase( ); 

    let acerto = false;
    for( let i = 0; i < palabra.length;  i++ ){
        if( letra == palabra[i] ){
            spans[i].innerHTML = letra;
            cant_aciertos++;
            acerto = true;
        }
    }

    if( acerto == false ){
        cant_errores++;
        const source = `img/img${cant_errores}.png` ;
        imagen.src = source;
    }

    if( cant_errores == 5 ){
        id('resultado').innerHTML ="Perdiste, la palabra era " + palabrita;
        game_over( );
    }else if( cant_aciertos == palabrita.length ){
        id('resultado').innerHTML = " FELICIDADES, GANASTE!!!!";
        game_over( );
    }
}


/*===FIN===*/
function game_over( ){
    for( let i = 0; i < btn_letras.length ; i++ ){
        btn_letras[ i ].disabled = true;
    }

    btn.disabled = false;
}


game_over( );




/*===FUCNIONES===*/

/*===AGREGAR PALABRA===*/
function agregaPalabra(){
    palabras = [];
    palabras.push(nuevaPalabra.value)
    console.log(nuevaPalabra.value);
    console.log(palabras);
    nuevaPalabra.value = '';
}

/*===VALIDAR PALABRA==*/
function validaAgregaPalabra(){
    
    const pattern = new RegExp('^[A-Z]+$');

    if(pattern.test(nuevaPalabra.value)){
        agregaPalabra();
    } else{
        alert("Solo letras mayúsculas, sin espacios sin acentos ni caracteres especiales")
    }
}

/*===OCULTAR Y MOSTRAR INICIO===*/

function cerrar(){
    contInicio = document.getElementById('inicio');
    contInicio.style.display = 'none'; 
}

function mostrar(){
    contInicio = document.getElementById('inicio');
    contInicio.style.display = '';
}

function id( str ){
    return document.getElementById( str );
}

function obtener_random( num_min, num_max ){
    const amplitud_valores = num_max - num_min; 
    const valor_al_azar = Math.floor( Math.random( ) * amplitud_valores ) + num_min; 
    return valor_al_azar;
}






/*=== EVENTOS ===*/
iniciarJuego.addEventListener("click", iniciaJuego);





