// import React, { useState, useEffect } from 'react'
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Card from './component/card';
// import './component/card.scss';
// import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
// import { BiLogoLinkedin, BiLogoYoutube, BiLogoInstagram, BiLogoWhatsapp, } from 'react-icons/bi';
// import './Documentation.scss';
// import leftbackgroundimg from '../assets/image/leftgradin.webp';
// import rightbackgroundimg from '../assets/image/rightgradin.webp';
// import VsCodeimg from '../assets/image/vsCode.webp';
// import { GiMusicSpell } from 'react-icons/gi';
// import { LuListTodo } from 'react-icons/lu';
// import { MdOutlineRoundaboutRight } from 'react-icons/md';
// import { TbBrandFunimation, TbDeviceGamePad, TbLanguage } from 'react-icons/tb';
// import { CiTimer } from 'react-icons/ci';

// export default function Documentaion() {
//     const navigate = useNavigate();
//     const [scrollY, setScrollY] = useState(0);
//     const [category, setCategory] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log("Enter")
//         try {
//             const { data } = await axios.post(`${URL}/findfunction`, { category });
//             if (data.data) {
//                 setCategory(data.data);
//             }
//         } catch (err) {
//             console.log(err);
//         }
//     }

//     // Update the scrollY value as the user scrolls
//     useEffect(() => {
//         const handleScroll = () => {
//             if (window.scrollY < 650) {
//                 setScrollY(window.scrollY);
//             }
//         };

//         window.addEventListener('scroll', handleScroll);

//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, []);
//     return (
//         <div className='flex flex-col items-center justify-center gap-1.5 '>
//             <div
//                 className='transition-all duration-500 ease-linear transform absolute top-0 left-0 w-full flex items-center -z-10 overflow-hidden'
//                 style={{ transform: `translateY(${scrollY}px)`, zIndex: scrollY >= 450 ? "1" : "auto" }}
//             >
//                 <img src={leftbackgroundimg} alt="" className='absolute top-0 left-0 w-11/12' style={{ zIndex: -1, width: "1023px", height: "1052px" }} />
//                 <img src={leftbackgroundimg} alt="" className='absolute top-40 left-0 w-11/12' style={{ zIndex: -1, width: "1023px", height: "1052px" }} />
//                 <img src={leftbackgroundimg} alt="" className='absolute top-80 left-0 w-11/12' style={{ zIndex: -1, width: "1023px", height: "1052px" }} />
//                 <img src={rightbackgroundimg} alt="" className='absolute top-0 right-0 w-11/12' style={{ zIndex: -1, width: "1023px", height: "1052px" }} />
//                 <img src={rightbackgroundimg} alt="" className='absolute top-40 right-0 w-11/12 transform rotate-6' style={{ zIndex: -1, width: "1023px", height: "1052px" }} />
//                 <img src={rightbackgroundimg} alt="" className='absolute top-80 right-0 w-11/12 transform rotate-6' style={{ zIndex: -1, width: "1023px", height: "1052px" }} />
//             </div>
//             <div className='text-center py-16 text-white border-t-8 border-teal-400 w-full'>

