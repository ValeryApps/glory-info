import React from "react";
import { Link } from "react-router-dom";
import { countries } from "../../data/countries";
import { AiFillLike, AiOutlineComment } from "react-icons/ai";

export const PostCard = ({ post }) => {
  const item = countries.find((x) => x.value === post?.country);
  return (
    <div className="w-full bg-white mb-3 pb-5 relative min-h-[300px] shadow-md">
      <img
        src={post?.images[0]}
        alt=""
        className="lg:h-[150px] w-full h:[100px]"
      />
      <img
        src={item?.flag}
        alt=""
        className="w-[20px] max-h-5 absolute top-0"
      />
      <div className="px-2 flex flex-col justify-between overflow-hidden">
        <Link to={`/post/${post?.slug}`}>
          <h2 className="font-semibold text-sm line-clamp-2">{post?.title}</h2>
        </Link>
        <div className="flex gap-2 max-w-sm mb-2 overflow-hidden items-center">
          By: <span className="text-gray0500 font-bold">{post?.author}</span>
        </div>
        <div className="absolute bottom-2 bg-white px-4 py-2 rounded-full text-teal-700 font-bold flex gap-6">
          <span className="flex gap-1 items-center">
            {" "}
            {post?.likesCount} <AiFillLike />{" "}
          </span>
          <span className="flex gap-1 items-center">
            {" "}
            {post?.commentsCount} <AiOutlineComment />{" "}
          </span>
        </div>
      </div>
    </div>
  );
};
