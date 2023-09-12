import {
  React,
  useState
} from 'react';
import axios from 'axios';
import stockArt from './images/loginPageArt.jpg';
import { useNavigate } from 'react-router-dom';
const baseUrl = 'http://seriousbusinessincorporated.online/LAMPAPI';

const AuthPage = () => {
  return (
    <div
      style={{
        // width: "100vw",
        // height: "100vh",
        backgroundColor: "white"
      }}
    >
      {/*Inner box holding AuthBox and side image.*/}
      <div
        style={{
          height: "80vh",
          margin: "10%",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
          <AuthBox />
          <div>
            {/* Picture. */}
            <img src={stockArt}
              alt="Generic business pic."
              style={{
                objectFit: "fill",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                // Below attributes helps keep size same when scaling browser.
                maxWidth: "100%",
                maxHeight: "100%",
                // height: "auto"
              }}>
              </img>
          </div>
      </div>
    </div>
  );
}

const AuthBox = () => {
  const [loginOn, setLoginOn] = useState(true);

  const authState = (loginOn)
    ? <LoginCard />
    : <RegistrationCard />;
  return (
    <div
      style={{
        height: "75vh",
        display: "flex",
        justifyContent:'center', 
        alignItems:'center'
      }}
      >
    {/* Sign in box. */}
    <div
      width="50%"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
        borderRadius: "9px",
        width: "75%",
        maxWidth: "400px",
        height: ""   
      }}
    >
      <ToggleBar 
        loginOn={loginOn}
        setLoginOn={setLoginOn}
      />
      {authState}
    </div>
    </div>
  );
};

const ToggleBar = ({loginOn, setLoginOn}) => {
  const buttonStyle = {
    width: "50%",
    height: "3rem",
    border: "0rem",
    borderRadius: "9px 9px 0 0",
    fontSize: "1.2rem"
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
  </div>);
};

// WARNING PSUEDOCODE AHEAD

const LoginCard = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    login: '',
    password: ''
  });

  const handleChange = (e, key) => {
    setCredentials({
      ...credentials,
      [key]: e.target.value
    });
  }

  const [errorMsg, setErrorMsg] = useState({
    msg: ''
  });

  const handleSubmit = e => {
    // What is this?
    e.preventDefault();
    console.log('Request object:', credentials);
    axios.post(
      `${baseUrl}/Login.php`,
      credentials)
      .then(response => {
        if ((response.data.error === 'No Records Found') && 
              (credentials.login.length !== 0 || 
                credentials.password).length !== 0) {
          console.log(response);
          console.log(response.data.error);
          setErrorMsg({
            msg: 'No records with those credentials.'});
        }
        else {
          sessionStorage.setItem('currentUser', JSON.stringify(response.data))
          navigate('/contacts');
        }
      })
      .catch(error => console.log(error));
  }

  return (
  <div>
    <h2>Welcome back</h2>
    <form
      onSubmit={e => handleSubmit(e)}
      style={{
        display: "flex",
        flexDirection: "column"
      }}
    >
      <label>
        Username
        <input
          value={credentials.login}
          onChange={e => handleChange(e, 'login')}
        />
      </label>
      <label>
        Password
        <input
          value={credentials.password}
          onChange={e => handleChange(e, 'password')}
        />
      </label>
      <input
        type="submit"
      />
    </form>
    <h1 style={{color:"red"}}>{errorMsg.msg}</h1>
  </div>);
};

const RegistrationCard = () => {
  const [newUser, setNewUser] = useState({
    userId: '',
    password: '',
    FirstName: '',
    LastName: ''
  });

  const handleChange = (e, key) => {
    setNewUser({
      ...newUser,
      [key]: e.target.value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Request object:', newUser);
    axios.post(
      `${baseUrl}/AddUser.php`,
      newUser)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

  return (
  <div>
    <h2>Create a new account</h2>
    <form
      onSubmit={e => handleSubmit(e)}
      style={{
        display: "flex",
        flexDirection: "column"
      }}
    >
      <label>
        First Name
        <input
          value={newUser.FirstName}
          onChange={e => handleChange(e, 'FirstName')}
        />
      </label>
      <label>
        Last Name
        <input
          value={newUser.LastName}
          onChange={e => handleChange(e, 'LastName')}
        />
      </label>
      <hr />
      <label>
        Username
        <input
          value={newUser.userId}
          onChange={e => handleChange(e, 'userId')}
        />
      </label>
      <label>
        Password
        <input
          value={newUser.password}
          onChange={e => handleChange(e, 'password')}
        />
      </label>
      <input
        type="submit"
      />
    </form>
  </div>);
};

export default AuthPage;