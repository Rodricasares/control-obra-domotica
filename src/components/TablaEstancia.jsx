import { useState } from "react";

export default function TablaEstancia({ estancia, estanciaKey, estancias, setEstancias, estadoGlobal, setEstadoGlobal }) {

  const [nuevo, setNuevo] = useState({ el:"", ref:"" });
  const [edit, setEdit] = useState(null);

  const toggle = (ref, campo) => {
    setEstadoGlobal({
      ...estadoGlobal,
      [ref]: { ...estadoGlobal[ref], [campo]: !estadoGlobal[ref]?.[campo] }
    });
  };

  const add = () => {
    if (!nuevo.el || !nuevo.ref) return;
    const copia = {...estancias};
    copia[estanciaKey].puntos.push([nuevo.el, nuevo.ref]);
    setEstancias(copia);
    setNuevo({ el:"", ref:"" });
  };

  const save = (i) => {
    const copia = {...estancias};
    copia[estanciaKey].puntos[i] = [edit.el, edit.ref];
    setEstancias(copia);
    setEdit(null);
  };

  return (
    <>
      <h2>{estancia.nombre}</h2>

      <div className="add-bar">
        <input placeholder="Elemento" value={nuevo.el}
          onChange={e=>setNuevo({...nuevo,el:e.target.value})}/>
        <input placeholder="Referencia" value={nuevo.ref}
          onChange={e=>setNuevo({...nuevo,ref:e.target.value})}/>
        <button className="btn-add" onClick={add}>➕ Añadir punto</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Elemento</th><th>Ref</th>
            <th>🧰</th><th>🔌</th><th>🎛</th><th>💻</th><th></th>
          </tr>
        </thead>
        <tbody>
          {estancia.puntos.map(([el, ref], i) => (
            <tr key={estanciaKey + ref}>
              <td>{edit?.i===i ? <input value={edit.el} onChange={e=>setEdit({...edit,el:e.target.value})}/> : el}</td>
              <td>{edit?.i===i ? <input value={edit.ref} onChange={e=>setEdit({...edit,ref:e.target.value})}/> : ref}</td>
              {["tubo","cable","mecanismo","prog"].map(c => (
                <td key={c}>
                  <button className={estadoGlobal[ref]?.[c] ? "ok" : "pendiente"} onClick={() => toggle(ref, c)}>
                    {estadoGlobal[ref]?.[c] ? "✔" : "—"}
                  </button>
                </td>
              ))}
              <td>
                {edit?.i===i
                  ? <button className="btn-save" onClick={()=>save(i)}>💾</button>
                  : <button className="btn-edit" onClick={()=>setEdit({i,el,ref})}>✏️</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
