import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import classes from './SignUpPage.module.css';




const SignUpPage =(props) => {      
     const emailInputRef = useRef();
     const passwordInputRef1 = useRef();
     const passwordInputRef2 = useRef(); // Add a ref for the Confirm Password input field
     const navigate =useNavigate();
     const [isLoading, setIsLoading] = useState(false);
     const [error, setError] = useState('');
     const [emailFieldError, setEmailFieldError] = useState('');
     const [passwordFieldError, setPasswordFieldError] = useState('');
     const [confirmPasswordFieldError, setConfirmPasswordFieldError] = useState(''); // Add a state for the Confirm Password field
   
     function validateFields(enteredEmail, enteredPassword, confirmedPassword) {
          // Trimmed lengths of input fields
          const emailLength = enteredEmail.trim().length;
          const passwordLength = enteredPassword.trim().length;
          const confirmPasswordLength = confirmedPassword.trim().length;
      
          // Check if any field is empty and set the respective error messages
          if (emailLength === 0 || passwordLength === 0 || confirmPasswordLength === 0) {
              if (emailLength === 0) {
                  setEmailFieldError('Please fill the field');
              } else {
                  setEmailFieldError('');
              }
      
              if (passwordLength === 0) {
                  setPasswordFieldError('Please fill the field');
                  setError('');
              } else {
                  setPasswordFieldError('');
              }
      
              if (confirmPasswordLength === 0) {
               setError('');
                  setConfirmPasswordFieldError('Please fill the field');
              } else {
                  setConfirmPasswordFieldError('');
              }
              return false;
          }
          setEmailFieldError('');
          setPasswordFieldError('');
          setConfirmPasswordFieldError('');
          return true;
      }
      








     const submitHandler = (event) => {
       event.preventDefault();
   
       const enteredEmail = emailInputRef.current.value;
       const enteredPassword = passwordInputRef1.current.value;
       const confirmedPassword = passwordInputRef2.current.value; // Get the value of Confirm Password
       let  validation =true;
       // Check if passwords match
   validation =   validateFields(enteredEmail, enteredPassword, confirmedPassword);
   if (!validation) {
     return;
     }
       if (enteredPassword.trim().length !=0 &&confirmedPassword.trim().length !=0  && enteredPassword !== confirmedPassword) {
          setConfirmPasswordFieldError('');
         setError('Passwords do not match');
         return;
       }
   
       setIsLoading(true);

       let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDcyqi2t1KKsniE8q1DWoge17LEVLNT_ng';
   
       fetch(url, {
         method: 'POST',
         body: JSON.stringify({
           email: enteredEmail,
           password: enteredPassword,
           returnSecureToken: true,
         }),
         headers: {
           'Content-Type': 'application/json',
         },
       })
       .then((res) => {
          setIsLoading(false);
          emailInputRef.current.value='';
          passwordInputRef1.current.value='';
          passwordInputRef2.current.value='';
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = 'Authentication failed!';
              if (data && data.error && data.error.message) {
                errorMessage = data.error.message;
              }
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {console.log(data,'Logged in')})
        .catch((err) => {
          alert(err.message);
        });
    };
   return (     
        <>
       < div className={classes.signUpContainer}>
         <section className={classes.auth}>
      <h1>SignUp</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
         
          <input type="text" id="email" ref={emailInputRef} placeholder='Email'/> 
          <label htmlFor="email" className={classes.labelProp}>Email</label>
          {emailFieldError && <p className={classes.error}>*{emailFieldError}*</p>} {/* Display error message */}
        </div>
        <div className={classes.control}>
        
          <input type="password" id="password"  ref={passwordInputRef1} placeholder='Password'/>  
          <label htmlFor="password">Password</label>
          {passwordFieldError && <p className={classes.error}>*{passwordFieldError}*</p>} {/* Display error message */}
          </div>
          <div className={classes.control}>     
          <input type="password" id="password"  ref={passwordInputRef2} placeholder='Confirm Password'/>
           <label htmlFor="password">Confirm Password</label>
               {confirmPasswordFieldError && <p className={classes.error}>*{confirmPasswordFieldError}*</p>} {/* Display error message */}
          {error && <p className={classes.error}>*{error}*</p>} {/* Display error message */}
        </div>
        
        <div className={classes.actions}>
          <button>Create Account</button>
          {isLoading && <FaSpinner className="spinner" size={35} color="#2ab6da" />}
        </div>
        
      </form>
   
   
     </section>
     <button className={classes.account}>
      Have an account? <div onClick={()=>{navigate('/login')}} >Login</div>
    </button>
    </div>
        </>
   );
    }

    export default SignUpPage;