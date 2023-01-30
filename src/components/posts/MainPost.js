import React from "react";
import { Link } from "react-router-dom";

export const MainPost = ({ post }) => {
  return (
    <div className="bg-white mb-2 p-4 h-[380px] lg:mb-0 md:h-96 overflow-hidden relative">
      <div className="overflow-hidden h-[351px] relative">
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
        </div>
      </div>
    </div>
  );
};
