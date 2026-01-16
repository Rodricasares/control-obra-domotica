export default function TablaEstancia() {
  return (
    <div style={{
      padding: "20px",
      border: "3px solid red",
      borderRadius: "10px",
      background: "#fff"
    }}>
      <h2>TEST SELECTOR FUNCIONANDO</h2>

      <p>Si ves este texto y el desplegable de abajo, el selector FUNCIONA.</p>

      <select style={{
        padding: "10px",
        fontSize: "16px",
        marginTop: "10px"
      }}>
        <option value="downlight">Downlight</option>
        <option value="pulsador">Pulsador</option>
        <option value="sensor">Sensor</option>
        <option value="tira_led">Tira LED</option>
      </select>
    </div>
  );
}
