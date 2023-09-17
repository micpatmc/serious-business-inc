import React from 'react';
import businessLogo from "./images/largeLogo.png";
import { useNavigate } from 'react-router-dom';

const DisplayPage = () => {
  const navigate = useNavigate();

  const goToTargetPage = () => {
    navigate("/login");
  };

  return (
    <div
      id="DisplayPage-home"
    >
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
      <h1 onClick={goToTargetPage} style={{textAlign: 'center'}} >This is a test Display Page. Click me to login.</h1>
    </div>
  );
};

export default DisplayPage;
