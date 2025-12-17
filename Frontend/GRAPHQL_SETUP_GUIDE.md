# GraphQL Integration Guide

## Thiết lập GraphQL với Apollo Client

### 1. Cài đặt Dependencies

```bash
npm install @apollo/client graphql
```

### 2. Cấu hình Environment

Thêm vào `.env.local`:

```env
REACT_APP_GRAPHQL_URL=http://localhost:8080/graphql
```

### 3. Cấu trúc GraphQL

#### Apollo Client Setup (`app/api/graphql/client.ts`)

- Tạo Apollo client instance
- Cấu hình authentication link (tự động thêm token)
- Cấu hình HTTP link đến GraphQL endpoint
- Cài đặt caching policy

#### GraphQL Operations (`app/api/graphql/operations.ts`)

- Định nghĩa tất cả queries và mutations
- Export các types TypeScript tương ứng
- Bao gồm auth, products, và các operations khác

#### Custom Hooks (`app/api/graphql/hooks.ts`)

- `useGraphQLLogin()` - Đăng nhập
- `useGraphQLSignup()` - Đăng ký
- `useGraphQLLogout()` - Đăng xuất
- `useGraphQLCurrentUser()` - Lấy thông tin user hiện tại
- `useGraphQLProducts()` - Lấy danh sách products
- `useGraphQLProductById()` - Lấy product theo ID

#### Root Setup (`app/root.tsx`)

- Wrap app với `ApolloProvider`
- Cấu hình cùng với React Query

### 4. Sử dụng GraphQL trong Component

#### Đăng nhập với GraphQL

```tsx
import { useGraphQLLogin } from "../api/graphql/hooks";

export default function LoginPage() {
  const { login, loading, error } = useGraphQLLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await login(email, password);
      if (result.data) {
        // Đăng nhập thành công
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
      {error && <p>Error: {error.message}</p>}
    </form>
  );
}
```

#### Lấy danh sách Products

```tsx
import { useGraphQLProducts } from "../api/graphql/hooks";

export default function ProductsPage() {
  const { products, loading, error } = useGraphQLProducts(10, 0);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {products?.map((product) => (
        <li key={product.id}>
          {product.name} - ${product.price}
        </li>
      ))}
    </ul>
  );
}
```

#### Lấy Product theo ID

```tsx
import { useGraphQLProductById } from "../api/graphql/hooks";

export default function ProductDetail({ productId }: { productId: string }) {
  const { product, loading, error } = useGraphQLProductById(productId);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{product?.name}</h1>
      <p>{product?.description}</p>
      <p>Price: ${product?.price}</p>
    </div>
  );
}
```

### 5. Backend GraphQL Schema Requirement

Backend cần cung cấp GraphQL schema tương tự:

```graphql
type User {
  id: ID!
  email: String!
  fullName: String!
}

type AuthPayload {
  token: String!
  user: User!
}

type Product {
  id: ID!
  name: String!
  description: String
  price: Float!
  image: String
}

type Query {
  currentUser: User
  products(limit: Int, offset: Int): [Product!]!
  product(id: ID!): Product
}

type Mutation {
  login(email: String!, password: String!): AuthPayload!
  signup(fullName: String!, email: String!, password: String!): User!
  logout: LogoutPayload!
  refreshToken: AuthPayload!
}

type LogoutPayload {
  success: Boolean!
  message: String!
}
```

### 6. Authentication

- Token tự động được thêm vào mỗi request bằng `authLink`
- Token được lấy từ `localStorage.token`
- Nếu mutation login thành công, token được lưu vào localStorage
- Logout xóa token từ localStorage

### 7. Caching

Apollo Client cache được cấu hình với:

- `fetchPolicy: 'cache-first'` cho queries - sử dụng cache nếu có
- `fetchPolicy: 'cache-and-network'` cho watch queries - fetch từ network song song

### 8. So sánh REST API vs GraphQL

#### REST API (sử dụng Axios + React Query)

```tsx
// app/api/auth.ts
export const useLogin = () => {
  return useMutation({
    mutationFn: (credentials: LoginRequest) => authAPI.login(credentials),
  });
};

// Component
const loginMutation = useLogin();
await loginMutation.mutateAsync({ email, password });
```

#### GraphQL API (sử dụng Apollo Client)

```tsx
// app/api/graphql/hooks.ts
export const useGraphQLLogin = () => {
  const [login, { loading, error, data }] = useMutation(LOGIN_MUTATION);
  return { login, loading, error, data };
};

// Component
const { login } = useGraphQLLogin();
await login({ variables: { email, password } });
```

### 9. Sử dụng Cả REST API và GraphQL

Bạn có thể sử dụng cả hai:

```tsx
// Nếu backend hỗ trợ cả REST và GraphQL
import { useLogin } from "../api/auth"; // REST
import { useGraphQLLogin } from "../api/graphql/hooks"; // GraphQL

// Chọn loại nào để dùng
const isUsingGraphQL = process.env.REACT_APP_USE_GRAPHQL === "true";

const loginMutation = isUsingGraphQL ? useGraphQLLogin() : useLogin();
```

### 10. Next Steps

1. Cài đặt dependencies: `npm install`
2. Cấu hình `.env.local` với GraphQL endpoint
3. Tạo GraphQL schema trên backend
4. Thay thế REST API calls bằng GraphQL hooks
5. Test các mutations và queries
