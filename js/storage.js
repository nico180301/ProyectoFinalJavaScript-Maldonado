// storage.js
export function guardarVictorias(victoriasUsuario, victoriasPC) {
    let victorias = { usuario: victoriasUsuario, pc: victoriasPC };
    localStorage.setItem("victorias", JSON.stringify(victorias));
}

export function recuperarVictorias() {
    let victoriasGuardadas = localStorage.getItem("victorias");
    if (victoriasGuardadas) {
        return JSON.parse(victoriasGuardadas);
    } else {
        return { usuario: 0, pc: 0 };
    }
}
export function eliminarVictorias() {
    localStorage.removeItem("victorias");
}
