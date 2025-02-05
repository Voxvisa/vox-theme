import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// 🔹 Zorg dat de juiste URL uit .env.local wordt gehaald
const GRAPHQL_API_URL = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string;
const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET as string;

// 🔹 HTTP Link instellen voor GraphQL API
const httpLink = new HttpLink({
  uri: GRAPHQL_API_URL,
});

// 🔹 Auth Middleware om Hasura Admin Secret mee te sturen
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "x-hasura-admin-secret": HASURA_ADMIN_SECRET, // ✅ Zorgt voor geauthenticeerde requests
    },
  };
});

// 🔹 Apollo Client Initialisatie
const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
  connectToDevTools: true, // ✅ Maakt debugging makkelijker
});

export default client;
