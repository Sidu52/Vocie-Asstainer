import React from 'react'
import './MainUI.css';

export default function MainUI() {
    return (
        <div className='w-full h-screen bg-black flex items-center justify-center '>
            <div className="m-carl-notification">
                <div className="m-cue">
                    <div className="a-cue-voice a-cue-voice2 w-40 h-40 absolute">
                        <div className="a-cue-voice-el w-40 h-40 absolute rounded-full opacity-20"></div>
                        <div className="a-cue-voice-el w-40 h-40 absolute rounded-full opacity-20"></div>
                        <div className="a-cue-voice-el w-40 h-40 absolute rounded-full opacity-20"></div>
                        <div className="a-cue-voice-el w-40 h-40 absolute rounded-full opacity-20"></div>
                        <div className="a-cue-voice-el w-40 h-40 absolute rounded-full opacity-20"></div>
                    </div>
                    <div className="a-cue-icon"></div>
                </div>
            </div>
        </div>
    )
}
