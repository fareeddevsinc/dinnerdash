import { useEffect, useState } from "react";
import "../../styles/admin/newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, addRestaurant } from "../../actions/restaurantAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { ADD_RESTAURANT_RESET } from "../../constants/restaurantConstants";

const NewRestaurant = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, success } = useSelector((state) => state.addRestaurant);

  const [name, setName] = useState(null);
  const [location, setLocation] = useState(null);
  const [branch, setBranch] = useState(null);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Restaurant Added Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: ADD_RESTAURANT_RESET });
    }
  }, [dispatch, alert, error, navigate, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("location", location);
    myForm.set("branch", branch);

    dispatch(addRestaurant(myForm));
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
            <h1>Add Restaurant</h1>

            <div>
              <input
                type="text"
                placeholder="Restaurant Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <textarea
                placeholder="Restaurant Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <textarea
                placeholder="Restaurant Branch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              // disabled={loading ? true : false}
            >
              Add
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewRestaurant;
