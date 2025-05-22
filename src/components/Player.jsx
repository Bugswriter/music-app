import { useEffect, useRef, useState } from "react";

function Player () {
    const player = useRef(null);
    const playerRef = useRef(null);
    const [songID, setSongID] = useState("5vWhWaE3lTA");

    useEffect(() => {
        const createPlayer = () => {
            const playerOptions = {
                height: '360',
                width: '640',
                videoId: songID,
                events: {
                    onReady: (event) => {
                        console.log('Player is ready');
                    },
                    onStateChange: (event) => {
                        console.log('State changed:', event.data);
                    },
                },
            };
            window.onYouTubeIframeAPIReady = () => {
                player.current = new window.YT.Player(playerRef.current, playerOptions);
            }
        }
        if (window.YT && window.YT.Player) {
            window.onYouTubeIframeAPIReady();
        }else {
            setTimeout(createPlayer(), 100);
        }
    }, [songID]);

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

    return (
        <>
            <h2>Groove</h2>
            <div id="player" ref={playerRef}></div>
            <div id="controls">
                <input type="text" name="song_id" />
                <button onClick={toggleSong}>play / pause</button>
                <button>next</button><button>prev</button>
                <button>vol-</button><button>vol+</button>
                <button>loop</button>
            </div>
        </>
    )
}

export default Player;