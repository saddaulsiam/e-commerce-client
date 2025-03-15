import { Button } from "@/components/ui/button";
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";
import { TProduct } from "@/types/common";
import ProductsCard from "../productsCard/ProductsCard";

const RelatedProducts = ({ category }: { category: string }) => {
  const { data: products } = useGetAllProductsQuery({
    limit: 5,
    page: 1,
    category,
  });
  return (
    <section className="my-16">
      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900">Related Products</h3>
        <Button variant="link" className="text-primary hover:text-primary/90">
          View All →
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
        {products?.data?.data?.map((product: TProduct) => (
          <ProductsCard product={product} key={product._id} />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
