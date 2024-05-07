import { ArrowDownIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { Product } from "@prisma/client";

interface DiscountBadgeProps {
  product: Pick<Product, "discountPercentage">;
}

const DiscountBadge = ({ product }: DiscountBadgeProps) => {
  return (
    <Badge className="flex items-center gap-[2px] rounded-sm bg-primary px-2 py-1 text-white">
      <span className="flex items-center gap-[2px] text-xs font-semibold">
        <ArrowDownIcon size={12} />
        {product.discountPercentage}%
      </span>
    </Badge>
  );
};

export default DiscountBadge;
