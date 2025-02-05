import { useEffect, useState } from "react";
import client from "../api/aiGraphQL";
import { gql } from "@apollo/client";

const GET_CLIENT_DATA = gql`
  query {
    clients {
      id
      name
      total_spend
      last_interaction
      recommended_strategy
    }
  }
`;

export default function ClientData() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    client
      .query({ query: GET_CLIENT_DATA })
      .then((res) => setClients(res.data.clients))
      .catch((err) => console.error("GraphQL Error:", err));
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold">👥 Klantgegevens</h2>
      <table className="table-auto w-full mt-4">
        <thead>
          <tr>
            <th>Naam</th>
            <th>Totale Uitgaven (€)</th>
            <th>Laatste Interactie</th>
            <th>AI Aanbeveling</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>€ {client.total_spend}</td>
              <td>{client.last_interaction}</td>
              <td>{client.recommended_strategy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
