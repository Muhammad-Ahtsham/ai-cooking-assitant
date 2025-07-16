import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { EllipsisVertical } from "lucide-react";

const Dropmenu = ({ itemId, onDelete }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-1 rounded-full">
          <EllipsisVertical className="text-gray-400 hover:text-white" size={18} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-gradient-to-b from-orange-500 to-red-500 text-white p-2 rounded-md shadow-lg z-50 min-w-[120px]"
        align="end"
      >
        <DropdownMenuItem
          className="p-2 rounded cursor-pointer text-sm"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(itemId);
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropmenu;
