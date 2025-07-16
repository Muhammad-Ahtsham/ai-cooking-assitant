import { useState, useEffect, useRef, useCallback } from "react";

export function useSpeechSynthesis() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synthRef = useRef(null);
  const utteranceRef = useRef(null);

  useEffect(() => {
    synthRef.current =
      window.speechSynthesis || window.webkitSpeechSynthesis || null;

    if (!synthRef.current) {
      console.warn("Speech Synthesis not supported in this browser");
      return;
    }

    const handleVoicesChanged = () => {
      console.log("Available voices:", synthRef.current.getVoices());
    };
    synthRef.current.onvoiceschanged = handleVoicesChanged;

    return () => {
    if (synthRef.current) synthRef.current.cancel();
    };
  }, []);

  const speak = useCallback(
    (text) => {
      if (!synthRef.current) return;
      if (isSpeaking) {
        synthRef.current.cancel();
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utteranceRef.current = utterance;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onpause = () => setIsSpeaking(false);
      utterance.onresume = () => setIsSpeaking(true);

      synthRef.current.speak(utterance);
    },
    [isSpeaking]
  );

  const pause = useCallback(() => {
    if (
      synthRef.current &&
      synthRef.current.speaking &&
      !synthRef.current.paused
    ) {
      synthRef.current.pause();
    }
  }, []);

  const resume = useCallback(() => {
    if (synthRef.current && synthRef.current.paused) {
      synthRef.current.resume();
    }
  }, []);

  const cancel = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
  }

  ,[]);

  return {
    isSpeaking,
    speak,
    pause,
    resume,
    cancel,
  };
}
