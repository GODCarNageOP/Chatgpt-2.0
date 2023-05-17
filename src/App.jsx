// IMPORT //
import { useMutation } from 'react-query';
import { useState } from "react";
import ChatBody from "./components/ChatBody";
import ChatInput from "./components/ChatInput";
import { fetchResponse } from './api'; 

function App() {

// CONST //
const [chat, setChat] = useState([])

const mutation = useMutation({
  mutationFn: ()=> {
    return fetchResponse(chat);
  },
  onSuccess: (data)=> setChat((prev)=> [...prev, {senser: 'ai', message: data.message.replace(/^\n\n/, "")}])
});

const sendMessage = async (message)=> {
await Promise.resolve(setChat((prev)=>[...prev, message]))
mutation.mutate();
};

//const btn = document.querySelector('.talk');
//const root = document.querySelector('.content');

function speak(sentence) {
  const text_speak = new SpeechSynthesisUtterance(sentence);

  text_speak.rate = 1;
  text_speak.pitch = 1;
  text_speak.voice = window.speechSynthesis.getVoices()[0]; 
  window.speechSynthesis.speak(text_speak);
};

function wishMe() {
  var day = new Date();
  var hour = day.getHours();

  if(hour >= 0 && hour <= 12) {
    speak("Good Morning Boss")
  }

  else if(hour == 12) {
    speak("Good Noon Boss")
  }

  else if(hour > 12 && hour <= 17) {
    speak("Good Afternoon Boss")
  }

  else {
    speak("Good Evening Boss")
  }
};

function lecture() {
  var day = new Date();
  var hour = day.getHours();

  if (hour == 9) {
    window.open("https://teams.microsoft.com/l/meetup-join/19:meeting_YWVlMzdkYWUtZGM4MC00N2I5LWI0Y2MtZWNiMWMyMjM0YmJi@thread.v2/0?context=%7B%22Tid%22:%225519d103-66f6-4b0d-979f-35c233b454ed%22,%22Oid%22:%22e3d7bb46-6737-401b-9a95-bee48428f356%22%7D")
  }

  else {
    
  }
};

window.addEventListener('load', ()=> {
  speak("Activating Virtual Assistant");
  speak("Going Online");
  wishMe();
});

  return (
    <div className="gradient h-screen py-6 relative sm:px-16 px-12 text-white overflow-hidden flex flex-col justify-between align-middle">

      {/* GRADIENTS 
      <div className="gradient-01 z-0 absolute"></div>
      <div className="gradient-02 z-0 absolute"></div>

      {/* HEADER */}
      <div className="uppercase font-bold text-2xl text-center mb-3">
        CHATGPT
      </div>

      {/* BODY */}
      <div className="h-[90%] overflow-auto w-full max-w-4xl min-w-[20rem] py-8 px-4 self-center 
      scrollbar-thumb-slate-400 scrollbar-thin scrollbar-track-grey-transparent scrollbar-thumb-rounded-md">
        <ChatBody chat={chat}/>
      </div>

       {/* INPUT */}
      <div className="w-full max-w-4xl min-w-[20rem] self-center">
        <ChatInput sendMessage={sendMessage} loading={mutation.isLoading}/>
      </div>
    </div>
  );
}

export default App;