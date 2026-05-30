import { GatewayCard } from "./components/organisms/GatewayCard/GatewayCard";
import { gatewayCardMock } from "./mocks/gatewayCard";

export default function App() {
  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "hsla(214, 8%, 96%, 1)" }}>
      <GatewayCard data={gatewayCardMock} />
    </div>
  );
}
