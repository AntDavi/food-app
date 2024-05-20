import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./_components/restaurantImage";
import Image from "next/image";
import { Badge } from "@/app/_components/ui/badge";
import { StarIcon } from "lucide-react";
import DeliveryInfo from "@/app/_components/deliveryInfo";
import ProductsList from "@/app/_components/productsList";
// import RestaurantDetail from "./_components/restaurantDetails";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id: id,
    },
    include: {
      categories: {
        include: {
          products: {
            where: {
              restauranteId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!restaurant) {
    return notFound();
  }

  console.log("Restaurant:", restaurant);

  return (
    <div>
      <RestaurantImage restaurant={restaurant} />

      {/* <RestaurantDetail restaurant={restaurant} /> */}

      {/* Restaurant Detail */}

      <div className="relative z-50 mt-[-1rem] rounded-t-lg bg-white px-5">
        <div className="flex items-center justify-between pt-5 ">
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

        <DeliveryInfo restaurant={restaurant} />

        <div className="mt-5 flex gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {/* Categories */}
          {restaurant.categories.map((category) => (
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

        <div className="mt-6 space-y-4">
          <h2 className="font-semibold">Mais Pedidos</h2>

          <ProductsList products={restaurant.products} />
        </div>

        {restaurant.categories.map((category) => (
          <div className="mt-6 space-y-4" key={category.id}>
            <h2 className="font-semibold">{category.name}</h2>

            <ProductsList products={category.products} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantPage;
