import { useState } from "react";
import "./App.css";
import { requestNotificationPermission } from "./utils/requestNotificationPermission";
import { startCampaign } from "./utils/startCampaignRequest";

function App() {
  const [amount, setAmount] = useState(1);
  const [delay, setDelay] = useState(1000);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`💬 Campaign: amount = ${amount}, delay = ${delay}ms`);
    startCampaign({ amount, delay });
  };

  return (
    <>
      <h1>Vite Push MVP</h1>
      <button
        onClick={() => {
          requestNotificationPermission();
        }}
      >
        Allow Push Notifications
      </button>
      <div className="card">
        <label>
          Amount:{" "}
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            min={1}
          />
        </label>
        <br />
        <label>
          Delay (ms):{" "}
          <input
            type="number"
            value={delay}
            onChange={(e) => setDelay(Number(e.target.value))}
            min={0}
          />
        </label>
        <br />

        <hr />
        <form onSubmit={handleSubmit}>
          <button type="submit">Start campaign</button>
        </form>
      </div>
    </>
  );
}

export default App;
