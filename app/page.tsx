import Image from "next/image";
import CategoryList from "./_components/categoryList";
import Header from "./_components/header";
import Search from "./_components/search";
import ProductsList from "./_components/productsList";
import { Button } from "./_components/ui/button";
import { ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <>
      <Header />

      <Search />

      <CategoryList />

      <Image
        src="/promo-banner-01.png"
        alt="Até 30% de desconto em pizzas"
        height={0}
        width={0}
        className="container h-auto w-full object-contain"
        sizes="100vw"
        quality={100}
      />

      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Pedidos Recomendados</h2>

          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
          >
            Ver todos
            <ChevronRight size={16} />
          </Button>
        </div>
        <ProductsList />
      </div>
    </>
  );
}
