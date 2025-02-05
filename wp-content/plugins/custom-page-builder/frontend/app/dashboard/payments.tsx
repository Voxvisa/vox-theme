import { useEffect, useState } from "react";
import client from "@/app/api/aiGraphQL";
import { gql } from "@apollo/client";

interface Payment {
  id: number;
  amount: number;
  currency: string;
  payment_method: string;
  status: string;
  transaction_hash?: string;
  date: string;
}

const GET_PAYMENT_HISTORY = gql`
  query {
    payments {
      id
      amount
      currency
      payment_method
      status
      transaction_hash
      date
    }
  }
`;

export default function Payments() {
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    client
      .query({ query: GET_PAYMENT_HISTORY })
      .then((res) => setPayments(res.data.payments))
      .catch((err) => console.error("GraphQL Error:", err));
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold">💳 Betalingsgeschiedenis</h2>
      {/* Rest van de code */}
    </div>
  );
}
