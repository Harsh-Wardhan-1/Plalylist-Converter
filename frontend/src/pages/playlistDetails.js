import React, { useCallback, useEffect, useState } from 'react';
import {  useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
// import {stringify} from 'flatted';
import axios from 'axios';
// import fs from 'fs';

const PlaylistDetails = () => {
    const params = useParams();
    const { playlistId } = params;
    const [playlistData, setPlaylistData] = useState(null);

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
            // console.log(obj.track.name)
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
        console.log(data)
    }
    const createPlaylist = async() => {
        const response = await fetch('http://localhost:8080/createPlaylist');
        const data = await response.json();
        console.log(data)
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
        <div>
            <h1>Playlist Details:</h1>
            {playlistData && 
            <div>
                <h3>{playlistData.name}</h3>
                <button onClick={() => cloneToYoutube()}>Clone Playlist to Youtube</button>
                <button onClick={() => createPlaylist()}>Create Playlist</button>

                <h4>Tracks:</h4>
                <ul>
                    {playlistData.tracks.items.map((item) => 
                        <li key = {item.track.id}>
                            <p><b>{item.track.name}</b> By: {item.track.artists[0].name}</p>
                        </li>
                    )}
                </ul>
            </div>}
        </div>
    );
}


export default PlaylistDetails;
