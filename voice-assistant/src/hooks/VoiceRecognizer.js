import { useState, useEffect, useRef, use } from "react";

export function useVoiceRecognition(options = {}) {
  const [results, setResults] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isFinal, setIsfinal] = useState(false);
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);
  const autoRestartRef = useRef(true);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = options.continuous || true;
    recognition.lang = "en-US";
    options.lang && (recognition.lang = options.lang);
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      const last = event.results.length - 1;
      const transcript = event.results[last][0].transcript;
      const checkFinal = event.results[last].isFinal;
      setIsfinal(checkFinal);
      setResults(transcript);
    };

    recognition.onerror = (event) => {
      let errorMessage;
      switch (event.error) {
        case "aborted":
          errorMessage = "Speech recognition was aborted.";
          break;
        case "no-speech":
          errorMessage = "No speech was detected. Please try again.";
          break;
        case "audio-capture":
          errorMessage = "Audio capture failed. Please check your microphone.";
          break;
        case "not-allowed":
          errorMessage = "Microphone access was denied.";
          break;
        case "network":
          errorMessage = "Network error occurred during speech recognition.";
          break;
        default:
          errorMessage = `Speech recognition error: ${event.error}`;
      }
      setError(errorMessage);
      setIsListening(false);
      autoRestartRef.current = false;
    };

    recognition.onend = () => {
      if (autoRestartRef.current) {
        recognition.start();
      }
    };

    recognitionRef.current = recognition;

    return () => {
      if (isListening) {
        recognition.stop();
      }
    };
  }, [options.continuous, options.lang, isListening]);

  const start = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
      setIsListening(true);
      setError(null);
    }
  };

  const stop = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      autoRestartRef.current = false;
      setIsListening(false);
    }
  };

  return {
    results,
    isFinal,
    isListening,
    error,
    start,
    stop,
  };
}
