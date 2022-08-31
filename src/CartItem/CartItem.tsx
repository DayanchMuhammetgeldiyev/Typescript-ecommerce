import  Button  from "@mui/material/Button";
import { CartItemType } from "../App";
import { Wrapper } from "./CartItem.styles";

type Props = {
  item: CartItemType;
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) => (
  <Wrapper>
    <div>
      <h3>{item.title}</h3>
      <div className="information">
        <p>Price: ${item.price}</p>
        <p>Total:${(item.amount * item.price).toFixed(2)}</p>
      </div>
 
    </div>
  </Wrapper>
);

export default CartItem;
