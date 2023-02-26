import React from "react";
import { Link } from "react-router-dom";

export const MainPost = ({ post }) => {
  return (
    <div className="bg-white mb-2 p-4 h-[380px] lg:mb-0 md:h-96 overflow-hidden relative">
      <div className="overflow-hidden h-[351px] relative">
        <div className="flex gap-4 absolute top-2 left-2">
          <span className="bg-white text-teal-600 py-1 px-4 rounded-xl">
            {post?.author}
          </span>
          <span className="bg-white text-teal-600 py-1 px-4 rounded-xl">
            {post?.country}
          </span>
        </div>
        <img
          src={post?.images[0]}
          alt=""
          className="w-full h-[351px]  hover:scale-125 transition duration-500 ease-in-out cursor-pointer object-cover"
        />
        <div className="absolute bottom-4 bg-[#00000080] p-5 w-full">
          <Link to={`/post/${post?.slug}`}>
            <h2 className="text-md text-white font-bold line-clamp-2 mb-2">
              {post?.title}
            </h2>
          </Link>
          <div className="absolute -bottom-2 bg-white px-4 py-2 rounded-full text-teal-700 font-bold flex gap-6">
            <span> {post?.likesCount} Likes </span>
            <span> {post?.commentsCount} comments </span>
          </div>
        </div>
      </div>
    </div>
  );
};
