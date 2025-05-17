import React, { useState } from "react";
import GrouyName from "./History/GrouyName";
import { useDispatch } from "react-redux";
import { selectedId, setMessages } from "../stores/slices/conversationSlice";

const Sidebar = ({ history, onDelete }) => {
  const dispatch = useDispatch();

  const handleNewChat = () => {
    dispatch(selectedId(null));
    dispatch(setMessages(null));
  };

  return (
    <div className="h-screen bg-white flex flex-col p-4 overflow-y-auto">
      <div className="flex justify-between items-center ">
        <div className="">
          <h2 className="text-xl font-semibold mb-4">💬 Lịch sử</h2>
        </div>
        <div className=" ml-auto">
          {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg> */}
          <div className="flex w-9 h-9  justify-center text-center items-center m-auto text-xl bg-slate-200 font-semibold cursor-pointer hover:bg-white hover:text-gray-300 rounded-2xl shadow-md transition-all duration-200 ease-in-out"
          onClick={handleNewChat}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-1">
        {history && history?.today?.length > 0 && (
          <GrouyName
            title="Hôm nay"
            data={history?.today}
            onDelete={onDelete}
          />
        )}
        {history && history?.yesterday?.length > 0 && (
          <GrouyName
            title="Hôm qua"
            data={history?.yesterday}
            onDelete={onDelete}
          />
        )}
        {history && history?.lastWeek?.length > 0 && (
          <GrouyName
            title="Tuần trước"
            data={history?.lastWeek}
            onDelete={onDelete}
          />
        )}
        {history && history?.lastMonth?.length > 0 && (
          <GrouyName
            title="Tháng trước"
            data={history?.lastMonth}
            onDelete={onDelete}
          />
        )}
        {history && history?.older?.length > 0 && (
          <GrouyName title="Cũ hơn" data={history?.older} onDelete={onDelete} />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
