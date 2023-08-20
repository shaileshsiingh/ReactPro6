import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
setLoading(true)
    if (!isLogin) {
      try {
        const response = await fetch(
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCipmPxx-C8SxvVI6SQNJ1aChk38b5Z7n0',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: enteredEmail,
              password: enteredPassword,
              returnSecureToken: true,
            }),
          }
        );
        setLoading(false)

        if (!response.ok) {
          const data = await response.json();
          let errorMessage = 'Authentication Failed'
          if(data&&data.error.message&&data.error){
             errorMessage = data.error.message
          }
          alert(errorMessage)
          // Handle error here, e.g., display error message to the user
        } else {
          // Handle successful response here, e.g., redirect, display success message, etc.
        }
      } catch (error) {
        console.error(error);
        // Handle error here, e.g., display error message to the user
      }
    }

    // Add your logic for the isLogin case here
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
        {loading ? (
            <div className={classes.loader}>Loading...</div>
          ) : (
            <button
              type='submit'
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? 'Create new account' : 'Login with existing account'}
            </button>
          )}
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
