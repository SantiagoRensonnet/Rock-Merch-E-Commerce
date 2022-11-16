//Libraries
import { useContext } from "react";
//Context
import { ProductsContext } from "../contexts/products.context";
import { ProductsContextType } from "../contexts/types.context";
//Components
import { ProductCard } from "../components/product-card/product-card.component";
export default function Shop() {
  //context init
  const { products } = useContext(ProductsContext) as ProductsContextType;

  return (
    <main className="main-container">
      <section className="products-layout">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </section>
    </main>
  );
}
