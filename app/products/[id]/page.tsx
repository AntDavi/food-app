import { db } from "@/app/_lib/prisma";
import ProductsImage from "./_components/produtsImage";
import ProductDetails from "./_components/productDetails";
import { Button } from "@/app/_components/ui/button";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });

  if (!product) {
    return {
      notFound: true,
    };
  }

  const juices = await db.product.findMany({
    where: {
      category: {
        name: "Sucos",
      },
      restaurant: {
        id: product?.restaurant.id,
      },
    },
    include: {
      restaurant: true,
    },
  });

  return (
    <div className="relative pb-12">
      <ProductsImage product={product} />

      <ProductDetails product={product} complementaryProducts={juices} />

      <div className="fixed bottom-3 z-50 w-full px-5">
        <Button className="w-full font-semibold">Adicionar à sacola</Button>
      </div>
    </div>
  );
};

export default ProductPage;
