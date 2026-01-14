export default function VistaGlobal({ estancias, estadoGlobal }) {

  let puntos = [];
  Object.entries(estancias).forEach(([key, e]) => {
    e.puntos.forEach(([el, ref]) => puntos.push([e.nombre, el, ref]));
  });

  return (
    <>
      <h2>🌐 VISTA GLOBAL DE TODA LA OBRA</h2>
      <table>
        <thead>
          <tr>
            <th>Estancia</th>
            <th>Elemento</th>
            <th>Ref</th>
            <th>🧰</th>
            <th>🔌</th>
            <th>🎛</th>
            <th>💻</th>
          </tr>
        </thead>
        <tbody>
          {puntos.map(([est, el, ref]) => {
            const p = estadoGlobal[ref] || {};
            return (
              <tr key={est + ref}>
                <td>{est}</td>
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
