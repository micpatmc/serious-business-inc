import {
  React,
  useState
} from 'react';
import axios from 'axios';

const AuthPage = (props) => {
  return (<>
    <div
    >
      {/*Inner box*/}
      <div
      >
        <div>
          <AuthBox />
        </div>
        <img />
      </div>
    </div>
  </>);
}

const AuthBox = () => {
  const [loginOn, setLoginOn] = useState(true);

  const authState = (loginOn)
    ? <LoginCard />
    : <RegistrationCard />;
  return (<>
    <ToggleBar 
      loginOn={loginOn}
      setLoginOn={setLoginOn}
    />
    {authState}
  </>);
};

const ToggleBar = ({loginOn, setLoginOn}) => {
  return (<>
    <button onClick={() => setLoginOn(!loginOn)}>
      Click me!
    </button>
  </>);
};

// WARNING PSUEDOCODE AHEAD

const LoginCard = () => {
  username, setUsername = useState
  password, setPassword = useState
  function submitData {
    const submitObject ={
      // fill in based on POST api
      username: username,
      password: password
    }
    axios.post('group8awesomeproject.com/Login.php', submitObject);
    .then((response) => {
      switch (response.data.code) {
        case 200:
          Yay! Switch page
        case 401:
          display error message
      }
    });
  }
  return (<>
    <form
      isActive
    >
    </form>
    <p>{string}</p>
    button onClick, submitData
  </>);
};

const RegistrationCard = () => {
  function submitData {
    const submitObject ={
      // fill in based on POST api
      username: username,
      password: password,
      name: name,
      email: email
    }
    axios.post('group8awesomeproject.com/Login.php', submitObject);
    .then((response) => {
      switch (response.data.code) {
        case 200:
          Yay! Switch page
        case 401:
          display error message
      }
    });
  }
  return (<>
    <p>Registration</p>
  </>);
};

export default AuthPage;