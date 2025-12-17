# API Integration Guide

## Thiết lập API

### 1. Cài đặt Dependencies

```bash
npm install axios @tanstack/react-query
```

### 2. Cấu hình Environment

Tạo file `.env.local` trong thư mục `Frontend`:

```env
REACT_APP_API_URL=http://localhost:8080/api
```

### 3. Cấu trúc API

#### File cấu hình (`app/api/config.ts`)

- Định nghĩa BASE_URL, endpoints, error messages
- Tập trung quản lý tất cả các hằng số API

#### Axios Client (`app/api/axios.ts`)

- Tạo instance axios với interceptors
- Tự động thêm token vào request headers
- Xử lý lỗi 401 (token hết hạn)

#### Auth API (`app/api/auth.ts`)

- Định nghĩa các hàm gọi API: login, signup, logout
- Xuất các hooks: `useLogin`, `useSignup`, `useLogout`
- Tự động lưu token vào localStorage khi đăng nhập thành công

#### Error Handling (`app/api/error.ts`)

- Xử lý lỗi từ API response
- Map status code sang error messages

### 4. Sử dụng trong Components

#### Login Component (`app/routes/login.tsx`)

```tsx
import { useLogin, useSignup } from '../api/auth';

export default function Login() {
  const loginMutation = useLogin();
  const signupMutation = useSignup();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginMutation.mutateAsync({
        email: formData.email,
        password: formData.password,
      });
      // Đăng nhập thành công
      window.location.href = '/';
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra');
    }
  };

  const isLoading = loginMutation.isPending;

  return (
    // JSX...
  );
}
```

### 5. React Query Setup

#### QueryClient (`app/root.tsx`)

```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 phút
      gcTime: 1000 * 60 * 10, // 10 phút
    },
  },
});

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
```

### 6. Gọi API từ Backend

#### Endpoint Login

```
POST /api/auth/login
Body: {
  "email": "user@example.com",
  "password": "password123"
}
Response: {
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "fullName": "User Name"
  }
}
```

#### Endpoint Signup

```
POST /api/auth/signup
Body: {
  "fullName": "User Name",
  "email": "user@example.com",
  "password": "password123"
}
Response: {
  "id": "user_id",
  "email": "user@example.com",
  "fullName": "User Name"
}
```

### 7. Xử lý Token

- Token được lưu vào `localStorage.token` sau khi đăng nhập
- Tự động thêm vào header: `Authorization: Bearer <token>`
- Nếu token hết hạn (401), tự động xóa token và redirect đến trang login

### 8. Tạo Các Hooks Khác

#### Ví dụ: useGetProducts

```tsx
// app/api/products.ts
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import apiClient from "./axios";
import { API_ENDPOINTS } from "./config";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

export const useGetProducts = (): UseQueryResult<Product[], any> => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await apiClient.get<Product[]>(
        API_ENDPOINTS.PRODUCTS.LIST
      );
      return data;
    },
  });
};
```

#### Sử dụng trong Component

```tsx
import { useGetProducts } from "../api/products";

export default function ProductsPage() {
  const { data: products, isLoading, error } = useGetProducts();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {products?.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
```

### 9. Best Practices

1. **Centralize API calls** - Tất cả API calls nên ở trong `app/api/`
2. **Reusable hooks** - Sử dụng hooks (`useQuery`, `useMutation`) để tái sử dụng logic
3. **Error handling** - Luôn xử lý lỗi từ API
4. **Loading states** - Hiển thị loading indicator khi gọi API
5. **Token management** - Tự động quản lý token, refresh token khi hết hạn
6. **Type safety** - Định nghĩa types cho request/response

## CSS

Login page có styling đẹp với:

- Layout hai cột (bên trái hình minh họa, bên phải form)
- Animations mượt mà
- Responsive design cho mobile
- Màu xanh nhạt (turquoise) theme

File CSS: `app/routes/login.css`
