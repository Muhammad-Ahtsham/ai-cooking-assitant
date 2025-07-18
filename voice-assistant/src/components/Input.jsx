import { Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useContentGeneratorMutation,
  useCreateMessageMutation,
  useGetMessageQuery,
} from "../../reduxApi/message";
import { useVoiceRecognition } from "../hooks/VoiceRecognizer";

export const Input = () => {
  const { results, isFinal, error, isListening, start, stop } =
    useVoiceRecognition();

  const [userPrompt, setUserPrompt] = useState("");
  const [isSending, setIsSending] = useState(false);
  const navigate = useNavigate();

  const [createMessage] = useCreateMessageMutation();
  const { data: messagesData } = useGetMessageQuery();
  const [generateContent, { isLoading }] = useContentGeneratorMutation();

  const { historyId } = useParams();

  const handleSend = async (prompt) => {
    if (!prompt.trim()) return;
    setIsSending(true);

    try {
      const response = await generateContent({
        content: prompt,
        data: messagesData?.messages ? data.messages : [],
      }).unwrap();
      const messageCreated = await createMessage({
        userContent: prompt,
        responseContent: response.message,
        historyId,
      }).unwrap();

      if (!historyId) {
        navigate(`history/${messageCreated.data.historyId}`);
      }
      setUserPrompt("");
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    if (isFinal) {
      const prompt = results.trim();
      handleSend(prompt);
    }
  }, [isFinal, results]);

  if (error) {
    console.error("Voice recognition error:", error);
  }

  return (
    <div className="h-[10rem] w-full flex flex-col justify-center items-center px-4 gap-5">
       {isLoading && (
        <div className="text-sm text-gray-500 flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-400 mr-2"></div>
          Generating response...
        </div>
      )}
      <div className="input-field min-w-[20rem] flex justify-center gap-3">
        {!isListening ? (
          <input
            type="text"
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            className="bg-gray-100 min-w-84 h-10 rounded-full px-4 text-base text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ask me for any recipe..."
            disabled={isSending}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isSending) {
                e.preventDefault();
                handleSend(userPrompt);
              }
            }}
          />
        ) : (
          <div className="bg-gray-100 min-w-84 h-10 rounded-full px-4 flex items-center text-base text-gray-800">
            Voice assistant is listening…
          </div>
        )}
        <button
          className="bg-gradient-to-br from-emerald-500 to-teal-500 w-12 h-12 rounded-full text-white flex justify-center items-center disabled:opacity-50"
          disabled={isListening}
        >
          <Send size={22} />
        </button>
      </div>

      <div className="voice-assistant-features flex flex-col items-center">
        <div className="voice-assistant min-w-45 h-10 flex justify-center items-center relative">
          <button
            onClick={isListening ? stop : start}
            disabled={isSending}
            className="bg-gradient-to-r from-orange-500 to-red-500 w-12 h-12 rounded-full text-white flex justify-center items-center disabled:opacity-50"
          >
            {isListening ? (
              <i className="fas fa-stop"></i>
            ) : (
              <i className="fas fa-microphone-alt"></i>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
