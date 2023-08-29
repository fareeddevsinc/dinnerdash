// import { useEffect } from "react";
// import CheckoutSteps from "../Cart/CheckoutSteps";
// import { useSelector, useDispatch } from "react-redux";
// import MetaData from "../layout/MetaData";
// import { useAlert } from "react-alert";
// import "./payment.css";
// import { createOrder, clearErrors } from "../../actions/orderAction";
// import { useNavigate } from "react-router-dom";

// const Payment = () => {
//   const navigate = useNavigate();
//   const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

//   const dispatch = useDispatch();
//   const alert = useAlert();

//   const { shippingInfo, cartItems } = useSelector((state) => state.cart);
//   const { error } = useSelector((state) => state.newOrder);

//   const order = {
//     shippingInfo,
//     orderItems: cartItems.cart[0]?.products,
//     itemsPrice: orderInfo.subtotal,
//     taxPrice: orderInfo.tax,
//     shippingPrice: orderInfo.shippingCharges,
//     totalPrice: orderInfo.totalPrice,
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     dispatch(createOrder(order));
//     navigate("/success");
//   };

//   useEffect(() => {
//     if (error) {
//       alert.error(error);
//       dispatch(clearErrors());
//     }
//   }, [dispatch, error, alert]);

//   return (
//     <>
//       <MetaData title="Payment" />
//       <CheckoutSteps activeStep={2} />
//       <div className="paymentContainer">
//         <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
//           <input
//             type="submit"
//             value={`Pay - Rs.${orderInfo && orderInfo.totalPrice}`}
//             className="paymentFormBtn"
//           />
//         </form>
//       </div>
//     </>
//   );
// };

// export default Payment;
