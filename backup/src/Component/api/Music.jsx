import React, { useState, useRef, useEffect, useContext } from "react";
import { MyContext } from "../../Context/Mycontext";
import { takeInput } from "../../Screen/MainVoiceFuntion";
import { speakText } from '../text_to_speack/speaktext';
import { playMusic } from './playmusic';
// import { stopCmd } from "../../Screen/MainVoiceFuntion";
import youtube from './youtubeAPI'
import audiogif from '../../assets/Images/sirilike.gif'
import { Resizable } from 'react-resizable';
import Draggable from 'react-draggable';
import 'react-resizable/css/styles.css';
import YouTube from 'react-youtube';
import { MdOutlinePlayCircle } from "react-icons/md";

export default function Music({ userInput }) {

    const audioRef = useRef(null);
    const playerRef = useRef(null);
    const [videoShow, setVideoShow] = useState(true)
    const [videoPlay, setVideoPlay] = useState(true)
    const { setListen, setSpeaking, setShowScreen, setMicListen } = useContext(MyContext);
    const hasMounted = useRef(false);
    const [volume, setVolume] = useState(100);
    const [videoURL, setVideoURL] = useState("");
    const [musicURL, setMusicURL] = useState("");
    const [musicArray, setMusicArray] = useState([]);
    const [musicIndex, setMusicIndex] = useState(0);
    const [videoIndex, setVideoIndex] = useState(0);
    let videoArray = [];
    let musicArr = [];
    let musicInd = 0;
    let videoInd = 0;
    const [dragable, setDragable] = useState(false)
    const [size, setSize] = useState({ width: 300, height: 300 });

    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 1,
        },
    };

    const handleResize = (e, { size: newSize, handle }) => {
        setSize((prevSize) => ({
            width: handle.includes('w') || handle.includes('e') ? newSize.width : prevSize.width,
            height: handle.includes('n') || handle.includes('s') ? newSize.height : prevSize.height,
        }));
    };

    useEffect(() => {
        if (!hasMounted.current) {
            hasMounted.current = true;
            handleYouTube();
        }
    }, []);


    const MusicStop = async () => {
        const stopCommands = [
            "stop jarvis",
            "stop Jarvis",
            "jarvis stop",
            'music stop',
            'close music',
            'stop'
        ];
        setMicListen(true)
        const input = await takeInput();
        setMicListen(false)
        if (stopCommands.some(cmd => input?.toLowerCase()?.includes(cmd.toLowerCase()))) {
            setShowScreen(false)
            return setListen(true);
        } else {
            // Add a base case to stop the recursion
            await MusicStop();
        }
    }



    const musicController = async () => {
        const stopcommand = [
            "stop jarvis",
            "stop Jarvis",
            "jarvis stop",
            'music stop',
            'close window',
            'stop'
        ];
        const nextMuscic = [
            "next music",
            "next song",
            "song next",
            "music next",
            "change music",
            'forward music',
            'musiic forward',
            'new music',
        ]
        const prevMusic = [
            "previous music",
            "previous song",
            "song previous",
            "music previous",
            "old music",
            'musiic prev',
        ]
        const playMusic = [
            "pause music",
            "play previous",
            "music pause",
        ]
        const puseMusic = [
            "play music",
            'music play',
        ]
        const VolumeControll = [
            "sound",
            'Voice increse',
            'Volume',
        ]
        setMicListen(true)
        const Input = await takeInput();
        setMicListen(false)
        const play = playMusic.some(cmd => Input?.toLowerCase()?.includes(cmd.toLowerCase()));
        const pause = puseMusic.some(cmd => Input?.toLowerCase()?.includes(cmd.toLowerCase()))
        const prevSong = prevMusic.some(cmd => Input?.toLowerCase()?.includes(cmd.toLowerCase()))
        const nextSong = nextMuscic.some(cmd => Input?.toLowerCase()?.includes(cmd.toLowerCase()))
        const volume = VolumeControll.some(cmd => Input?.toLowerCase()?.includes(cmd.toLowerCase()))
        const stop = stopcommand.some(cmd => Input?.toLowerCase()?.includes(cmd.toLowerCase()))
        if (stop) {
            return setListen(true);
        }
        else if (play) {
            audioRef.current.pause();
        } else if (pause) {
            audioRef.current.play();
        } else if (prevSong) {
            if (musicInd == 0) {
                setMusicURL(musicArr[musicArr.length - 1].downloadUrl[musicArr[musicArr.length - 1].downloadUrl.length - 1].link)
                musicInd = musicArr - 1
            } else {
                setMusicURL(musicArr[musicInd - 1].downloadUrl[musicArr[musicInd - 1].downloadUrl.length - 1].link)
                musicInd = musicInd - 1
            }
        } else if (nextSong) {
            if (musicInd == musicArray.length - 1) {
                setMusicURL(musicArr[0].downloadUrl[musicArr[0].downloadUrl.length - 1].link)
                musicInd = 0;
            } else {
                setMusicURL(musicArr[musicInd + 1].downloadUrl[musicArr[musicInd + 1].downloadUrl.length - 1].link)
                musicInd = musicInd + 1
            }
        } else if (volume) {
            const regex = /\d+(\.\d+)?/g;
            const percentage = Input.match(regex);
            console.log(percentage)
            handleVolumeChange(percentage);
        }
        else if (Input?.toLowerCase()?.includes("play")) {
            userInput = Input
            const musicData = await playMusic(userInput || "Bollywood");
            setMusicArray(musicData);
            musicArr = musicData
            setMusicIndex(0);
        }
        await musicController()
    }
    //Handle music voice
    const handleVolumeChange = (newVolume) => {
        const cVolume = Math.max(0, Math.min(100, newVolume));
        setVolume(cVolume);
        audioRef.current.volume = cVolume / 100;
    };

    // Controll YouTunbe Video
    const YoutubeMusicController = async () => {

        const stopcommand = [
            "stop jarvis",
            "stop Jarvis",
            "jarvis stop",
            'music stop',
            'video stop',
            'close window',
            'stop'
        ];
        const nextVideo = [
            "next music",
            "next video",
            "next song",
            "song next",
            "video next",
            "music next",
            "change music",
            "change video",
            'forward music',
            'forward video',
            'music forward',
            'new music',
        ]
        const prevVideo = [
            "previous music",
            "previous video",
            "previous song",
            "song previous",
            "video previous",
            "old video",
            'video previous',
        ]
        const playVideo = [
            "pause video",
            "video pause",
            "music pause",
            "song pause"
        ]
        const puseVideo = [
            "play video",
            'video play',
            "song play",
            "music play",
        ]
        const VolumeControll = [
            "sound",
            'Voice increse',
            'Volume',
        ]
        setMicListen(true)
        const Input = await takeInput();
        setMicListen(false)
        const play = playVideo.some(cmd => Input?.toLowerCase()?.includes(cmd.toLowerCase()));
        const pause = puseVideo.some(cmd => Input?.toLowerCase()?.includes(cmd.toLowerCase()))
        const prevSong = prevVideo.some(cmd => Input?.toLowerCase()?.includes(cmd.toLowerCase()))
        const nextSong = nextVideo.some(cmd => Input?.toLowerCase()?.includes(cmd.toLowerCase()))
        const volume = VolumeControll.some(cmd => Input?.toLowerCase()?.includes(cmd.toLowerCase()))
        const stop = stopcommand.some(cmd => Input?.toLowerCase()?.includes(cmd.toLowerCase()))
        if (stop) {
            return setListen(true);
        }
        else if (play) {
            const player = playerRef.current;
            player.pauseVideo();
        } else if (pause) {
            const player = playerRef.current;

            player.playVideo();
        }
        else if (prevSong) {
            if (videoInd == 0) {
                setVideoURL(videoArray[videoArray.length - 1].id.videoId)
                videoInd = musicArr - 1
            } else {
                setVideoURL(videoArray[videoInd - 1].id?.videoId)
                videoInd = videoInd - 1
            }
        } else if (nextSong) {
            if (videoInd == musicArray.length - 1) {
                setVideoURL(videoArray[0].id?.videoId)
                videoInd = 0;
            } else {
                setVideoURL(videoArray[videoInd + 1].id?.videoId)
                videoInd = videoInd + 1
            }
        }
        else if (volume) {
            const regex = /\d+(\.\d+)?/g;
            const percentage = Input.match(regex);
            handleVideoVolumeChange(percentage, Input);
        }
        else if (Input?.toLowerCase()?.includes("play")) {
            userInput = Input
            const videoData = await youtube(userInput);
            videoArray = videoData;
            setVideoURL(videoData[videoInd].id?.videoId)
        }
        await YoutubeMusicController()
    }

    const handleVideoVolumeChange = (newVolume, Input) => {

        const player = playerRef.current;
        if (newVolume) {
            const videoVolume = Math.max(0, Math.min(100, newVolume));
            player.setVolume(videoVolume);
        } else if (Input?.toLowerCase()?.includes("decrease")) {
            const currentVolume = player.getVolume();
            const newVolume = Math.max(currentVolume - 10, 0);
            player.setVolume(newVolume);
        } else {
            const currentVolume = player.getVolume();
            const newVolume = Math.min(currentVolume + 10, 100);
            player.setVolume(newVolume);
        }
    };
    async function handleYouTube() {
        try {
            const arr = ['play', 'music', 'song', 'run', 'i', 'want', 'youtube', 'video', 'audio'];
            const sanitizedInput = userInput.split(' ').filter(word => !arr.includes(word)).join(' ');
            let containsVideo = userInput.toLowerCase().includes('video');
            let containsYouTube = userInput.toLowerCase().includes('youtube');
            if (containsYouTube || containsVideo) {
                const videoData = await youtube(userInput);
                videoArray = videoData;
                setVideoURL(videoData[videoInd].id?.videoId)

                if (window.screen.width > 450) {
                    await YoutubeMusicController();
                } else {
                    return
                }

            }
            else {
                setVideoShow(false)
                setSpeaking(true);
                await speakText('Okay music searching');
                setSpeaking(false);
                const musicData = await playMusic(sanitizedInput || "Bollywood");
                setMusicArray(musicData);
                musicArr = musicData
                setMusicIndex(0);

                await playNextSong(musicData);
            }
            if (window.screen.width > 450) {
                await musicController()
            } else {
                return
            }

        } catch (err) {
            console.log(err);
            setSpeaking(true);
            await speakText("Something went wrong. Please try again.");
            setSpeaking(false);
            return setListen(true)
        }
    }
    async function playNextSong(musicData) {
        try {
            if (musicIndex < musicData?.length) {
                const music = musicData[musicIndex];
                const musicurl = music.downloadUrl;
                if (musicurl.length > 0) {
                    const url = musicurl[musicurl.length - 1];
                    const finalurl = url.link;
                    setMusicURL(finalurl);
                }
            }
        } catch (err) {
            console.log(err);
            setSpeaking(true);
            await speakText("Something went wrong with the music playback.");
            setSpeaking(false);
            return setListen(true)
        }
    }

    const onReady = (event) => {
        playerRef.current = event.target;
    };
    // const handlePlayPause = () => {
    //     console.log("Enter")
    //     const player = playerRef.current;
    //     if (player.getPlayerState() === window.YT.PlayerState.PLAYING) {
    //         player.pauseVideo();
    //         setVideoPlay(false)
    //     } else {
    //         player.playVideo();
    //         setVideoPlay(true)
    //     }
    // };
    // const handleVolumeUp = () => {
    //     const player = playerRef.current;
    //     const currentVolume = player.getVolume();
    //     const newVolume = Math.min(currentVolume + 10, 100);
    //     player.setVolume(newVolume);
    // };
    // const handleVolumeDown = () => {
    //     const player = playerRef.current;
    //     const currentVolume = player.getVolume();
    //     const newVolume = Math.max(currentVolume - 10, 0);
    //     player.setVolume(newVolume);
    // };


    // function handleMusicStop() {
    //     setShowScreen(false)
    //     return setListen(true);
    // }

    return (
        <div className="absolute bottom-0 right-0 overflow-hidden w-full h-full">
            {/* {
                window.screen.width < 450 ? <div className="bg-black text-white" onClick={handleMusicStop}>Stop</div> : null
            } */}

            <Draggable
                disabled={dragable}
                defaultPosition={{ x: 0, y: 0 }}
                position={null}
            >
                <Resizable
                    width={size.width}
                    height={size.height}
                    onResize={handleResize}
                    minConstraints={[100, 100]}
                    maxConstraints={[800, 500]}
                    resizeHandles={['s', 'w', 'e', 'n', 'se', 'sw', 'ne', 'nw']}
                >
                    <div className="flex justify-center items-center w-full h-96 absolute bottom-0 right-0 " style={{ width: size.width, height: size.height, zIndex: "3" }}>
                        <div className=" absolute top-1 rounded-2xl bg-opacity-0 z-10"
                            style={{ width: "95%", height: "80%" }}
                            onMouseOver={() => {
                                setDragable(false)
                            }}
                            onMouseOut={() => {
                                setDragable(true)
                            }}
                        ></div>
                        {videoShow ? (
                            <div className="w-full h-full relative" >
                                <div className="videoContainer">
                                    <YouTube key={videoURL} autoPlay videoId={videoURL} opts={opts} onReady={onReady} />

                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center w-full h-full overflow-hidden">
                                <div className="relative w-full h-96" >
                                    <div className=" fixed bottom-0 w-full">
                                        <audio
                                            id="musicPlayer"
                                            src={musicURL}
                                            // onPlay={true}
                                            volume={volume / 100}
                                            ref={audioRef}
                                            onEnded={() => {
                                                if (musicIndex == musicArray.length - 1) {
                                                    setMusicIndex(0);
                                                } else {
                                                    setMusicIndex(musicIndex + 1);
                                                }
                                                playNextSong(musicArray);
                                            }}
                                            autoPlay
                                            controls
                                            className="w-full"
                                        ></audio>
                                    </div>
                                    <img src={audiogif} alt="" className="w-full h-full" />
                                </div>
                            </div>
                        )}
                    </div>
                </Resizable>
            </Draggable>
        </div>
    )
}