//                 <div className=' mt-24'>
//                     <div className='flex flex-row items-center justify-center gap-1.5 text-4xl mb-5 '>
//                         <HiOutlineClipboardDocumentList />
//                         <h3 className='font-bold text-6xl'><span className='text-teal-400'>Alstom</span>Doc</h3>
//                     </div>
//                     <div className='leading-normal text-sm font-semibold mb-5'>
//                         <p className='font-bold text-lg text-zinc-400'>Full Documation for guid how to use Application</p>
//                         <p className='font-bold text-lg text-zinc-400'>Full Documation for Application</p>
//                     </div>
//                     <div className='mb-5'>
//                         <input className='w-96 text-sm rounded-xl p-3 text-black outline-none border-none' type="search" placeholder='Enter Command and find command cate' />
//                     </div>
//                     <div className='flex flex-row items-center justify-center mb-5'>
//                         <button onClick={() => navigate("/")} className="btn_hovering w-36 h-12 bg-gradient-to-r from-teal-400 to-indigo-300 rounded-md border-0 outline-none cursor-pointer relative overflow-hidden shadow-lg">
//                             <span className="first_text text-sm uppercase tracking-tighter transition-top duration-500 absolute w-full top-6 left-0 transform -translate-y-1/2">Go to</span>
//                             <span className="secound_text text-sm uppercase tracking-tighter transition-top duration-500 absolute top-full  ">Assistant!</span>
//                         </button>
//                     </div>
//                     <div className="contact_social_icon">
//                         <div className="social_icon absolute top-auto left-1/2 transform -translate-x-1/2">
//                             <a href="https://www.linkedin.com/in/gaurav-khare-gravit" className="socialContainer linkedin">
//                                 <BiLogoLinkedin className='text-white' />
//                             </a>
//                             <a href="#" className="socialContainer youtube">
//                                 <BiLogoYoutube className='text-white' />
//                             </a>
//                             <a href="#" className="socialContainer instagram">
//                                 <BiLogoInstagram className='text-white' />
//                             </a>
//                             <a href="#" className="socialContainer whatsapp">
//                                 <BiLogoWhatsapp className='text-white' />
//                             </a>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className=' w-full flex items-center justify-center relative overflow-hidden'>
//                 <div className='absolute top-11 w-2/4  flex flex-col items-center justify-center'>
//                     <form onSubmit={(e) => handleSubmit(e)} className='w-full'>
//                         <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className=' text-white w-full p-5 border-4 rounded-md border-gray-500 bg-gray-800 bg-opacity-60' placeholder='Ask To Jarvis Your Command Category' />
//                     </form>
//                     <div className='bg-white w-1/2 h-0 transition-all duration-500 ease-linear text-center text-xl font-bold' style={{ height: category != "" ? "auto" : "" }}>Input</div>

//                 </div>
//                 <img src={leftbackgroundimg} alt="" className='absolute bottom-0 left-0 w-11/12' style={{ zIndex: -1, width: "1023px", height: "1052px" }} />
//                 <img className='w-4/5' src={VsCodeimg} alt="" />
//                 <img src={rightbackgroundimg} alt="" className='absolute bottom-0 right-0 w-11/12' style={{ zIndex: -1, width: "1023px", height: "1052px" }} />
//             </div>
//             <div className='text-white flex flex-col items-center justify-center gap-1.5  '>
//                 <h3 className='font-bold text-xl text-zinc-500 leading-7'>Trusted by tens of thousands of engineers, including ones at</h3>
//                 <ul className='text-zinc-400 font-bold text-4xl w-3/4 flex items-center justify-center gap-10 mt-16 flex-wrap'>
//                     <li className='flex items-center gap-3'><GiMusicSpell />Music Controll</li>
//                     <li className='flex items-center gap-3'><LuListTodo />Todo CRUD</li>
//                     <li className='flex items-center gap-3'>Greeting</li>
//                     <li className='flex items-center gap-3'><MdOutlineRoundaboutRight />AboutJarvis</li>
//                     <li className='flex items-center gap-3'>SidhuAlston</li>
//                     <li className='flex items-center gap-3'><TbBrandFunimation />Jokes</li>
//                     <li className='flex items-center gap-3'><TbDeviceGamePad />Quize Game</li>
//                     <li className='flex items-center gap-3'><TbLanguage />Translate</li>
//                     <li className='flex items-center gap-3'><CiTimer />Date/Time</li>
//                     <li className='flex items-center gap-3'><CiTimer />Alarm</li>
//                 </ul>
//             </div>


//             <div className='text-center w-full text-white'>
//                 <div>
//                     <h3 className='text-4xl mt-20 mb-5'>Getting Started is eassy</h3>
//                     <p>Welcome to AlstonDoc. This landing page is an explain how to intrect with voice assistant with full explaintion documentation.</p>
//                 </div>
//                 <div className='flex items-center justify-center mt-16'>
//                     <div className=" card_cmd_container grid grid-cols-3 grid-flow-col gap-4 mb-20">
//                         <div className=" flex flex-col items-center justify-center rounded-xl md:rounded-3xl relative bg-[#101624] pb-10">
//                             <div className="p-5 md:p-10  flex flex-col">
//                                 <h3 class="text-white text-xl md:text-3xl font-medium mb-4">Talk with jarvis</h3>
//                                 <p class="text-[#FFFFFF]/[0.64] text-base md:text-lg font-medium ">Just say hello jarvis and gave cmd</p>

