import client from "./aiGraphQL";
import { gql } from "@apollo/client";

const GET_OPTIMAL_PRICE = gql`
  query GetOptimalPrice($user_id: uuid!, $currency: text!) {
    ai_price_optimization(where: { user_id: { _eq: $user_id }, currency: { _eq: $currency } }) {
      price
    }
  }
`;

export async function fetchOptimalPrice(userId: string, currency: string) {
  try {
    const response = await client.query({
      query: GET_OPTIMAL_PRICE,
      variables: { user_id: userId, currency },
    });

    return response.data.ai_price_optimization[0]?.price || "Prijs niet beschikbaar";
  } catch (error) {
    console.error("⚠️ AI Pricing Error:", error);
    return "Prijsberekening niet beschikbaar.";
  }
}
