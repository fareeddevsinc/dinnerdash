import { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "../../styles/admin/productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SideBar from "./Sidebar";
import { getAllRestaurants, clearErrors } from "../../actions/restaurantAction";
import { DELETE_RESTAURANT_RESET } from "../../constants/restaurantConstants";
import { deleteRestaurant } from "../../actions/restaurantAction";

const RestaurantsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const alert = useAlert();

  const { error, restaurants } = useSelector((state) => state.restaurants);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.restaurantOperations
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Restaurant Deleted Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_RESTAURANT_RESET });
    }

    dispatch(getAllRestaurants());
  }, [dispatch, alert, error, navigate, deleteError, isDeleted]);

  const deleteRestaurantHandler = (id) => {
    dispatch(deleteRestaurant(id));
  };

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
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/restaurant/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteRestaurantHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </>
        );
      },
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
