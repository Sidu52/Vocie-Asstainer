import './MainScreen.css'
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { URL } from '../endpointURL';
import { MyContext } from "../Context/Mycontext";
import PopupTour from '../Component/PopTour/PopupTour'
import { speakText } from "../Component/text_to_speack/speaktext";
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import { startListening } from './MainVoiceFuntion';
import { takeInput } from './MainVoiceFuntion';
import { find } from './MainVoiceFuntion';
import { IoCloseCircleOutline } from 'react-icons/io5'
import alarmImage from '../assets/Images/alarmB.gif'
import { CiMicrophoneOn } from "react-icons/ci";
import './MainUI.css'
// import Music from '../Component/api/Music';

const MainScreen = () => {
    const localuser = JSON.parse(localStorage.getItem('user'));
    const [alarmRing, setAlarmRing] = useState(false);
    const [alardetail, setAlarmDeatil] = useState({});
    const [abortController, setAbortController] = useState(new AbortController());
    const { showScreen, setShowScreen, listen, setListen, load, userInput, setUserInput, speaking, setSpeaking, micListen, setMicListen } = useContext(MyContext);
    const [listening, setListening] = useState(false);
    const [search, setSearch] = useState(false);

    const [tourToggle, setTourToggle] = useState(true);

    useEffect(() => {

        const userInput = "Hello what is your name";
        axios.post(`${URL}/findfunction`, { userInput })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
        getAllAlarm()
    }, [load]);

    useEffect(() => {
        if (listen) {
            setShowScreen(null)
            takeinputcall("");
        }
    }, [listen])

    //Set Alarms 
    const getAllAlarm = async () => {

        if (!localuser) {
            return;
        }
        axios.post(`${URL}/alarm/getalarm`, { userid: localuser._id })
            .then(response => {
                const data = response.data?.data;
                if (data && data.length > 0) {
                    const timeDifferences = [];
                    data.forEach((alarmData, index) => {
                        const givenTime = alarmData.alarmTime;
                        const [time, period] = givenTime.split(' ');
                        const [hours, minutes] = time.split(':');
                        const formattedGivenTime = new Date();
                        formattedGivenTime.setHours(
                            period.toLowerCase() === 'p.m.' ? parseInt(hours) + 12 : parseInt(hours),
                            parseInt(minutes),
                            0,
                            0
                        );
                        const currentTime = new Date();
                        let timeDifference = formattedGivenTime - currentTime;
                        if (timeDifference < 0) {
                            timeDifference += 24 * 60 * 60 * 1000; // 24 hours in milliseconds
                        }
                        timeDifferences.push(timeDifference);
                        setTimeout(() => {
                            // Assuming setAlarmRing and setAlarmDeatil are functions
                            setAlarmRing(true);
                            setAlarmDeatil(alarmData);
                        }, timeDifference);
                    });

                    return timeDifferences;
                }
            })
            .catch(error => {
                console.error('Error fetching alarm data:', error);
            });
    };

    const takeinputcall = async (value) => {
        let input = value || "";
        if (input == "") {
            // setListening(true)
            setMicListen(true)
            input = await takeInput();
            // setListening(false)
            setMicListen(false)
            setUserInput(input);
        }
        if (input?.toLowerCase().includes("jarvis stop") || input?.toLowerCase().includes("stop jarvis") || input?.toLowerCase().includes("close jarvis") || input?.toLowerCase().includes("jarvis close")) {
            setSpeaking(true);
            await speakText("okay, next time just say 'Hello Jarvis,' and I am always ready for you");
            setSpeaking(false);
            return await handlemainListen("");
        }
        else if (input || input != "") {
            setSearch(true)//For showing searching animation
            const output = await find(input);
            setSearch(false)//For hide searching animation
            setShowScreen(output)
            setListen(false)
        } else {
            takeinputcall()//Again call input function whnever we did'nt get input
        }
    }


    const handleClosetour = async (value) => {
        setTourToggle(value)
        handlemainListen("")
    }

    const handlemainListen = async (value) => {
        const data = await startListening(value);
        if (data) {
            setSpeaking(true);
            await speakText("Hy what should i do for you");
            setSpeaking(false);
            setListen(true)
        }
    }

    const handleClick = async () => {
        abortController.abort();
        const newAbortController = new AbortController();
        setAbortController(newAbortController);
        try {
            setShowScreen(null)
            await takeInput()
        } catch (error) {
            console.error(error.message);
            // Handle error as needed
        }
    };
    return (
        <div className='contai'>
            <div className="w-full h-0 bg-opacity-75 bg-gray-800 absolute text-center flex items-center transition-all duration-500 justify-center z-10 overflow-hidden" style={{ height: alarmRing ? "100%" : "" }} >
                <div className='flex items-center justify-around bg-white rounded-2xl relative'>
                    <IoCloseCircleOutline className=' absolute top-4 right-4 text-2xl' onClick={async () => {
                        setAlarmRing(false)
                        await axios.post(`${URL}/alarm/deletealarm`, { alarmTime: alardetail.alarmTime, userid: localuser._id });
                    }
                    }
                    />
                    <img className='w-1/3' src={alarmImage} alt="" />
                    <div className=' text-left'>
                        <h2 className='text-4xl font-bold'>{alardetail?.title || "SSS"}</h2>
                        <p className='text-xl font-semibold'>{alardetail?.alarmTime || "10:30 p.m"}</p>
                    </div>
                </div>
                {alarmRing ? <audio src="https://2u039f-a.akamaihd.net/downloads/ringtones/files/mp3/technocraj-20230730-0001-61126.mp3" autoPlay loop></audio> : null}

            </div>
            <div className="flex flex-col items-center justify-center" style={{ width: "30%" }}>

                {
                    tourToggle ? <PopupTour handleClosetour={handleClosetour} /> : null
                }
                <div className=''>
                    {/* {listening ? <p>Listening...</p> : <p>Not listening</p>} */}
                    <p>{userInput}</p>
                </div>
                <div className="m-cue min-w-52 min-h-52 relative flex items-center justify-center">
                    <div className={`a-cue-voice ${search ? "speaking" : ""} w-40 h-40 absolute`}>
                        <div className="a-cue-voice-el w-40 h-40 absolute rounded-full opacity-20"></div>
                        <div className="a-cue-voice-el w-40 h-40 absolute rounded-full opacity-20"></div>
                        <div className="a-cue-voice-el w-40 h-40 absolute rounded-full opacity-20"></div>
                        <div className="a-cue-voice-el w-40 h-40 absolute rounded-full opacity-20"></div>
                        <div className="a-cue-voice-el w-40 h-40 absolute rounded-full opacity-20"></div>
                    </div>

                    <div className="a-cue-icon">
                        {speaking ?
                            <ul className="wave-menu">
                                <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
                            </ul>
                            : null}
                    </div>

                </div>
                <div className='relative w-full  flex items-center gap-2'>
                    <input className=' px-3 py-2 w-5/6 outline-none border border-black-700 rounded-xl' type="text" placeholder='Enter text here' />
                    <span className='p-1'>
                        <CiMicrophoneOn className={`microphone text-xl cursor-pointer ${micListen ? "active-mic" : ""}`}
                            onClick={() => {
                                // setListening(!listening)
                                if (!micListen) {
                                    handlemainListen("jarvis")
                                } else {
                                    // setShowScreen(null)
                                    setMicListen(false)
                                    // setListening(false)
                                    takeinputcall("Jarvis stop")
                                }
                            }} />
                    </span>
                </div>
            </div>
            {showScreen ?
                <div className='w-full flex flex-col items-center justify-center'>
                    <span className=' cursor-pointer' onClick={handleClick}>Close</span>
                    <div className='flex items-center justify-center overflow-hidden'>
                        {showScreen}
                    </div>
                </div>
                : ""}
        </div>

    );
}
export default MainScreen;

