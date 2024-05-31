import React from 'react';
// import { useHistory } from 'react-router-dom';

function LoginPage() {
//   const history = useHistory();

  const loginWithSpotify = () => {
    window.location.href = 'http://localhost:8080/login';
  };

  return(<div>
        <h1>Welcome to the OAuth2 PKCE Example</h1>
        <button onClick={loginWithSpotify}>Log in with Spotify</button>
    </div>
)}

export default LoginPage;
