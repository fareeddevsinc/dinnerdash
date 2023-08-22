import { NavLink } from "react-router-dom";
import { logout } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";

const navbarStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#333",
  padding: "10px 20px",
  color: "white",
};

const HeadingStyle = {
  textDecoration: "none",
  color: "#fff",
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  margin: "0 10px",
  border: "none",
  backgroundColor: "transparent",
};

const imageContainerStyle = {
  width: "50px",
  height: "50px",
  overflow: "hidden",
};

const imageStyle = {
  borderRadius: "50%",
  width: "100%",
};

const Header = ({ user }) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav style={navbarStyle}>
      <NavLink to="/" style={HeadingStyle}>
        <h1>Dinner Dash</h1>
      </NavLink>

      {isAuthenticated && (
        <NavLink to="/account">
          <div style={imageContainerStyle}>
            <img style={imageStyle} src={user.avatar.url} alt="profile-pic" />
          </div>
        </NavLink>
      )}
      <div>
        <NavLink style={linkStyle} to="/">
          Home
        </NavLink>
        <NavLink style={linkStyle} to="/products">
          Products
        </NavLink>
        <NavLink style={linkStyle} to="/search">
          Search
        </NavLink>
        {isAuthenticated ? (
          <NavLink style={linkStyle} to="/login">
            <button style={linkStyle} onClick={handleLogout}>
              Logout
            </button>
          </NavLink>
        ) : (
          <NavLink style={linkStyle} to="/login">
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Header;
