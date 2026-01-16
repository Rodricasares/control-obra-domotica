import { useState } from "react";

const ARTICULOS = [
  "Downlight",
  "Pulsador",
  "Sensor",
  "Tira LED",
  "Aplique",
  "Luminaria exterior"
];

export default function TablaEstancia() {
  const [filas, setFilas] = useState([]);

  const addFila = () => {
    setFilas([...filas, { el: ARTICULOS[0], ref: "" }]);
  };

  const update = (i, campo, valor) => {
    const copia = [...filas];
    copia[i][campo] = valor;
    setFilas(copia);
  };

  return (
    <div style={{ width: "100%", maxWidth: 600 }}>
      <h2>Tabla con selector</h2>

      <button onClick={addFila}>➕ Añadir fila</button>

      <table style={{ width: "100%", marginTop: 12 }}>
        <thead>
          <tr>
            <th>Elemento</th>
            <th>Referencia</th>
          </tr>
        </thead>
        <tbody>
          {filas.map((f, i) => (
            <tr key={i}>
              <td>
                <select
                  value={f.el}
                  onChange={e => update(i, "el", e.target.value)}
                >
                  {ARTICULOS.map(a => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  value={f.ref}
                  onChange={e => update(i, "ref", e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
