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
};

// Guardar y mostrar pregunta
submitPregunta.onclick = () => {
  const textoPregunta = inputPregunta.value.trim();
  if (textoPregunta) {
    preguntaSection.style.display = "none";
    tiradaSection.style.display = "flex";
    mostrarPregunta(textoPregunta);
    crearMonedas();
  } else alert("Escribe una pregunta.");
};

function mostrarPregunta(texto) {
  const preguntaDisplay = document.createElement('h3');
  preguntaDisplay.textContent = `"${texto}"`;
  preguntaDisplay.style.fontStyle = 'italic';
  preguntaDisplay.style.marginBottom = '2rem';
  document.querySelector('#tirada').prepend(preguntaDisplay);
}

// Crear monedas visualmente (emoji)
function crearMonedas() {
  const monedasDiv = document.getElementById("monedas");
  monedasDiv.innerHTML = '';
  for (let i = 0; i < 3; i++) {
    let div = document.createElement('div');
    div.classList.add('moneda');
    div.textContent = '🪙';
    monedasDiv.appendChild(div);
  }
}

// Tirar monedas con animación Anime.js
tirarMonedasBtn.onclick = () => {
  anime({
    targets: '.moneda',
    rotateY: '+=1080deg',
    duration: 1500,
    easing: 'easeInOutQuart',
    complete: () => {
      const valor = lanzarMonedas();
      hexagrama.push(valor);
      mostrarLinea(valor);
      if (hexagrama.length === 6) {
        setTimeout(() => {
          tiradaSection.style.display = "none";
          resultadoSection.style.display = "flex";
          mostrarHexagramaFinal();
        }, 800);
      }
    }
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
  hexagramaFinal.innerHTML = '';
  hexagrama.forEach(valor => {
    const divLinea = document.createElement("div");
    divLinea.classList.add("linea");
    if (valor === 6 || valor === 8) divLinea.classList.add("yin");
    hexagramaFinal.prepend(divLinea);
  });
}