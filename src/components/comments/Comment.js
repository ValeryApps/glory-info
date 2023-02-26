import React from "react";

export const Comment = ({ comment }) => {
  return (
    <div className="flex items-center gap-2 bg-slate-100 py-3 px-4 rounded-full text-gray-600 w-fit my-2">
      <div className="w-10 h-10 rounded-full flex justify-center items-center bg-green-900">
        <span
          className="text-xl text-w
             font-bold text-white"
        >
          {comment?.username?.charAt(0)}
        </span>
      </div>
      <div className="">
        <span className="text-sm font-bold">{comment?.username}</span>
        <div className="">
          <div>{comment?.text}</div>
        </div>
      </div>
    </div>
  );
};