//                                 {/* <div class="h-40 md:h-72 relative">
//                                     <div class="absolute left-10 top-4 right-10">
//                                         <img alt="Feature 1" src='https://cursor.sh/_next/image?url=%2Flanding%2Ffeatures%2Frepo-wide-understanding.png&w=640&q=75' />
//                                     </div>
//                                 </div> */}

//                             </div>
//                             <div className="p-5 md:p-10 flex flex-col">
//                                 <h3 class="text-white text-xl md:text-3xl font-medium mb-4">Ask About Country State City</h3>
//                                 <p class="text-[#FFFFFF]/[0.64] text-base md:text-lg font-medium ">Just give a command and ask about your country.</p>

//                                 {/* <div class="h-40 md:h-72 relative">
//                                     <div class="absolute left-10 top-4 right-10">
//                                         <img alt="Feature 1" src='https://cursor.sh/_next/image?url=%2Flanding%2Ffeatures%2Frepo-wide-understanding.png&w=640&q=75' />
//                                     </div>
//                                 </div> */}

//                             </div>
//                             <div className="p-5 md:p-10 flex flex-col">
//                                 <h3 class="text-white text-xl md:text-3xl font-medium mb-4">Translate word and sentence</h3>
//                                 <p class="text-[#FFFFFF]/[0.64] text-base md:text-lg font-medium ">Translate word and sentence in any language english to other language</p>

//                                 {/* <div class="h-40 md:h-72 relative">
//                                     <div class="absolute left-10 top-4 right-10">
//                                         <img alt="Feature 1" src='https://cursor.sh/_next/image?url=%2Flanding%2Ffeatures%2Frepo-wide-understanding.png&w=640&q=75' />
//                                     </div>
//                                 </div> */}

//                             </div>
//                             <div className="p-5 md:p-10  flex flex-col">
//                                 <h3 class="text-white text-xl md:text-3xl font-medium mb-4">Ask about Country Population & Capital</h3>
//                                 <p class="text-[#FFFFFF]/[0.64] text-base md:text-lg font-medium ">Say about any Country Population and Capital</p>

//                                 {/* <div class="h-40 md:h-72 relative">
//                                     <div class="absolute left-10 top-4 right-10">
//                                         <img alt="Feature 1" src='https://cursor.sh/_next/image?url=%2Flanding%2Ffeatures%2Frepo-wide-understanding.png&w=640&q=75' />
//                                     </div>
//                                 </div> */}

//                             </div>
//                         </div>

//                         <div className=" flex flex-col items-center justify-center rounded-xl md:rounded-3xl relative bg-[#101624] mt-60">
//                             <div className="p-5 md:p-10 flex flex-col">
//                                 <h3 class="text-white text-xl md:text-3xl font-medium mb-4">Ask about Weather & Forcast</h3>
//                                 <p class="text-[#FFFFFF]/[0.64] text-base md:text-lg font-medium ">Just Say tell me Gwalior Weather & Forcast</p>

//                                 {/* <div class="h-40 md:h-72 relative">
//                                     <div class="absolute left-10 top-4 right-10">
//                                         <img alt="Feature 1" src='https://cursor.sh/_next/image?url=%2Flanding%2Ffeatures%2Frepo-wide-understanding.png&w=640&q=75' />
//                                     </div>
//                                 </div> */}

//                             </div>
//                             <div className="rounded-xl md:rounded-3xl relative bg-[#101624]">
//                                 <div className="p-5 md:p-10 flex flex-col">
//                                     <h3 class="text-white text-xl md:text-3xl font-medium mb-4">Set a Alarm</h3>
//                                     <p class="text-[#FFFFFF]/[0.64] text-base md:text-lg font-medium ">Just set a alarm</p>

//                                     {/* <div class="h-40 md:h-72 relative">
//                                     <div class="absolute left-10 top-4 right-10">
//                                         <img alt="Feature 1" src='https://cursor.sh/_next/image?url=%2Flanding%2Ffeatures%2Frepo-wide-understanding.png&w=640&q=75' />
//                                     </div>
//                                 </div> */}
//                                 </div>
//                             </div>
//                             <div className="p-5 md:p-10 flex flex-col">
//                                 <h3 class="text-white text-xl md:text-3xl font-medium mb-4">Create ToDo List etc</h3>
//                                 <p class="text-[#FFFFFF]/[0.64] text-base md:text-lg font-medium ">Gave Cmd for Create ToDo List with CRUD</p>

