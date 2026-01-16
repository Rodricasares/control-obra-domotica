import { useState } from "react";
import { articulos } from "../data/articulos";

export default function TablaEstancia({
  estancia,
  estanciaKey,
  estancias,
  setEstancias,
  estadoGlobal,
  setEstadoGlobal
}) {
  const [nuevo, setNuevo] = useState({
    el: articulos[0],
    ref: "",
    qty: 1
  });

  const toggle = (ref, campo) => {
    setEstadoGlobal({
      ...estadoGlobal,
      [ref]: {
        ...estadoGlobal[ref],
        [campo]: !estadoGlobal[ref]?.[campo]
      }
    });
  };

  const add = () => {
    if (!nuevo.ref) return;

    const copia = { ...estancias };
    copia[estanciaKey].puntos.push([nuevo.el, nuevo.ref, nuevo.qty]);
    setEstancias(copia);

    setNuevo({ el: articulos[0], ref: "", qty: 1 });
  };

  return (
    <>
      <h2 className="estancia-title">📍 {estancia.nombre}</h2>

      {/* BARRA AÑADIR */}
      <div className="add-bar">
        <select
          className="select-elemento"
          value={nuevo.el}
          onChange={e =>
            setNuevo({ ...nuevo, el: e.target.value })
          }
        >
          {articulos.map(a => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>

        <input
          placeholder="Referencia"
          value={nuevo.ref}
          onChange={e =>
            setNuevo({ ...nuevo, ref: e.target.value })
          }
        />

        <input
          type="number"
          min="1"
          value={nuevo.qty}
          onChange={e =>
            setNuevo({ ...nuevo, qty: Number(e.target.value) })
          }
        />

        <button className="btn-add" onClick={add}>
          ➕ Añadir
        </button>
      </div>

      {/* TABLA */}
      <table>
        <thead>
          <tr>
            <th>Elemento</th>
            <th>Ref</th>
            <th>Cant.</th>
            <th>🧰 Tubo</th>
            <th>🔌 Cable</th>
            <th>🎛 Mecanismo</th>
            <th>💻 Prog.</th>
          </tr>
        </thead>

        <tbody>
          {estancia.puntos.map(([el, ref, qty]) => (
            <tr key={ref}>
              <td data-label="Elemento">{el}</td>
              <td data-label="Ref">{ref}</td>
              <td data-label="Cantidad">{qty}</td>

              {["tubo", "cable", "mecanismo", "prog"].map(c => (
                <td key={c}>
                  <button
                    className={
                      estadoGlobal[ref]?.[c]
                        ? "ok"
                        : "pendiente"
                    }
                    onClick={() => toggle(ref, c)}
                  >
                    {estadoGlobal[ref]?.[c] ? "✔" : "—"}
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
