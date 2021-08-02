import React, { useEffect } from 'react'
import './Footer.css';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PlayCircleOutlineOutlinedIcon from '@material-ui/icons/PlayCircleOutlineOutlined';
import RepeatOutlinedIcon from '@material-ui/icons/RepeatOutlined';
import { Grid, Slider, } from '@material-ui/core';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import  VolumeDownIcon  from '@material-ui/icons/VolumeDown';
import { useDataLayerValue } from './DataLayer';

function Footer({ spotify }) {
    const [{ item, playing }, dispatch] = useDataLayerValue();

    useEffect(() => {
        spotify.getMyCurrentPlaybackState().then((r) => {
          console.log(r);
          dispatch({
            type: "SET_PLAYING",
            playing: r.is_playing,
          });
    
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
        });
      }, [spotify,dispatch]);

      const handlePlayPause = () => {
        if (playing) {
          spotify.pause();
          dispatch({
            type: "SET_PLAYING",
            playing: false,
          });
        } else {
          spotify.play();
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        }
      };

      const skipNext = () => {
        spotify.skipToNext();
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
      };

      const skipPrevious = () => {
        spotify.skipToPrevious();
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
      };
    return (
        <div className="footer">
            <div className="footer_left">
            <img className="footer_AlbumLogo" src={item?.album.images[0].url} alt="ablum"/>
            {item ? ( <div className="footer_songinfo">
                <h4>{item.name}</h4>
                <p>{item.artists.map((artist)=> artist.name).join(",")}</p>
            </div>) :( <div className="footer_songinfo">
                <h4>No Song Playing</h4>
                <p>...</p>
            </div>) }
            </div>
            <div className="footer_center">
            <ShuffleIcon className="footer_green"/>
            <SkipPreviousIcon onClick={skipPrevious} className="footer_icon"/>
            {playing ? (<PauseCircleOutlineIcon
            onClick={handlePlayPause}
            fontSize="large"
            className="footer_icon"
          />) : (<PlayCircleOutlineOutlinedIcon onClick={handlePlayPause} fontSize="large" className="footer_icon"/>)}
            
            <SkipNextIcon onClick={skipNext} className="footer_icon"/>
            <RepeatOutlinedIcon className="footer_green"/>
            </div>
            <div className="footer_right">
            <Grid container spacing={2}>
                <Grid item>
                    <PlaylistPlayIcon/>
                </Grid>
                <Grid item>
                    <VolumeDownIcon/>
                </Grid>
                <Grid item xs>
                    <Slider />
                </Grid>
            </Grid>
            </div>
        </div>
    )
}

export default Footer
