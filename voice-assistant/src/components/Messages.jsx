import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useGetMessageQuery } from "../../api/message";
import { PrettyResponse } from "./PrettyResponse";
import { ChefHat, Play, User } from "lucide-react";
import { useAddtoLibraryMutation } from "../../api/library";

export const Messages = ({ historyId }) => {
  const navigate = useNavigate();
  const bottomRef = useRef();

  const { data, isLoading, isError, error } = useGetMessageQuery(historyId, {
    skip: !historyId || !isValidObjectId(historyId),
  });
  const [addtoLibrary, { data: result, isLoading: isloadingSave }] =
    useAddtoLibraryMutation();

  useEffect(() => {
    if (error && error.status === 400) {
      navigate("/", { replace: true });
    }
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [error, navigate, data]);

  const handlecontentSave = async (itemId) => {
    try {
        await addtoLibrary(itemId).unwrap();
      
    } catch (error) {
      console.log(error);
    }
  };

  if (!historyId) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500">Start a new conversation!</p>
      </div>
    );
  }

  if (isLoading) {
    return <div className="text-center py-4">Loading messages…</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-4 text-red-500">
        {error?.data?.message || "Error loading messages"}
      </div>
    );
  }

  return (
    <div className="chat-message-box bg-yellow-50 min-w-dvw  m-auto h-full p-4 overflow-auto flex flex-col space-y-4">
      {data?.messages && data.messages.length > 0 ? (
        data.messages.map((msg) => (
          <div key={msg._id} className="flex flex-col space-y-4 mb-6">
            <div className="self-end max-w-[80%] flex gap-3">
              <div className="bg-gradient-to-br from-orange-500 to-red-500  text-white  px-4 py-2 flex items-center justify-center  rounded-2xl ">
                {msg.userContent}
              </div>
              <User
                size={20}
                className="bg-gradient-to-br from-orange-500 to-red-500 h-13 w-13 rounded-3xl text-white p-3"
              />
            </div>

            <div className=" flex gap-3  self-start max-w-[80%]">
              <ChefHat
                size={18}
                className="bg-gradient-to-br from-emerald-500 to-teal-500 h-13 min-w-13 m-3 text-white p-3 rounded-3xl"
              />

              <div className="bg-gradient-to-br from-orange-300 to-red-400 text-black rounded-lg px-4 py-2">
                <PrettyResponse
                  content={msg.responseContent}
                  contentId={msg._id}
                  onSave={handlecontentSave}
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">
            No messages yet. Start a conversation!
          </p>
        </div>
      )}
      <div ref={bottomRef}></div>
    </div>
  );
};

// Helper function to validate MongoDB ObjectIds
function isValidObjectId(id) {
  return /^[0-9a-fA-F]{24}$/.test(id);
}
