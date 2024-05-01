import Image from "next/image";
import CategoryList from "./_components/categoryList";
import Header from "./_components/header";
import Search from "./_components/search";

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
    </>
  );
}
