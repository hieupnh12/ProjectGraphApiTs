import {
  useGraphQLProducts,
  useGraphQLProductById,
} from "../api/graphql/hooks";
import type { Product } from "../api/graphql/operations";

export class ProductService {
  // Lấy danh sách sản phẩm với phân trang
  static useProducts(
    limit?: number,
    offset?: number,
    search?: string,
    categoryId?: string
  ) {
    const { products, loading, error, refetch, fetchMore } = useGraphQLProducts(
      limit,
      offset,
    );

    return {
      products: products || [],
      loading,
      error,
      refetch,
      fetchMore,
    };
  }

  // Lấy chi tiết sản phẩm theo ID
  static useProduct(id: string) {
    const { product, loading, error, refetch } = useGraphQLProductById(id);

    return {
      product,
      loading,
      error,
      refetch,
    };
  }

  // Tìm kiếm sản phẩm
  static useSearchProducts(
    searchTerm: string,
    limit?: number,
    offset?: number
  ) {
    const { products, loading, error, refetch } = useGraphQLProducts(
      limit,
      offset,
    );

    return {
      products: products || [],
      loading,
      error,
      refetch,
    };
  }

  // Lấy sản phẩm theo danh mục
  static useProductsByCategory(
    categoryId: string,
    limit?: number,
    offset?: number
  ) {
    const { products, loading, error, refetch } = useGraphQLProducts(
      limit,
      offset,
    );

    return {
      products: products || [],
      loading,
      error,
      refetch,
    };
  }
}

// Utility functions
export const productUtils = {
  formatPrice: (price: number): string => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  },

  getImageUrl: (image?: string): string => {
    return image || "/placeholder-product.jpg";
  },

  isInStock: (product: Product): boolean => {
    return (product.stock || 0) > 0;
  },

  getStockStatus: (product: Product): string => {
    const stock = product.stock || 0;
    if (stock > 10) return "Còn hàng";
    if (stock > 0) return "Sắp hết hàng";
    return "Hết hàng";
  },
};
