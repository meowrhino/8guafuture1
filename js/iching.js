const startBtn = document.getElementById("start-btn");
const preguntaSection = document.getElementById("pregunta");
const introSection = document.getElementById("intro");
const submitPregunta = document.getElementById("submit-pregunta");
const inputPregunta = document.getElementById("input-pregunta");
const tiradaSection = document.getElementById("tirada");
const resultadoSection = document.getElementById("resultado");
const tirarMonedasBtn = document.getElementById("tirar-monedas");
const lineasContainer = document.getElementById("lineas");

let hexagrama = [];

// Mostrar formulario pregunta
startBtn.addEventListener("click", () => {
    introSection.style.display = "none";
    preguntaSection.style.display = "block";
});

// Guardar pregunta y pasar a la tirada
submitPregunta.addEventListener("click", () => {
    if (inputPregunta.value.trim() !== "") {
        preguntaSection.style.display = "none";
        tiradaSection.style.display = "block";
    } else {
        alert("Por favor, escribe tu pregunta.");
    }
});

// Lanzar monedas y mostrar línea
tirarMonedasBtn.addEventListener("click", () => {
    if (hexagrama.length < 6) {
        let valor = lanzarMonedas();
        hexagrama.push(valor);
        mostrarLinea(valor);

        if (hexagrama.length === 6) {
            setTimeout(() => {
                tiradaSection.style.display = "none";
                resultadoSection.style.display = "block";
                mostrarHexagramaFinal();
            }, 1000);
        }
    }
});

// Función lanzar monedas
function lanzarMonedas() {
    let valor = 0;
    for (let i = 0; i < 3; i++) {
        valor += Math.random() < 0.5 ? 2 : 3;
    }
    return valor;
}

// Mostrar visualmente la línea
function mostrarLinea(valor) {
    const divLinea = document.createElement("div");
    divLinea.classList.add("linea");
    if (valor === 6 || valor === 8) {
        divLinea.classList.add("yin");
    }
    lineasContainer.prepend(divLinea);
    setTimeout(() => {
        divLinea.style.opacity = 1;
    }, 100);
}

// Mostrar hexagrama completo al final
function mostrarHexagramaFinal() {
    const hexagramaFinal = document.getElementById("hexagrama-final");
    hexagrama.forEach(valor => {
        const divLinea = document.createElement("div");
        divLinea.classList.add("linea");
        if (valor === 6 || valor === 8) {
            divLinea.classList.add("yin");
        }
        hexagramaFinal.prepend(divLinea);
        setTimeout(() => {
            divLinea.style.opacity = 1;
        }, 100);
    });
}