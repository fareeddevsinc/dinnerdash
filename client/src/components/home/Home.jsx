import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";

import MetaData from "../layout/MetaData";
import ProductCard from "../product/ProductCard";

import { clearErrors, getProduct } from "../../redux/actions/productAction";

import "../../styles/home/home.css";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <>
          <MetaData title="Dinner Dash - Home" />
          <h1>Welcome to Dinner Dash</h1>
          <h3>Featured Products</h3>
          <div className="container">
            {products &&
              products.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
