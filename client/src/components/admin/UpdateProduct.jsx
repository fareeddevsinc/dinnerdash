import { useEffect, useState, useCallback, useMemo } from "react";
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

import "../../styles/admin/newProduct.css";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, product } = useSelector((state) => state.productDetails);

  const { restaurants } = useSelector((state) => state.restaurants);
  console.log(restaurants);

  const { error: updateError, isUpdated } = useSelector(
    (state) => state.product
  );

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [productCategory, setCategory] = useState([]);
  const [display, setDisplay] = useState(false);
  const [categories, setCategories] = useState([
    "Desserts",
    "Beverages",
    "Desi",
    "Continental",
    "Fast Food",
  ]);
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState(product?.images?.url);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);

  const customStyles = {
    control: (base) => ({
      ...base,
      width: "300px",
    }),
  };

  const handleCategoryChange = useCallback((selectedOptions) => {
    const categories = selectedOptions.map((option) => option.value);
    setSelectedCategories(categories);
  }, []);

  const handleRestaurantChange = useCallback((selectedOption) => {
    console.log(selectedOption.value);
    setSelectedRestaurants(selectedOption.value);
  }, []);

  const handleDisplayChange = useCallback((selectedOption) => {
    setDisplay(selectedOption.value);
  }, []);

  const options3 = [
    { value: true, label: "Show Product" },
    { value: false, label: "Hide Product" },
  ];

  const productId = id;

  const productOptions = () => {
    const data = categories.map((category) => {
      return { value: category, label: category };
    });

    const res = [...data];

    return res;
  };

  const restaurantOptions = () => {
    const data = restaurants.restaurants.map((category) => {
      return { value: category.name, label: category.name };
    });

    const res = [...data];

    return res;
  };

  const options1 = useMemo(productOptions, [categories]);
  const options2 = useMemo(restaurantOptions, [restaurants.restaurants]);

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
      dispatch(getProductDetails(productId, alert));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory([...product.category]);
      setSelectedRestaurants([...product.restaurant]);
      setStock(product.stock);
      setImages(product.images);
      setDisplay(product?.display);
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
    myForm.set("category", selectedCategories);
    myForm.set("restaurant", selectedRestaurants);
    myForm.set("stock", stock);
    myForm.set("images", images);
    myForm.set("display", display);

    dispatch(updateProduct(productId, myForm, alert));
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
                maxLength="20"
                minLength="4"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                min="0"
                max="25000"
                onInput="validity.valid||(value='');"
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
                maxLength="100"
                minLength="4"
              ></textarea>
            </div>
            <div id="createProductDisplaySelection1">
              <Select
                required
                isMulti
                options={options1}
                placeholder="Select Categories"
                styles={customStyles}
                onChange={handleCategoryChange}
              />
            </div>

            <div id="createProductDisplaySelection2">
              <Select
                required
                options={options2}
                placeholder="Select Restaurants"
                styles={customStyles}
                onChange={handleRestaurantChange}
              />
            </div>

            <div id="createProductDisplaySelection3">
              <Select
                required
                options={options3}
                placeholder="Display Product"
                styles={customStyles}
                onChange={handleDisplayChange}
              />
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="stock"
                min="0"
                max="100"
                onInput="validity.valid||(value='');"
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
