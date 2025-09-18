import { variables } from "./vars";

export async function startCampaign(params: { amount: number; delay: number }) {
  fetch(variables.BACKEND_URL + "/campaigns", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
}
