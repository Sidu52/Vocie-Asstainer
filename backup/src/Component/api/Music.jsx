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

export default function Music({ userInput }) {
    const audioRef = useRef(null);
    const [videoShow, setVideoShow] = useState(true)
    const { setListen, setSpeaking, setShowScreen, setMicListen } = useContext(MyContext);
    const hasMounted = useRef(false);
    const [volume, setVolume] = useState(100);
    const [videoURL, setVideoURL] = useState("");
    const [musicURL, setMusicURL] = useState("");
    const [musicArray, setMusicArray] = useState([]);
    const [musicIndex, setMusicIndex] = useState(0);
    let musicArr = [];
    let musicInd = 0;
    const [dragable, setDragable] = useState(false)
    const [size, setSize] = useState({ width: 300, height: 300 });

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
        await musicController()
    }
    //Handle music voice
    const handleVolumeChange = (newVolume) => {
        const cVolume = Math.max(0, Math.min(100, newVolume));
        setVolume(cVolume);
        audioRef.current.volume = cVolume / 100;
    };

    async function handleYouTube() {
        try {
            const arr = ['play', 'music', 'song', 'run', 'i', 'want', 'youtube', 'video', 'audio'];
            const sanitizedInput = userInput.split(' ').filter(word => !arr.includes(word)).join(' ');
            // Check if the modified userInput contains "video" and "YouTube"
            let containsVideo = userInput.toLowerCase().includes('video');
            let containsYouTube = userInput.toLowerCase().includes('youtube');
            if (containsYouTube || containsVideo) {
                const videoData = await youtube(userInput);
                setVideoURL(`https://www.youtube.com/embed/${videoData}?autoplay=1`);
                if (window.screen.width > 450) {
                    await MusicStop();
                    // if (output) {
                    //     return setListen(true);
                    // }
                } else {
                    return
                }

            }
            else {
                setVideoShow(false)
                setSpeaking(true);
                await speakText('Okay music searching');
                const musicData = await playMusic(sanitizedInput || "Bollywood");
                setSpeaking(false);
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
            if (musicIndex < musicData.length) {
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

    function handleMusicStop() {
        console.log("Find Problem")
        setShowScreen(false)
        return setListen(true);
    }

    return (
        <div className="absolute bottom-0 right-0 overflow-hidden w-full h-full">
            {
                window.screen.width < 450 ? <div className="bg-black text-white" onClick={handleMusicStop}>Stop</div> : null
            }

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
                    <div className="flex justify-center items-center w-full h-96 absolute bottom-0 right-0" style={{ width: size.width, height: size.height }}>
                        <div className=" absolute w-full bg-opacity-0"
                            style={{ height: "70%" }}
                            onMouseOver={() => {
                                setDragable(false)
                            }}
                            onMouseOut={() => {
                                setDragable(true)
                            }}
                        ></div>
                        {videoShow ? (
                            <div className="w-full h-full" >
                                <iframe
                                    src={videoURL}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    className="w-full h-full"
                                ></iframe>
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


