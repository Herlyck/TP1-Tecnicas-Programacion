const leer = require("prompt-sync")();
function main() {
    let aux = 0;
    let aux2 = 0;
    let a = 10;
    let b = 50;

    a = leer();
    b = leer();
    aux = Number(a);
    aux2 = Number(b);

    if (!isNaN(aux) && !isNaN(aux2)) {
        mostrarResultado(aux, aux2);
    } else {
        mostrarResultado(a, b);
    }
}
main();
/**
 * 
 * @param {Number | string} valor1 texto o numero
 * @param {*} valor2 
 */
function mostrarResultado(valor1, valor2) {
    let suma = valor1 + valor2;
    console.log(suma);
};

