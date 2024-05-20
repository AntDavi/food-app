import { Prisma } from "@prisma/client";
import ProductItem from "./productItem";

interface ProductListProps {
  products: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>[];
}

const ProductsList = ({ products }: ProductListProps) => {
  return (
    <div className="flex gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsList;
