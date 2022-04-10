import { FC } from "react";
import { Product } from "../../types/Product";
import './basket-item.css';

interface BasketItemProps {
  item: Product
  removeProductFromBasket: (product: Product) => void
  addProductToBasket: (product: Product) => void
}

export const BasketItem: FC<BasketItemProps> = ({ item, removeProductFromBasket, addProductToBasket }) => {
  const handleDecreaseClick = () => removeProductFromBasket(item);
  const handleIncreaseClick = () => addProductToBasket(item);

  return (
    <div className="basket-item">
      <div className="basket-item-name">{item.name}</div>
      <div className="basket-item-qty"><button onClick={handleDecreaseClick}>-</button>{item.qty}<button onClick={handleIncreaseClick}>+</button></div>
    </div>
  )
}