export default function VistaGlobal({ estancias, estadoGlobal }) {

  let puntos = [];
  Object.values(estancias).forEach(e => {
    e.puntos.forEach(([el, ref]) => puntos.push([e.nombre, el, ref]));
  });

  return (
    <>
      <h2 className="estancia-title">🌐 TODAS LAS ESTANCIAS</h2>

      <table>
        <thead>
          <tr>
            <th>Estancia</th>
            <th>Elemento</th>
            <th>Ref</th>
            <th className="col-tech">🧰<span>Tubo</span></th>
            <th className="col-tech">🔌<span>Cable</span></th>
            <th className="col-tech">🎛<span>Mecanismo</span></th>
            <th className="col-tech">💻<span>Programación</span></th>
          </tr>
        </thead>
        <tbody>
          {puntos.map(([est, el, ref]) => {
            const p = estadoGlobal[ref] || {};
            return (
              <tr key={est + ref}>
                <td><strong>{est}</strong></td>
                <td>{el}</td>
                <td>{ref}</td>
                {["tubo","cable","mecanismo","prog"].map(c => (
                  <td key={c}>{p[c] ? "✔" : "—"}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
