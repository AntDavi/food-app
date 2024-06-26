import CategoryList from "./_components/categoryList";
import Header from "./_components/header";
import Search from "./_components/search";
import ProductsList from "./_components/productsList";
import { Button } from "./_components/ui/button";
import { ChevronRight } from "lucide-react";
import { db } from "./_lib/prisma";
import PromoBanner from "./_components/promoBanner";
import RestaurantList from "./_components/restaurantList";
import Link from "next/link";

const Home = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <>
      <Header />

      <Search />

      <CategoryList />

      <PromoBanner
        src="/promo-banner-01.png"
        alt="Até 30% de desconto em pizzas"
      />

      <div className="space-y-4 px-5 pt-6">
        <div className="flex items-center justify-between ">
          <h2 className="font-semibold">Pedidos Recomendados</h2>

          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
          >
            Ver todos
            <ChevronRight size={16} />
          </Button>
        </div>
        <ProductsList products={products} />
      </div>

      <PromoBanner
        src="/promo-banner-02.png"
        alt="A partir de R$17,99 em lanches"
      />

      <div className="space-y-4 py-6 ">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Restaurantes Recomendados</h2>

          <Link href="/restaurants/recommended">
            <Button
              variant="ghost"
              className="h-fit p-0 text-primary hover:bg-transparent"
            >
              Ver todos
              <ChevronRight size={16} />
            </Button>
          </Link>
        </div>
        <RestaurantList />
      </div>
    </>
  );
};

export default Home;
