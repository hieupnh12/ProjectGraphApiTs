import React from "react";
import { ProductService } from "../service";
import ProductCard from "../components/ProductCard";

function ProductsList() {
  const { products, loading, error } = ProductService.useProducts(20, 0);
  
  if (loading) {
    return (
      <main className="container mx-auto p-4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container mx-auto p-4">
        <div className="text-center text-red-600">
          Có lỗi khi tải sản phẩm: {error.message}
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Sản phẩm</h1>
      {products.length === 0 ? (
        <div className="text-center text-gray-500">
          Không có sản phẩm nào
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}

export default function ProductsPage() {
  return <ProductsList />;
}
