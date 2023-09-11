import React from 'react';
import { useNavigate } from 'react-router-dom';

const DisplayPage = () => {
  const navigate = useNavigate();

  const goToTargetPage = () => {
    navigate("/login");
  };

  return (
    <>
      <h1 onClick={goToTargetPage} style={{textAlign: 'center'}} >This is a test Display Page. Click me to login.</h1>
    </>
  );
};

export default DisplayPage;
