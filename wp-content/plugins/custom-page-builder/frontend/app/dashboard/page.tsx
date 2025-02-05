"use client";

import { useEffect, useState } from "react";
import client from "@/api/aiGraphQL";
import { gql } from "@apollo/client";
import Sidebar from "@/components/Sidebar";
import { Line } from "react-chartjs-2";

// TypeScript-interface voor veilige data
interface AIPerformance {
  id: number;
  date: string;
  leads: number;
  conversion_rate: number;
  revenue: number;
}

// GraphQL Query
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
  const [data, setData] = useState<AIPerformance[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    client
      .query({ query: GET_AI_DATA })
      .then((res) => {
        setData(res.data.ai_performance);
        setLoading(false);
      })
      .catch((err) => {
        console.error("GraphQL Error:", err);
        setError("⚠️ Fout bij het laden van AI-gegevens.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-800">📊 AI Quantum Dashboard</h1>
        <p className="text-lg text-gray-600 mt-2">
          Live AI-analyse van leads, conversies en omzet.
        </p>

        {/* Loading en Error Handling */}
        {loading && <p className="text-blue-500 mt-4">🔄 Gegevens laden...</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {/* Graph als data beschikbaar is */}
        {data && (
          <div className="mt-6 bg-white p-6 rounded-xl shadow-lg">
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
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
