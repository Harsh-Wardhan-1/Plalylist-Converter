// import React, { useState, useEffect } from 'react';
// import Cookies from 'js-cookie';
// import { useNavigate } from "react-router-dom";
  


// function UserDetailsPage() {
//   const [user, setUser] = useState(null);
//   // const [oauthInfo, setOauthInfo] = useState(null);
//   const [playlistsData, setPlaylistsData] = useState(null);
//   // const [playlistId, setPlaylistId] = useState(null);
//   let navigate = useNavigate();



//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   const fetchUserData = async () => {
//     try {
//       const body = {
//         accessToken: Cookies.get('access_token'),
//         refreshToken: Cookies.get('refresh_token'),
//       };

//       const response = await fetch('http://localhost:8080/me', {
//                                       headers: {'Accept': 'application/json', 'Content-Type': 'application/json','Access-Control-Allow-Origin': 'http://localhost:3000'},
//                                           method: "POST",
//                                           body: JSON.stringify(body)
//                                     });
//       // const response = await fetch('http://localhost:8080/me');
//       const data = await response.json();
//       console.log(data)
//         setUser(data)
//         // const tokenData = {
//         //     access_token: Cookies.get('access_token'),
//         //     refresh_token: Cookies.get('refresh_token'),
//         //     expires_in: Cookies.get('expires_in')
//         // };
//         // setOauthInfo(tokenData);
      
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     }
//   };
//   const logout = () => {
//     localStorage.clear();
//     setUser(null);
//     // setOauthInfo(null);
//     setPlaylistsData(null);
//     window.location.href = '/';
//   };
  
//   const getPlaylistDetails = async () => {
//     try{
//       const body1 = {
//         accessToken: Cookies.get('access_token'),
//         userId: user.id
//       };
//       const response = await fetch('http://localhost:8080/getPlaylists', {
//                                       headers: {'Accept': 'application/json', 'Content-Type': 'application/json','Access-Control-Allow-Origin': 'http://localhost:3000'},
//                                           method: "POST",
//                                           body: JSON.stringify(body1)
//                                     });
//       const data = await response.json();
//       console.log("PL",data)
//       setPlaylistsData(data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   }

//   // const callGetTracks = (playlist)=>{
//   //   setPlaylistId(playlist);
//   //   getTracks();
//   // }
//   const goToPlaylist = (playlistId) =>{ 
//     let path = `/playlist/${playlistId}`; 
//     navigate(path);
//   }


//   // const refreshAccessToken = async () => {
//   //   try {
//   //     const body = {
//   //       accessToken: Cookies.get('access_token'),
//   //       refreshToken: Cookies.get('refresh_token'),
//   //     };
//   //     const response = await fetch('http://localhost:8080/refresh_token', {
//   //                                     headers: {'Accept': 'application/json', 'Content-Type': 'application/json','Access-Control-Allow-Origin': 'http://localhost:3000'},
//   //                                         method: "POST",
//   //                                         body: JSON.stringify(body)
//   //                                   });
//   //     const data = await response.json();
//   //     // console.log("RF",data)
//   //     localStorage.setItem('access_token', data.access_token);
//   //     setOauthInfo(data);
//   //   } catch (error) {
//   //     console.error('Error refreshing token:', error);
//   //   }
//   // };
//   return (
//     <div className="App">
//       <header className="App-header">
        // {user ? (
        //   <div>
        //     <h1>Welcome, {user.display_name}</h1>
        //     <table>
        //       <tbody>
        //         <tr><td>Display name</td><td>{user.display_name}</td></tr>
        //         <tr><td>Id</td><td>{user.id}</td></tr>
        //         <tr><td>Email</td><td>{user.email}</td></tr>
        //         <tr><td>Link</td><td><a href={user.href}>{user.href}</a></td></tr>
        //         <tr><td>Country</td><td>{user.country}</td></tr>
        //       </tbody>
        //     </table>
        //     {/* <button onClick={refreshAccessToken}>Refresh Token</button> */}
        //     <button onClick={logout}>Log out</button>
        //     <button onClick={getPlaylistDetails}>Get playlist detailsd</button>
        //   </div>
        // ) : (
        //   <p>Loading user details...</p>
        // )}
//       </header>
      
     
      // {playlistsData &&  (<div>
      //   <ul>
      //     {playlistsData.items.map((item) => 
          
      //       <li key = {item.id}>
      //         <button onClick={() => goToPlaylist(item.id)}>{item.name}</button>
      //       </li>
      //     )}
      //   </ul>
      // </div>)
      // }
