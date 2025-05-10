import React, { useState } from "react";
import { MoreVertical, Trash2 } from "lucide-react";

const SidebarItemWithAction = ({ label, onDelete ,id}) => {
    const [showMenu, setShowMenu] = useState(false);
  
    return (
      <div className="relative group">
        {/* Sidebar item */}
        <div className="flex justify-between items-center p-2 rounded cursor-pointer z-10">
          <span>{label}</span>
  
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 hover:bg-gray-200 rounded"
          >
            <MoreVertical size={16} />
          </button>
        </div>
  
        {/* Action menu */}
        {showMenu && (
          <div className="absolute right-0 top-full mt-1 bg-white text-black rounded shadow-md z-40 w-28">
            <button
              onClick={() => onDelete(id)}
              className="flex items-center w-full px-3 py-2 hover:bg-red-100 text-red-600"
            >
              <Trash2 size={16} className="mr-2" />
              Delete
            </button>
          </div>
        )}
      </div>
    );
  };

const GroupName = ({title,data,selected, onSelect, onDelete}) => {

    return (
        <div>
            <strong className="text-xs italic">{title}</strong>
            {data?.map((h, index) => (
                    <div>
                        <p
                        key={h._id}
                        onClick={() => onSelect(h._id)}
                        className={`w-full rounded-lg text-left hover:bg-gray-200 hover:drop-shadow-2xl
                            p-2 cursor-pointer ${selected === h._id ? 'bg-gray-200 drop-shadow-2xl' : ''}`}
                        >
                        {/* {h.title || "New Conversation"}... */}
                            <SidebarItemWithAction label={h.title } onDelete={onDelete} id={h._id} />

                        </p>
                    </div>
            ))}
        </div>
    )
}

export default GroupName;