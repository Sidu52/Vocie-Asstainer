import React, { useState, useRef, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import { MyContext } from "../../Context/Mycontext";
import { speakText } from "../text_to_speack/speaktext";
import { URL } from "../../endpointURL";
import { takeInput } from "../../Screen/MainVoiceFuntion";

const Todo = ({ type }) => {
    const [todo, setTodo] = useState([]);
    const { setListen, setSpeaking, setMicListen } = useContext(MyContext)
    const hasMounted = useRef(false);

    useEffect(() => {
        if (!hasMounted.current) {
            // Only run the effect on the initial mount
            hasMounted.current = true;
            fetchTodo(type);
        }
    }, []);

    const fetchTodo = async () => {

        try {
            let i = 0;
            setSpeaking(true)
            await speakText(`Ok, I think you want to ${type.split('_')[0]} todo`);
            setSpeaking(false)
            var localuser = JSON.parse(localStorage.getItem('user'));
            if (!localuser) {
                setSpeaking(true)
                await speakText("User not found if you want to create account gave your nickname");
                setSpeaking(false)
                setMicListen(true)
                let nickname = await takeInput();
                setMicListen(false)
                i = 0;
                while (!nickname && i < 5) {
                    setSpeaking(true)
                    await speakText("Sorry nickname not found try again");
                    setSpeaking(false)
                    i++;
                    setMicListen(true)
                    nickname = await takeInput();
                    setMicListen(false)
                }
                if (i == 5) {
                    setSpeaking(true)
                    await speakText("Sorry input not found thank for using");
                    setSpeaking(false)
                    return
                }
                if (nickname) {

                    setSpeaking(true)
                    await speakText(`You say ${nickname}`);
                    setSpeaking(false)
                    const { data } = await axios.post(`${URL}/todo/user`, {
                        nickname: nickname
                    });

                    if (data.data) {
                        localuser = data.data;
                        localStorage.setItem('user', JSON.stringify(localuser));
                    }
                } else {
                    setSpeaking(true)
                    await speakText(`User not found`);
                    setSpeaking(false)
                    return
                }
                localuser = JSON.parse(localStorage.getItem('user'));
            }
            switch (type) {
                case "create_todolsit":
                    setSpeaking(true)
                    await speakText("What is your to do task");
                    setSpeaking(false)

                    setMicListen(true)
                    let todoTask = await takeInput();
                    setMicListen(false)
                    i = 0;
                    while (!todoTask && i < 5) {
                        setSpeaking(true)
                        await speakText("Sorry task not found try again");
                        setSpeaking(false)
                        i++
                        setMicListen(true)
                        todoTask = await takeInput();
                        setMicListen(false)
                    }
                    if (i == 5) {
                        setSpeaking(true)
                        return speakText("Sorry input not found thank for using");
                        setSpeaking(false)
                    }

                    var data = await axios.post(`${URL}/todo/todo`, { title: todoTask, completed: false, userid: localuser._id });

                    if (data.data) {
                        setSpeaking(true)
                        await speakText(`ok your task ${todoTask} is added`);
                        setSpeaking(false)
                    } else {
                        setSpeaking(true)
                        await speakText(`your task is not added`);
                        setSpeaking(false)
                    }
                    break;
                case "update_todolsit":
                    setSpeaking(true)
                    await speakText("Which task you want to update");
                    setSpeaking(false)

                    setMicListen(true)
                    const oldTask = await takeInput();
                    setMicListen(false)
                    i = 0;
                    while (!oldTask && i < 5) {
                        setSpeaking(true)
                        await speakText("Sorry task not found try again");
                        setSpeaking(false)
                        i++
                        setMicListen(true)
                        oldTask = await takeInput();
                        setMicListen(false)
                    }
                    if (i == 5) {
                        setSpeaking(true)
                        return speakText("Sorry input not found thank for using");
                        setSpeaking(false)
                    }

                    setSpeaking(true)
                    await speakText("  Tell what should you want to updated");
                    setSpeaking(false)

                    setMicListen(true)
                    const updatedTask = await takeInput();
                    setMicListen(false)
                    i = 0;
                    while (!updatedTask && i < 5) {
                        setSpeaking(true)
                        await speakText("Sorry task not found try again");
                        setSpeaking(false)
                        i++
                        setMicListen(true)
                        updatedTask = await takeInput();
                        setMicListen(false)
                    }
                    if (i == 5) {
                        setSpeaking(true)
                        return speakText("Sorry input not found thank for using");
                        setSpeaking(false)
                    }

                    var data = await axios.put(`${URL}/todo/todo`, { title: oldTask, completed: false, userid: localuser._id, updatetitle: updatedTask });

                    if (data.data) {
                        setSpeaking(true)
                        await speakText(`your task ${updatedTask} is update`);
                        setSpeaking(false)
                    } else {
                        setSpeaking(true)
                        await speakText(`your task is not update`);
                        setSpeaking(false)
                    }
                    break;
                case "delete_todolsit":
                    setSpeaking(true)
                    await speakText("Which task you want to delete");
                    setSpeaking(false)

                    setMicListen(true)
                    let taskname = await takeInput();
                    setMicListen(false)
                    i = 0;
                    while (!taskname && i < 5) {
                        setSpeaking(true)
                        await speakText("Sorry task not found try again");
                        setSpeaking(false)
                        i++
                        setMicListen(true)
                        taskname = await takeInput();
                        setMicListen(false)
                    }
                    if (i == 5) {
                        setSpeaking(true)
                        return speakText("Sorry input not found thank for using");
                        setSpeaking(false)
                    }

                    var data = await axios.post(`${URL}/todo/deletetodo`, { title: taskname, userid: localuser._id });

                    if (data.data) {
                        setSpeaking(true)
                        await speakText(`your task ${taskname} is deleted`);
                        setSpeaking(false)
                    } else {
                        setSpeaking(true)
                        await speakText(`your task is not delted`);
                        setSpeaking(false)
                    }
                    break;
                case "get_todolsit":
                    setSpeaking(true)
                    await speakText("Which task you find in your list");
                    setSpeaking(false)

                    setMicListen(true)
                    let nam = await takeInput();
                    setMicListen(false)
                    i = 0;
                    while (!nam && i < 5) {
                        setSpeaking(true)
                        await speakText("Sorry task not found try again");
                        setSpeaking(false)
                        i++
                        setMicListen(true)
                        nam = await takeInput();
                        setMicListen(false)
                    }
                    if (i == 5) {
                        setSpeaking(true)
                        return speakText("Sorry input not found thank for using");
                        setSpeaking(false)
                    }

                    var data = await axios.post(`${URL}/todo/utodo`, { title: nam, userid: localuser._id });

                    if (data.data) {
                        setSpeaking(true)
                        await speakText(`your task ${nam} `);
                        setSpeaking(false)
                    } else {
                        setSpeaking(true)
                        await speakText(`your task is not find`);
                        setSpeaking(false)
                    }
                    break
                case "getAll_todolsit":
                    setSpeaking(true)
                    await speakText("Wait your to do list fetch plz wait");
                    setSpeaking(false)

                    var data = await axios.post(`${URL}/todo/gettodo`, { userid: localuser._id });
                    console.log("TodoDAta", data.data.data)
                    // setTodo(data.data.data)
                    if (data.data) {
                        setSpeaking(true)
                        await speakText(`your todos is find`);
                        setSpeaking(false)
                        let i = 0;
                        while (i < data.data.data.length) {

                            console.log(data.data.data[i].title)
                            setTodo(prevTodo => [...prevTodo, data.data.data[i].title]);
                            setSpeaking(true)
                            await speakText(`your ${i + 1} todo task is ${data.data.data[i].title}`);
                            setSpeaking(false)
                            i++;
                        }
                    } else {
                        setSpeaking(true)
                        await speakText(`your task is not find`);
                        setSpeaking(false)
                    }
                    break;
                default:
                    setSpeaking(true)
                    await speakText("Sorry, I don't know much more about that, but with time I am updating myself");
                    setSpeaking(false)
                    break;
            }

            return setListen(true);

        } catch (err) {
            console.error("Error:", err);
            setSpeaking(true)
            await speakText("Somting Wrong with me try again");
            setSpeaking(false)
            return setListen(true);
        }
    }

    return (
        <>

            {todo?.length > 0 ? (
                <div className=" bg-gray-200 p-4 m-4 rounded">
                    <h3 className="text-center font-bold text-2xl">Your Todos Task</h3>
                    <ul className="list-disc pl-4">
                        {todo.map((todos, index) => (
                            <li key={index} className="mb-2">{todos.title}</li>
                        ))}
                    </ul>
                </div>

            ) : null}
        </>
    )
}

export default Todo;


