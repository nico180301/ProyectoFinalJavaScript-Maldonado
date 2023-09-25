import { eliminarVictorias, guardarVictorias, recuperarVictorias } from './storage.js';

let puntosUsuario = 0;
let puntosPC = 0;

// Recuperar las victorias del Storage al cargar la página
const victorias = recuperarVictorias();
let victoriasUsuario = victorias ? victorias.usuario : 0;
let victoriasPC = victorias ? victorias.pc : 0;

const instrucciones = document.querySelector("#instrucciones");
const contenedorPuntosUsuario = document.querySelector("#puntos-usuario");
const contenedorPuntosPC = document.querySelector("#puntos-computadora");
const mensaje = document.querySelector("#mensaje");
const contenedorGanaPunto = document.querySelector("#gana-punto");
const seleccionaUnaOpcion = document.querySelector("#selecciona-una-opcion");

// Actualizar el marcador al cargar la página
contenedorPuntosUsuario.innerText = puntosUsuario;
contenedorPuntosPC.innerText = puntosPC;

const contenedorEleccionUsuario = document.querySelector("#eleccion-usuario");
const contenedorEleccionPC = document.querySelector("#eleccion-computadora");

const botonesOpciones = document.querySelectorAll(".opcion");
botonesOpciones.forEach(boton => {
    boton.addEventListener("click", iniciarTurno);
});

function iniciarTurno(e) {
    try {
        // Simulación de solicitud fetch a un archivo JSON local
        fetch('./data/productos.json')
            .then(response => response.json())
            .then(data => {
                // Procesar datos del archivo JSON (simulados)
                console.log(data);
            })
            .catch(error => {
                console.error('Error en la solicitud fetch:', error);
            });

        const eleccionPC = Math.floor(Math.random() * 3);
        const eleccionUsuario = e.currentTarget.id;

        // Identificadores más simples: "piedra", "papel" y "tijera"
        const opciones = ["piedra🪨", "papel📋", "tijeras✂️"];

        // Validar entrada numérica
        if (!opciones.includes(eleccionUsuario)) {
            throw new Error("Entrada inválida.");
        }

        // Obtener el índice de la elección del usuario
        const indiceUsuario = opciones.indexOf(eleccionUsuario);

        // Obtener el índice de la elección de la PC
        const indicePC = eleccionPC;

        // Calcular el resultado
        const resultado = (indiceUsuario - indicePC + 3) % 3;

        // Mostrar el resultado
        if (resultado === 0) {
            empate();
        } else if (resultado === 1) {
            ganaUsuario();
        } else {
            ganaPC();
        }

        mensaje.classList.remove("disabled");
        contenedorEleccionUsuario.innerText = eleccionUsuario;
        contenedorEleccionPC.innerText = opciones[indicePC];

        if (puntosUsuario === 3 || puntosPC === 3) {

            if (puntosUsuario === 3) {
                instrucciones.innerText = "¡Ganaste el juego!";
                victoriasUsuario++;
            }

            if (puntosPC === 3) {
                instrucciones.innerText = "¡La computadora ganó el juego!";
                victoriasPC++;
            }

            mostrarSweetAlert(instrucciones.innerText);

            seleccionaUnaOpcion.classList.add("disabled");

            // Almacenar las victorias en el Storage al final del juego
            guardarVictorias(victoriasUsuario, victoriasPC);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

function mostrarSweetAlert(mensaje) {
    Swal.fire({
        title: 'Resultado del Juego',
        text: mensaje,
        icon: 'info',
        confirmButtonText: 'Volver a Jugar'
    }).then((result) => {
        if (result.isConfirmed) {
            reiniciarJuego();
        }
    });
}

function ganaUsuario() {
    puntosUsuario++;
    contenedorPuntosUsuario.innerText = puntosUsuario;
    contenedorGanaPunto.innerText = "¡Ganaste un punto!"
}

function ganaPC() {
    puntosPC++;
    contenedorPuntosPC.innerText = puntosPC;
    contenedorGanaPunto.innerText = "¡La computadora ganó un punto!"
}

function empate() {
    contenedorGanaPunto.innerText = "¡Empate!"
}

function reiniciarJuego() {
    puntosUsuario = 0;
    puntosPC = 0;
    
    contenedorPuntosUsuario.innerText = puntosUsuario;
    contenedorPuntosPC.innerText = puntosPC;

    instrucciones.innerText = "El primero en llegar a 3 puntos gana.";

    seleccionaUnaOpcion.classList.remove("disabled");
    mensaje.classList.add("disabled");

    // Llamar a la función eliminarVictorias para eliminar las victorias guardadas
    eliminarVictorias();
}
