// const express = require("express");

// const PORT = process.env.PORT || 3001;

// const app = express();

// app.get("/api", (req, res) => {
//   res.json({ message: "Hello from server!" });
// });


// app.listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`);
// });





// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const app = express();
// const PORT = 8080;

// const redirectUrl = 'http://localhost:3000/callback';
// const clientId = '3886a9253b8145ad88c45910a9503d6b';
// const clientSecret = 'da6e3f8a7d144e4aa41210a3eb6bc8bd'; 

// const authorizationEndpoint = "https://accounts.spotify.com/authorize";
// const tokenEndpoint = "https://accounts.spotify.com/api/token";

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));
// app.use(session({
//   secret: 'some-secret',
//   resave: false,
//   saveUninitialized: true,
// }));


// function generateRandomString(length) {
//   return crypto.randomBytes(length).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
// }


// app.get('/login', (req, res) => {
//   // const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   // const randomValues = crypto.getRandomValues(new Uint8Array(64));
//   // const codeVerifier = Array.from(randomValues).map(x => possible.charAt(x % possible.length)).join('');

//   // const base64Digest = crypto.createHash('sha256').update(codeVerifier).digest('base64');
//   // const codeChallenge = base64Digest.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

//   // req.session.codeVerifier = codeVerifier;

//   // const authUrl = new URL(authorizationEndpoint);
//   // authUrl.search = new URLSearchParams({
//   //   response_type: 'code',
//   //   client_id: clientId,
//   //   scope: 'user-read-private user-read-email',
//   //   code_challenge_method: 'S256',
//   //   code_challenge: codeChallenge,
//   //   redirect_uri: redirectUrl,
//   // }).toString();

//   // res.redirect(authUrl.toString());
//   const codeVerifier = generateRandomString(64);
//   const codeChallenge = crypto.createHash('sha256').update(codeVerifier).digest('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

//   const authUrl = `${authorizationEndpoint}?${querystring.stringify({
//     response_type: 'code',
//     client_id: clientId,
//     scope: 'user-read-private user-read-email',
//     code_challenge_method: 'S256',
//     code_challenge: codeChallenge,
//     redirect_uri: redirectUrl,
//   })}`;

//   res.cookie('code_verifier', codeVerifier, { maxAge: 600000, httpOnly: true });
//   res.redirect(authUrl)
// });

// app.get('/callback', async (req, res) => {
//   // const code = req.query.code;
//   // const codeVerifier = req.session.codeVerifier;

//   // if (!code) {
//   //   return res.sendStatus(400);
//   // }

//   // const response = await fetch(tokenEndpoint, {
//   //   method: 'POST',
//   //   headers: {
//   //     'Content-Type': 'application/x-www-form-urlencoded',
//   //   },
//   //   body: new URLSearchParams({
//   //     client_id: clientId,
//   //     client_secret: clientSecret,
//   //     grant_type: 'authorization_code',
//   //     code,
//   //     redirect_uri: redirectUrl,
//   //     code_verifier: codeVerifier,
//   //   }),
//   // });

//   // const tokenData = await response.json();
//   // req.session.tokenData = tokenData;
//   // res.redirect('/');
//   const code = req.query.code || null;
//   const codeVerifier = req.cookies.code_verifier || null;

//   if (!code || !codeVerifier) {
//     res.redirect('/#' + querystring.stringify({ error: 'invalid_token' }));
//     return;
//   }

//   const response = await fetch(tokenEndpoint, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//       'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
//     },
//     body: querystring.stringify({
//       grant_type: 'authorization_code',
//       code: code,
//       redirect_uri: redirectUrl,
//       code_verifier: codeVerifier,
//     }),
//   });

//   const tokenData = await response.json();
//   res.redirect('/#' + querystring.stringify(tokenData));
// });

// app.get('/refresh_token', async (req, res) => {
//   const refreshToken = req.session.tokenData.refresh_token;

//   if (!refreshToken) {
//     return res.sendStatus(400);
//   }

//   const response = await fetch(tokenEndpoint, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     body: new URLSearchParams({
//       client_id: clientId,
//       client_secret: clientSecret,
//       grant_type: 'refresh_token',
//       refresh_token: refreshToken,
//     }),
//   });

