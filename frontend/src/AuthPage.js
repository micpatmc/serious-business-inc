import { React, useState } from "react";
import "./AuthPage.css";
import axios from "axios";
import stockArt from "./images/login_page_image1.png";
import businessLogo from "./images/largeLogo.png";
import { useNavigate } from "react-router-dom";
const baseUrl = "http://seriousbusinessincorporated.online/LAMPAPI";

const AuthPage = () => {
  return (
    <div
      id="AuthPage-home"
    >
      <nav id="AuthPage-nav" class="navbar-dark">
        <div class="container-fluid">
            <img
              src={businessLogo}
              alt="Serious Business Incorporated"
              width="270rem"
              height="80rem"
            ></img>
        </div>
      </nav>
          {/*Inner box holding AuthBox and side image.*/}
          <div id="AuthPage-home-authrow" className="row align-items-center grid text-center rounded shadow-lg m-5">
            <AuthBox />
            {/* Picture. */}
            <div id="#AuthPage-home-authbox" className="col">
              <img
                className="img-fluid"
                src={stockArt}
                alt="Generic business pic."
              ></img>
            </div>
          </div>
    </div>
  );
};

const AuthBox = () => {
  const [loginOn, setLoginOn] = useState(true);

  const authState = loginOn ? <LoginCard /> : <RegistrationCard />;
  return (
    // Login/Register box.
    <div
      id="AuthPage-home-authbox"
      className="col shadow-lg rounded p-0"
    >
      <ToggleBar loginOn={loginOn} setLoginOn={setLoginOn} />
      {authState}
    </div>
  );
};

const ToggleBar = ({ loginOn, setLoginOn }) => {
  const buttonStyle = {
    width: "50%",
    height: "3rem",
    border: "0rem",
    fontSize: "1.2rem",
    padding: "0"
  };
  const onStyle = {
    ...buttonStyle,
    backgroundColor: "white",
  };
  const offStyle = {
    ...buttonStyle,
    backgroundColor: "lightgray",
  };
  return (
    <div>
      <button
        className="rounded"
        style={loginOn ? onStyle : offStyle}
        onClick={() => setLoginOn(true)}
      >
        Login
      </button>
      <button
        className="rounded"
        style={loginOn ? offStyle : onStyle}
        onClick={() => setLoginOn(false)}
      >
        Register
      </button>
    </div>
  );
};

const LoginCard = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    login: "",
    password: "",
  });

  const handleChange = (e, key) => {
    setCredentials({
      ...credentials,
      [key]: e.target.value,
    });
  };

  const [showError, setShowError] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Request object:", credentials);
    axios
      .post(`${baseUrl}/Login.php`, credentials)
      .then((response) => {
        // No record found
        if (
          response.data.error === "No Records Found" &&
          credentials.login.length !== 0 &&
          credentials.password.length !== 0
        ) {
          console.log(response);
          console.log(response.data.error);
          setShowError(true);
        } else {
          sessionStorage.setItem("currentUser", JSON.stringify(response.data));
          navigate("/contacts");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h2 className="mt-4">Welcome back</h2>
      <form 
        className=""
        onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group row m-4">
          <label for="username" className="col-sm-3 col-form-label">
            Username
          </label>
          <div className="col-sm-8">
            <input
              type="username"
              className="form-control form-control-md w-50"
              id="username"
              placeholder="Username"
              value={credentials.login}
              onChange={(e) => handleChange(e, "login")}
              required
            />
          </div>
        </div>
        <div className="form-group row m-4">
          <label for="inputPassword" className="col-sm-3 col-form-label">
            Password
          </label>
          <div className="col-sm-8">
            <input
              type="password"
              className="form-control form-control-md w-50"
              id="inputPassword"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) => handleChange(e, "password")}
              required
            />
          </div>
        </div>
        <input type="submit" className="btn btn-secondary m-3" />
      </form>
      <div hidden={!showError}>
        <div
          class="alert alert-danger d-flex align-items-center m-4"
          role="alert"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="red"
            class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
            viewBox="0 0 16 16"
            role="img"
            aria-label="Warning:"
          >
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
          <div>No Records with those credentials found.</div>
        </div>
      </div>
    </div>
    //<h1 style={{ color: "red" }}>{errorMsg.msg}</h1>
  );
};

const RegistrationCard = () => {
  const [newUser, setNewUser] = useState({
    userId: "",
    password: "",
    FirstName: "",
    LastName: "",
  });

  const handleChange = (e, key) => {
    setNewUser({
      ...newUser,
      [key]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Request object:", newUser);
    axios
      .post(`${baseUrl}/AddUser.php`, newUser)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h2 className="mt-4 pb-4">Create a new account</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group row m-2">
          <label for="firstName" className="col-sm-3 col-form-label">
            First Name
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control form-control-md w-50"
              id="firstName"
              placeholder="First Name"
              value={newUser.FirstName}
              onChange={(e) => handleChange(e, "FirstName")}
              required
            />
          </div>
        </div>
        <div className="form-group row m-2">
          <label for="lastName" className="col-sm-3 col-form-label">
            Last Name
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control form-control-md w-50"
              id="lastName"
              placeholder="Last Name"
              value={newUser.LastName}
              onChange={(e) => handleChange(e, "LastName")}
              required
            />
          </div>
        </div>
        <hr />
        <div className="form-group row m-2">
          <label for="username" className="col-sm-3 col-form-label">
            Username
          </label>
          <div className="col-sm-8">
            <input
              type="username"
              className="form-control form-control-md w-50"
              id="username"
              placeholder="Username"
              value={newUser.userId}
              onChange={(e) => handleChange(e, "userId")}
              required
            />
          </div>
        </div>
        <div className="form-group row m-2">
          <label for="password" className="col-sm-3 col-form-label">
            Password
          </label>
          <div className="col-sm-8">
            <input
              type="password"
              className="form-control form-control-md w-50"
              id="inputPassword"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) => handleChange(e, "password")}
              required
            />
          </div>
        </div>
        <input type="submit" className="btn btn-secondary m-3" />
      </form>
    </div>
  );
};

export default AuthPage;
