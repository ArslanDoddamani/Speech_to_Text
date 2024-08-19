import React, { useState, useRef, useEffect } from "react";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useClipboard from "react-use-clipboard";

const Home = () => {
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  const [textCopy, setTextCopy] = useState("");
  const [isCopied, setCopied] = useClipboard(textCopy, {
    successDuration: 2000,
  });
  const copyRef = useRef();

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language:"en-IN"});
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  useEffect(() => {
    if (textCopy) {
      setCopied(); 
    }
  }, [textCopy, setCopied]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="w-full h-screen bg-zinc-200 flex flex-col items-center justify-center p-3">
      <h1 className="text-center font-bold text-2xl sm:text-3xl lg:text-4xl">
        Speech to Text Converter
      </h1>
      <p className="text-zinc-600 text-center text-sm mt-2 px-4 sm:text-base lg:text-xl">
        A React hook that converts speech from the microphone to text and makes
        it<br className="hidden sm:block"/> available to your React components.
      </p>
      <div className="w-full h-3/4 sm:w-3/4 lg:w-3/4 xl:w-1/2 lg:h-3/5 xl:h-3/5 bg-zinc-50 rounded-md mt-8 drop-shadow-2xl shadow-black">
        <div
          ref={copyRef}
          className="w-full p-4 h-[88%] text-zinc-500 text-lg overflow-y-auto"
        >
          {transcript || "Start speaking to see the transcript here..."}
        </div>
        <div className="h-fit lg:h-10 xl:h-10 flex items-center lg:justify-between md:justify-around justify-center flex-wrap px-8 gap-5 font-semibold text-zinc-700">
          <button
            onClick={() => {
              setTextCopy(copyRef.current.textContent); 
            }}
            className={`bg-green-500 h-10 w-24 text-center rounded-md hover:bg-green-400 hover:shadow-xl ${transcript ? '' : 'hover:bg-green-500 cursor-not-allowed'}`}
          >
            {isCopied ? "Copied" : "Copy"}
          </button>
          <button
            onClick={startListening}
            className="bg-green-500 h-10 px-5 rounded-md hover:bg-green-400"
          >
            Start Listening
          </button>
          <button
            onClick={stopListening}
            className={`bg-green-500 h-10 px-5 rounded-md hover:bg-green-400 ${transcript ? '' : 'hover:bg-green-500 cursor-not-allowed'}`}
          >
            Stop Listening
          </button>
          <button
            onClick={resetTranscript}
            className={` h-10 px-5 rounded-md hover:bg-red-300 ${transcript ? 'bg-red-500' : 'bg-red-300 cursor-not-allowed'}`}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
