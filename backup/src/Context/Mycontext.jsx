import React, { useState, useRef } from "react";
const MyContext = React.createContext();


function MyProvider(props) {
  const hasMountedmain = useRef(false);
  const [listen, setListen] = useState(false);
  const [load, setLoad] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [micListen, setMicListen] = useState(false);
  const [showScreen, setShowScreen] = useState(null);
  const [userInput, setUserInput] = useState("");



  return (
    <MyContext.Provider value={{
      showScreen,
      setShowScreen,
      listen,
      setListen,
      load,
      setLoad,
      hasMountedmain,
      userInput,
      setUserInput,
      speaking,
      setSpeaking,
      micListen,
      setMicListen
    }}>
      {props.children}
    </MyContext.Provider>
  );
}
export { MyContext, MyProvider };
