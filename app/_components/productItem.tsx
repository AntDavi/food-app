import { Prisma } from "@prisma/client";
import Image from "next/image";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { Badge } from "./ui/badge";
import { ArrowDownIcon } from "lucide-react";

interface ProductItemProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className="min-w-[150px] space-y-2">
      <div className="relative h-[150px] w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="rounded-md object-cover shadow-md"
        />

        {product.discountPercentage && (
          <Badge className="absolute left-2 top-2 rounded-sm bg-primary px-[5px] py-[3px]">
            <span className="flex items-center gap-[2px] text-xs font-semibold">
              <ArrowDownIcon size={12} />
              {product.discountPercentage}%
            </span>
          </Badge>
        )}
      </div>

      <div>
        <h2 className="truncate text-sm">{product.name}</h2>
        <div className="flex items-center gap-1">
          <h3 className="font-semibold">
            {formatCurrency(calculateProductTotalPrice(product))}
          </h3>
          {product.discountPercentage > 0 && (
            <span className="text-xs text-muted-foreground line-through">
              {formatCurrency(Number(product.price))}
            </span>
          )}
        </div>

        <span className="block text-xs text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>
    </div>
  );
};

export default ProductItem;
