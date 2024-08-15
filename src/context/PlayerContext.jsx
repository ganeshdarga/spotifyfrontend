// 

import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const [songsData, setsongsData] = useState([]);
    const [albumsData, setalbumsData] = useState([]);
    const [track, setTrack] = useState(null);  // Initially set to null
    const [playerStatus, setPlayerStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0,
        },
        totalTime: {
            second: 0,
            minute: 0,
        },
    });
    const [loading, setLoading] = useState(true);  // Loading state

    const play = () => {
        audioRef.current.play();
        setPlayerStatus(true);
    };

    const getSongsData = async () => {
        try {
            const response = await axios.get("https://spotiback.onrender.com/api/songs/");
            setsongsData(response.data);
            setTrack(response.data[0]);
        } catch (error) {
            console.log("Error fetching songs data:", error);
        }
    };

    const getAlbumsData = async () => {
        try {
            const response = await axios.get("https://spotiback.onrender.com/api/albums/");
            setalbumsData(response.data);
        } catch (error) {
            console.log("Error fetching albums data:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await getSongsData();
            await getAlbumsData();
            setLoading(false);  // Data fetching is done, stop loading
        };
        fetchData();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            if (audioRef.current) {
                audioRef.current.ontimeupdate = () => {
                    seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + "%";
                    setTime({
                        currentTime: {
                            second: Math.floor(audioRef.current.currentTime % 60),
                            minute: Math.floor(audioRef.current.currentTime / 60),
                        },
                        totalTime: {
                            second: Math.floor(audioRef.current.duration % 60),
                            minute: Math.floor(audioRef.current.duration / 60),
                        },
                    });
                };
            }
        }, 1000);
    }, [audioRef]);

    const pause = () => {
        audioRef.current.pause();
        setPlayerStatus(false);
    };

    const playWithId = async (id) => {
        songsData.forEach((item) => {
            if (id === item.id) {
                setTrack(item);
            }
        });
        audioRef.current.play();
        setPlayerStatus(true);
    };

    const previous = async () => {
        songsData.forEach((item, index) => {
            if (track.id === item.id && index > 0) {
                setTrack(songsData[index - 1]);
                audioRef.current.play();
                setPlayerStatus(true);
            }
        });
    };

    const next = async () => {
        songsData.forEach((item, index) => {
            if (track.id === item.id && index < songsData.length - 1) {
                setTrack(songsData[index + 1]);
                audioRef.current.play();
                setPlayerStatus(true);
            }
        });
    };

    const seekSong = async (e) => {
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration);
    };

    const contextValue = {
        audioRef,
        seekBg,
        seekBar,
        track,
        setTrack,
        playerStatus,
        setPlayerStatus,
        time,
        setTime,
        play,
        pause,
        playWithId,
        previous,
        next,
        seekSong,
        songsData,
        albumsData,
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div>Loading... please wait</div>
            </div>
        );
    }

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;
