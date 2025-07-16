import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDeleteHistoryMutation } from "../../reduxApi/history";
import Dropmenu from "./Dropmenu";
const Historylist = ({
  trigger,
  title,
  items,
  isLoading,
  position = "right",
  width = "w-full md:max-w-md",
}) => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteHistory, { data: deleteMessage }] = useDeleteHistoryMutation();
  useEffect(() => {
    setData([]);
  }, [items]);

  useEffect(() => {
    if (items?.message) {
      setData(items.message);
    }
  }, [items]);

  const handleItemClick = () => setIsOpen(false);

  const getPositionClasses = () => {
    switch (position) {
      case "left":
        return "left-0 top-0 h-full rounded-r-xl";
      case "right":
        return "right-0 top-0 h-full rounded-l-xl";
      case "top":
        return "top-0 left-0 w-full rounded-b-xl";
      case "bottom":
        return "bottom-0 left-0 w-full rounded-t-xl";
      default:
        return "right-0 top-0 h-full rounded-l-xl";
    }
  };

  const getAnimationClasses = () => {
    const prefix = position.charAt(0).toUpperCase() + position.slice(1);
    return `data-[state=open]:animate-slideIn${prefix} data-[state=closed]:animate-slideOut${prefix}`;
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity data-[state=open]:animate-fadeIn data-[state=closed]:animate-fadeOut" />

        <Dialog.Content
          className={`
            fixed z-50 bg-yellow-50 shadow-xl
            ${getPositionClasses()} ${getAnimationClasses()} ${width}
            flex flex-col text-black
        `}
        >
          <div className="p-6 flex flex-col h-full">
            <div className="mb-6 flex justify-between items-center">
              <div>
                <Dialog.Title className="text-2xl font-bold">
                  {title}
                </Dialog.Title>
                <Dialog.Description className="text-sm text-gray-400">
                  View and manage your recent history
                </Dialog.Description>
              </div>
              <Dialog.Close className="rounded-full p-2 text-black hover:bg-gradient-to-b from-orange-500 to-red-500 transition-colors hover:text-white">
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Dialog.Close>
            </div>

            <div className="flex-1 overflow-y-auto">
              {isLoading ? (
                <div className="p-4 text-center text-gray-400">Loading...</div>
              ) : data.length > 0 ? (
                data.map((item) => (
                  <div
                    className="flex items-center justify-between py-2 px-3 hover:bg-gradient-to-b from-orange-500 to-red-500 transition-color hover:text-white rounded-lg"
                    key={item._id}
                  >
                    <Link
                      to={`/history/${item._id}`}
                      className="flex-1 py-2  transition-colors truncate"
                      onClick={handleItemClick}
                    >
                      {item.name}
                    </Link>
                    <Dropmenu
                      itemId={item._id}
                      onDelete={() => deleteHistory({ id: item._id })}
                    />
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-400">
                  No history available
                </div>
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Historylist;
