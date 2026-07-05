const leer = require("prompt-sync")();

const MAX_FILA = 10;
const MAX_COL = 10;
const SIMB_CASILLA_VACIA = " ." ;
const SIMB_JUGADOR = " J";
const SIMB_ENEMIGO = " X";
const SIMB_COMPUERTA = " C";
const SIMB_SALIDA = " S";
const tablero = [];

const enemigo ={
    posY: 9,
    posX:9
}

const jugador = {
    posY: 5,
    posX: 0
    
}

const compuertaSeguridad = {
    posY: 5, //fila
    posX: 9  //col
    
}

const salida = {
    posY: 0,
    posX: 0
    
}


function main() {
    crearTablero();
    console.clear();
    
    tablero[jugador.posY][jugador.posX] = SIMB_JUGADOR;
    tablero[compuertaSeguridad.posY][compuertaSeguridad.posX] = SIMB_COMPUERTA;
    tablero[salida.posY][salida.posX] = SIMB_SALIDA;
    tablero[enemigo.posY][enemigo.posX] = SIMB_ENEMIGO;
    mostrarTablero();
    leer();
    console.clear();
    tablero[--enemigo.posY][--enemigo.posX]=SIMB_ENEMIGO;
    mostrarTablero();
    

    
    
    for(let intentos = 0;intentos<50;intentos++){
        if (jugador.posY === enemigo.posY && jugador.posX ===enemigo.posX){
            intentos=50;
        } 
        
    }













}
main();


/**
 * muestra el tablero del juego
 */
function mostrarTablero() {
    for (let fil = 0; fil < tablero.length; fil++) {

        process.stdout.write("\t\t\t");
        for (let col = 0; col < tablero[fil].length; col++) {
            process.stdout.write(tablero[fil][col]);

        }

        console.log();

    }
}


/**
 * creacion de tablero 10x10
 */
function crearTablero() {
    for (let fila = 0; fila < MAX_FILA; fila++) {
        tablero[fila] = [];
        for (col = 0; col < MAX_COL; col++) {
            tablero[fila][col] = SIMB_CASILLA_VACIA;
        }
    }
}
