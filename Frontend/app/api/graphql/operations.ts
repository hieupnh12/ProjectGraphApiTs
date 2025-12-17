import { gql } from "@apollo/client";

// ============ Auth Queries ============

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        fullName
      }
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation Signup($fullName: String!, $email: String!, $password: String!) {
    signup(fullName: $fullName, email: $email, password: $password) {
      id
      email
      fullName
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout {
      success
      message
    }
  }
`;

export const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken {
    refreshToken {
      token
    }
  }
`;

export const GET_CURRENT_USER_QUERY = gql`
  query GetCurrentUser {
    currentUser {
      id
      email
      fullName
    }
  }
`;

// ============ Product Queries ============

export const GET_PRODUCTS_QUERY = gql`
  query GetProducts($limit: Int, $offset: Int, $search: String, $categoryId: ID) {
    products(limit: $limit, offset: $offset, search: $search, categoryId: $categoryId) {
      id
      name
      description
      price
      image
      stock
      categoryId
      category {
        id
        name
      }
    }
  }
`;

export const GET_PRODUCT_BY_ID_QUERY = gql`
  query GetProductById($id: ID!) {
    product(id: $id) {
      id
      name
      description
      price
      image
      stock
      categoryId
      category {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`;

// ============ Types for GraphQL Responses ============

export const GET_CATEGORIES_QUERY = gql`
  query GetCategories {
    categories {
      id
      name
      description
    }
  }
`;

export interface LoginMutationResponse {
  login: {
    token: string;
    user: {
      id: string;
      email: string;
      fullName: string;
    };
  };
}

export interface LoginMutationVariables {
  email: string;
  password: string;
}

export interface SignupMutationResponse {
  signup: {
    id: string;
    email: string;
    fullName: string;
  };
}

export interface SignupMutationVariables {
  fullName: string;
  email: string;
  password: string;
}

export interface LogoutMutationResponse {
  logout: {
    success: boolean;
    message: string;
  };
}

export interface CurrentUserQueryResponse {
  currentUser: {
    id: string;
    email: string;
    fullName: string;
  };
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  stock?: number;
  categoryId?: string;
  category?: {
    id: string;
    name: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface GetProductsQueryResponse {
  products: Product[];
}

export interface GetProductsQueryVariables {
  limit?: number;
   offset?: number;
  search?: string;
  categoryId?: string;
}

export interface GetProductByIdQueryResponse {
  product: Product;
}

export interface GetProductByIdQueryVariables {
  id: string;
}
