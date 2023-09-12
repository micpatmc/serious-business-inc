import { useState, useEffect } from 'react';
import axios from 'axios';
import testContacts from './testContacts.json';
import logo from './images/placeholderLogo.png';
import { useNavigate } from 'react-router-dom';
const baseUrl = 'http://seriousbusinessincorporated.online/LAMPAPI';

const ContactPage = () => {
  const [contacts, setContacts] = useState([]);
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

  useEffect(() => {
    // axios.get(`${baseUrl}/GetContacts.php`)
    //   .then(response => { setContacts(response.body); })
    //   .catch(error => console.log(error));
    setContacts(testContacts);
  }, []);

  return (<>
    <HeaderBar currentUser={currentUser} />
    <ContactBook contacts={contacts} />
  </>);
};

const HeaderBar = ({currentUser}) => {
  const navigate = useNavigate();

  const logOut = () => {
    sessionStorage.removeItem('currentUser');
    navigate('/');
  }
  
  return (
    <header
      style={{
        display: "flex",
        flexDirection: "row",
        height: "8vh",
        backgroundColor: "gray"
      }}
    >
      <img
        src={logo}
      />
      <h1
        style={{
          margin: "auto"
        }}
      >Contact Manager</h1>
      <h3
      >Hello, {currentUser.firstName}</h3>
      <button
        style={{
          marginLeft: "auto"
        }}
        onClick={logOut}
      >
        Log out
      </button>
    </header>
  );
};

const ContactBook = ({contacts}) => {
  return (
    <table>
      <ContactBookHeader />
      <ContactTable
        contacts={contacts}
      />
    </table>
  );
};

const ContactBookHeader = ({}) => {
  return (
    <thead>
      <tr>
        <th></th>
        <th>First name</th>
        <th>Last name</th>
        <th>Phone number</th>
        <th>Email address</th>
      </tr>
    </thead>
  )
};

const ContactTable = ({contacts}) => {
  return (
    <tbody>
    {
      contacts.map(contact => <Contact contact={contact} />)
    }
    </tbody>
  );
};

const Contact = ({contact}) => {
  return <tr key={contact.id}>
    <td><ProfileIcon contact={contact} /></td>
    <td>{contact.firstName}</td>
    <td>{contact.lastName}</td>
    <td>{contact.phoneNumber}</td>
    <td>{contact.emailAddress}</td>
  </tr>
};

const ProfileIcon = ({contact}) => {
  const initials = contact.firstName.charAt(0) +
  contact.lastName.charAt(0)
  return (
    <div
      style={{
        height: "3rem",
        width: "3rem",
        borderRadius: "1.5rem",
        backgroundColor: "lightblue"
      }}
    >
      <p><b>{initials}</b></p>
    </div>
  );
};

export default ContactPage;