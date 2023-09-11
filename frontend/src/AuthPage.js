import {
  React,
  useState
} from 'react';
import axios from 'axios';
import stockArt from './images/loginPageArt.jpg';
const baseUrl = 'http://seriousbusinessincorporated.online/LAMPAPI';

const AuthPage = (props) => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "white"
      }}
    >
      {/*Inner box*/}
      <div
        style={{
          height: "80vh",
          margin: "10%",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly"
          }}
        >
          <AuthBox />
          {/* <img
            style={{
              maxWidth: "50%",
              filter: "invert(100%)"
            }}
            src={stockArt}
          /> */}
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
      width="50%"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
        borderRadius: "9px",
        width: "70%",
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
  );
};

const ToggleBar = ({loginOn, setLoginOn}) => {
  const buttonStyle = {
    width: "50%",
    height: "40px",
    border: "0px",
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
  return (<div>
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
        if (response.data.error === 'No Records Found') {
          console.log(response);
          console.log(response.data.error);
          setErrorMsg({
            msg: 'No records with those credentials.'});

          // 'No records with those credentials.'
        }
        else {
          // save response.body to local storage
          // change view to contact page
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