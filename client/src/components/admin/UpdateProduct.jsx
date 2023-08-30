import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import Select from "react-select";
import { Button } from "@material-ui/core";
import {
  AccountTree as AccountTreeIcon,
  AttachMoney as AttachMoneyIcon,
  Description as DescriptionIcon,
  Spellcheck as SpellcheckIcon,
  Storage as StorageIcon,
} from "@material-ui/icons";

import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";

import {
  clearErrors,
  getProductDetails,
  updateProduct,
} from "../../redux/actions/productAction";
import { UPDATE_PRODUCT_RESET } from "../../redux/constants/productConstants";

import "../../styles/admin/productList.css";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, product } = useSelector((state) => state.productDetails);

  const { restaurants } = useSelector((state) => state.restaurants);

  const { error: updateError, isUpdated } = useSelector(
    (state) => state.product
  );

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [productCategory, setCategory] = useState([]);
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState(product.images.url);
  const [restaurant, setRestaurant] = useState([]);

  const customStyles = {
    control: (base) => ({
      ...base,
      width: "300px",
    }),
  };

  const categories = ["Desi", "Dessert", "Continental"];

  const categoryOptions = categories.map((cate) => ({
    value: cate,
    label: cate,
  }));

  const restaurantOptions = restaurants.restaurants.map((cate) => ({
    value: cate.name,
    label: cate.name,
  }));

  const handleCategoryChange = (selectedOptions) => {
    const data = selectedOptions.map((category) => category.value);
    console.log(data[1]);
    setCategory([...data]);
  };

  const handleRestaurantChange = (selectedOptions) => {
    setRestaurant([...selectedOptions.map((category) => category.value)]);
  };

  const productId = id;

  useEffect(() => {
    const defaultImageHandler = async () => {
      try {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setImages(reader.result);
          }
        };
        const response = await fetch(product.images.url);
        const data = await response.blob();
        const defaultAvatarFile = new File([data], "default-avatar.jpg", {
          type: "image/jpg",
        });
        reader.readAsDataURL(defaultAvatarFile);
      } catch (error) {
        console.log(error.message);
      }
    };
    defaultImageHandler();
  }, []);

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.stock);
      setImages(product.images);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Product Updated Successfully");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    navigate,
    isUpdated,
    productId,
    product,
    updateError,
  ]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", productCategory);
    myForm.set("stock", stock);
    myForm.set("images", images);

    dispatch(updateProduct(productId, myForm));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview(reader.result);
          setImages(reader.result);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <MetaData title="Update Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Update Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>
            <div>
              {" "}
              <Select
                isMulti
                value={productCategory}
                options={categoryOptions}
                onChange={handleCategoryChange}
                placeholder="Select Categories"
                styles={customStyles}
              />
            </div>

            <div>
              {" "}
              <Select
                isMulti
                value={restaurant}
                options={restaurantOptions}
                onChange={handleRestaurantChange}
                placeholder="Select Restaurants"
                styles={customStyles}
              />
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="stock"
                required
                onChange={(e) => setStock(e.target.value)}
                value={stock}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              <img src={imagesPreview} alt="Product Preview" />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              // disabled={loading ? true : false}
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
