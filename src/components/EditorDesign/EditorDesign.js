import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { Container, Form, Button, InputGroup, ButtonGroup } from 'react-bootstrap';
import classes from './EditorDesign.module.css';
import axios from 'axios';
import draftToMarkdown from 'draftjs-to-markdown';
import app from '../../firebase';
import firebase from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { getDatabase,ref, push,set } from 'firebase/database';
import { useSelector } from 'react-redux';

const EmailEditor = () => {
    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('');
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [showCc, setShowCc] = useState(false);
    const [showBcc, setShowBcc] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [subjectError, setSubjectError] = useState(false);
    const [bodyError, setBodyError] = useState(false);
const userEmail = useSelector((state) => state.auth.registeredEmail);

    const toggleCc = () => setShowCc(!showCc);
    const toggleBcc = () => setShowBcc(!showBcc);

    const handleToChange = (e) => setTo(e.target.value);
    const handleSubjectChange = (e) => setSubject(e.target.value);


    const onEditorStateChange = (editorState) => {
      setEditorState(editorState);
    };
    
      const handleSendEmail = async (e) => {
        e.preventDefault();
    
     
        const body = draftToMarkdown(convertToRaw(editorState.getCurrentContent()))


            e.preventDefault();
          
            const email = {
                from: userEmail,
                to: to,
                subject: subject,
                body: body,
            };
             console.log(email);
            //  const db = getDatabase(app);
            //   try {
            //     const mailClientRef = ref(db, 'MailClient');

            //     // Set the email object under the 'MailClient' path
            //     await set(mailClientRef, email);
                

              
            //   } catch (error) {
            //     console.error('Error adding sddocument: ', error);
            //   }
            console.log(email.from.replace(/\./g, '-'));
function validations(){
    let isValid = true;
    if(email.to === '' || email.to === null){
        setEmailError(true);
        isValid = false;
    }
    else{
        setEmailError(false);
        isValid = true;
    }
    if(email.subject === '' || email.subject === null){
        setSubjectError(true);
        isValid = false;
    }
    else{
        setSubjectError(false);
        isValid = true;
    }
    if(body.trim() === ''){
        console.log('body error');
        setBodyError(true);
        isValid = false;
    }
    else{
        console.log('no body error');
        setBodyError(false);
        isValid = true;
    }
    return isValid;
}

          

       if(validations()){
            try {
              const response = await fetch(`https://mail-cient-mails-default-rtdb.firebaseio.com/emails/sent-mails/${email.from.replace(/\./g, '-')}.json`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(email),
              });
            
              if (!response.ok) {
                throw new Error('Failed to send email to Firebase.');
              }
            
              console.log('Email sent successfully to Firebase.');
            } catch (error) {
              console.error('Error sending email to Firebase:', error);
            }   
            
        
            try {
                const response = await fetch(`https://mail-cient-mails-default-rtdb.firebaseio.com/emails/received-mails/${email.to.replace(/\./g, '-')}.json`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(email),
                });
              
                if (!response.ok) {
                  throw new Error('Failed to send email to Firebase.');
                }
              
                console.log('Email sent successfully to Firebase.');
              } catch (error) {
                console.error('Error sending email to Firebase:', error);
              }    //need to send email to backend with firebase
       }
       else{
        return;
       }  
          
        // setTo('');
        // setSubject('');
        // setEditorState(EditorState.createEmpty());
    };

    return (
        
        <div style={{width:'90%'}}>
            <Form>
                <Form.Group controlId="formTo" style={{position:'relative'}}>
                    <Form.Label className={classes.labelAdjustment} >To:</Form.Label>
                    <InputGroup className="mb-1"  >
                        <Form.Control
                            type="email"
                            value={to}
                            onChange={handleToChange}
                            placeholder="Enter recipient's email"
                            style={{
                            userSelect: 'none',    
                            paddingLeft: '30px',
                            border: 'oldlace',
                            borderBottom: '1px solid #d6d3d3',
                            borderRadius:'0'}}
                            className='input-adjustment'
                        
                        />
                        <ButtonGroup className={classes.customCcandBcc}>
                            <Button variant="" onClick={toggleCc} className={classes.customCc} >
                                CC
                            </Button>
                
                            <Button variant="" onClick={toggleBcc} className={classes.customBcc}>
                                BCC
                            </Button>
                        </ButtonGroup>
                    </InputGroup>
                    {emailError && <p style={{ color: 'red' }}>Please enter recipient's email</p>}
                    {showCc && (
                        <Form.Group style={{position:'relative'}}>
                            <Form.Label className={classes.labelAdjustment}>CC:</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter CC email"
                           className='input-adjustment mb-1'
                           style={{
                            paddingLeft:'40px', 
                            userSelect: 'none',    
                            paddingLeft: '40px',
                            border: 'oldlace',
                            borderBottom: '1px solid #d6d3d3',
                            borderRadius:'0'}}
                      
                            />
                        </Form.Group>
                    )}
                    {showBcc && (
                        <Form.Group style={{position:'relative'}}>
                            <Form.Label className={classes.labelAdjustment}>BCC:</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter BCC email"
                                className='input-adjustment mb-1'
                                style={{
                                    paddingLeft:'50px', 
                                    userSelect: 'none',    
                                    paddingLeft: '40px',
                                    border: 'oldlace',
                                    borderBottom: '1px solid #d6d3d3',
                                    borderRadius:'0'}}
                            />
                        </Form.Group>
                    )}
                </Form.Group >
                <Form.Group controlId="formSubject" style={{position:'relative'}}>
                    <Form.Label className={classes.labelAdjustment}>Subject:</Form.Label>
                    <Form.Control
                        type="text"
                        value={subject}
                        onChange={handleSubjectChange}
                        placeholder="Enter email subject"
                        className='input-adjustment mb-1'
                        style={{
                            paddingLeft:'60px', 
                            userSelect: 'none',    
                         
                            border: 'oldlace',
                            borderBottom: '1px solid #d6d3d3',
                            borderRadius:'0'}}
                    />
                </Form.Group>
                {subjectError && <p style={{ color: 'red' }}>Please enter email subject</p>}
                <Form.Group controlId="formBody">
                    <Form.Label>Body:</Form.Label>
                    <div className="editor-wrapper" style={{ border: '1px solid #ced4da', padding: '8px', borderRadius: '4px', minHeight: '200px' }}>
                        <Editor
                            
                            editorState={editorState}
                            wrapperClassName="demo-wrapper"
                            editorClassName="demo-editor"
                            onEditorStateChange={onEditorStateChange}
                            
                        />      
                    </div>
              {bodyError && <p style={{ color: 'red' }}>Please enter email body</p>}
                    
                </Form.Group>
                <Button variant="primary" onClick={handleSendEmail}>
                    Send Email
                </Button>
            </Form>
        </div>
    );
};

export default EmailEditor;
