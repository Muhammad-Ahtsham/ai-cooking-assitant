import { BookOpen, Clock, Filter, Play, Search, Users } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { addRecipe } from "../features/recipe";
import { useGetlibraryitemQuery } from "../../reduxApi/library";

const Library = () => {
  const { data, error, isLoading } = useGetlibraryitemQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (isLoading) {
    return <div className="text-center py-4">Loading your library...</div>;
  }
  if (error) {
    console.error(error);
    return (
      <div className="text-center py-4 text-red-500">Error loading library</div>
    );
  }

  const items = Array.isArray(data?.message) ? data.message : [];

  const handleSummary = (item) => { 
    dispatch(addRecipe(item));
    navigate(`/recipe/${item.name}`);
  };

  return (
    <div className="space-y-6">
      <Navbar />
      <div className="text-center m-4">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-orange-800 to-amber-800 bg-clip-text text-transparent mb-4">
          Your Recipe Library
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Discover, create, and organize your culinary collection
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 flex justify-evenly m-10">
        {/* Search */}
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search recipes..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        {/* Filter */}
        <div className="relative w-full">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white">
            <option value="all">All Recipes</option>
            <option value="favorites">Favorites</option>
            <option value="generated">AI Generated</option>
          </select>
        </div>

        {/* Sort */}
        <div className="relative w-full">
          <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white">
            <option value="recent">Most Recent</option>
            <option value="rating">Highest Rated</option>
            <option value="time">Quickest First</option>
          </select>
        </div>
      </div>

      {/* Recipe Cards */}
      <div className="grid grid-cols-1 m-10 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.length > 0 ? (
          items.map((item) => {
            const recipe = item.itemId?.responseContent;

            return (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transition hover:shadow-xl hover:scale-105"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {recipe.name}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                    {recipe.description || recipe.name}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm">{recipe.cookTime}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Users className="w-4 h-4 mr-1" />
                      <span className="text-sm">
                        {recipe.servings} servings
                      </span>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        recipe.difficulty === "Easy"
                          ? "bg-green-100 text-green-800"
                          : recipe.difficulty === "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {recipe.difficulty}
                    </span>
                  </div>

                  <button
                    onClick={() => handleSummary(recipe)}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center space-x-2"
                  >
                    <Play className="w-5 h-5" />
                    <span>Start Cooking</span>
                  </button>
                </div>
              </div>
            );
          })
        ) : (
       <div className="flex items-center justify-center">
          <p className="text-center text-gray-500">No recipes found.</p>
        </div>
        )}
      </div>
    </div>
  );
};

export default Library;
