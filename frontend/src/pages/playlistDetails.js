// import React, { useCallback, useEffect, useState } from 'react';
// import {  useParams } from 'react-router-dom';
// import Cookies from 'js-cookie';
// // import {stringify} from 'flatted';
// import axios from 'axios';
// // import fs from 'fs';

// const PlaylistDetails = () => {
//     const params = useParams();
//     const { playlistId } = params;
//     const [playlistData, setPlaylistData] = useState(null);

//     // console.log(playlistId)
    
//     const fetchData = useCallback(async () => {
//         try {
//             const access_token =  Cookies.get('access_token');

//             const playlistInfo = await axios.get('https://api.spotify.com/v1/playlists/'+ playlistId, {
//                 headers: {
//                     'Authorization': `Bearer ${access_token}`
//                 }
//             });
//             let data = playlistInfo.data;
//             let tracks = data.tracks.items;
//             tracks = tracks.filter((item)=> item.track.name!=="")
//             data.tracks.items = tracks
//             setPlaylistData(data)
//             console.log(data)
//         } catch (error) {
//             console.error('Error fetching playlist data:', error);
//         }
//     }, [playlistId]);

//     useEffect(() =>{
//         fetchData();
//     },[playlistId, fetchData]);


//     const cloneToYoutube = async() => {
//         let obj = {}
//         obj['playlistName'] = playlistData.name;
//         let tracks = playlistData.tracks.items.map((obj) => {
//             const extract = {};
//             // console.log(obj.track.name)
//             extract['name'] = obj['track']['name']+ ' ' + obj['track']['artists'][0]['name'] ;
//             return extract;
//         });
//         obj['tracks'] = tracks;
        
//         const response = await fetch('http://localhost:8080/cloneToYoutube', {
//                             headers: {'Accept': 'application/json', 'Content-Type': 'application/json','Access-Control-Allow-Origin': 'http://localhost:3000'},
//                         method: "POST",
//                         body: JSON.stringify(obj)
//                     });
//         const data = await response.json();
//         console.log(data)
//     }
//     const createPlaylist = async() => {
//         const response = await fetch('http://localhost:8080/createPlaylist');
//         const data = await response.json();
//         console.log(data)
//     }

//     // const fetchData = async () => {
//     //     try {
//     //         const body = {
//     //             accessToken: Cookies.get('access_token'),
//     //             playlistId: playlistId,
//     //         };

//     //         const response = await fetch('http://localhost:8080/getTracks', {
//     //                                         headers: {'Accept': 'application/json', 'Content-Type': 'application/json','Access-Control-Allow-Origin': 'http://localhost:3000'},
//     //                                             method: "POST",
//     //                                             body: stringify(body)
//     //                                         });
//     //         const data = await response.json();
//     //         console.log(data)
        
//     //     } catch (error) {
//     //         console.error('Error fetching playlist data:', error);
//     //     }
//     // };

//     return (
//         <div>
//             <h1>Playlist Details:</h1>
//             {playlistData && 
//             <div>
//                 <h3>{playlistData.name}</h3>
//                 <button onClick={() => cloneToYoutube()}>Clone Playlist to Youtube</button>
//                 <button onClick={() => createPlaylist()}>Create Playlist</button>

//                 <h4>Tracks:</h4>
//                 <ul>
//                     {playlistData.tracks.items.map((item) => 
//                         <li key = {item.track.id}>
//                             <p><b>{item.track.name}</b By: {item.track.artists[0].name}></p>
//                         </li>
//                     )}
//                 </ul>
//             </div>}
//         </div>
//     );
// }


// export default PlaylistDetails;







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
import React, { useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';
import { useParams } from "react-router-dom";
import axios from 'axios';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  }
});


