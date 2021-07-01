import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

export default function Feed() {
  const [loading, setLoading] = useState(false);
  const { signOut } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await signOut();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      {console.log('Inside Feed')}
      Feed
      <button onClick={handleLogout} disabled={loading}>
        Logout
      </button>
    </div>
  );
}
