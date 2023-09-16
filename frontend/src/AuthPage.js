import { React, useState } from "react";
import "./AuthPage.css";
import axios from "axios";
import stockArt from "./images/login_page.jpg";
import { useNavigate } from "react-router-dom";
const baseUrl = "http://seriousbusinessincorporated.online/LAMPAPI";

const AuthPage = () => {
  return (
    /*Inner box holding AuthBox and side image.*/
    <div
      id="AuthPage-home"
      className="grid text-center rounded shadow-lg mb-5 rounded"
    >
      <div id="AuthPage-home-authrow" className="row align-items-center">
        <AuthBox />
        {/* Picture. */}
        <img
          src={stockArt}
          className="col img-fluid"
          alt="Generic business pic."
        ></img>
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
      className="col shadow-lg p-3 bg-body-tertiary rounded"
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
    borderRadius: "9px 9px 0 0",
    fontSize: "1.2rem",
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
        style={loginOn ? onStyle : offStyle}
        onClick={() => setLoginOn(true)}
      >
        Login
      </button>
      <button
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

  const [errorMsg, setErrorMsg] = useState({
    msg: "",
  });

  const handleSubmit = (e) => {
    // What is this?
    e.preventDefault();
    console.log("Request object:", credentials);
    axios
      .post(`${baseUrl}/Login.php`, credentials)
      .then((response) => {
        if (
          response.data.error === "No Records Found" &&
          (credentials.login.length !== 0 || credentials.password).length !== 0
        ) {
          console.log(response);
          console.log(response.data.error);
          setErrorMsg({
            msg: "No records with those credentials.",
          });
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
        onSubmit={(e) => handleSubmit(e)}
        style={
          {
            // display: "flex",
            // flexDirection: "column",
          }
        }
      >
        <div className="form-group row m-5">
          <label for="username" className="col-sm-2 col-form-label">
            Username
          </label>
          <div className="col-sm-10">
            <input
              type="username"
              className="form-control"
              id="username"
              placeholder="Username"
              value={credentials.login}
              onChange={(e) => handleChange(e, "login")}
            />
          </div>
        </div>
        <div className="form-group row m-5">
          <label for="inputPassword" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) => handleChange(e, "password")}
            />
          </div>
        </div>
        <input type="submit" className="btn btn-secondary"/>
      </form>
      <h1 style={{ color: "red" }}>{errorMsg.msg}</h1>
    </div>
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
      <h2>Create a new account</h2>
      <form
        onSubmit={(e) => handleSubmit(e)}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label>
          First Name
          <input
            value={newUser.FirstName}
            onChange={(e) => handleChange(e, "FirstName")}
          />
        </label>
        <label>
          Last Name
          <input
            value={newUser.LastName}
            onChange={(e) => handleChange(e, "LastName")}
          />
        </label>
        <hr />
        <label>
          Username
          <input
            value={newUser.userId}
            onChange={(e) => handleChange(e, "userId")}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={newUser.password}
            onChange={(e) => handleChange(e, "password")}
          />
        </label>
        <input type="submit" />
      </form>
    </div>
  );
};

export default AuthPage;
