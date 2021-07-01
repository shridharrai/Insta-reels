import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { storage, database } from '../firebase';

export default function SignUp(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');
  const [file, setFile] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState('');
  const { signUp } = useContext(AuthContext);

  function handleFileUpload(e) {
    let file = e?.target?.files[0];
    if (file != null) {
      console.log(e.target.files[0]);
      setFile(e.target.files[0]);
    }
  }

  async function handleSignUp(e) {
    e.preventDefault();
    try {
      setLoader(true);
      //first by auth get the uniqueid of user
      let res = await signUp(email, password);
      let uid = res.user.uid;
      //secondly with the help of uniqueid upload the profilePic in storage and get the file link
      const uploadTaskListener = storage
        .ref(`/users/${uid}/profileImage`)
        .put(file);
      //fn1 -> progress, fn2 -> error, fn3 -> success
      uploadTaskListener.on('state_changed', fn1, fn2, fn3);
      function fn1(snapshot) {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      }
      function fn2(error) {
        setError(error);
        setLoader(false);
      }
      async function fn3() {
        //get uploaded Link
        let downloadUrl = await uploadTaskListener.snapshot.ref.getDownloadURL();

        //Now finally add the user to firestore
        database.users.doc(uid).set({
          email,
          username,
          userId: uid,
          profileUrl: downloadUrl,
          createdAt: database.getUserTimeStamp
        });
      }
      setLoader(false);
      props.history.push('/');
    } catch (error) {
      setError(error);
      setLoader(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSignUp}>
        <div>
          <label htmlFor=''>UserName</label>
          <input
            type='text'
            value={username}
            onChange={e => {
              setUserName(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor=''>Email</label>
          <input
            type='email'
            value={email}
            onChange={e => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor=''>Password</label>
          <input
            type='password'
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor=''>Profile Image</label>
          <input
            type='file'
            accept='image/*'
            onChange={e => {
              handleFileUpload(e);
            }}
          />
        </div>
        <button type='submit' disabled={loader}>
          SignUp
        </button>
      </form>
    </div>
  );
}
