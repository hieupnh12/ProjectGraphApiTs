import React from "react";
import { Link } from "react-router-dom";
import { productUtils } from "../service";
import type { Product } from "../api/graphql/operations";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="border rounded-md overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
      <img
        src={productUtils.getImageUrl(product.image)}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-2">{product.description}</p>
        <p className="text-xl font-bold text-blue-600 mb-2">
          {productUtils.formatPrice(product.price)}
        </p>
        <div className="flex items-center justify-between mb-3">
          <span className={`text-sm px-2 py-1 rounded ${
            productUtils.isInStock(product) 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {productUtils.getStockStatus(product)}
          </span>
        </div>
        <div className="flex gap-2">
          <Link
            to={`/products/${product.id}`}
            className="flex-1 px-3 py-2 bg-blue-600 text-white text-center rounded-md hover:bg-blue-700 transition-colors"
          >
            Xem chi tiết
          </Link>
        </div>
      </div>
    </article>
  );
}
