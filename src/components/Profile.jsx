import React from 'react';
import { Link } from 'react-router-dom';

export default function Profile() {
  return (
    <div>
      Profile
      <Link to='/login'>Login</Link>
    </div>
  );
}
