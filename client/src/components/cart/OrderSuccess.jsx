import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "../../styles/cart/orderSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart } from "../../actions/cartAction";
import { deleteProduct } from "../../actions/productAction";

const OrderSuccess = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(deleteCart());
    cartItems.cart.forEach((cart) => {
      cart.product.forEach((item) => {
        dispatch(deleteProduct(item.product._id));
      });
    });
  }, []);

  return (
    <div className="orderSuccess">
      <CheckCircleIcon />

      <Typography>Your Order has been Placed successfully </Typography>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;
