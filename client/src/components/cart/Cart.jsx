import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { RemoveShoppingCart as RemoveShoppingCartIcon } from "@material-ui/icons";

import CartItemCard from "./CartItemCard";

import {
  addItemsToCart,
  deleteCart,
  getCart,
  removeItemsFromCart,
} from "../../redux/actions/cartAction";
import { clearErrors } from "../../redux/actions/userAction";

import "../../styles/cart/Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const alert = useAlert();
  const [numItems, setNumItems] = useState(cartItems?.cart[0]?.length);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getCart());
  }, [dispatch, alert, error, numItems]);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
    alert.success("Item Deleted Successfully");
    // Update the numItems state variable
    setNumItems((prevNumItems) => prevNumItems - 1);
    location.reload();
  };

  const removeCart = () => {
    dispatch(deleteCart());
    alert.success("Cart Deleted Cart Deleted Successfully");
    location.reload();
  };

  const checkoutHandler = () => {
    if (user.role !== undefined) {
      navigate("/shipping");
    } else {
      navigate("/login");
      alert.error("Please Login to Check Out");
    }
  };

  return (
    <>
      {cartItems.cart.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems &&
              cartItems.cart[0]?.products.map((item) => (
                <div className="cartContainer" key={item?.product?._id}>
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                  <div className="cartInput">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product._id, item.quantity)
                      }
                    >
                      -
                    </button>
                    {item.quantity}
                    <input type="text" value={item.quantity} readOnly />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product._id,
                          item.quantity,
                          item.product.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">{`Rs.${
                    item.product?.price * item.quantity
                  }`}</p>
                </div>
              ))}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>{`Rs.${cartItems.cart[0]?.products.reduce(
                  (acc, item) => acc + item?.quantity * item.product?.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Check Out</button>
              </div>
            </div>
          </div>
          <button onClick={removeCart}>Delete Cart</button>
        </>
      )}
    </>
  );
};

export default Cart;