//   const newTokenData = await response.json();
//   req.session.tokenData = newTokenData;
//   res.json(newTokenData);
// });

// app.use(express.static(path.join(__dirname, 'public')));

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });


import express, { json } from 'express';
import fetch from 'node-fetch';
import path from 'path';
import cors from 'cors';
import session from 'express-session';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cookieParser from 'cookie-parser';
import querystring from 'querystring';
import axios from 'axios';
// import {stringify} from 'flatted';
import  {spawn} from 'child_process';
import fs from 'fs/promises';

const app = express();
const port = 8080;

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));




const client_id = '3886a9253b8145ad88c45910a9503d6b';
const client_secret = 'da6e3f8a7d144e4aa41210a3eb6bc8bd';
const redirect_uri = 'http://localhost:8080/callback';

// const redirectUrl = 'http://localhost:3000/callback';
// const clientId = '3886a9253b8145ad88c45910a9503d6b';
// const clientSecret = 'da6e3f8a7d144e4aa41210a3eb6bc8bd'; 

// const authorizationEndpoint = "https://accounts.spotify.com/authorize";
// const tokenEndpoint = "https://accounts.spotify.com/api/token";
let codeVerifier;

// PKCE functions
function generateCodeVerifier() {
  return crypto.randomBytes(32).toString('base64url');
}

function generateCodeChallenge(codeVerifier) {
  return crypto.createHash('sha256').update(codeVerifier).digest('base64url');
}

app.get('/login', (req, res) => {
  codeVerifier = generateCodeVerifier();
  const code_challenge = generateCodeChallenge(codeVerifier);
  
  const authorizeUrl = 'https://accounts.spotify.com/authorize';
  const params = {
    client_id,
    response_type: 'code',
    redirect_uri,
    code_challenge_method: 'S256',
    code_challenge,
    scope: 'user-read-private user-read-email playlist-read-collaborative playlist-read-private'
  };
  
  res.redirect(`${authorizeUrl}?${querystring.stringify(params)}`);
});

app.get('/callback', async (req, res) => {
  const code = req.query.code;

  try {
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const response = await axios.post(tokenUrl, querystring.stringify({
      grant_type: 'authorization_code',
      code,
      redirect_uri,
      client_id,
      code_verifier: codeVerifier
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`
      }
    });
    // console.log(response.data);

    const { access_token, refresh_token, expires_in } = response.data;
    res.cookie('access_token', access_token, { sameSite: 'none', secure: true });
    res.cookie('refresh_token', refresh_token, { sameSite: 'none', secure: true });
    res.cookie('expires_in', Date.now() + expires_in * 1000, { sameSite: 'none', secure: true });
    // console.log(req.cookies);

    res.redirect('http://localhost:3000/user-details');
  } catch (error) {
    res.status(500).send(error.response.data);
  }
});

app.post('/me', async (req, res) => {
  try {
    const access_token = req.body.accessToken;
    // global_at = access_token;
    // console.log("acess token",req.cookies);
    // console.log("acess token",req.cookies.access_token);
    // const access_token = req.cookies.access_token;

    // console.log("Hi", req.body)
    if (!access_token) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const userInfo = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${access_token}`
      },
      withCredentials: true 
    });

    res.json(userInfo.data);
  } catch (error) {
    res.status(500).send(error.response.data);
  }
});

