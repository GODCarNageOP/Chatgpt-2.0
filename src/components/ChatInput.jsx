// IMPORT //
import React, { useEffect, useState } from "react";
import "regenerator-runtime/runtime";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const ChatInput = ({ sendMessage, loading }) => {
  
 // COMMANDS //
 const commands = [

  // CLEAR TEXT MESSAGE //
  {
    command: "clear",
    callback: () => resetTranscript(value),
  },

  // RESET TEXT MESSAGE //
  {
    command: "reset",
    callback: () => resetTranscript(value),
  },

  // OPEN ANY WEBSITE //
  {
    command: "open *",
    callback: (site) => {
      window.open("http://" + site + ".com");
    },
  },

  {
    command: 'wikipedia *',
    callback: (message)=> {
          window.open("https://en.wikipedia.org/wiki/"+ message);
    }
  },

  {
    command: 'join lecture',
    callback: ()=> {
      window.open("https://teams.microsoft.com/l/meetup-join/19:meeting_YWVlMzdkYWUtZGM4MC00N2I5LWI0Y2MtZWNiMWMyMjM0YmJi@thread.v2/0?context=%7B%22Tid%22:%225519d103-66f6-4b0d-979f-35c233b454ed%22,%22Oid%22:%22e3d7bb46-6737-401b-9a95-bee48428f356%22%7D");
    }
  }, 

  {
    command: 'stop',
    callback: ()=> {
      SpeechRecognition.stopListening();
    }
  }
];

// CONST //
  const [value, setValue] = useState("");
  // const { speak } = useSpeechSynthesis();

  const handleSubmit = () => {
    if (value === "") return;
    sendMessage({ sender: "user", message: value });
    setValue("");
    //{speak({text: value})}
  };

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition({ commands });

  useEffect(() => {
    setValue(transcript);
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  };

  setTimeout(function() {
    resetTranscript();
  },2000)

  return (
    <div className="inputBox w-full bg-white bg-opacity-10 max-h-40 rounded-lg px-3 py-3 overflow-auto relative border border-stone-300 focus:bg focus:bg-black focus:transition-colors shadow-md shadow-cyan-400" >

      {/* LOADING SCREEN */}
      {loading ? (
        <img src="./loader.gif" className="w-8 m-auto" />
      ) : (
        <>

        {/* MESSAGE AREA */}
          <textarea
            onKeyDown={(e) => {
              e.keyCode === 13 && e.shiftKey === false && handleSubmit();
            }}
            rows={1}
            className="border-0 bg-transparent outline-none w-11/12 resize-none"
            value={value}
            type="text"
            onChange={(e) => setValue(e.target.value)}
          />

          {/* MIC SPEECH TO TEXT */}
          <img
            onClick={() =>
              SpeechRecognition.startListening({
                continuous: true,
                language: "en-IN",
              })
            }
            src="./mic.png"
            alt="mic-button"
            width={20}
            className="absolute top-4 right-10 hover:cursor-pointer ease-in duration-100 hover:scale-125"
          />

          {/* SUBMIT MESSAGE */}
          <img
            onClick={handleSubmit}
            src="./send.png"
            alt="send-button"
            width={20}
            className="absolute top-4 right-3 hover:cursor-pointer ease-in duration-100 hover:scale-125"
          />
        </>
      )}
    </div>
  );
};

export default ChatInput;