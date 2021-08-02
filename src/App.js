import React, { useEffect } from 'react';
import './App.css';
import Login from './Login';
import { getTokenFromResponse } from './Spotify';
import SpotifyWebApi from 'spotify-web-api-js';
import Player from './Player';
import { useDataLayerValue } from './DataLayer';

const spotify = new SpotifyWebApi();

function App() {
  // const [token, setToken] = useState(null);
  const [{ token }, dispatch] = useDataLayerValue();
  //run code based on a given condition
  useEffect(() => {
    const hash = getTokenFromResponse();
    window.location.hash="";
    const _token = hash.access_token;
    if(_token){
      dispatch({
        type: 'SET_TOKEN',
        token: _token,
      });
      spotify.setAccessToken(_token);

      spotify.getMe().then(user => {
        dispatch({
          type: 'SET_USER',
          user: user,
        });
      });
      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: playlists,
        });
      });
      spotify.getPlaylist('37i9dQZEVXbMDoHDwVN2tF').then(respone =>{
        dispatch({
          type:"SET_TOP_50_GLOBAL",
          top_50_global:respone,
        });
      });
      spotify.getMyTopArtists().then((response) =>
      dispatch({
        type: "SET_TOP_ARTISTS",
        top_artists: response,
      })
    );
    
    dispatch({
      type: "SET_SPOTIFY",
      spotify: spotify,
    });
    }
  }, [token,dispatch]);
  
  return (
    <div className="App">
      {
        token ? (
          <Player spotify={spotify} />
        ) : (
          <Login/>
        )
      }
    </div>
  );
}

export default App;
