import React, { useState, useEffect } from 'react';
import auth from '../firebase';

export const AuthContext = React.createContext();
export default function AuthProvider({ children }) {
  const [currentUser, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Inside UseEffect');
    const unsubscribe = auth.onAuthStateChanged(user => {
      console.log('Inside AuthStateChanged');
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  async function login(email, password) {
    return await auth.signInWithEmailAndPassword(email, password);
  }

  async function signOut() {
    return await auth.signOut();
  }

  async function signUp(email, password) {
    return await auth.createUserWithEmailAndPassword(email, password);
  }

  const value = {
    login,
    signOut,
    currentUser,
    signUp
  };

  return (
    <AuthContext.Provider value={value}>
      {console.log('Inside Provider', loading)}
      {!loading && children}
    </AuthContext.Provider>
  );
}
