import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateRestaurant,
  getRestaurantDetails,
} from "../../actions/restaurantAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import DescriptionIcon from "@material-ui/icons/Description";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import SideBar from "./Sidebar";
import { UPDATE_RESTAURANT_RESET } from "../../constants/restaurantConstants";
import { useNavigate, useParams } from "react-router-dom";

const UpdateRestaurant = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, restaurant } = useSelector((state) => state.restaurant);

  const { error: updateError, isUpdated } = useSelector(
    (state) => state.restaurantOperations
  );

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [branch, setBranch] = useState("");

  const restaurantId = id;

  useEffect(() => {
    if (restaurant && restaurant._id !== restaurantId) {
      dispatch(getRestaurantDetails(restaurantId));
    } else {
      setName(restaurant.name);
      setLocation(restaurant.location);
      setBranch(restaurant.branch);
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
      alert.success("Restaurant Updated Successfully");
      navigate("/admin/restaurants");
      dispatch({ type: UPDATE_RESTAURANT_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    navigate,
    isUpdated,
    restaurantId,
    restaurant,
    updateError,
  ]);

  const updateRestaurantSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("location", location);
    myForm.set("branch", branch);

    dispatch(updateRestaurant(restaurantId, myForm));
    alert.success("Restaurant Updated Successfully");
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
            onSubmit={updateRestaurantSubmitHandler}
          >
            <h1>Update Restaurant</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Restaurant Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Restaurant Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Restaurant Branch"
                required
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
              />
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

export default UpdateRestaurant;
