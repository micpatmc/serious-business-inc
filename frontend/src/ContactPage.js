import { useState, useEffect } from 'react';
import axios from 'axios';
import testContacts from './testContacts.json';
import logo from './images/largeLogo.png';
import { useNavigate } from 'react-router-dom';
import './App.css';
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
        backgroundColor: "gray",
        alignItems: "center"
      }}
    >
      <img
        src={logo}
        height="100%"
      />
      <h1
        style={{
          margin: "auto"
        }}
      >Contact Manager</h1>
      <ProfileIcon contact={currentUser} />
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
  const [search, setSearch] = useState('');

  const contactContainsSearch = (contact) => {
    return JSON.stringify(contact).includes(search);
  }

  return (<>
    <span>
      <input
        type="text"
        value={search}
        placeholder="Search contacts"
        onChange={e => setSearch(e.target.value)}
      />
      <button>
        Add contact
      </button>
    </span>
    <table
      style={{
        margin: "0 5%",
        width: "100%"
      }}
    >
      <thead>
        <tr>
          <th></th>
          <th>First name</th>
          <th>Last name</th>
          <th>Phone number</th>
          <th>Email address</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {
        contacts
          .filter(contact => contactContainsSearch(contact))
          .sort((a, b) => a.lastName.charCodeAt(0) - b.lastName.charCodeAt(0))
          .map(contact => <Contact contact={contact} key={contact.id} />)
      }
      </tbody>
    </table>
  </>);
};

const Contact = ({contact, }) => {
  const [editContact, setEditContact] = useState(contact);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    // axios post EditContact.php
    setIsEditing(false);
  };

  const handleChange = (key, e) => {
    setEditContact({
      ...editContact,
      [key]: e.target.value
    });
  };

  const editableContact = 
    <tr>
      <td>
        <form id={contact.id} onSubmit={e => handleSubmit(e)} >
          <input type="hidden" />
        </form>
      </td>
      <td>
        <input required
          form={contact.id}
          value={editContact.firstName}
          onChange={e => handleChange('firstName', e)}
        />
      </td>
      <td>
        <input required
          form={contact.id}
          value={editContact.lastName}
          onChange={e => handleChange('lastName', e)}
        />
        </td>
      <td>
        <input required
          form={contact.id}
          value={editContact.phoneNumber}
          onChange={e => handleChange('phoneNumber', e)}
        />
        </td>
      <td>
        <input required
          form={contact.id}
          value={editContact.emailAddress}
          onChange={e => handleChange('emailAddress', e)}
        />
      </td>
      <td>
        <input
          form={contact.id}
          type="submit"
        />
        <button
          onClick={() => setIsEditing(false)}
        >
          Cancel
        </button>
      </td>
    </tr>;
  return !isEditing ? <tr>
    <td><ProfileIcon contact={contact} /></td>
    <td>{contact.firstName}</td>
    <td>{contact.lastName}</td>
    <td>{contact.phoneNumber}</td>
    <td>{contact.emailAddress}</td>
    <td>
      <button
        onClick={() => setIsEditing(true)}
      >
        Edit
      </button>
      <button>
        Delete
      </button>
    </td>
  </tr> : editableContact;
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
        backgroundColor: "lightblue",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.2rem"
      }}
    >
      <p><b>{initials}</b></p>
    </div>
  );
};

export default ContactPage;