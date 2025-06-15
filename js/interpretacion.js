export function cargarInterpretacion(hexagrama, callback) {
  const bin = hexagrama.map(v => (v % 2 === 1 ? '1' : '0')).reverse().join('');
  const numHexagrama = parseInt(bin, 2) + 1;

  fetch('hexagramas_completo.json')
    .then(res => res.json())
    .then(data => {
      const info = data[numHexagrama];
      if (info) {
        callback(numHexagrama, info);
      } else {
        callback(numHexagrama, { nombre: "Desconocido", dictamen: "No encontrado.", lineas: [] });
      }
    });
}