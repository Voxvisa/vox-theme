import { useEffect, useState } from "react";
import client from "../api/aiGraphQL";
import { gql } from "@apollo/client";

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
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    client
      .query({ query: GET_PAYMENT_HISTORY })
      .then((res) => setPayments(res.data.payments))
      .catch((err) => console.error("GraphQL Error:", err));
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold">💳 Betalingsgeschiedenis</h2>
      <table className="table-auto w-full mt-4">
        <thead>
          <tr>
            <th>Bedrag</th>
            <th>Valuta</th>
            <th>Betaalmethode</th>
            <th>Status</th>
            <th>Transactie</th>
            <th>Datum</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>€ {payment.amount}</td>
              <td>{payment.currency}</td>
              <td>{payment.payment_method}</td>
              <td>{payment.status}</td>
              <td>{payment.transaction_hash ? <a href={`https://etherscan.io/tx/${payment.transaction_hash}`} target="_blank">🔗 Bekijk</a> : "N/A"}</td>
              <td>{payment.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
