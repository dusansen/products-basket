import { useEffect, useMemo, useState } from "react";
import { getProductsData } from "./api/api";
import { Product } from "./components/product/Product";
import { Product as ProductType } from "./types/Product";
import { Basket } from "./components/basket/Basket";
import { Config } from "./types/Config";
import { ToastContainer, toast } from 'react-toastify';
import "./App.css";
import { getVitaminString } from "./utils/output";

function App() {
  const [productsList, setProductsList] = useState<ProductType[] | []>([]);
  const [config, setConfig] = useState<Config>();
  const [productsInBasket, setProductsInBasket] = useState<ProductType[]>([]);
  const currentNutrients = useMemo(() => {
    const nutrientsTotal = new Map<string, number>();
    productsInBasket.forEach((product) => {
      product.nutrients.forEach(({ amount, id }) => {
        nutrientsTotal.set(
          id,
          (nutrientsTotal.get(id) || 0) + amount * (product.qty || 0)
        );
      });
    });
    return nutrientsTotal;
  }, [productsInBasket]);

  const fetchProductsData = async () => {
    const { productsList, config } = await getProductsData();
    setProductsList(productsList);
    setConfig(config);
  };
  useEffect(() => {
    fetchProductsData();
  }, []);

  const addProductToBasket = (product: ProductType) => {
    const productIndex = productsInBasket.findIndex(
      (prod) => prod.name === product.name
    );
    if (isExceedingTolerableUpperLimit(product)) {
      return;
    }
    const newProductsInBasket = [...productsInBasket];
    if (productIndex >= 0) {
      newProductsInBasket[productIndex] = {
        ...product,
        qty: (newProductsInBasket[productIndex].qty || 0) + 1,
      };
    } else {
      newProductsInBasket.push({
        ...product,
        qty: 1,
      });
    }
    setProductsInBasket(newProductsInBasket);
  };

  const isExceedingTolerableUpperLimit = (product: ProductType) => {
    for (let i = 0; i < product.nutrients.length; i++) {
      const { amount, id } = product.nutrients[i];
      const { amount: vitaminLimit} = config?.tolerableUpperLimits.find(vitamin => vitamin.id === id) || { amount: 0 };
      if ((currentNutrients.get(id) || 0) + amount > vitaminLimit) {
        toast.warn(`Tolerable upper limit for ${getVitaminString(id)} would be exceeding`);
        return true;
      }
    }
    return false;
  };

  const removeProductFromBasket = (product: ProductType) => {
    const productIndex = productsInBasket.findIndex(
      (prod) => prod.name === product.name
    );
    let newProductsInBasket = [...productsInBasket];
    if (productIndex >= 0 && newProductsInBasket[productIndex].qty === 1) {
      newProductsInBasket = [
        ...newProductsInBasket.slice(0, productIndex),
        ...newProductsInBasket.slice(
          productIndex + 1,
          newProductsInBasket.length
        ),
      ];
    } else {
      newProductsInBasket[productIndex] = {
        ...newProductsInBasket[productIndex],
        qty: Number(newProductsInBasket[productIndex].qty) - 1,
      };
    }
    setProductsInBasket(newProductsInBasket);
  };

  return (
    <div className="App">
      <header>
        <Basket
          items={productsInBasket}
          removeProductFromBasket={removeProductFromBasket}
          addProductToBasket={addProductToBasket}
        />
      </header>
      <div className="divider" />
      <div className="products-list">
        {productsList.length &&
          productsList.map((product) => (
            <Product
              key={product.name}
              product={product}
              addProductToBasket={addProductToBasket}
            />
          ))}
      </div>
      <ToastContainer closeOnClick pauseOnHover={false} />
    </div>
  );
}

export default App;
