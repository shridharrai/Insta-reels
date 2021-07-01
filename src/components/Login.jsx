import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

export default function Login(props) {
  let { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoader(true);
      await login(email, password);
      setLoader(false);
      console.log('Before Push');
      props.history.push('/');
    } catch (error) {
      setLoader(false);
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div>
      {console.log('Inside Login')}
      <form onSubmit={handleSubmit}>
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
        <button type='submit' disabled={loader}>
          Login
        </button>
      </form>
    </div>
  );
}
