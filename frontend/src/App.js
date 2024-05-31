// import React from "react";
// import "./App.css";

// function App() {
//   const [data, setData] = React.useState(null);

//   React.useEffect(() => {
//     fetch("/api")
//       .then((res) => res.json())
//       .then((data) => setData(data.message));
//   }, []);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <p>{!data ? "Loading..." : data}</p>
//       </header>
//     </div>
//   );
// }

// export default App;


// import React, { useEffect, useState } from 'react';
// import { Switch } from 'react-router';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/loginPage';
import UserDetailsPage from './pages/userDetailsPage';
import PlaylistDetails from './pages/playlistDetails';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Switch> */}
        <Routes>
          <Route path="/" element={<LoginPage />}/>
          <Route path="/user-details" element={<UserDetailsPage/>} />
          <Route path="/playlist/:playlistId" element={<PlaylistDetails/>} />

          {/* <Route render={() => <LoginPage />} /> */}
        </Routes>
        {/* </Switch> */}
      </div>
    </Router>
  );
}

export default App;

// const App = () => {
//   const [user, setUser] = useState(null);
//   const [oauthInfo, setOauthInfo] = useState(null);

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   const fetchUserData = async () => {
//     try {
//       const response = await fetch('http://localhost:8080/me');
//       const data = await response.json();
//       if(!data.error)
//       {
//         setUser(data)
//         console.log(data);
//         const tokenData = {
//           access_token: localStorage.getItem('access_token'),
//           refresh_token: localStorage.getItem('refresh_token'),
//           expires_in: localStorage.getItem('expires_in')
//         };
//         setOauthInfo(tokenData);
//       }
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     }
//   };
//   console.log("User",user);;

//   const loginWithSpotify = () => {
//     window.location.href = 'http://localhost:8080/login';

//   };

//   const logout = () => {
//     localStorage.clear();
//     setUser(null);
//     setOauthInfo(null);
//     window.location.href = '/';
//   };

//   const refreshAccessToken = async () => {
//     try {
//       const response = await fetch('http://localhost:8080/refresh_token');
//       const data = await response.json();
//       localStorage.setItem('access_token', data.access_token);
//       setOauthInfo(data);
//     } catch (error) {
//       console.error('Error refreshing token:', error);
//     }
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         {user ? (
//           <div>
//             <h1>Welcome, {user.display_name}</h1>
//             {/* <img src={user.images[0].url} alt={user.display_name} width="150" /> */}
//             <table>
//               <tbody>
//                 <tr><td>Display name</td><td>{user.display_name}</td></tr>
//                 <tr><td>Id</td><td>{user.id}</td></tr>
//                 <tr><td>Email</td><td>{user.email}</td></tr>
//                 {/* <tr><td>Spotify URI</td><td><a href={user.external_urls.spotify}>{user.external_urls.spotify}</a></td></tr> */}
//                 <tr><td>Link</td><td><a href={user.href}>{user.href}</a></td></tr>
//                 {/* <tr><td>Profile Image</td><td><a href={user.images[0].url}>{user.images[0].url}</a></td></tr> */}
//                 <tr><td>Country</td><td>{user.country}</td></tr>
//               </tbody>
//             </table>
//             <button onClick={refreshAccessToken}>Refresh Token</button>
//             <button onClick={logout}>Log out</button>
//           </div>
//         ) : (
//           <div>
//             <h1>Welcome to the OAuth2 PKCE Example</h1>
//             <button onClick={loginWithSpotify}>Log in with Spotify</button>
//           </div>
//         )}
//       </header>
//       {oauthInfo && (
//         <div>
//           <h2>oAuth info</h2>
//           <table>
//             <tbody>
//               <tr><td>Access token</td><td>{oauthInfo.access_token}</td></tr>
//               <tr><td>Refresh token</td><td>{oauthInfo.refresh_token}</td></tr>
//               <tr><td>Expiration at</td><td>{new Date(oauthInfo.expires).toString()}</td></tr>
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;