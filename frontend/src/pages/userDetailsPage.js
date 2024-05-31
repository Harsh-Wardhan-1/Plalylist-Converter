import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
  


function UserDetailsPage() {
  const [user, setUser] = useState(null);
  const [oauthInfo, setOauthInfo] = useState(null);
  const [playlistsData, setPlaylistsData] = useState(null);
  // const [playlistId, setPlaylistId] = useState(null);
  let navigate = useNavigate();



  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const body = {
        accessToken: Cookies.get('access_token'),
        refreshToken: Cookies.get('refresh_token'),
      };

      const response = await fetch('http://localhost:8080/me', {
                                      headers: {'Accept': 'application/json', 'Content-Type': 'application/json','Access-Control-Allow-Origin': 'http://localhost:3000'},
                                          method: "POST",
                                          body: JSON.stringify(body)
                                    });
      // const response = await fetch('http://localhost:8080/me');
      const data = await response.json();
      console.log(data)
        setUser(data)
        const tokenData = {
            access_token: Cookies.get('access_token'),
            refresh_token: Cookies.get('refresh_token'),
            expires_in: Cookies.get('expires_in')
        };
        setOauthInfo(tokenData);
      
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  const logout = () => {
    localStorage.clear();
    setUser(null);
    setOauthInfo(null);
    window.location.href = '/';
  };
  
  const getPlaylistDetails = async () => {
    try{
      const body1 = {
        accessToken: Cookies.get('access_token'),
        userId: user.id
      };
      const response = await fetch('http://localhost:8080/getPlaylists', {
                                      headers: {'Accept': 'application/json', 'Content-Type': 'application/json','Access-Control-Allow-Origin': 'http://localhost:3000'},
                                          method: "POST",
                                          body: JSON.stringify(body1)
                                    });
      const data = await response.json();
      console.log("PL",data)
      setPlaylistsData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // const callGetTracks = (playlist)=>{
  //   setPlaylistId(playlist);
  //   getTracks();
  // }
  const goToPlaylist = (playlistId) =>{ 
    let path = `/playlist/${playlistId}`; 
    navigate(path);
  }

  // const getTracks = async (playlist) => {
  //   try{
  //     const body1 = {
  //       accessToken: Cookies.get('access_token'),
  //       playlistId: playlist
  //     };
  //     console.log(JSON.stringify(body1))

  //     console.log("t",body1)
  //     // const response = await fetch('http://localhost:8080/getTracks');
  //     const response = await fetch('http://localhost:8080/getTracks', {
  //                                     headers: {'Accept': 'application/json', 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'},
  //                                         method: "POST",
  //                                         body: JSON.stringify(body1)
  //                                   });
  //     const tracksData = await response.json();
  //     console.log("tracks",tracksData)
  //     // setPlaylistsData(data);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // }

  const refreshAccessToken = async () => {
    try {
      const body = {
        accessToken: Cookies.get('access_token'),
        refreshToken: Cookies.get('refresh_token'),
      };
      const response = await fetch('http://localhost:8080/refresh_token', {
                                      headers: {'Accept': 'application/json', 'Content-Type': 'application/json','Access-Control-Allow-Origin': 'http://localhost:3000'},
                                          method: "POST",
                                          body: JSON.stringify(body)
                                    });
      const data = await response.json();
      // console.log("RF",data)
      localStorage.setItem('access_token', data.access_token);
      setOauthInfo(data);
    } catch (error) {
      console.error('Error refreshing token:', error);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        {user ? (
          <div>
            <h1>Welcome, {user.display_name}</h1>
            {/* <img src={user?.images[0]?.url} alt={user.display_name} width="150" /> */}
            <table>
              <tbody>
                <tr><td>Display name</td><td>{user.display_name}</td></tr>
                <tr><td>Id</td><td>{user.id}</td></tr>
                <tr><td>Email</td><td>{user.email}</td></tr>
                {/* <tr><td>Spotify URI</td><td><a href={user?.external_urls?.spotify}>{user?.external_urls?.spotify}</a></td></tr> */}
                <tr><td>Link</td><td><a href={user.href}>{user.href}</a></td></tr>
                {/* <tr><td>Profile Image</td><td><a href={user?.images[0]?.url}>{user?.images[0]?.url}</a></td></tr> */}
                <tr><td>Country</td><td>{user.country}</td></tr>
              </tbody>
            </table>
            <button onClick={refreshAccessToken}>Refresh Token</button>
            <button onClick={logout}>Log out</button>
            <button onClick={getPlaylistDetails}>Get playlist detailsd</button>
          </div>
        ) : (
          <p>Loading user details...</p>
        )}
      </header>
      
     
      {playlistsData &&  (<div>
        <ul>
          {playlistsData.items.map((item) => 
          
            <li key = {item.id}>
              <button onClick={() => goToPlaylist(item.id)}>{item.name}</button>
            </li>
          )}
        </ul>
      </div>)
      }
      {oauthInfo && (
        <div>
          <h2>oAuth info</h2>
          <table>
            <tbody>
              <tr><td>Access token</td><td>{oauthInfo.access_token}</td></tr>
              <tr><td>Refresh token</td><td>{oauthInfo.refresh_token}</td></tr>
              <tr><td>Expiration at</td><td>{new Date(oauthInfo.expires).toString()}</td></tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserDetailsPage;
