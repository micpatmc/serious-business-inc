import { useState, useEffect } from 'react';
import axios from 'axios';
import testContacts from './testContacts.json';
const baseUrl = 'http://seriousbusinessincorporated.online/LAMPAPI';

const ContactPage = ({currentUser}) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // axios.get(`${baseUrl}/GetContacts.php`)
    //   .then(response => { setContacts(response.body); })
    //   .catch(error => console.log(error));
    setContacts(testContacts);
  }, []);

  return (<>
    <HeaderBar currentUser={currentUser} />
    <div>
      <ContactBook contacts={contacts} />
    </div>
  </>);
};

const HeaderBar = ({}) => {
  return (
    <header>
      
    </header>
  );
};

const ContactBook = ({}) => {
  return (
    <main>

    </main>
  );
};

const ContactBookHeader = ({}) => {
  return (
    <header>

    </header>
  )
};

const ContactTable = ({}) => {

};

const Contact = ({}) => {

};

const ProfileIcon = ({contact}) => {
  // const initials = `${contacts.firstName.}`
  return (
    <div
      style={{
        height: "3rem",
        width: "3rem",
        borderRadius: "1.5rem",
      }}
    >
      <p><b></b></p>
    </div>
  );
};

export default ContactPage;