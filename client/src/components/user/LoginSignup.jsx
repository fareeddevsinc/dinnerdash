import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate, Link } from "react-router-dom";

import { clearErrors, login, register } from "../../redux/actions/userAction";

import "../../styles/user/loginSignup.css";
import { createFormData } from "../../helpers/admin/users/formValidation";
import { validateRegisterData } from "../../helpers/users/validateRegisterData";
import { handleAvatarChange } from "../../helpers/users/handleAvatarChange";

const LoginSignUp = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, isAuthenticated } = useSelector((state) => state.user);

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [avatar, setAvatar] = useState(
    "https://t4.ftcdn.net/jpg/00/97/00/09/360_F_97000908_wwH2goIihwrMoeV9QF3BW6HtpsVFaNVM.jpg"
  );
  const [avatarPreview, setAvatarPreview] = useState(
    "https://t4.ftcdn.net/jpg/00/97/00/09/360_F_97000908_wwH2goIihwrMoeV9QF3BW6HtpsVFaNVM.jpg"
  );

  const [user, setUser] = useState({
    fullName: "",
    name: "",
    email: "",
    password: "",
  });

  const { fullName, name, email, password } = user;

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword, alert));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    if (validateRegisterData(fullName, name, email, password, alert)) {
      const userObj = {
        fullName: user.fullName,
        name: user.name,
        email: user.email,
        password: user.password,
        avatar: avatar,
      };

      const myForm = createFormData(userObj);
      dispatch(register(myForm, alert));
    } else {
      alert.error("Please provide valid data for registration.");
    }
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      handleAvatarChange(e, setAvatarPreview, setAvatar);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      const redirectUrl = localStorage.getItem("redirectUrl");
      if (redirectUrl) {
        localStorage.removeItem("redirectUrl");
        navigate(redirectUrl);
      } else {
        navigate("/account");
      }
    }
  }, [dispatch, error, alert, navigate, isAuthenticated]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <>
      <>
        <div className="LoginSignUpContainer">
          <div className="LoginSignUpBox">
            <div>
              <div className="login_signUp_toggle">
                <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
              </div>
              <button ref={switcherTab}></button>
            </div>
            <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
              <div className="loginEmail">
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="loginPassword">
                <input
                  type="password"
                  placeholder="Password"
                  required
                  maxLength="20"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              <Link to="/password/forgot">Forget Password ?</Link>
              <input type="submit" value="Login" className="loginBtn" />
            </form>
            <form
              className="signUpForm"
              ref={registerTab}
              encType="multipart/form-data"
              onSubmit={registerSubmit}
            >
              <div className="signUpName">
                <input
                  type="text"
                  placeholder="Name"
                  required
                  maxLength="32"
                  minLength="2"
                  name="name"
                  value={name}
                  onChange={registerDataChange}
                />
              </div>
              <div className="signUpName">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  maxLength="32"
                  minLength="2"
                  name="fullName"
                  value={fullName}
                  onChange={registerDataChange}
                />
              </div>
              <div className="signUpEmail">
                <input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={email}
                  onChange={registerDataChange}
                />
              </div>
              <div className="signUpPassword">
                <input
                  type="password"
                  placeholder="Password"
                  required
                  minLength="8"
                  maxLength="20"
                  name="password"
                  value={password}
                  onChange={registerDataChange}
                />
              </div>

              <div id="registerImage">
                <img src={avatarPreview} alt="Avatar Preview" />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={registerDataChange}
                />
              </div>
              <input type="submit" value="Register" className="signUpBtn" />
            </form>
          </div>
        </div>
      </>
    </>
  );
};

export default LoginSignUp;
