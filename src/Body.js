import React from 'react';
import './Body.css';
import { useDataLayerValue } from './DataLayer';
import Header from './Header';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SongRow from './SongRow';

function Body({spotify}) {
    const [{top_50_global},dispatch] = useDataLayerValue();
    const playPlaylist = (id) => {
        spotify
          .play({
            context_uri: `spotify:playlist:37i9dQZEVXbMDoHDwVN2tF`,
          })
          .then((res) => {
            spotify.getMyCurrentPlayingTrack().then((r) => {
              dispatch({
                type: "SET_ITEM",
                item: r.item,
              });
              dispatch({
                type: "SET_PLAYING",
                playing: true,
              });
            });
          });
      };

      const playSong = (id) => {
        spotify
          .play({
            uris: [`spotify:track:${id}`],
          })
          .then((res) => {
            spotify.getMyCurrentPlayingTrack().then((r) => {
              dispatch({
                type: "SET_ITEM",
                item: r.item,
              });
              dispatch({
                type: "SET_PLAYING",
                playing: true,
              });
            });
          });
      };
    
    return (
        <div className="body">
            <Header spotify={spotify}/>
            <div className="body_info">
                <img src={top_50_global?.images[0].url} alt=""/>
                <div className="body_infotext">
                <strong>PLAYLIST</strong>
                <h2>Top 50 - Global</h2>
                <p>{top_50_global?.description}</p>
                </div>
            </div>
            <div className="body_songs">
                <div className="body_icon">
                    <PlayCircleFilledIcon className="body_shuffle" onClick={playPlaylist}/>
                    <FavoriteIcon fontSize="large"/>
                    <MoreHorizIcon/>
                </div>

                {top_50_global?.tracks.items.map(item =>(
                    <SongRow playSong={playSong} track={item.track} />
                ))}
            </div>
        </div>
    )
}

export default Body
