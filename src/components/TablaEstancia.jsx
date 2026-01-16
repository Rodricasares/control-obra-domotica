export default function TablaEstancia() {
  return (
    <div style={{
      padding: 30,
      border: "4px solid red",
      borderRadius: 12,
      background: "white"
    }}>
      <h1>TEST SELECTOR</h1>

      <p>Si ves este selector, TODO FUNCIONA.</p>

      <select style={{
        padding: 10,
        fontSize: 16
      }}>
        <option>Downlight</option>
        <option>Pulsador</option>
        <option>Sensor</option>
        <option>Tira LED</option>
      </select>
    </div>
  );
}
