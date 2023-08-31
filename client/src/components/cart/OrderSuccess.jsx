import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { CheckCircle as CheckCircleIcon } from "@material-ui/icons";

import { deleteCart } from "../../redux/actions/cartAction";

import "../../styles/cart/orderSuccess.css";

const OrderSuccess = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  // incomplete
  useEffect(() => {
    dispatch(deleteCart());
  }, []);

  return (
    <div className="orderSuccess">
      <CheckCircleIcon style={{ color: "green" }} />

      <Typography>Your Order has been Placed successfully </Typography>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;
