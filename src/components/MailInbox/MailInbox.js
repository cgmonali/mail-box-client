import { useEffect,useState } from "react";
import { ListGroup } from "react-bootstrap";
import {  Form, Button } from 'react-bootstrap'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon from FontAwesome library
import { faTrashAlt, faStar as faStarRegular, faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';
import { getDatabase, ref, onValue, push, remove, get,onChildAdded } from "firebase/database";
import { app } from '../../firebase';
import { updateCount } from '../../store/authSlice';

const MailInbox = () => {
  const history = useNavigate();
    const [emails, setEmails] = useState([]);

   const db = getDatabase(app);
   const userEmail = useSelector((state) => state.auth.registeredEmail);
   const dispatch = useDispatch();
 
  useEffect(() => {
        loadInboxMail();

          const emailsRef = ref(db, `emails/received-mails/${userEmail.replace(/\./g, '-')}`);
      console.log(emailsRef);
          // Fetch existing emails
          onValue(emailsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
              const emailsList = Object.keys(data).map(key => ({ id: key, ...data[key] })).sort((a, b) => b.timestamp - a.timestamp);
              // console.log(emailsList);
              setEmails(emailsList);
              const unreadCount = emailsList.length - emailsList.filter(email => email.read === true).length;
              dispatch(updateCount(unreadCount));
            }
          });
          
          emails.map((email, index) => {
  
            console.log(email.id, email.read);
            markAsRead(email.id);
          }
          ).sort((a, b) => a.timestamp - b.timestamp)

        }, [userEmail]);






const loadInboxMail= async () => {
  
        const response = await fetch(`https://mail-cient-mails-default-rtdb.firebaseio.com/emails/received-mails/${userEmail.replace(/\./g, '-').replace(/@/g, '%40')}.json`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.ok){
            const data = await response.json();
            // console.log(data);
            Object.keys(data).forEach(id => {
              data[id].id = id;

            });
            const emailArray = Array.isArray(data) ? data : Object.values(data)  
            .map((email, id) => {
              return email;
            })
            .sort((a, b) => b.timestamp - a.timestamp);;
            emailArray.forEach(email => {
              markAsRead(email.id)
            })

            console.log(Array.isArray(emailArray), Array.isArray(emails),emails);
            const unreadCount = emailArray.length - emailArray.filter(email => email.read === true).length;
            dispatch(updateCount(unreadCount));
        }
        else{
            const data = await response.json();
            let errorMessage = 'Authentication failed!';
            throw new Error(errorMessage);
        }
      
    
}

const markAsRead = async (emailId) => {
  try {
      await fetch(`https://mail-cient-mails-default-rtdb.firebaseio.com/emails/received-mails/${userEmail.replace(/\./g, '-').replace(/@/g, '%40')}/${emailId}.json`, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ read: true }),
      });
      setEmails((prevEmails) => 
          prevEmails.map(email => 
              email.id === emailId ? { ...email, read: true } : email
          )
      );

  } catch (error) {
      console.error("Error updating email status:", error);
  }
};

const handleEmailClick = (emailId) => {
  markAsRead(emailId);
  history(`/MailBox/inbox/${emailId}`);
};


const deleteEmail = async (emailId) => {
  try {
    await fetch(`https://mail-cient-mails-default-rtdb.firebaseio.com/emails/received-mails/${userEmail.replace(/\./g, '-').replace(/@/g, '%40')}/${emailId}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setEmails((prevEmails) => prevEmails.filter(email => email.id !== emailId));
    dispatch(updateCount(emails.filter(email => !email.read).length));
  } catch (error) {
    console.error("Error deleting email:", error);
  }
};

    return (
   
        <div className="" style={{ width: "95%" }}> 
          <ListGroup variant="flush">
            {emails.map((email, index) => (
              <ListGroup.Item key={index} className="d-flex align-items-center">
                 {!email.read && <span className="blue-dot" style={{width:'10px',height:'10px',backgroundColor:'blue',borderRadius:'100%',marginLeft:'-10px',position: 'relative',right: '11px'}}></span>}
                <Form.Check type="checkbox" className="mr-8 ml-2" />
                <FontAwesomeIcon
                  icon={email.starred ? faStarSolid : faStarRegular}
                  className={`text-secondary ml-2 ${
                    email.starred ? "solid-star" : "hollow-star"
                  }`}
            
                  style={{ cursor: "pointer", margin: "0 10px" }}
                />
                        <div onClick={() => handleEmailClick(email.id)} className="flex-grow-1">
                       
                            <p className="mb-1 flex-grow-1">
                             {email.subject ? email.subject.substring(0, 9) : ''}{email.subject && email.subject.length > 9 && '..'}
                            </p>
                            <p className="mb-1 flex-grow-1">
                             {email.body ? email.body.substring(0, 100) : ''}{email.body && email.body.length > 100 && '...'}
                            </p>
                   </div>
                <div>
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    className="text-secondary mr-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => deleteEmail(email.id)}
                  />
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
    
    );
}
 export default MailInbox;