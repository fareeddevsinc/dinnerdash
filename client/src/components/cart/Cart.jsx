import React, { useEffect, useCallback } from "react";
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

import "../../styles/cart/Cart.css";

const Cart = React.memo(() => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const alert = useAlert();

  useEffect(() => {
    dispatch(getCart(alert));
  }, [dispatch, cartItems]);

  const increaseQuantity = useCallback(
    (id, quantity, stock) => {
      if (user) {
        const newQty = quantity + 1;
        if (stock <= quantity) {
          return;
        }
        dispatch(addItemsToCart(id, newQty, alert));
      }
    },
    [user, dispatch, alert]
  );

  const deleteCartItems = useCallback(
    (id) => {
      if (user) {
        dispatch(removeItemsFromCart(id, alert));
      }
    },
    [user, dispatch, alert]
  );

  const decreaseQuantity = useCallback(
    (id, quantity) => {
      if (user) {
        const newQty = quantity - 1;
        if (1 >= quantity) {
          return;
        }
        dispatch(addItemsToCart(id, newQty, alert));
      }
    },
    [user, dispatch, alert]
  );

  const removeCart = useCallback(() => {
    if (user) {
      dispatch(deleteCart());
    }
  }, [user, dispatch]);

  const userVerification = () => {
    if (user?.role) {
      navigate("/shipping", { replace: true });
    } else {
      alert.info("Please Login To Continue");
      const currentUrl = window.location.pathname;
      localStorage.setItem("redirectUrl", currentUrl);
      navigate("/login");
    }
  };

  return (
    <>
      <>
        {cartItems.cart[0]?.products?.length === undefined ? (
          <div className="emptyCart">
            <RemoveShoppingCartIcon />

            <Typography>No Products in Your Cart</Typography>
            <Link to="/products">View Products</Link>
          </div>
        ) : (
          <>
            {/* {cartItems.cart[0]?.products?.length > 0 &&} */}
            <div className="cartPage">
              <div className="cartHeader">
                <p>Product</p>
                <p>Quantity</p>
                <p>Subtotal</p>
              </div>

              {cartItems &&
                cartItems.cart[0]?.products.map((item) => (
                  <div className="cartContainer" key={item?.product?._id}>
                    <CartItemCard
                      item={item}
                      deleteCartItems={deleteCartItems}
                    />
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

              {cartItems.cart[0]?.products?.length >= 1 ? (
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
                    <button onClick={userVerification}>Check Out</button>
                  </div>
                  <div className="deleteBtn">
                    <button onClick={removeCart}>Delete Cart</button>
                  </div>
                </div>
              ) : (
                <div className="emptyCart">
                  <RemoveShoppingCartIcon />

                  <Typography>No Products in Your Cart</Typography>
                  <Link to="/products">View Products</Link>
                </div>
              )}
            </div>
          </>
        )}
      </>
    </>
  );
});

export default Cart;
