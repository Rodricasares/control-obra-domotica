import { useState, useEffect } from "react";
import { baseEstancias } from "./data/estancias";
import TablaEstancia from "./components/TablaEstancia";
import VistaGlobal from "./components/VistaGlobal";
import "./App.css";

export default function App() {
  const [estancias, setEstancias] = useState(() => {
    const saved = localStorage.getItem("estanciasEdit");
    return saved ? JSON.parse(saved) : baseEstancias;
  });

  const [actual, setActual] = useState("salon");
  const [estadoGlobal, setEstadoGlobal] = useState(() => {
    const saved = localStorage.getItem("estadoObra");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("estadoObra", JSON.stringify(estadoGlobal));
    localStorage.setItem("estanciasEdit", JSON.stringify(estancias));
  }, [estadoGlobal, estancias]);

  const progresoTotal = () => {
    let total = 0, hechos = 0;
    Object.values(estancias).forEach(e => {
      e.puntos.forEach(([_, ref]) => {
        total += 4;
        const p = estadoGlobal[ref];
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

  const progresoEstancia = () => {
    let total = 0, hechos = 0;
    estancias[actual]?.puntos.forEach(([_, ref]) => {
      total += 4;
      const p = estadoGlobal[ref];
      if (p) {
        if (p.tubo) hechos++;
        if (p.cable) hechos++;
        if (p.mecanismo) hechos++;
        if (p.prog) hechos++;
      }
    });
    return total ? Math.round((hechos / total) * 100) : 0;
  };

  return (
    <div className="app">
      <div className="panel">

        <div className="topbar">
          <div>
            <div className="progress-title">
              🏗 OBRA TOTAL: <strong>{progresoTotal()}%</strong>
            </div>
            <div className="progress">
              <div className="progress-bar" style={{width: progresoTotal()+"%"}}/>
            </div>

            {actual !== "GLOBAL" && (
              <>
                <div className="progress-title" style={{marginTop:10}}>
                  📍 ESTA ESTANCIA: <strong>{progresoEstancia()}%</strong>
                </div>
                <div className="progress blue">
                  <div className="progress-bar blue" style={{width: progresoEstancia()+"%"}}/>
                </div>
              </>
            )}
          </div>

          {actual === "GLOBAL" ? (
            <button className="btn-global" onClick={()=>setActual("salon")}>⬅ Volver</button>
          ) : (
            <button className="btn-global" onClick={()=>setActual("GLOBAL")}>🌐 Vista Global</button>
          )}
        </div>

        {actual !== "GLOBAL" && (
          <select className="selector" value={actual} onChange={e => setActual(e.target.value)}>
            {Object.keys(estancias).map(k => (
              <option key={k} value={k}>{estancias[k].nombre}</option>
            ))}
          </select>
        )}

        {actual === "GLOBAL" ? (
          <VistaGlobal estancias={estancias} estadoGlobal={estadoGlobal}/>
        ) : (
          <TablaEstancia
            estanciaKey={actual}
            estancia={estancias[actual]}
            estancias={estancias}
            setEstancias={setEstancias}
            estadoGlobal={estadoGlobal}
            setEstadoGlobal={setEstadoGlobal}
          />
        )}
      </div>
    </div>
  );
}
