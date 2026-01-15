export default function Material({ estancias }) {

  const resumen = {};

  Object.values(estancias).forEach(e => {
    e.puntos.forEach(([el, , qty]) => {
      resumen[el] = (resumen[el] || 0) + (qty || 1);
    });
  });

  return (
    <>
      <h2 className="estancia-title">📦 MATERIAL TOTAL DE LA OBRA</h2>
      <table>
        <thead>
          <tr>
            <th>Elemento</th>
            <th>Cantidad total</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(resumen).map(([el, qty]) => (
            <tr key={el}>
              <td>{el}</td>
              <td>{qty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
