import React from "react";
import { Link } from "react-router-dom";

export const RightPost = ({ post }) => {
  return (
    <div className="h-[125px] flex gap-2 lg:mb-0 items-start p-1 overflow-hidden bg-white md:mt-0 pb-1">
      <div className="overflow-hidden  min-w-[170px] max-w-[150px] h-[117px] cursor-pointer">
        <img src={post?.images[0]} alt="" className="w-full h-full" />
      </div>
      <div className="relative flex flex-col gap-3">
        <Link to={`/post/${post?.slug}`}>
          <h2
            className="text-lg font-bold line-clamp-2 mb-2"
            title={post?.title}
          >
            {post?.title}
          </h2>
        </Link>
        <div className=" hidden  bg-teal-700 px-4 py-2 rounded-full text-white font-bold md:flex gap-6 w-fit">
          <span> {post?.likesCount} Likes </span>
          <span> {post?.commentsCount} comments </span>
        </div>
      </div>
    </div>
  );
};
