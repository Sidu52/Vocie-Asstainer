import React, { useRef, useEffect, useContext, useState } from "react";
import { MyContext } from "../../Context/Mycontext";
import { speakText } from "../text_to_speack/speaktext";
import axios from "axios";
import { URL } from "../../endpointURL";
import { takeInput } from "../../Screen/MainVoiceFuntion";

export default function SetAlaram({ userInput, opration }) {
    const [data, setData] = useState([]);
    const { setListen, setLoad, setSpeaking, setMicListen } = useContext(MyContext);
    const hasMounted = useRef(false);

    useEffect(() => {
        if (!hasMounted.current) {
            // Only run the effect on the initial mount
            hasMounted.current = true;
            setAlaram();
        }
    }, []);


    async function setAlaram() {
        try {
            let i = 0;
            let updateData = {};
            const timeRegex = /(\d{1,2}:\d{2}\s*[ap]\.m\.)/gi;
            // Search for time patterns in the input strings
            let time = userInput.match(timeRegex);
            if (!time && opration != "getAll Alarm") {
                setSpeaking(true);
                await speakText(`gave your  ${opration} time`);
                setSpeaking(false);
                setMicListen(true)
                let Atime = await takeInput();
                setMicListen(false)
                time = Atime.match(timeRegex);
                i = 0;
                while (!time && i < 5) {
                    setSpeaking(true);
                    await speakText("Sorry time not found try again");
                    setSpeaking(false);
                    i++;
                    setMicListen(true)
                    Atime = await takeInput();
                    setMicListen(false)
                    time = Atime.match(timeRegex);
                }
                if (i == 5) {
                    setSpeaking(true);
                    await speakText("Sorry input not found thank for using");
                    setSpeaking(false);
                    return setListen(true);
                }
            }
            i = 0;
            var localuser = JSON.parse(localStorage.getItem('user'));
            if (!localuser) {
                setSpeaking(true);
                await speakText("User not found which name should I save");
                setSpeaking(false);
                setMicListen(true)
                let nickname = await takeInput();
                setMicListen(false)
                i = 0;
                while (!nickname && i < 5) {
                    setSpeaking(true);
                    await speakText("Sorry nickname not found try again");
                    setSpeaking(false);
                    i++;
                    setMicListen(true)
                    nickname = await takeInput();
                    setMicListen(false)
                }
                if (i == 5) {
                    setSpeaking(true);
                    await speakText("Sorry input not found thank for using");
                    setSpeaking(false);
                    return setListen(true)
                }
                if (nickname) {
                    setSpeaking(true);
                    await speakText(`okay ${nickname}`);
                    setSpeaking(false);
                    const { data } = await axios.post(`${URL}/todo/user`, {
                        nickname: nickname
                    });
                    if (data.data) {
                        localuser = data.data;
                        localStorage.setItem('user', JSON.stringify(localuser));
                    }
                } else {
                    setSpeaking(true);
                    await speakText(`User not found`);
                    setSpeaking(false);
                    return setListen(true)
                }
                localuser = JSON.parse(localStorage.getItem('user'));
            }
            if (opration == "set Alarm") {
                var { data } = await axios.post(`${URL}/alarm/alarm`, { alarmTime: time[0], userid: localuser._id });
                if (data.data) {
                    setSpeaking(true);
                    await speakText(`${time[0]} alarm ${data.data.title} already set`);
                    setSpeaking(false);
                    return setListen(true)
                }
            }
            switch (opration) {
                case "set Alarm":
                    setSpeaking(true);
                    await speakText("what name should i set the alarm");
                    setSpeaking(false);
                    setMicListen(true)
                    let alarmName = await takeInput();
                    setMicListen(false)
                    i = 0;
                    while (!alarmName && i < 5) {
                        setSpeaking(true);
                        await speakText("Sorry name not found try again");
                        setSpeaking(false);
                        i++
                        setMicListen(true)
                        alarmName = await takeInput();
                        setMicListen(false)
                    }
                    if (i == 5) {
                        setSpeaking(true);
                        await speakText("Sorry input not found thank for using");
                        setSpeaking(false);
                        setListen(true)
                    }
                    var data = await axios.post(`${URL}/alarm/setalarm`, { title: alarmName, alarmTime: time[0], userid: localuser._id });
                    if (data.data) {
                        setSpeaking(true);
                        await speakText(`ok your ${alarmName} alram set ${time}`);
                        setSpeaking(false);
                    } else {
                        setSpeaking(true);
                        await speakText(`your alarm is not shedule`);
                        setSpeaking(false);
                    }
                    break;

                case "update Alarm":
                    const oldtime = time;
                    setSpeaking(true);
                    await speakText("what should you want to update");
                    await speakText("name or time");
                    setSpeaking(false);
                    setMicListen(true)
                    let updateType = await takeInput();
                    setMicListen(false)
                    i = 0;
                    while (!updateType && i < 5) {
                        setSpeaking(true);
                        await speakText("Sorry task not found try again");
                        setSpeaking(false);
                        i++
                        setMicListen(true)
                        updateType = await takeInput();
                        setMicListen(false)
                    }
                    if (i == 5) {
                        setSpeaking(true);
                        await speakText("Sorry input not found thank for using");
                        setSpeaking(false);
                        return setListen(true)
                    }

                    const sanitizedInput = updateType.split(' ');
                    // Check for keywords
                    // Search for time patterns in the input strings
                    console.log("object", sanitizedInput)
                    let updatedTime = sanitizedInput.match(timeRegex);
                    console.log("object", updatedTime)

                    const timeupdate = sanitizedInput.some(word => ['time'].includes(word.toLowerCase()));
                    const nameupdate = sanitizedInput.some(word => ['name'].includes(word.toLowerCase()));
                    if (timeupdate && !nameupdate) {
                        setSpeaking(true);
                        await speakText("tell me the updated time");
                        setSpeaking(false);
                        setMicListen(true)
                        let newTime = await takeInput();
                        setMicListen(false)
                        // Search for time patterns in the input strings
                        time = newTime.match(timeRegex);
                        i = 0;
                        while (!time && i < 5) {
                            setSpeaking(true);
                            await speakText("Sorry time not found try again");
                            setSpeaking(false);
                            i++
                            setMicListen(true)
                            newTime = await takeInput();
                            setMicListen(false)
                            time = newTime.match(timeRegex);
                        }
                        if (i == 5) {
                            setSpeaking(true);
                            await speakText("Sorry input not found thank for using");
                            setSpeaking(false);
                            return setListen(true)
                        }

                        updateData = {
                            alarmTime: time[0],
                        }

                    } else if (nameupdate && !timeupdate) {
                        setSpeaking(true);
                        await speakText("tell me the updated name");
                        setSpeaking(false);
                        setMicListen(true)
                        let newName = await takeInput();
                        setMicListen(false)
                        // Search for time patterns in the input strings
                        // time = newName.match(timeRegex);
                        i = 0;
                        while (!newName && i < 5) {
                            setSpeaking(true);
                            await speakText("Sorry name not found try again");
                            setSpeaking(false);
                            i++
                            setMicListen(true)
                            newName = await takeInput();
                            setMicListen(false)
                        }
                        if (i == 5) {
                            setSpeaking(true);
                            await speakText("Sorry input not found thank for using");
                            setSpeaking(false);
                            return setListen(true)
                        }

                        updateData = {
                            title: newName,
                        }

                    } else if (timeupdate && nameupdate) {
                        setSpeaking(true);
                        await speakText("tell me the updated name");
                        setSpeaking(false);
                        setMicListen(true)
                        let newName = await takeInput();
                        setMicListen(false)
                        i = 0;
                        while (!newName && i < 5) {
                            setSpeaking(true);
                            await speakText("Sorry name not found try again");
                            setSpeaking(false);
                            i++
                            setMicListen(true)
                            newName = await takeInput();
                            setMicListen(false)
                        }
                        if (i == 5) {
                            setSpeaking(true);
                            await speakText("Sorry input not found thank for using");
                            setSpeaking(false);
                            return setListen(true)
                        }
                        setSpeaking(true);
                        await speakText("tell me the updated time");
                        setSpeaking(false);
                        setMicListen(true)
                        let newTime = await takeInput();
                        setMicListen(false)
                        // Search for time patterns in the input strings
                        time = newTime.match(timeRegex);
                        i = 0;
                        while (!time && i < 5) {
                            setSpeaking(true);
                            await speakText("Sorry time not found try again");
                            setSpeaking(false);
                            i++
                            setMicListen(true)
                            newTime = await takeInput();
                            setMicListen(false)
                            time = newTime.match(timeRegex);
                        }
                        if (i == 5) {
                            setSpeaking(true);
                            await speakText("Sorry input not found thank for using");
                            setSpeaking(false);
                            return setListen(true)
                        }
                        updateData = {
                            title: newName,
                            alarmTime: time[0]
                        }
                    } else {
                        setSpeaking(true);
                        await speakText("time or name no one found")
                        setSpeaking(false);
                        return setListen(true)
                    }
                    var data = await axios.put(`${URL}/alarm/updatealarm`, { alarmTime: oldtime[0], userid: localuser._id, updateData });
                    if (data.data) {
                        setSpeaking(true);
                        await speakText(`your alarm ${updateData.title} is update`);
                        setSpeaking(false);
                    } else {
                        setSpeaking(true);
                        await speakText(`your alarm is not update`);
                        setSpeaking(false);
                    }
                    break;
                case "delete Alarm":
                    var { data } = await axios.post(`${URL}/alarm/deletealarm`, { alarmTime: time[0], userid: localuser._id });
                    if (data.data) {
                        setSpeaking(true);
                        await speakText(`your alarm  is deleted`);
                        setSpeaking(false);
                    } else {
                        setSpeaking(true);
                        await speakText(`your alarm is not found`);
                        setSpeaking(false);
                        return setLoad(true)
                    }
                    break;
                case "get Alarm":
                    var { data } = await axios.post(`${URL}/alarm/alarm`, { alarmTime: time[0], userid: localuser._id });
                    if (data.data) {
                        setSpeaking(true);
                        await speakText(`your alarm ${data.data.title} `);
                        setSpeaking(false);
                    } else {
                        setSpeaking(true);
                        await speakText(`your alarm is not find`);
                        setSpeaking(false);
                    }
                    break
                case "getAll Alarm":
                    setSpeaking(true);
                    await speakText("Wait your alarms fetch plz wait");
                    setSpeaking(false);
                    var { data } = await axios.post(`${URL}/alarm/getalarm`, { userid: localuser._id });
                    if (data.data) {
                        setSpeaking(true);
                        await speakText(`your alarms is find`);
                        setSpeaking(false);
                        i = 0;
                        while (i < data.data.length) {

                            setData(prevState => ({
                                ...prevState,
                                data: Array.isArray(prevState.data) ? [...prevState.data, data.data[i]] : [data.data[i]]
                            }));
                            setSpeaking(true);
                            await speakText(`your ${data.data[i].alarmTime} alarm task is ${data.data[i].title}`);
                            setSpeaking(false);
                            i++;
                        }
                    } else {
                        setSpeaking(true);
                        await speakText(`your alarm is not find`);
                        setSpeaking(false);
                    }
                    break;
                default:
                    setSpeaking(true);
                    await speakText("Sorry, I don't know much more about that, but with time I am updating myself");
                    setSpeaking(false);
                    break;
            }
            setLoad(true)
            return setListen(true)
        } catch (err) {
            console.log(err)
            setSpeaking(true);
            await speakText("Somting wrong with us")
            setSpeaking(false);
            return setListen(true)
        }
        // Regular expression to match time in the format hh:mm am/pm
    }
    console.log("object", data)
    return (
        <div className="bg-gray-200 p-4 m-4 mt-0 pt-0 rounded max-h-80 min-w-96 relative overflow-y-scroll">
            <h1 className="text-2xl py-3 font-bold  sticky top-0 bg-gray-200 ">Your Alarms</h1>
            <div className="mt-4 ">
                {data?.data?.map((alarm, index) => (
                    <div key={index} className="border p-2 my-2">
                        <p className="text-lg font-semibold">{alarm.alarmTime}</p>
                        <p className="text-sm">{alarm.title}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
