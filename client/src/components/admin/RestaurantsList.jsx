import { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "../../styles/admin/productList.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import {
  getRestaurantDetails,
  clearErrors,
} from "../../actions/restaurantAction";

const RestaurantsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const alert = useAlert();

  const { error, restaurants } = useSelector((state) => state.restaurants);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getRestaurantDetails());
  }, [dispatch, alert, error, navigate]);

  const columns = [
    { field: "id", headerName: "Restaurant ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "branch",
      headerName: "Branch",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "location",
      headerName: "Location",
      minWidth: 200,
      flex: 0.5,
    },
  ];

  const rows = [];

  restaurants &&
    restaurants.restaurants.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        branch: item.branch,
        location: item.location,
      });
    });

  return (
    <>
      <MetaData title={`ALL RESTAURANTS -- Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL RESTAURANTS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </>
  );
};

export default RestaurantsList;
