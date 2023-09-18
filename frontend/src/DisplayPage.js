import React from "react";
import "./DisplayPage.css";
import businessLogo from "./images/largeLogo.png";
import businessCartoon from "./images/display_page.png";
import { useNavigate } from "react-router-dom";

const DisplayPage = () => {
  const navigate = useNavigate();

  const goToTargetPage = () => {
    navigate("/login");
  };

  return (
    <div id="DisplayPage-background">
      <nav id="AuthPage-nav" class="navbar-dark">
        <div class="container-fluid">
          <img
            src={businessLogo}
            alt="Serious Business Incorporated"
            width="270"
            height="90"
          ></img>
        </div>
      </nav>
      {/* <div className="container align-items-center"> */}
      <div
        id="DisplayPage-centerbox"
        className="row align-items-center grid rounded shadow-lg m-5 p-3"
      >
        <div className="col m-3">
          {/* Mission Statement */}
          <h1>Welcome to our site!</h1>
          <h2>Serious Business Inc.</h2>
          <h3>Contact Manager</h3>
          <p id="DisplayPage-missionstatement">
            Serious Business Incorporated integrates cutting-edge business
            solutions to drive growth. Stakeholder engagement remains paramount
            in our market-centric approach. Through strategic alignment and
            robust value propositions, industry benchmarks consistently evolve.
          </p>
          <button className="btn btn-secondary m-3" onClick={goToTargetPage}>
            Login/Register
          </button>
        </div>
        <div className="col">
          {/* <img
              className="img-fluid"
              src={businessCartoon}
              alt="Cartoon people disucssing business."
            ></img> */}
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default DisplayPage;