app.post('/refresh_token', async (req, res) => {
  try {
    const refresh_token = req.body.refreshToken;
    console.log(req.body)
    if (!refresh_token) {
      return res.status(401).json({ error: 'No refresh token found' });
    }

    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const response = await axios.post(tokenUrl, querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token,
      client_id,
      client_secret
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const { access_token, expires_in } = response.data;
    res.cookie('access_token', access_token);
    res.cookie('expires_in', Date.now() + expires_in * 1000);

    res.json({ access_token,refresh_token, expires_in });
  } catch (error) {
    res.status(500).send(error.response.data);
  }
});



app.post('/getPlaylists', async (req, res) => {
  try {
    const access_token = req.body.accessToken;
    const userId = req.body.userId;
    // console.log(req)
    if (!access_token || !userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const userInfo = await axios.get('https://api.spotify.com/v1/users/'+userId+'/playlists', {
      headers: {
        'Authorization': `Bearer ${access_token}`
      },
      withCredentials: true 
    });
    res.json(userInfo.data);
  } catch (error) {
    res.status(500).send(error.response);
  }
});

// app.post('/cloneToYoutube', async (req, res) => {
//   try {
//     const obj = req.body;
//     console.log("Bef")
//     fs.writeFile("./backend/youtube-api/data.json", obj);    
//     console.log("Aft")

//     const pythonProcess = spawn('python', ['./backend/youtube-api/convert.py']);
//     pythonProcess.stdout.on('data', (data) => {
//       console.log(`stdout: ${data}`);
//     });

//     pythonProcess.stderr.on('data', (data) => {
//       console.error(`stderr: ${data}`);
//     });

//     pythonProcess.on('close', (code) => {
//       console.log(`child process exited with code`);
//     });

//     res.json("Working...");
//   } catch (error) {
//     res.status(500).send(error.response);
//   }
// });

// app.post('/cloneToYoutube', async (req, res) => {
//   try {
//     const obj = req.body;
//     console.log("Before writing to file");

//     // Convert object to JSON string and write to file
//     fs.writeFile("./backend/youtube-api/data.json", JSON.stringify(obj, null, 2), (err) => {
//       if (err) {
//         console.error('Error writing file', err);
//         res.status(500).send('Internal Server Error');
//         return;
//       }

//       console.log("After writing to file");

//       // Spawn a new child process to run the Python script
//       const pythonProcess = spawn('python', ['./backend/youtube-api/convert.py']);
      
//       pythonProcess.stdout.on('data', (data) => {
//         console.log(`stdout: ${data}`);
//       });

//       pythonProcess.stderr.on('data', (data) => {
//         console.error(`stderr: ${data}`);
//       });

//       pythonProcess.on('close', (code) => {
//         console.log(`child process exited with code ${code}`);
//       });

//       res.json("Working...");
//     });
//   } catch (error) {
//     console.error('Error in /cloneToYoutube route', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

app.post('/cloneToYoutube', async (req, res) => {
  try {
    const obj = req.body;
    console.log("Before writing to file");

    // Convert object to JSON string and write to file
    await fs.writeFile("./backend/youtube-api/data.json", JSON.stringify(obj, null, 2));
    
    console.log("After writing to file");
    res.json("Successfully added data")
    
  } catch (error) {
    console.error('Error in /cloneToYoutube route', error);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/createPlaylist', async(req, res) => {
  // Spawn a new child process to run the Python script
  const pythonProcess = spawn('python', ['./backend/youtube-api/convert.py']);
    
    pythonProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });

    res.json("Created Playlist...");
});

// app.post('/getTracks', async (req, res) => {
//   try {

//     // const access_token = req.body[1];
//     // const playlist_id = req.body[2];
//     // console.log(access_token)
//     // console.log(playlist_id)
//     // if (!access_token || !playlist_id) {
//     //   return res.status(401).json({ error: 'Not authenticated' });
//     // }
//     // console.log("afe")
//     const playlistInfo = await axios.get('https://api.spotify.com/v1/playlists/'+`7J40qo2H1adVi204zicJT9`, {
//       headers: {
//         'Authorization': `Bearer BQA2Kh1TJ3JB4NL49RpPSEHdaVwG2omzqyY1a7i7TXbS8bBaf69O27Rn9cS-KjE5LcR8YSD2dq5FuhDtqisZ28-5-kN7zi3FYqLYTsaO4M2j3g3AuVLA8GmXUN4TNE8XiUrN0eIO6dQ1-klhhIcEYRV5qDsGhCAh6wsEO_1SIMG8crCP6xtiqLi1ka4tn-94hxqqAiSNPASlfFfbkAceY3hea5sjVTM`
//       }
//     });
//     console.log("afe2", playlistInfo.data);
//     res.json(playlistInfo.data);
//   } catch (error) {
//     res.status(500).send(error.response);
//   }
// });


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});