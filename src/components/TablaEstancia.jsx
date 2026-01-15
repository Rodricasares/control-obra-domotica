import { useState } from "react";

export default function TablaEstancia({ estancia, estanciaKey, estancias, setEstancias, estadoGlobal, setEstadoGlobal }) {

  const [nuevo, setNuevo] = useState({ el:"", ref:"", qty:1 });
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
    copia[estanciaKey].puntos.push([nuevo.el, nuevo.ref, nuevo.qty]);
    setEstancias(copia);
    setNuevo({ el:"", ref:"", qty:1 });
  };

  const save = (i) => {
    const copia = {...estancias};
    copia[estanciaKey].puntos[i] = [edit.el, edit.ref, edit.qty];
    setEstancias(copia);
    setEdit(null);
  };

  return (
    <>
      <h2 className="estancia-title">📍 {estancia.nombre}</h2>

      <div className="add-bar">
        <input placeholder="Elemento" value={nuevo.el}
          onChange={e=>setNuevo({...nuevo,el:e.target.value})}/>
        <input placeholder="Ref" value={nuevo.ref}
          onChange={e=>setNuevo({...nuevo,ref:e.target.value})}/>
        <input type="number" min="1" value={nuevo.qty}
          onChange={e=>setNuevo({...nuevo,qty:parseInt(e.target.value)})}/>
        <button className="btn-add" onClick={add}>➕ Añadir</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Elemento</th><th>Ref</th><th>Cant.</th>
            <th>🧰 Tubo</th><th>🔌 Cable</th><th>🎛 Mecanismo</th><th>💻 Prog</th><th></th>
          </tr>
        </thead>
        <tbody>
          {estancia.puntos.map(([el, ref, qty], i) => (
            <tr key={estanciaKey + ref}>
              <td data-label="Elemento">{edit?.i===i ? <input value={edit.el} onChange={e=>setEdit({...edit,el:e.target.value})}/> : el}</td>
              <td data-label="Ref">{edit?.i===i ? <input value={edit.ref} onChange={e=>setEdit({...edit,ref:e.target.value})}/> : ref}</td>
              <td data-label="Cantidad">{edit?.i===i ? <input type="number" value={edit.qty} onChange={e=>setEdit({...edit,qty:parseInt(e.target.value)})}/> : qty}</td>

              {["tubo","cable","mecanismo","prog"].map(c => (
                <td key={c} data-label={c}>
                  <button className={estadoGlobal[ref]?.[c] ? "ok" : "pendiente"} onClick={() => toggle(ref, c)}>
                    {estadoGlobal[ref]?.[c] ? "✔" : "—"}
                  </button>
                </td>
              ))}

              <td data-label="Editar">
                {edit?.i===i
                  ? <button className="btn-save" onClick={()=>save(i)}>💾</button>
                  : <button className="btn-edit" onClick={()=>setEdit({i,el,ref,qty})}>✏️</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
