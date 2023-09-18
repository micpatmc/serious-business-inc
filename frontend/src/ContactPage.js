import { useState, useEffect } from 'react';
import axios from 'axios';
import testContacts from './testContacts.json';
import logo from './images/largeLogo.png';
import { useNavigate } from 'react-router-dom';
import {
  MdOutlineExitToApp
} from 'react-icons/md';
import './ContactPage.css';
const baseUrl = 'http://seriousbusinessincorporated.online/LAMPAPI';

const ContactPage = () => {
  const [contacts, setContacts] = useState([]);
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

  const performPost = (operation, object) => {
    const plural = operation === 'Get' ? 's' : '';
    axios.post(`${baseUrl}/${operation}Contact${plural}.php`, object)
      .then(response => {
        console.log(response);
        setContacts(response.data.contacts);
      })
      .catch(error => console.log(error))
  }

  const addContact = contact => {
    contact.userId = currentUser.id;
    performPost('Add', contact);
  };
  const getContacts = userId => performPost('Get', {userId});
  const updateContact = contact => {
    contact.userId = currentUser.id;
    console.log(contact);
    performPost('Update', contact)
  };
  const deleteContact = contact => performPost('Delete', {id: contact.id, userId: currentUser.id});


  useEffect(() => {
    getContacts(currentUser.id);
  }, []);

  return (<div className="main">
    <HeaderBar currentUser={currentUser} />
    <ContactBook contacts={contacts} addContact={addContact} updateContact={updateContact} deleteContact={deleteContact} />
  </div>);
};

const HeaderBar = ({currentUser}) => {
  const navigate = useNavigate();

  const logOut = () => {
    sessionStorage.removeItem('currentUser');
    navigate('/');
  }
  
  return (
    <header>
      <img
        className="header-logo"
        src={logo}
      />
      <h1 id="header-text">Contact Manager</h1>
      <span id="header-right-span">
        <ProfileIcon contact={currentUser} />
        <h3
        >Hello, {currentUser.firstName}</h3>
        <button
          className="log-out button-4"
          onClick={logOut}
        >
          <MdOutlineExitToApp
            size="2em"
          />
          <h3 style={{marginBlock: 0}}>Log out</h3>
        </button>
      </span>
    </header>
  );
};

const ContactBook = ({contacts, addContact, updateContact, deleteContact}) => {
  const [search, setSearch] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const contactContainsSearch = (contact) => {
    return `${contact.firstName.toLowerCase()} ${contact.lastName.toLowerCase()} ${contact.phoneNumber} ${contact.emailAddress}`.includes(search);
    // return JSON.stringify(contact).includes(search);
  }

  const handleAdd = () => {
    setIsAdding(true);
  }

  const tableRows = contacts.length === 0 && !isAdding
    ? <tr>
      <td />
      <td />
      <td />
      <td id="no-contacts-error ">No contacts found</td>
    </tr>
    : contacts
      .filter(contact => contactContainsSearch(contact))
      .sort((a, b) => a.lastName.charCodeAt(0) - b.lastName.charCodeAt(0))
      .map(contact => <Contact contact={contact} key={contact.id} updateContact={updateContact} deleteContact={deleteContact} />);

  return (<main>
    <span id="contact-book-header">
      <input
        className="searchBar"
        type="text"
        value={search}
        placeholder="Search contacts"
        onChange={e => setSearch(e.target.value)}
      />
      <button
        onClick={handleAdd}
        className="button-4"
      >
        Add contact
      </button>
    </span>
    <table>
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
      { isAdding ? <AddContact addContact = {addContact} setIsAdding={setIsAdding} /> : null }
      { tableRows }
      </tbody>
    </table>
  </main>);
};

const AddContact = ({addContact, setIsAdding, userId}) => {
  const [editContact, setEditContact] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    emailAddress: ''
  });

  const handleSubmit = e => {
    e.preventDefault();
    addContact(editContact);
    setIsAdding(false)
  };

  const handleChange = (key, e) => {
    setEditContact({
      ...editContact,
      [key]: e.target.value
    });
  };

  return <tr>
    <td>
      <form id={-1} onSubmit={e => handleSubmit(e)} >
        <input type="hidden" />
      </form>
    </td>
    <td>
      <input required
        form={-1}
        placeholder="Enter first name"
        value={editContact.firstName}
        onChange={e => handleChange('firstName', e)}
      />
    </td>
    <td>
      <input required
        form={-1}
        placeholder="Enter last name"
        value={editContact.lastName}
        onChange={e => handleChange('lastName', e)}
      />
      </td>
    <td>
      <input required
        form={-1}
        placeholder="Enter phone number"
        value={editContact.phoneNumber}
        onChange={e => handleChange('phoneNumber', e)}
      />
      </td>
    <td>
      <input required
        form={-1}
        placeholder="Enter email address"
        value={editContact.emailAddress}
        onChange={e => handleChange('emailAddress', e)}
      />
    </td>
    <td>
      <span className="action-menu">
        <input
          form={-1}
          type="submit"
          className="button-4"
        />
        <button
          className="button-4"
          onClick={() => setIsAdding(false)}
        >
          Cancel
        </button>
      </span>
    </td>
  </tr>;
};

const Contact = ({contact, updateContact, deleteContact}) => {
  const [editContact, setEditContact] = useState(contact);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    updateContact(editContact);
    setIsEditing(false);
  };

  const handleChange = (key, e) => {
    setEditContact({
      ...editContact,
      [key]: e.target.value
    });
  };

  const actionMenu = !isDeleting
    ? <span className="action-menu">
      <button
        onClick={() => setIsEditing(true)}
          className="button-4"
      >
        Edit
      </button>
      <button
        onClick={() => setIsDeleting(true)}
          className="button-4"
      >
        Delete
      </button>
    </span>
    : <span className="action-menu">
      <button
        onClick={() => setIsDeleting(false)}
        className="button-4"
      >Cancel</button>
      <button
        onClick={() => {
          deleteContact(contact)
        }}
        className="button-4 delete-button"
      >Confirm deletion</button>
    </span>;

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
          placeholder="Enter first name"
          value={editContact.firstName}
          onChange={e => handleChange('firstName', e)}
        />
      </td>
      <td>
        <input required
          form={contact.id}
          placeholder="Enter last name"
          value={editContact.lastName}
          onChange={e => handleChange('lastName', e)}
        />
        </td>
      <td>
        <input required
          form={contact.id}
          placeholder="Enter phone number"
          value={editContact.phoneNumber}
          onChange={e => handleChange('phoneNumber', e)}
        />
        </td>
      <td>
        <input required
          form={contact.id}
          placeholder="Enter email address"
          value={editContact.emailAddress}
          onChange={e => handleChange('emailAddress', e)}
        />
      </td>
      <td>
        <span className="action-menu">
          <input
            form={contact.id}
            type="submit"
            className="button-4"
          />
          <button
            className="button-4"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </span>
      </td>
    </tr>;
  return !isEditing ? <tr>
    <td><ProfileIcon contact={contact} /></td>
    <td>{contact.firstName}</td>
    <td>{contact.lastName}</td>
    <td>{contact.phoneNumber}</td>
    <td>{contact.emailAddress}</td>
    <td className="action-menu">
      { actionMenu }
    </td>
  </tr> : editableContact;
};

const ProfileIcon = ({contact}) => {
  const initials = contact.firstName.charAt(0) + contact.lastName.charAt(0);
  return (
    <div className="profile-icon">
      <p><b>{initials}</b></p>
    </div>
  );
};

export default ContactPage;