import { Check, ShoppingCart } from "lucide-react";
import { useState } from "react";

const IngredientsList = ({ ingredients = [], title = "Ingredients" }) => {
  const [checkedItems, setCheckedItems] = useState(() =>
    ingredients.map(() => false)
  );

  const checkedCount = checkedItems.filter(Boolean).length;
  const progressPercentage =
    ingredients.length > 0 ? (checkedCount / ingredients.length) * 100 : 0;

  const handleToggle = (index) => {
    setCheckedItems((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-[44rem] ml-[2rem]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center">
          <ShoppingCart className="w-6 h-6 mr-2 text-orange-600" />
          {title}
        </h3>
        <div className="text-sm text-gray-500">
          {checkedCount} of {ingredients.length} ready
        </div>
      </div>

      {/* Progress indicator */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Preparation Progress</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-orange-500 to-amber-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-3">
        {ingredients.map((ingredient, index) => {
          const isChecked = checkedItems[index];
          return (
            <div
              key={index}
              onClick={() => handleToggle(index)}
              className={`flex items-center p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                isChecked
                  ? "bg-green-50 border-2 border-green-200"
                  : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
              }`}
            >
              <div
                className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  isChecked
                    ? "bg-green-500 border-green-500"
                    : "border-gray-300 hover:border-orange-400"
                }`}
              >
                {isChecked && <Check className="w-4 h-4 text-white" />}
              </div>

              <div className="ml-4 flex-1">
                <span
                  className={`font-medium ${
                    isChecked ? "text-green-800 line-through" : "text-gray-900"
                  }`}
                >
                  {ingredient}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {ingredients.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No ingredients listed</p>
        </div>
      )}
    </div>
  );
};

export default IngredientsList;
