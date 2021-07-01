import './App.css';
import React, { useState, useEffect } from 'react';
import auth from './firebase';

function FireBaseDemo() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [mainLoader, setMainLoader] = useState(true);

  const handleSubmit = async () => {
    // alert(email + password);
    try {
      setLoader(true);
      //This firebase func signIn the user
      let res = await auth.signInWithEmailAndPassword(email, password);
      console.log(res.user);
      setUser(res.user);
      setLoader(false);
    } catch (error) {
      setError(true);
      setLoader(false);
    }
    setEmail('');
    setPassword('');
  };

  const handleLogout = async () => {
    setLoader(true);
    await auth.signOut();
    setUser(null);
    setLoader(false);
  };
  useEffect(() => {
    //This firebase func keep loggedIn if user is already loggedIn
    auth.onAuthStateChanged(user => {
      console.log(user);
      setUser(user);
      setMainLoader(false);
    });
  }, []);
  return (
    <div>
      {mainLoader == true ? (
        <h1>Wait for a second</h1>
      ) : error == true ? (
        <h1>Failed to Login</h1>
      ) : loader == true ? (
        <h1>Loading...</h1>
      ) : user != null ? (
        <>
          <h1>User LoggedIn {user.uid}</h1>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <h1>Firebase Login</h1>
          <input
            type='email'
            value={email}
            onChange={e => {
              setEmail(e.target.value);
            }}
          />
          <input
            type='password'
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
          <input type='button' value='submit' onClick={handleSubmit} />
        </>
      )}
    </div>
  );
}

export default FireBaseDemo;
