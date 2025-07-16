export const PrettyResponse = ({ content, contentId, onSave }) => {
  if (typeof content === "object" && content.type === "recipe") {
    return (
      <div className="recipe-response bg-white rounded-xl shadow-md p-6 max-w-3xl">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">{content.name}</h3>
            <div className="flex flex-wrap gap-3 mt-2">
              <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">
                ⏱️ Prep: {content.prepTime}
              </span>
              <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">
                🔥 Cook: {content.cookTime}
              </span>
              <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">
                👥 Serves: {content.servings}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  content.difficulty === "Easy"
                    ? "bg-green-100 text-green-800"
                    : content.difficulty === "Medium"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {content.difficulty}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold text-lg text-gray-700 mb-2 flex items-center">
              <span className="mr-2">🥕</span> Ingredients
            </h4>
            <ul className="list-disc pl-5 space-y-1">
              {content.ingredients.map((ing, i) => (
                <li key={i} className="text-gray-600">
                  {ing}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg text-gray-700 mb-2 flex items-center">
              <span className="mr-2">📝</span> Instructions
            </h4>
            <ol className="list-decimal pl-5 space-y-2">
              {content.instructions.map((step, i) => (
                <li key={i} className="text-gray-600">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {content.tips?.length > 0 && (
          <div className="mt-6 bg-blue-50 rounded-lg p-4">
            <h4 className="font-bold text-lg text-blue-700 mb-2 flex items-center">
              <span className="mr-2">💡</span> Chef's Tips
            </h4>
            <ul className="list-disc pl-5 space-y-1">
              {content.tips.map((tip, i) => (
                <li key={i} className="text-blue-600">
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end w-full">
          <button
            className={`bg-gradient-to-br from-orange-400 to-red-500 text-white px-4 py-2 rounded-lg  min-w-50 ${
              content.type === "recipe" ? "" : "hidden"
            }`}
            onClick={() => onSave(contentId)}
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  if (typeof content === "object" && content !== null) {
    return <div className="bg-gray-50 p-4 rounded-lg">{content.answer}</div>;
  }
};