//       {/* {oauthInfo && (
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
//       )} */}
//     </div>
//   );
// };

// export default UserDetailsPage;












// import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BackgroundImg from '../images/Spotify_Background.jpeg';
import { CircularProgress, List, ListItem, ListItemButton, ListItemText, Stack } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';


// TODO remove, this demo shouldn't need to reset the theme.

// const defaultTheme = createTheme();
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  }
});


export default function UserDetailsPage() {

  const [user, setUser] = useState(null);
  // const [oauthInfo, setOauthInfo] = useState(null);
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
      if(localStorage.getItem('playlist_data') !== null){
        const obj = JSON.parse(localStorage.getItem('playlist_data'))
        // console.log(obj)
        setPlaylistsData(obj);
      }
      
        // const tokenData = {
        //     access_token: Cookies.get('access_token'),
        //     refresh_token: Cookies.get('refresh_token'),
        //     expires_in: Cookies.get('expires_in')
        // };
        // setOauthInfo(tokenData);
      
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  const logout = () => {
    localStorage.clear();
    setUser(null);
    // setOauthInfo(null);
    setPlaylistsData(null);
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
      localStorage.setItem('playlist_data', JSON.stringify(data));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const goToPlaylist = (playlistId) =>{ 
    let path = `/playlist/${playlistId}`; 
    navigate(path);
  }

  // const refreshAccessToken = async () => {
  //   try {
  //     const body = {
  //       accessToken: Cookies.get('access_token'),
  //       refreshToken: Cookies.get('refresh_token'),
  //     };
  //     const response = await fetch('http://localhost:8080/refresh_token', {
  //                                     headers: {'Accept': 'application/json', 'Content-Type': 'application/json','Access-Control-Allow-Origin': 'http://localhost:3000'},
  //                                         method: "POST",
  //                                         body: JSON.stringify(body)
  //                                   });
  //     const data = await response.json();
  //     // console.log("RF",data)
  //     localStorage.setItem('access_token', data.access_token);
  //     setOauthInfo(data);
  //   } catch (error) {
  //     console.error('Error refreshing token:', error);
  //   }
  // };

  
  return (
    <ThemeProvider theme={darkTheme}>
      <Grid container component="main" sx={{
         height: '100vh',
            backgroundImage: `url(${BackgroundImg})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}>
        <CssBaseline />
          <Box
            m={4}
            display="flex"
            alignItems="flex-start"
            gap={4}
            p={2}
            sx = {{ 
                    height: '90%',
                    width: '100%'
                  }}
          >
            <Stack  spacing={2} width="100%">
              <Paper elevation={10} sx={{ flexGrow: 1 }}>
                {user ? (
                  <Box m={1}
                    display="flex"
                    alignItems="flex-start"
                    gap={4}
                    p={1}>
                    <Typography variant="h4"  color="#a2cf6e" gutterBottom>
                      Welcome, {user.display_name}
                    </Typography>
                    <TableContainer component={Paper}>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell>Display name</TableCell>
                            <TableCell>{user.display_name}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell>{user.email}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Button variant="contained" color="success" onClick={logout} style={{ marginTop: '30px', marginRight: '10px' }}>
                      LogOut
                    </Button>
                    </Box>
                ) : (
                  <Typography variant="body1" color="textSecondary">
                    <CircularProgress size={24} style={{ marginRight: '10px' }} />
                    Loading user details...
                  </Typography>
                )}
              </Paper>
              { user && playlistsData==null &&
                <Paper elevation={10} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'  }}>
                  <Button variant="contained" color="success" onClick={getPlaylistDetails} style={{'margin': '10px', width: '95%' }}>
                    Get playlist details
                  </Button>
                </Paper>
              }
              {playlistsData && (
                  <Paper style={{padding: '10px', backgroundColor: '#121212', backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.13), rgba(255, 255, 255, 0.13))'}}>
                    <Typography variant="h4"  color="#a2cf6e" gutterBottom>
                        {user.display_name}'s Playlists
                    </Typography>
                    <List style={{  height: '320px', overflow: 'auto', backgroundColor: '#121212', backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.07))'}}>
                      {playlistsData.items.map((item) => (
                        <ListItem key={item.id}>
                          <ListItemButton
                                   onClick={() => goToPlaylist(item.id)}
                          >
                            <ListItemText primary={item.name} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                )
              }
              
            </Stack>
          </Box>
      </Grid>
    </ThemeProvider>
  );
}
