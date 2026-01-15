import { useState } from "react";
import { catalogo } from "../data/catalogo";

export default function TablaEstancia({ estancia, estanciaKey, estancias, setEstancias, estadoGlobal, setEstadoGlobal }) {

  const [nuevo, setNuevo] = useState({ cod:"DL01", ref:"", qty:1 });
  const [edit, setEdit] = useState(null);

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

  const save = (i) => {
    const copia = {...estancias};
    copia[estanciaKey].puntos[i] = [edit.cod, edit.ref, edit.qty];
    setEstancias(copia);
    setEdit(null);
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
            <th>🧰</th><th>🔌</th><th>🎛</th><th>💻</th><th></th>
          </tr>
        </thead>
        <tbody>
          {estancia.puntos.map(([cod, ref, qty], i) => (
            <tr key={estanciaKey + ref}>
              <td data-label="Material">{catalogo[cod]?.nombre}</td>
              <td data-label="Ref">{ref}</td>
              <td data-label="Cant">{qty}</td>

              {["tubo","cable","mecanismo","prog"].map(c => (
                <td key={c} data-label={c}>
                  <button className={estadoGlobal[ref]?.[c] ? "ok" : "pendiente"} onClick={() => toggle(ref, c)}>
                    {estadoGlobal[ref]?.[c] ? "✔" : "—"}
                  </button>
                </td>
              ))}
              <td>
                <button className="btn-edit" onClick={()=>setEdit({i,cod,ref,qty})}>✏️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
