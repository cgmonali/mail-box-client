import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const EmailDetail = () => {
    const { emailId } = useParams();
    const userEmail = useSelector((state) => state.auth.registeredEmail);
    const [email, setEmail] = React.useState(null);
console.log(emailId)
    React.useEffect(() => {
        const fetchEmail = async () => {
            const response = await fetch(`https://mail-cient-mails-default-rtdb.firebaseio.com/emails/received-mails/${userEmail.replace(/\./g, '-').replace(/@/g, '%40')}/${emailId}.json`);
            if(response.ok){
                const data = await response.json();
                setEmail(data);
                // console.log(data);
            } else {
                console.log('Failed to fetch email');
            }
        };
        fetchEmail();
    }, [emailId, userEmail]);

    if (!email) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            < strong style={{}}> {email.from}</strong>  <span style={{color:'grey'}}>&lt;{email.from}&gt;</span>
            < span style={{display:'block',paddingLeft:'5px'}}> To:{email.from}</span> 

            <p style={{marginTop:'30px'}}>{email.body}</p>
        </div>
    );
};

export default EmailDetail;
