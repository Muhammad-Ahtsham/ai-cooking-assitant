import { Lightbulb, Volume2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CommandPlate from "../components/CommandPlate";
import IngredientsList from "../components/IngredientsList";
import Navbar from "../components/Navbar";
import VoiceInstructor from "../components/VoiceInstructor";
import { useSpeechSynthesis } from "../hooks/speachSynth";
import { useVoiceRecognition } from "../hooks/VoiceRecognizer";

const CookingDetails = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [listOpen, setListOpen] = useState(false);
  const [text, setText] = useState("");

  const recipe = useSelector((state) => state.recipe.recipes);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSpeaking, speak, pause } = useSpeechSynthesis(text);
  const { results, isFinal, isListening, start, stop } = useVoiceRecognition();

  const stepUp = () => {
    const next = Math.min(currentStep + 1, recipe.instructions.length - 1);
    setCurrentStep(next);
    const instruction = recipe.instructions[next];
    setText(instruction);
    speak(instruction);
  };

  const stepDown = () => {
    const prev = Math.max(currentStep - 1, 0);
    setCurrentStep(prev);
    const instruction = recipe.instructions[prev];
    setText(instruction);
    speak(instruction);
  };

  useEffect(() => {
    if (!recipe) navigate("/library");
    if (isFinal) {
      console.log(results);
      const command = results;
      console.log(command);
      if (command.includes("next step")) {
        stepUp();
      } else if (command.includes("previous step")) {
        stepDown();
      } else if (command.includes("repeat" || "repeat again")) {
        const instruction = recipe.instructions[currentStep];
        speak(instruction);
      }
    }
  }, [recipe, navigate, results, isFinal]);

  if (!recipe) return null;

  const handleSpeak = () => {
    const instruction = recipe.instructions[currentStep];
    if (isSpeaking) pause();
    else speak(instruction);
  };

  return (
    <div className="flex flex-col justify-center gap-1 relative">
      <Navbar />
      <div className="min-w-screen mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6 text-white">
            <div className="flex justify-between items-center mb-4">
              <div className="font-bold text-2xl">
                {`Step ${currentStep + 1} of ${recipe.instructions.length}`}
              </div>
              <div
                className="bg-white/20 p-2 rounded-full cursor-pointer"
                onClick={handleSpeak}
              >
                <Volume2Icon size={22} />
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex items-center space-x-1 bg-white/20 px-3 py-1 rounded-full">
                {recipe.prepTime} prep
              </div>
              <div className="flex items-center space-x-1 bg-white/20 px-3 py-1 rounded-full">
                {recipe.cookTime} cook
              </div>
            </div>
          </div>

          <div className="p-6">
            <p className="text-xl leading-relaxed text-gray-800 mb-6">
              {recipe.instructions[currentStep]}
            </p>
          </div>

          <div className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 font-medium mb-4 ml-3">
            <button
              type="button"
              className="flex gap-1 items-center"
              onClick={() => setListOpen(!listOpen)}
            >
              <Lightbulb />
              <span>Show Tips & Warnings</span>
            </button>
          </div>

          {listOpen && (
            <div className="bg-orange-50 p-6 rounded-2xl">
              <ul className="list-disc list-inside text-gray-800">
                {recipe.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="p-3 flex justify-between gap-3">
            <button
              onClick={stepDown}
              className="bg-gradient-to-r from-orange-500 to-amber-500 p-4 h-10 text-white flex items-center rounded-2xl"
            >
              Previous
            </button>
            <button
              onClick={stepUp}
              className="bg-gradient-to-r from-orange-500 to-amber-500 p-4 h-10 text-white flex items-center rounded-2xl"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <IngredientsList ingredients={recipe.ingredients} />
      <div className="sticky bottom-4 right-0.5">
        <CommandPlate />
      </div>
      <div className="sticky bottom-4 m-4">
        <VoiceInstructor
          onVoiceRecognition={start}
          onVoiceRecognitionStop={stop}
          isListening={isListening}
        />
      </div>
    </div>
  );
};

export default CookingDetails;