//                                 {/* <div class="h-40 md:h-72 relative">
//                                     <div class="absolute left-10 top-4 right-10">
//                                         <img alt="Feature 1" src='https://cursor.sh/_next/image?url=%2Flanding%2Ffeatures%2Frepo-wide-understanding.png&w=640&q=75' />
//                                     </div>
//                                 </div> */}

//                             </div>
//                             <div className="p-5 md:p-10 flex flex-col">
//                                 <h3 class="text-white text-xl md:text-3xl font-medium mb-4">Joke Cmd</h3>
//                                 <p class="text-[#FFFFFF]/[0.64] text-base md:text-lg font-medium ">Just Say Tell me a joke</p>

//                                 {/* <div class="h-40 md:h-72 relative">
//                                     <div class="absolute left-10 top-4 right-10">
//                                         <img alt="Feature 1" src='https://cursor.sh/_next/image?url=%2Flanding%2Ffeatures%2Frepo-wide-understanding.png&w=640&q=75' />
//                                     </div>
//                                 </div> */}

//                             </div>
//                         </div>

//                         <div className=" flex flex-col items-center justify-center rounded-xl md:rounded-3xl relative bg-[#101624] pb-10">
//                             <div className="p-5 md:p-10  flex flex-col">
//                                 <h3 class="text-white text-xl md:text-3xl font-medium mb-4">Play Music Audio & Video</h3>
//                                 <p class="text-[#FFFFFF]/[0.64] text-base md:text-lg font-medium ">Just Say Play Honey Sing Song & Bollywood Music Play on Youtube</p>

//                                 {/* <div class="h-40 md:h-72 relative">
//                                     <div class="absolute left-10 top-4 right-10">
//                                         <img alt="Feature 1" src='https://cursor.sh/_next/image?url=%2Flanding%2Ffeatures%2Frepo-wide-understanding.png&w=640&q=75' />
//                                     </div>
//                                 </div> */}

//                             </div>
//                             <div className="p-5 md:p-10  flex flex-col">
//                                 <h3 class="text-white text-xl md:text-3xl font-medium mb-4">Play Quize Game</h3>
//                                 <p class="text-[#FFFFFF]/[0.64] text-base md:text-lg font-medium ">Just Say I want to Play Game</p>

//                                 {/* <div class="h-40 md:h-72 relative">
//                                     <div class="absolute left-10 top-4 right-10">
//                                         <img alt="Feature 1" src='https://cursor.sh/_next/image?url=%2Flanding%2Ffeatures%2Frepo-wide-understanding.png&w=640&q=75' />
//                                     </div>
//                                 </div> */}

//                             </div>
//                             <div className="p-5 md:p-10  flex flex-col">
//                                 <h3 class="text-white text-xl md:text-3xl font-medium mb-4">Ask About Time</h3>
//                                 <p class="text-[#FFFFFF]/[0.64] text-base md:text-lg font-medium ">Tell me a current time</p>

//                                 {/* <div class="h-40 md:h-72 relative">
//                                     <div class="absolute left-10 top-4 right-10">
//                                         <img alt="Feature 1" src='https://cursor.sh/_next/image?url=%2Flanding%2Ffeatures%2Frepo-wide-understanding.png&w=640&q=75' />
//                                     </div>
//                                 </div> */}

//                             </div>
//                             <div className="p-5 md:p-10  flex flex-col">
//                                 <h3 class="text-white text-xl md:text-3xl font-medium mb-4">Ask About News</h3>
//                                 <p class="text-[#FFFFFF]/[0.64] text-base md:text-lg font-medium ">Comming Soon...</p>
//                                 {/* 
//                                 <div class="h-40 md:h-72 relative">
//                                     <div class="absolute left-10 top-4 right-10">
//                                         <img alt="Feature 1" src='https://cursor.sh/_next/image?url=%2Flanding%2Ffeatures%2Frepo-wide-understanding.png&w=640&q=75' />
//                                     </div>
//                                 </div> */}

//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
