import "./App.css";
import { requestNotificationPermission } from "./utils/requestNotificationPermission";

function App() {
  return (
    <>
      <h1>Vite Push MVP</h1>
      <div className="card">
        <button
          onClick={() => {
            requestNotificationPermission();
          }}
        >
          Allow Push Notifications
        </button>
      </div>
    </>
  );
}

export default App;
