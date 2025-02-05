"use client";
import { useEffect, useState } from "react";
import client from "../api/aiGraphQL";
import { gql } from "@apollo/client";
import Sidebar from "../components/Sidebar";
import { Line } from "react-chartjs-2";

const GET_AI_DATA = gql`
  query {
    ai_performance {
      id
      date
      leads
      conversion_rate
      revenue
    }
  }
`;

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    client
      .query({ query: GET_AI_DATA })
      .then((res) => setData(res.data.ai_performance))
      .catch((err) => console.error("GraphQL Error:", err));
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold">📊 AI Quantum Dashboard</h1>
        <p className="text-lg text-gray-600 mt-2">
          Live AI-analyse van jouw leads, conversies en omzet.
        </p>
        {data && (
          <Line
            data={{
              labels: data.map((d) => d.date),
              datasets: [
                {
                  label: "Leads",
                  data: data.map((d) => d.leads),
                  borderColor: "#4F46E5",
                  backgroundColor: "rgba(79, 70, 229, 0.2)",
                },
                {
                  label: "Conversie (%)",
                  data: data.map((d) => d.conversion_rate),
                  borderColor: "#34D399",
                  backgroundColor: "rgba(52, 211, 153, 0.2)",
                },
                {
                  label: "Omzet (€)",
                  data: data.map((d) => d.revenue),
                  borderColor: "#F59E0B",
                  backgroundColor: "rgba(245, 158, 11, 0.2)",
                },
              ],
            }}
          />
        )}
      </div>
    </div>
  );
}
