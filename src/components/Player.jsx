import { useEffect, useRef, useState } from "react";

function Player () {
    const player = useRef(null);
    const playerRef = useRef(null);

    const [songTitle, setSongTitle] = useState(null);
    const [albumArt, setAlbumArt] = useState(null);

    const isVideoLoadingOrPlaying = (state) => {
    return state === window.YT.PlayerState.PLAYING ||
           state === window.YT.PlayerState.BUFFERING ||
           state === window.YT.PlayerState.CUED;
    };

    useEffect(() => {
        const createPlayer = () => {
            const playerOptions = {
                height: '360',
                width: '640',
                playerVars: {
                    listType: 'playlist',
                    list: 'PLaURZdHjgul2nX_sKY4tI4rfGztBKpIh8',
                },
                events: {
                    onReady: (event) => {
                        setSongInfo();
                    },
                    onStateChange: (event) => {
                        if (isVideoLoadingOrPlaying(event.data)){
                            setSongInfo();
                        }
                    },
                },
            };
            window.onYouTubeIframeAPIReady = () => {
                player.current = new window.YT.Player(playerRef.current, playerOptions);
            }
        }
        if (window.YT && window.YT.Player) {
            createPlayer();
        }else {
            setTimeout(createPlayer(), 100);
        }
    }, []);

    const setSongInfo = () => {
        const songInfo = player.current.getVideoData();
        setSongTitle(songInfo.title);
        const albumArtURL = `https://img.youtube.com/vi/${songInfo.video_id}/mqdefault.jpg`;
        setAlbumArt(albumArtURL);

    }

    const toggleSong = () => {
        const currentState = player.current.getPlayerState();
        if (currentState === window.YT.PlayerState.PAUSED ||
             currentState === window.YT.PlayerState.ENDED ||
              currentState === window.YT.PlayerState.CUED){
            player.current.playVideo();
        } else if(currentState === window.YT.PlayerState.PLAYING ||
            currentState === window.YT.PlayerState.BUFFERING) {
            player.current.pauseVideo();
        }
    }

    const playPrev = () => {
        player.current.previousVideo();
    }

    const playNext = () => {
        player.current.nextVideo();
    }

    return (
        <div id="playerContainer">
            <div id="player" ref={playerRef}></div>
            <div id="albumArt">
                <img src={albumArt} alt="Album Art" />
            </div>
            <h4>{songTitle}</h4>
            <div id="controls">
                <button onClick={playPrev}>prev</button>
                <button onClick={toggleSong}>play / pause</button>
                <button onClick={playNext}>next</button>
            </div>
        </div>
    )
}

export default Player;