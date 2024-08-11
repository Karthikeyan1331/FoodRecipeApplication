import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../config';

const GoogleSignUpButton = () => {
  const handleGoogleSign = () => {
    window.open(`${API_URL}auth/google/callback`,
    "_self")
  };

  return (
    <button type="button" className="login-with-google-btn" onClick={handleGoogleSign}>
      Sign in with Google
    </button>
  );
};

export default GoogleSignUpButton;
