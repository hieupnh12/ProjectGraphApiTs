import { ApolloClient, InMemoryCache } from "@apollo/client";
import { HttpLink } from "@apollo/client/link/http";
import { ApolloLink } from "@apollo/client/link";

const API_URL =
  process.env.REACT_APP_GRAPHQL_URL || "http://localhost:8080/graphql";

// Create HTTP link
const httpLink = new HttpLink({
  uri: API_URL,
  credentials: "include",
});

// Create auth link to add token to requests
const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("token");

  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  return forward(operation);
});

// Create Apollo client
export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
    query: {
      fetchPolicy: "cache-first",
    },
  },
});

export default apolloClient;
