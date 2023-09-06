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

const LoginCard = () => {
  let string = "fsdf";
  return (<>
    <p>{string}</p>
  </>);
};

const RegistrationCard = () => {
  return (<>
    <p>Registration</p>
  </>);
};

export default AuthPage;