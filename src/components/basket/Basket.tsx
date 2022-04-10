import { FC } from "react";
import { Product } from "../../types/Product";
import { BasketItem } from "../basket-item/BasketItem";
import './basket.css';

interface BasketProps {
  items: Product[]
  removeProductFromBasket: (product: Product) => void
  addProductToBasket: (product: Product) => void
}

export const Basket: FC<BasketProps> = ({ items, removeProductFromBasket, addProductToBasket }) => {
  const totalPrice = items.reduce((acc, val) => {
    return acc + val.price * (val.qty || 0);
  }, 0);

  return (
    <div className="basket">
      <img src='https://vitl.com/images/icon_cart.svg' alt='basket' />
      <div className='basket-total'>
        Total
        <div>£{totalPrice.toFixed(2)}</div>
      </div>
      <div className="basket-products">
        {!items.length && <h1>Basket is empty</h1>}
        {items.map(item => <BasketItem removeProductFromBasket={removeProductFromBasket} addProductToBasket={addProductToBasket} key={item.name} item={item} />)}
      </div>
    </div>
  )
}