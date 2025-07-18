import { ChefHat, History, Home, Library, LogOutIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetHistoryQuery } from "../../reduxApi/history";
import Historylist from "../components/Historylist";
import { useLogoutMutation } from "../../reduxApi/user";
import toast from "react-hot-toast";

const Navbar = () => {
  const { data } = useGetHistoryQuery();
  const [logout] = useLogoutMutation ();
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = async () => {
    try {
       const result = await logout().unwrap();
    if (result.message === "Logout successful") {
      navigate("/", {
        replace: true,
      });
    }
    } catch (error) {
     toast.error("Logout failed. Please try again."); 
    }  
  };
  const handleNavigate = () => {
    navigate("/library", {
      replace: true,
    });
  };
  return (
    <header className=" flex items-center h-[5rem] w-full bg-white/95  p-3.5 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="mx-auto px-4 py-4 w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
              <ChefHat size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                CookingAI
              </h1>
              <p className="text-xs text-gray-500">
                Your smart cooking companion
              </p>
            </div>
          </div>

          <div className="flex items-center gap-9">
            <div className=" bg-gray-100 flex justify-center items-center rounded-full h-10 w-10">
              <Library
                className=" text-gray-400"
                onClick={handleNavigate}
              ></Library>
            </div>
            <button
              className={`w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors ${
                location.pathname === "/" ? "hidden" : ""
              }`}
            >
              <Home
                size={18}
                className="text-gray-600"
                onClick={() => {
                  navigate("/");
                }}
              />
            </button>
            <button
              className={`w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors ${
                location.pathname === "/" ? "hidden" : ""
              }`}
            >
              <LogOutIcon
                size={18}
                className="text-gray-600"
                onClick={handleLogout}
              />
            </button>

            <Historylist
              title="Chat History"
              width="w-full md:max-w-lg"
              trigger={
                <button className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors cursor-pointer ">
                  <History className="text-gray-600" />
                </button>
              }
              items={data}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
