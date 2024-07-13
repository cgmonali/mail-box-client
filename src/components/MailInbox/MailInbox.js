import { useEffect,useState } from "react";
import { ListGroup } from "react-bootstrap";
import {  Form, Button } from 'react-bootstrap'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon from FontAwesome library
import { faTrashAlt, faStar as faStarRegular, faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';

const MailInbox = () => {
    const [emails, setEmails] = useState([]);
    useEffect(() => {
        loadInboxMail();
    }   ,[]);
 const userEmail = useSelector((state) => state.auth.registeredEmail);
    
const loadInboxMail= async () => {
  
        const response = await fetch(`https://mail-cient-mails-default-rtdb.firebaseio.com/emails/received-mails/${userEmail.replace(/\./g, '-').replace(/@/g, '%40')}.json`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.ok){
            const data = await response.json();
            console.log(data);
          
            const emailArray = Array.isArray(data) ? data : Object.values(data);
            setEmails(emailArray);
       
        }
        else{
            const data = await response.json();
            let errorMessage = 'Authentication failed!';
            throw new Error(errorMessage);
        }
      
    
}



    return (
   
        <div className="" style={{ width: "95%" }}>
          <ListGroup variant="flush">
            {emails.map((email, index) => (
              <ListGroup.Item key={index} className="d-flex align-items-center">
                <Form.Check type="checkbox" className="mr-8 ml-2" />
                <FontAwesomeIcon
                  icon={email.starred ? faStarSolid : faStarRegular}
                  className={`text-secondary ml-2 ${
                    email.starred ? "solid-star" : "hollow-star"
                  }`}
            
                  style={{ cursor: "pointer", margin: "0 10px" }}
                />
                <p className="mb-1 flex-grow-1"> {email.subject.substring(0, 9)}{email.subject.length > 9 && '..'}</p>

                <p className="mb-1 flex-grow-1"> {email.body.substring(0, 100)}{email.body.length > 100 && '...'}</p>

                <div>
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    className="text-secondary mr-3"
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
    
    );
}
 export default MailInbox;