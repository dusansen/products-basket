import { FC } from "react";
import { Product as ProductType } from "../../types/Product";
import './product.css';

interface ProductProps {
  product: ProductType,
  addProductToBasket: (product: ProductType) => void
}

export const Product: FC<ProductProps> = ({ product, addProductToBasket }) => {
  const handleProductClick = () => addProductToBasket(product);

  return (
    <div className="product">
      <img src='https://static-prod.vitl.com/new/images/source/1580464651-vitl-bottle.png?width=120' alt='product' />
      <div className="product-name">{product.name}</div>
      <div className='product-price'>£{product.price}</div>
      <button onClick={handleProductClick}>Add to basket</button>
    </div>
  )
}
