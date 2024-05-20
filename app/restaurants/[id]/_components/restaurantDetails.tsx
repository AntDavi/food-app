import Image from "next/image";
import { Restaurant, Category, Product } from "@prisma/client";
import { StarIcon } from "lucide-react";
import { Badge } from "@/app/_components/ui/badge";
import DeliveryInfo from "@/app/_components/deliveryInfo";
import ProductsList from "@/app/_components/productsList";

interface RestaurantWithDetails extends Restaurant {
  products: Product[];
  categories: Category[];
}

interface RestaurantDetailsProps {
  restaurant: RestaurantWithDetails;
}

const RestaurantDetail = ({ restaurant }: RestaurantDetailsProps) => {
  return (
    <div className="relative z-50 mt-[-1rem] rounded-t-lg bg-white px-5">
      <div className="flex items-center justify-between pt-5">
        {/* Titulo */}
        <div className="flex items-center gap-2">
          <div className="relative h-8 w-8">
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <h1 className="text-xl font-semibold">{restaurant.name}</h1>
        </div>

        {/* Nota */}

        <Badge className="gap-1 rounded-md bg-foreground px-2 text-white">
          <StarIcon className="fill-yellow-500 text-yellow-500" size={14} />
          <span className="text-sm font-semibold">5.0</span>
        </Badge>
      </div>

      {/* Dados da Entrega */}

      <DeliveryInfo restaurant={restaurant} />

      {/* Tags */}

      <div className="mt-5 flex gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
        {/* Categories */}
        {restaurant.categories.map((category: Category) => (
          <Badge
            key={category.id}
            className="h-8 min-w-[167px] bg-[#f4f4f4] text-center hover:bg-transparent"
          >
            <span className="w-full text-xs text-muted-foreground">
              {category.name}
            </span>
          </Badge>
        ))}
      </div>

      {/* Mais pedidos */}
      {/* Todo Mostrar: produtos mais pedidos quando implementar realização de pedido
       */}
      <div className="mt-6 space-y-4">
        <h2 className="font-semibold">Mais Pedidos</h2>

        <ProductsList
          products={restaurant.products.map((product) => ({
            ...product,
            restaurant: { name: restaurant.name },
          }))}
        />
      </div>

      {/* Renderiza as categorias e os items de cada */}
      {restaurant.categories.map((category: Category) => (
        <div className="mt-6 space-y-4" key={category.id}>
          <h2 className="font-semibold">{category.name}</h2>
          <ProductsList products={category.products} />
        </div>
      ))}
    </div>
  );
};

export default RestaurantDetail;
