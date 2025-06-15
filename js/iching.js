import { cargarInterpretacion } from "./interpretacion.js";

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

// Evento inicial
startBtn.onclick = () => {
  introSection.style.display = "none";
  preguntaSection.style.display = "flex";
  preguntaSection.classList.add("fade-in");
};

// Guardar y mostrar pregunta
submitPregunta.onclick = () => {
  const textoPregunta = inputPregunta.value.trim();
  if (textoPregunta) {
    preguntaSection.style.display = "none";
    tiradaSection.style.display = "flex";
    tiradaSection.classList.add("fade-in");
    mostrarPregunta(textoPregunta);
    crearMonedas();
  } else alert("Escribe una pregunta.");
};

function mostrarPregunta(texto) {
  const preguntaDisplay = document.createElement("h3");
  preguntaDisplay.textContent = `"${texto}"`;
  preguntaDisplay.style.fontStyle = "italic";
  preguntaDisplay.style.marginBottom = "2rem";
  document.querySelector("#tirada").prepend(preguntaDisplay);
}

function crearMonedas() {
  const monedasDiv = document.getElementById("monedas");
  monedasDiv.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    let div = document.createElement("div");
    div.className = "moneda-cu animar";
    div.innerHTML = `
      <div class="cara">☯</div>
      <div class="cruz">✶</div>
    `;
    monedasDiv.appendChild(div);
  }
}

tirarMonedasBtn.onclick = () => {
  anime({
    targets: ".moneda",
    rotateY: "+=1080deg",
    duration: 1500,
    easing: "easeInOutQuart",
    complete: () => {
      const valor = lanzarMonedas();
      hexagrama.push(valor);
      mostrarLinea(valor);
      if (hexagrama.length === 6) {
        setTimeout(() => {
          tiradaSection.style.display = "none";
          resultadoSection.style.display = "flex";
          resultadoSection.classList.add("fade-in");
          mostrarHexagramaFinal();
        }, 800);
      }
    },
  });
};

// Lanzar lógica interna monedas
function lanzarMonedas() {
  let valor = 0;
  for (let i = 0; i < 3; i++) {
    valor += Math.random() < 0.5 ? 2 : 3;
  }
  return valor;
}

// Mostrar línea hexagrama visualmente
function mostrarLinea(valor) {
  const divLinea = document.createElement("div");
  divLinea.classList.add("linea");
  if (valor === 6 || valor === 8) divLinea.classList.add("yin");
  lineasContainer.prepend(divLinea);
}

// Hexagrama final
function mostrarHexagramaFinal() {
  const hexagramaFinal = document.getElementById("hexagrama-final");
  hexagramaFinal.innerHTML = "";

  // Mostrar líneas gráficas
  hexagrama.forEach((valor) => {
    const divLinea = document.createElement("div");
    divLinea.classList.add("linea");
    if (valor === 6 || valor === 8) divLinea.classList.add("yin");
    hexagramaFinal.prepend(divLinea);
  });

  // Interpretación desde JSON
  cargarInterpretacion(hexagrama, (num, info) => {
    const titulo = document.createElement("h3");
    titulo.textContent = `${num}. ${info.nombre}`;
    const texto = document.createElement("p");
    texto.textContent = info.dictamen;

    const lineasDiv = document.createElement("ul");
    lineasDiv.className = "lineas-interp";
    info.lineas.forEach((linea, i) => {
      const li = document.createElement("li");
      li.textContent = `Línea ${i + 1}: ${linea}`;
      lineasDiv.appendChild(li);
    });

    hexagramaFinal.prepend(lineasDiv);
    hexagramaFinal.prepend(texto);
    hexagramaFinal.prepend(titulo);
  });
}

// Animar monedas estáticas por si están en el HTML inicial
document.querySelectorAll(".moneda-cu").forEach((m) => {
  m.classList.remove("animar");
  void m.offsetWidth; // trigger reflow
  m.classList.add("animar");
});
