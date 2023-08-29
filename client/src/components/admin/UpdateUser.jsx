import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import {
  MailOutline as MailOutlineIcon,
  Person as PersonIcon,
  VerifiedUser as VerifiedUserIcon,
} from "@material-ui/icons";

import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";

import {
  clearErrors,
  getUserDetails,
  updateUser,
} from "../../redux/actions/userAction";
import { UPDATE_USER_RESET } from "../../redux/constants/userConstants";

import "../../styles/admin/productList.css";
import LoadingScreen from "../layout/Loader/Loader";

const UpdateUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const firstUpdate = useRef(true);

  const { loading, error, user } = useSelector((state) => state.userDetails);

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const userId = id;

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user?.name);
      setEmail(user?.email);
      setRole(user?.role);
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
      alert.success("User Updated Successfully");
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, isUpdated, updateError, user, userId]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const isNameValid =
      name.trim().length >= 2 &&
      name.trim().length <= 32 &&
      /\S/.test(name) &&
      !/\s{2,}/.test(name);

    const isEmailValid = (function validateEmail(email) {
      const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const parts = email.split("@");

      // Check if there are exactly two parts and the domain has only one period
      return (
        parts.length === 2 &&
        pattern.test(email) &&
        parts[1].split(".").length === 2
      );
    })(email);

    if (!isNameValid) {
      alert.error("Name Should Contain Atleast 2 Characters And Must Be Valid");
    } else if (!isEmailValid) {
      alert.error("Invalid Email");
    } else {
      const myForm = new FormData();

      myForm.set("name", name);
      myForm.set("email", email);
      myForm.set("role", role);

      dispatch(updateUser(userId, myForm));
    }
  };

  return (
    <>
      <MetaData title="Update User" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <LoadingScreen />
          ) : (
            <form
              className="createProductForm"
              onSubmit={updateUserSubmitHandler}
            >
              <h1>Update User</h1>

              <div>
                <PersonIcon />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <VerifiedUserIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                // disabled={
                //   updateLoading ? true : false || role === "" ? true : false
                // }
              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
