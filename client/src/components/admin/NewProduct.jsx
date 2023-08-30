import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import Select from "react-select";

import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";

import { clearErrors, createProduct } from "../../redux/actions/productAction";

import { NEW_PRODUCT_RESET } from "../../redux/constants/productConstants";

import "../../styles/admin/newProduct.css";

const NewProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, success } = useSelector((state) => state.newProduct);

  const { restaurants } = useSelector((state) => state.restaurants);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [restaurant, setRestaurant] = useState([]);
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState(
    "https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227724992-stock-illustration-image-available-icon-flat-vector.jpg"
  );
  const [imagesPreview, setImagesPreview] = useState(
    "https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227724992-stock-illustration-image-available-icon-flat-vector.jpg"
  );

  const all_categories = ["Desi", "Dessert", "Continental"];

  const categoryOptions = all_categories.map((cate) => ({
    value: cate,
    label: cate,
  }));

  const restaurantOptions = restaurants.restaurants.map((cate) => ({
    value: cate.name,
    label: cate.name,
  }));

  const handleCategoryChange = (selectedOptions) => {
    setCategories([
      ...categories,
      ...selectedOptions.map((category) => category.value),
    ]);
  };

  const handleRestaurantChange = (selectedOptions) => {
    setRestaurant([
      ...restaurant,
      ...selectedOptions.map((restaurant) => restaurant.value),
    ]);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, navigate, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    console.log(categories);

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", categories);
    myForm.set("restaurant", restaurant);
    myForm.set("stock", stock);
    myForm.set("images", images);

    // images.forEach((image) => {
    //   myForm.append("images", image);
    // });
    dispatch(createProduct(myForm));
    alert.success("Product Added Successfully");
  };

  const createProductImagesChange = (e) => {
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
      <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />

        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>
            {restaurant}

            <div>
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <Select
                isMulti
                value={categories}
                options={categoryOptions}
                onChange={handleCategoryChange}
                placeholder="Select Categories"
              />
            </div>

            <div>
              <Select
                isMulti
                value={restaurant}
                options={restaurantOptions}
                onChange={handleRestaurantChange}
                placeholder="Select Restaurants"
              />
            </div>

            <div>
              <input
                type="number"
                placeholder="stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
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
              Create
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewProduct;
