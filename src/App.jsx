import { useState, useEffect } from "react";
import { baseEstancias } from "./data/estancias";
import TablaEstancia from "./components/TablaEstancia";
import VistaGlobal from "./components/VistaGlobal";
import "./App.css";

export default function App() {

  const [obras, setObras] = useState(() => {
    const saved = localStorage.getItem("obrasData");
    return saved ? JSON.parse(saved) : {
      "Poniente": {
        estancias: JSON.parse(JSON.stringify(baseEstancias)),
        estadoGlobal: {}
      }
    };
  });

  const [obraActual, setObraActual] = useState("Poniente");
  const obra = obras[obraActual];

  useEffect(() => {
    localStorage.setItem("obrasData", JSON.stringify(obras));
  }, [obras]);

  const crearObra = () => {
    const nombre = prompt("Nombre de la nueva obra:");
    if (!nombre || obras[nombre]) return;
    setObras({
      ...obras,
      [nombre]: {
        estancias: JSON.parse(JSON.stringify(baseEstancias)),
        estadoGlobal: {}
      }
    });
    setObraActual(nombre);
  };

  const progresoTotal = () => {
    let total = 0, hechos = 0;
    Object.values(obra.estancias).forEach(e => {
      e.puntos.forEach(([_, ref]) => {
        total += 4;
        const p = obra.estadoGlobal[ref];
        if (p) {
          if (p.tubo) hechos++;
          if (p.cable) hechos++;
          if (p.mecanismo) hechos++;
          if (p.prog) hechos++;
        }
      });
    });
    return total ? Math.round((hechos / total) * 100) : 0;
  };

  const progresoEstancia = (k) => {
    let total = 0, hechos = 0;
    obra.estancias[k].puntos.forEach(([_, ref]) => {
      total += 4;
      const p = obra.estadoGlobal[ref];
      if (p) {
        if (p.tubo) hechos++;
        if (p.cable) hechos++;
        if (p.mecanismo) hechos++;
        if (p.prog) hechos++;
      }
    });
    return total ? Math.round((hechos / total) * 100) : 0;
  };

  const [actual, setActual] = useState(Object.keys(obra.estancias)[0]);

  return (
    <div className="app">
      <div className="panel">

        <div className="topbar">
          <div>
            <div className="progress-title">
              🏗 OBRA: {obraActual} — <strong>{progresoTotal()}%</strong>
            </div>
            <div className="progress">
              <div className="progress-bar" style={{width: progresoTotal()+"%"}}/>
            </div>

            {actual !== "GLOBAL" && (
              <>
                <div className="progress-title" style={{marginTop:10}}>
                  📍 {obra.estancias[actual].nombre}: <strong>{progresoEstancia(actual)}%</strong>
                </div>
                <div className="progress blue">
                  <div className="progress-bar blue" style={{width: progresoEstancia(actual)+"%"}}/>
                </div>
              </>
            )}
          </div>

          <div style={{display:"flex",gap:8}}>
            <button className="btn-global" onClick={()=>setActual(actual==="GLOBAL"?Object.keys(obra.estancias)[0]:"GLOBAL")}>
              {actual==="GLOBAL"?"⬅ Volver":"🌐 Vista Global"}
            </button>
            <button className="btn-add" onClick={crearObra}>➕ Nueva obra</button>
          </div>
        </div>

        <select className="selector" value={obraActual} onChange={e=>setObraActual(e.target.value)}>
          {Object.keys(obras).map(o=><option key={o}>{o}</option>)}
        </select>

        {actual!=="GLOBAL" && (
          <select className="selector" value={actual} onChange={e=>setActual(e.target.value)}>
            {Object.keys(obra.estancias).map(k=>(
              <option key={k} value={k}>{obra.estancias[k].nombre}</option>
            ))}
          </select>
        )}

        {actual==="GLOBAL"
          ? <VistaGlobal estancias={obra.estancias} estadoGlobal={obra.estadoGlobal}/>
          : <TablaEstancia
              estanciaKey={actual}
              estancia={obra.estancias[actual]}
              estancias={obra.estancias}
              setEstancias={est => setObras({...obras,[obraActual]:{...obra,estancias:est}})}
              estadoGlobal={obra.estadoGlobal}
              setEstadoGlobal={eg => setObras({...obras,[obraActual]:{...obra,estadoGlobal:eg}})}
            />
        }
      </div>
    </div>
  );
}
