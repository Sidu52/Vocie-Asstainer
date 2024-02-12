import React, { useState } from 'react'
import './PopupTour.css'
export default function PopupTour({ handleClosetour }) {
    const [tourWindow, setTourWindow] = useState([true, false, false])

    return (
        <div className='w-full h-full flex items-center justify-center absolute top-0 left-0'>
            {tourWindow[0] ?
                <div className='bg-white w-full h-full z-10 flex items-center justify-center flex-col gap-5 border border-black-200 rounded-3xl px-2 absolute top-0 left-0'>
                    <span className='max-sm:text-sm'>This is a Ai Voice Assistant Powered By <strong>Siddhant Sharma</strong></span>
                    <div className='flex flex-col items-center justify-center gap-2'>
                        <div className='flex items-center justify-center gap-2'>
                            <button onClick={() => setTourWindow(prevState => [
                                prevState[0] = false,
                                prevState[1] = true,
                                ...prevState.slice(3)
                            ])} className='bg-pink-200 px-3 py-2 rounded-md font-semibold'>Next</button>

                        </div>
                        <button onClick={() => handleClosetour(false)} className='bg-pink-200 px-3 py-2 rounded-md font-semibold'>Skip Tour</button>
                    </div>
                </div> :
                //Secound Windnow
                tourWindow[1] ?
                    <div className='bg-white w-full h-full z-10 flex items-center justify-center flex-col gap-5  border border-black-200 rounded-3xl px-2 absolute top-0 left-0'>
                        <ul className='leading-6 list-disc'>
                            <span className='text-xl font-semibold max-sm:text-sm'>Features:</span>
                            <li>Retrieve Country, State, and City Information</li>
                            <li>Get City Weather Updates</li>
                            <li>General Knowledge Quiz and Number Guessing</li>
                            <li>Play Snake and Puzzel Game</li>
                            <li>Listen to Music: Video or Audio, and Control with voice command</li>
                            <li>Retrieve Date, Time, Weekday, Month, Year</li>
                            <li>Try Your Luck: Toss a Coin or Roll a Dice</li>
                            <li>Translate Sentences to Any Language</li>
                            <li>Calculate Love Compatibility with the Love Calculator</li>
                            <li>Explore Solar System Data</li>
                            <li>Listen to Stories</li>
                            <li>Enjoy Jokes: English and Hindi</li>
                            <li>Set Alarms</li>
                            <li>Create To-Do Lists</li>
                            <li>Set Your Reminders (Coming Soon)</li>
                            <li>And More...</li>
                        </ul>
                        <div className='flex flex-col items-center justify-center gap-2'>
                            <div className='flex items-center justify-center gap-2'>
                                <button onClick={() => setTourWindow(prevState => [
                                    ...prevState.slice(0, 1),
                                    prevState[1] = false,
                                    prevState[2] = true,
                                    ...prevState.slice(3)
                                ])} className='bg-pink-200 px-3 py-2 rounded-md font-semibold'>Next</button>
                                <button onClick={() => setTourWindow(prevState => [
                                    prevState[0] = true,
                                    prevState[1] = false,
                                    ...prevState.slice(3)
                                ])} className='bg-pink-200 px-3 py-2 rounded-md font-semibold'>Back</button>
                            </div>
                            <button onClick={() => handleClosetour(false)} className='bg-pink-200 px-3 py-2 rounded-md font-semibold'>Skip Tour</button>
                        </div>
                    </div> :
                    //Third Windnow
                    tourWindow[2] ?
                        <div className='bg-white w-full h-full z-10 flex items-center justify-center flex-col gap-5  border border-black-200 rounded-3xl px-2 absolute top-0 left-0'>
                            <span className='max-sm:text-sm'>For Using Giving a Starting Command <strong>Hyy Jarvis</strong> OR <strong>Hello Jarvis</strong> after Complete Tour <span>and Ask that you have in Your mind</span></span>

                            <div className='flex flex-col items-center justify-center gap-2'>
                                <div className='flex items-center justify-center gap-2'>
                                    <button onClick={() => handleClosetour(false)} className='bg-pink-200 px-3 py-2 rounded-md font-semibold'>Close</button>
                                    <button onClick={() => setTourWindow(prevState => [
                                        ...prevState.slice(0, 1),
                                        prevState[1] = true,
                                        prevState[2] = false,
                                        ...prevState.slice(3),
                                    ])} className='bg-pink-200 px-3 py-2 rounded-md font-semibold'>Back</button>
                                </div>
                                <button onClick={() => handleClosetour(false)} className=' bg-pink-200 px-3 py-2 rounded-md font-semibold'>Skip Tour</button>
                            </div>
                        </div> : null
            }
        </div >
    )
}