export default function UserDetailsPage() {

    const params = useParams();
    const { playlistId } = params;
    const [playlistData, setPlaylistData] = useState(null);
    const [open, setOpen] = React.useState(false);
    // const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // console.log(playlistId)
    
    const fetchData = useCallback(async () => {
        try {
            const access_token =  Cookies.get('access_token');

            const playlistInfo = await axios.get('https://api.spotify.com/v1/playlists/'+ playlistId, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            });
            let data = playlistInfo.data;
            let tracks = data.tracks.items;
            tracks = tracks.filter((item)=> item.track.name!=="")
            data.tracks.items = tracks
            setPlaylistData(data)
            console.log(data)
        } catch (error) {
            console.error('Error fetching playlist data:', error);
        }
    }, [playlistId]);

    useEffect(() =>{
        fetchData();
    },[playlistId, fetchData]);


    const cloneToYoutube = async() => {
        let obj = {}
        obj['playlistName'] = playlistData.name;
        let tracks = playlistData.tracks.items.map((obj) => {
            const extract = {};
            extract['name'] = obj['track']['name']+ ' ' + obj['track']['artists'][0]['name'] ;
            return extract;
        });
        obj['tracks'] = tracks;
        
        const response = await fetch('http://localhost:8080/cloneToYoutube', {
                            headers: {'Accept': 'application/json', 'Content-Type': 'application/json','Access-Control-Allow-Origin': 'http://localhost:3000'},
                        method: "POST",
                        body: JSON.stringify(obj)
                    });
        const data = await response.json();
        console.log(data);        
        setOpen(true);
    }
    const createPlaylist = async() => {
        alert('We are cloning you playist. Please wait...')
        setOpen(false);
        const response = await fetch('http://localhost:8080/createPlaylist');
        const data = await response.json();
        console.log(data)
        alert('Your playlist has been cloned. Go to YouTube Music to view the new playlist.')

    }
    const goBack = () => {
        setPlaylistData(null);
        window.location.href = '/user-details';
    }

    // const fetchData = async () => {
    //     try {
    //         const body = {
    //             accessToken: Cookies.get('access_token'),
    //             playlistId: playlistId,
    //         };

    //         const response = await fetch('http://localhost:8080/getTracks', {
    //                                         headers: {'Accept': 'application/json', 'Content-Type': 'application/json','Access-Control-Allow-Origin': 'http://localhost:3000'},
    //                                             method: "POST",
    //                                             body: stringify(body)
    //                                         });
    //         const data = await response.json();
    //         console.log(data)
        
    //     } catch (error) {
    //         console.error('Error fetching playlist data:', error);
    //     }
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
          {playlistData ?
            <Stack  spacing={2} width="100%">
                <Paper style={{padding: '10px', backgroundColor: '#121212', backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.13), rgba(255, 255, 255, 0.13))'}}>
                    {/* <Grid container spacing={2} alignItems="center">
                        <Grid item xs={6}>
                            <Typography variant="h4" color="#a2cf6e" gutterBottom>
                            {playlistData.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Box textAlign="right">
                            <Button variant="contained" color="success" onClick={cloneToYoutube}>
                                cloneToYoutube
                            </Button>
                            </Box>
                        </Grid>
                    </Grid> */}
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Typography variant="h4"  color="#a2cf6e" gutterBottom>
                            {playlistData.name}
                        </Typography>
                            <Button variant="contained" color="success" onClick={cloneToYoutube}>
                                Clone Playlist To Youtube
                            </Button>
                    </Stack>
                    <List style={{  height: '400px', overflow: 'auto', margin:'10px 0',backgroundColor: '#121212', backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.07))'}}>
                        {playlistData.tracks.items.map((item) => 
                        <ListItem key={item.track.id}>
                            <ListItemButton>
                                <ListItemText ><b>{item.track.name}</b> By: {item.track.artists[0].name}</ListItemText>
                            </ListItemButton>
                        </ListItem>
                        )}
                    </List>
                    <Button variant="contained" color="success" onClick={goBack} >
                        Go Back
                    </Button>
                </Paper>            
            </Stack>
            :
            (
                  <Typography variant="body1" color="textSecondary">
                    <CircularProgress size={24} style={{ marginRight: '10px' }} />
                    Loading user details...
                  </Typography>
            )
          }
          </Box>
          <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Are you sure you want to clone the playlist?
            </Typography>
            <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end' }}>
                <Button variant="contained" color="success" onClick={createPlaylist} >
                    Yes
                </Button>
                <Button variant="contained"  onClick={handleClose} >
                    No
                </Button>
            </Stack>
        </Box>
      </Modal>
    </div>
      </Grid>
      
    </ThemeProvider>
  );
}
