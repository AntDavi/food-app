"use client";

import Image from "next/image";
import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/app/_helpers/price";
import DiscountBadge from "@/app/_components/discountBadge";
import { Prisma } from "@prisma/client";
import { Button } from "@/app/_components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import ProductsList from "@/app/_components/productsList";
import DeliveryInfo from "@/app/_components/deliveryInfo";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>[];
}

const ProductDetails = ({
  product,
  complementaryProducts,
}: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantity = () =>
    setQuantity((currentState) => currentState + 1);
  const handleDecreaseQuantity = () =>
    setQuantity((currentState) => {
      if (currentState === 1) return 1;
      return currentState - 1;
    });

  return (
    <div className="relative z-50 mt-[-1rem] rounded-t-lg bg-white py-5">
      <div className="flex items-center gap-2 px-5">
        <div className="relative h-6 w-6">
          <Image
            src={product.restaurant.imageUrl}
            alt={product.restaurant.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <span className="text-sm text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>

      <h1 className="mb-2 mt-1 px-5 text-xl font-semibold">{product.name}</h1>

      <div className="flex justify-between px-5">
        {/* Preço Produto */}

        <div className="">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">
              {formatCurrency(calculateProductTotalPrice(product))}
            </h2>
            {product.discountPercentage > 0 && (
              <DiscountBadge product={product} />
            )}
          </div>
          {product.discountPercentage > 0 && (
            <p className="text-muted-foregorund text-sm">
              De: {formatCurrency(Number(product.price))}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3 text-center">
          <Button
            size="icon"
            variant="ghost"
            className="border border-solid border-muted-foreground"
            onClick={handleDecreaseQuantity}
          >
            <ChevronLeftIcon />
          </Button>
          <span className="w-4">{quantity}</span>
          <Button size="icon" onClick={handleIncreaseQuantity}>
            <ChevronRightIcon />
          </Button>
        </div>
      </div>

      {/* Dados da Entrega */}

      <div className="px-5">
        <DeliveryInfo restaurant={product.restaurant} />
      </div>

      {/* Descrição */}

      <div className="mt-6 space-y-3 px-5">
        <h3 className="font-semibold">Sobre</h3>
        <p className="text-muted-foregorund text-sm">{product.description}</p>
      </div>

      {/* Outros itens */}
      <div className="mt-6 space-y-3">
        <h3 className="px-5 font-semibold">Sucos</h3>
        <ProductsList products={complementaryProducts} />
      </div>
    </div>
  );
};

export default ProductDetails;
