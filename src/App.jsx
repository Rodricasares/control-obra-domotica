import TablaEstancia from "./components/TablaEstancia";

export default function App() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f1f5f9"
    }}>
      <TablaEstancia />
    </div>
  );
}
