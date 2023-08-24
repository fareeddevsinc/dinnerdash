import "../../styles/cart/CartItemCard.css";
import { Link } from "react-router-dom";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <img src={item.product.image} alt="product" />
      <div>
        <Link to={`/product/${item.product}`}>{item.product.name}</Link>
        <span>{`Price: Rs. ${item.product.price}`}</span>
        <p onClick={() => deleteCartItems(item.product)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;
