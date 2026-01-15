import { useState } from "react";
import { catalogo } from "../data/catalogo";

export default function TablaEstancia({ estancia, estanciaKey, estancias, setEstancias, estadoGlobal, setEstadoGlobal }) {

  const [nuevo, setNuevo] = useState({ cod:"DL01", ref:"", qty:1 });

  const toggle = (ref, campo) => {
    setEstadoGlobal({
      ...estadoGlobal,
      [ref]: { ...estadoGlobal[ref], [campo]: !estadoGlobal[ref]?.[campo] }
    });
  };

  const add = () => {
    if (!nuevo.ref) return;
    const copia = {...estancias};
    copia[estanciaKey].puntos.push([nuevo.cod, nuevo.ref, nuevo.qty]);
    setEstancias(copia);
    setNuevo({ cod:"DL01", ref:"", qty:1 });
  };

  return (
    <>
      <h2 className="estancia-title">📍 {estancia.nombre}</h2>

      <div className="add-bar">
        <select value={nuevo.cod} onChange={e=>setNuevo({...nuevo,cod:e.target.value})}>
          {Object.entries(catalogo).map(([k,v])=>(
            <option key={k} value={k}>{k} — {v.nombre}</option>
          ))}
        </select>

        <input placeholder="Ref" value={nuevo.ref}
          onChange={e=>setNuevo({...nuevo,ref:e.target.value})}/>

        <input type="number" min="1" value={nuevo.qty}
          onChange={e=>setNuevo({...nuevo,qty:parseInt(e.target.value)})}/>

        <button className="btn-add" onClick={add}>➕ Añadir</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Material</th><th>Ref</th><th>Cant</th>
            <th>🧰</th><th>🔌</th><th>🎛</th><th>💻</th>
          </tr>
        </thead>
        <tbody>
          {estancia.puntos.map(([cod, ref, qty]) => (
            <tr key={ref}>
              <td data-label="Material">{catalogo[cod]?.nombre}</td>
              <td data-label="Ref">{ref}</td>
              <td data-label="Cant">{qty}</td>
              {["tubo","cable","mecanismo","prog"].map(c=>(
                <td key={c}>
                  <button className={estadoGlobal[ref]?.[c] ? "ok" : "pendiente"}
                    onClick={()=>toggle(ref,c)}>
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
