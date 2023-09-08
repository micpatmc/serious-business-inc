import {
  React,
  useState
} from 'react';
import axios from 'axios';
import stockArt from './images/loginPageArt.jpg'

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
    {/* <button onClick={() => setLoginOn(!loginOn)}>
      Toggle
    </button> */}
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

  const handleSubmit = e => {
    axios.post('')
  }

  return (
  <div>
    <h2>Welcome back</h2>
    <form
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
        onSubmit={e => handleSubmit(e)}
      />
    </form>
  </div>);
};

const RegistrationCard = () => {
  // function submitData {
  //   const submitObject ={
  //     // fill in based on POST api
  //     username: username,
  //     password: password,
  //     name: name,
  //     email: email
  //   }
  //   axios.post('group8awesomeproject.com/Login.php', submitObject);
  //   .then((response) => {
  //     switch (response.data.code) {
  //       case 200:
  //         Yay! Switch page
  //       case 401:
  //         display error message
  //     }
  //   });
  // }
  return (<>
    <h2>Create a new account</h2>
    <p>Registration</p>
  </>);
};

export default AuthPage;