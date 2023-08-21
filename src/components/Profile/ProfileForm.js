import React, { useRef, useContext } from 'react';
import {useHistory} from 'react-router-dom'
import classes from './ProfileForm.module.css';
import AuthContext from '../../store/auth-context'

const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext)
  const history = useHistory();

  const changePasswordHandler = (event) => {
    event.preventDefault();

    const newPassword = newPasswordInputRef.current.value;

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idToken: authCtx.token,
        password: newPassword,
        returnSecureToken: false,
      }),
    };

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCipmPxx-C8SxvVI6SQNJ1aChk38b5Z7n0', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
               console.log(data)
               history.replace('/')
               alert('Password Updated')

        } else {
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form className={classes.form} onSubmit={changePasswordHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button type='submit'>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
