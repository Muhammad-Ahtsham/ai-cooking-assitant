import { Mic, MicOff } from "lucide-react";

const VoiceInstructor = ({
  onVoiceRecognition,
  onVoiceRecognitionStop,
  isListening,
}) => {
  const toggleMic = () => {
    if (isListening) {
      onVoiceRecognitionStop();
    } else {
      onVoiceRecognition();
    }
  };

  return (
    <button
      onClick={toggleMic}
      aria-label={
        isListening ? "Stop voice recognition" : "Start voice recognition"
      }
      className={`relative w-20 h-20 flex items-center justify-center rounded-full transition-all duration-300 focus:outline-none
        ${
          isListening
            ? "border-4 border-red-500 bg-gradient-to-r from-purple-600 to-indigo-600 animate-pulse"
            : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
        }`}
    >
      <span className="text-3xl text-white">
        {isListening ? <MicOff /> : <Mic />}
      </span>
      {isListening && (
        <span className="absolute -z-10 w-24 h-24 rounded-full bg-red-300 opacity-30 animate-ping"></span>
      )}
    </button>
  );
};
export default VoiceInstructor;
