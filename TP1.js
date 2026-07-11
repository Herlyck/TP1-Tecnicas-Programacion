const leer = require("prompt-sync")();
const MAX_FILA = 10;
const MAX_COL = 10;
const SIMB_CASILLA_VACIA = " .";
const SIMB_JUGADOR = " J";
const SIMB_ENEMIGO = " E";
const SIMB_COMPUERTA = " C";
const SIMB_SALIDA = " S";
const tablero = [];

const enemigo = {
    posY: 9,
    posX: 9
};

const jugador = {
    posY: 5,
    posX: 0

};

const compuertaSeguridad = {
    posY: 5, //fila
    posX: 9  //col

};

const salida = {
    posY: 0,
    posX: 0

};

function main() {
    crearTablero();
    console.clear();


    tablero[jugador.posY][jugador.posX] = SIMB_JUGADOR;
    tablero[compuertaSeguridad.posY][compuertaSeguridad.posX] = SIMB_COMPUERTA;
    tablero[salida.posY][salida.posX] = SIMB_SALIDA;
    tablero[enemigo.posY][enemigo.posX] = SIMB_ENEMIGO;

    
    // for (let intentos = 0; intentos < 50; intentos++) {
    
    
    
    //     if (jugador.posY === enemigo.posY && jugador.posX === enemigo.posX) {
    //         intentos = 50;
    //     }

    //     estoy en prueba

    // }
    
    mostrarTablero();
    leer();
    console.clear();

    actualizarCasillaA(jugador);
    actualizarCasillaA(enemigo);

    tablero[jugador.posY][jugador.posX] = SIMB_JUGADOR;
    tablero[enemigo.posY][enemigo.posX] = SIMB_ENEMIGO;
    mostrarTablero();



}
main();


/**
 * actualizacion de casillas de los distintos personajes
 * @param {Object} unPersonaje posiciones definidas de distintos personajes en objetos literales
 */
function actualizarCasillaA(unPersonaje) {
    tablero[unPersonaje.posY][unPersonaje.posX] = SIMB_CASILLA_VACIA;
    unPersonaje.posY += generarMovimientoEntre(-1, 1);
    unPersonaje.posX += generarMovimientoEntre(-1, 1);
    regularMovimientoA(unPersonaje);
}

/**
 * Genera un movimiento aleatorio entre 2 numeros
 * @param {Number} min valor minimo incluido para generar movimiento
 * @param {Number} max valor maximo incluido para generar movimiento
 * @returns un numero aleatorio entre el minimo y el maximo
 */
function generarMovimientoEntre(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}


/**
 * regula el movimiento de los personajes
 * @param {Object} unPersonaje objeto literal con sus respectivas posiciones
 */
function regularMovimientoA(unPersonaje) {
    regularEjeA(unPersonaje, "posY", MAX_FILA);
    regularEjeA(unPersonaje, "posX", MAX_COL);
}

/**
 * 
 * @param {Object} unPersonaje objeto literal con sus respectivas posiciones
 * @param {Number} eje posicion en el eje Y
 * @param {Number} maxEje posicion en el eje X
 */
function regularEjeA(unPersonaje, eje, maxEje) {
    if (unPersonaje[eje] < 0) {
        unPersonaje[eje] = 0;
    } else if (unPersonaje[eje] > maxEje - 1) {
        unPersonaje[eje] = maxEje - 1;
    }
}



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




