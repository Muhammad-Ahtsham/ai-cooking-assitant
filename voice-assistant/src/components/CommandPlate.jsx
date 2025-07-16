import { Bot, Mic2 } from "lucide-react";
import React, { useState } from "react";

const CommandPlate = () => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex  items-center gap-2 p-4 bg-white rounded-xl shadow-xl">
      <div>
        <p className="font-medium mb-2 flex items-center">
          <Bot className="w-4 h-4 mr-1" />
          Voice Commands:
        </p>
        <ul className="text-xs space-y-1 text-gray-700">
          <li>• "Next step" / "Previous step"</li>
          <li>• "Repeat" / "Read again"</li>
        </ul>
      </div>
    </div>
  );
};

export default CommandPlate;
