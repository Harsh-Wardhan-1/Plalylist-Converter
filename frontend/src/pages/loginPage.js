// import React from 'react';
// // import { useHistory } from 'react-router-dom';

// function LoginPage() {
// //   const history = useHistory();

//   const loginWithSpotify = () => {
//     window.location.href = 'http://localhost:8080/login';
//   };

//   return(<div>
//         <h1>Welcome to the OAuth2 PKCE Example</h1>
//         <button onClick={loginWithSpotify}>Log in with Spotify</button>
//     </div>
// )}

// export default LoginPage;


// import React from 'react';
// // import { useHistory } from 'react-router-dom';

// function LoginPage() {
// //   const history = useHistory();

//   const loginWithSpotify = () => {
//     window.location.href = 'http://localhost:8080/login';
//   };

//   return(<div>
//         <h1>Welcome to the OAuth2 PKCE Example</h1>
//         <button onClick={loginWithSpotify}>Log in with Spotify</button>
//     </div>
// )}

// export default LoginPage;



import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BackgroundImg from '../images/Spotify_Background.jpeg';



// TODO remove, this demo shouldn't need to reset the theme.

// const defaultTheme = createTheme();
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


export default function LoginPage() {
  
  const loginWithSpotify = () => {
    window.location.href = 'http://localhost:8080/login';
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${BackgroundImg})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar> */}
            <Typography component="h1" variant="h5" color="#a2cf6e">
              Log In to Spotify using OAuth2 PKCE
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Button
                onClick={() => loginWithSpotify()}
                type="submit"
                fullWidth
                color="success"
                variant="contained"
              >
                Log In
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}