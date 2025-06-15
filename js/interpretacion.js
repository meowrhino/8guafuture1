export function cargarInterpretacion(hexagrama, callback) {
  fetch("data/hexagramas_completo_FINAL_64.json")
    .then(res => res.json())
    .then(data => {
      const num = calcularNumeroHexagrama(hexagrama);
      const info = data[num];
      callback(num, info);
    });
}

// Convierte el hexagrama (6 valores) a un número del 1 al 64
function calcularNumeroHexagrama(hexagrama) {
  // Convierte cada línea a 1 (yang) o 0 (yin)
  const binario = hexagrama.map(valor => (valor === 6 || valor === 8 ? 0 : 1));
  const num = parseInt(binario.reverse().join(""), 2) + 1;
  return String(num);
}