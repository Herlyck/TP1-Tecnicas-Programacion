const leer = require("prompt-sync")();
const MAX_FILA = 10;
const MAX_COL = 10;
const MAX_INTENTOS = 50;
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
    posY: 5,
    posX: 9
};

const salida = {
    posY: 0,
    posX: 0
};

function main() {
    crearTablero();

    // Posicionamiento inicial
    tablero[jugador.posY][jugador.posX] = SIMB_JUGADOR;
    tablero[compuertaSeguridad.posY][compuertaSeguridad.posX] = SIMB_COMPUERTA;
    tablero[salida.posY][salida.posX] = SIMB_SALIDA;
    tablero[enemigo.posY][enemigo.posX] = SIMB_ENEMIGO;

    let juegoTerminado = false;
    let intentos = 1;

    while (!juegoTerminado && intentos <= MAX_INTENTOS) {
        console.clear();
        console.log(`--- INTENTO ${intentos} / ${MAX_INTENTOS} ---`);
        mostrarTablero();

        // 1. Limpiar las posiciones actuales antes de mover
        tablero[jugador.posY][jugador.posX] = SIMB_CASILLA_VACIA;
        tablero[enemigo.posY][enemigo.posX] = SIMB_CASILLA_VACIA;

        
        console.log("\nControles: W (Arriba), S (Abajo), A (Izquierda), D (Derecha)");
        console.log("Diagonales: Q (Arriba-Izq), E (Arriba-Der), Z (Abajo-Izq), C (Abajo-Der)");

        const desplazamieto = pedirMovimientoJugador();
        jugador.posY += desplazamieto.desplY;
        jugador.posX += desplazamieto.desplX;
        regularMovimientoA(jugador); // Evita que salga del tablero

        actualizarCasillaA(enemigo);

        ({ juegoTerminado, intentos } = condicionesJuego(juegoTerminado, intentos)); //false y 1 valen en el primer momento
    }

    if (intentos > MAX_INTENTOS && !juegoTerminado) {
        console.log("\n⏳ Se agotaron los 50 intentos. Te quedaste sin energía.");
    }
}

main();


/**
 * 
 * @param {boolean} juegoTerminado si es true entonces el juego termina
 * @param {Number} intentos si supera los 50 intentos se termina el juego
 * @returns devuelve el valor que finaliza el juego por captura o por limite de intentos
 */
function condicionesJuego(juegoTerminado, intentos) {
    if (jugador.posY === enemigo.posY && jugador.posX === enemigo.posX) {
        juegoTerminado = true;
        console.clear();
        tablero[enemigo.posY][enemigo.posX] = SIMB_ENEMIGO;
        mostrarTablero();
        console.log("\n💀 ¡Game Over! El enemigo te atrapó.");
    }
    else if (jugador.posY === salida.posY && jugador.posX === salida.posX) {
        juegoTerminado = true;
        console.clear();
        tablero[jugador.posY][jugador.posX] = SIMB_JUGADOR;
        mostrarTablero();
        console.log("\n🎉 ¡Ganaste! Lograste escapar.");
    }
    else {
        tablero[jugador.posY][jugador.posX] = SIMB_JUGADOR;
        tablero[enemigo.posY][enemigo.posX] = SIMB_ENEMIGO;
        tablero[salida.posY][salida.posX] = SIMB_SALIDA;

        if (!(enemigo.posY === compuertaSeguridad.posY && enemigo.posX === compuertaSeguridad.posX)) {
            tablero[compuertaSeguridad.posY][compuertaSeguridad.posX] = SIMB_COMPUERTA;
        }

        intentos++;
    }
    return { juegoTerminado, intentos };
}

/**
 * Pide una dirección por teclado y devuelve el cambio en los ejes X e Y.
 * @returns {Object} Un objeto con las propiedades desplazamiento X y desplazamientoY.
 */
function pedirMovimientoJugador() {
    let direccion = "";
    let desplX = 0;
    let desplY = 0;
    let entradaValida = false;

    while (!entradaValida) {
        direccion = leer("Tu movimiento: ").toLowerCase().trim();

        switch (direccion) {
            case "w": desplY = -1; desplX = 0; entradaValida = true; break; // Arriba
            case "s": desplY = 1; desplX = 0; entradaValida = true; break; // Abajo
            case "a": desplY = 0; desplX = -1; entradaValida = true; break; // Izquierda
            case "d": desplY = 0; desplX = 1; entradaValida = true; break; // Derecha
            case "q": desplY = -1; desplX = -1; entradaValida = true; break; // Arriba - Izquierda
            case "e": desplY = -1; desplX = 1; entradaValida = true; break; // Arriba - Derecha
            case "z": desplY = 1; desplX = -1; entradaValida = true; break; // Abajo - Izquierda
            case "c": desplY = 1; desplX = 1; entradaValida = true; break; // Abajo - Derecha
            default:
                console.log("❌ Tecla inválida. Usá W, A, S, D o Q, E, Z, C para diagonales.");
        }
    }

    return { desplX, desplY };
}

/**
 * actualizacion de casillas de los distintos personajes (aleatorio)
 * @param {Object} unPersonaje posiciones definidas de distintos personajes en objetos literales
 */
function actualizarCasillaA(unPersonaje) {
    unPersonaje.posY += generarMovimientoEntre(-1, 1);
    unPersonaje.posX += generarMovimientoEntre(-1, 1);
    regularMovimientoA(unPersonaje);
}

/**
 * Genera un movimiento aleatorio entre 2 numeros
 * @param {number} min valor minimo incluido
 * @param {number} max valor maximo incluido
 * @returns {number} un numero aleatorio entre el minimo y el maximo
 */
function generarMovimientoEntre(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
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
 * @param {Object} unPersonaje objeto literal con sus respectivas posiciones
 * @param {string} eje propiedad del objeto ("posY" o "posX")
 * @param {number} maxEje limite maximo del eje
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
        for (let col = 0; col < MAX_COL; col++) {
            tablero[fila][col] = SIMB_CASILLA_VACIA;
        }
    }
}