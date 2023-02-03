import React from "react";
import { PostMedia } from "../posts/PostMedia";

export const RightSide = ({ posts }) => {
  return (
    <div className="w-full bg-white rounded-md ">
      <div className="p-2">
        <img src="/512.png" alt="" className="w-full object-cover" />
      </div>
      <div className="h-96">
        <h1 className="text-2xl font-bold text-center bg-teal-800 text-white py-2">
          Ecowas24 Tv
        </h1>
      </div>
      <div className="h-96">
        <h1 className="text-2xl font-bold text-center bg-teal-800 text-white py-2">
          Trending News
        </h1>
      </div>
      <div className="">
        <h1 className="text-2xl font-bold text-center bg-teal-800 text-white py-2">
          Recent News
        </h1>
        {posts?.map((post) => (
          <PostMedia post={post} key={post?.slug} />
        ))}
      </div>
      <div className="h-96">
        <h1 className="text-2xl font-bold text-center bg-teal-800 text-white py-2">
          International News
        </h1>
      </div>
      <div className="h-96">
        <h1 className="text-2xl font-bold text-center bg-teal-800 text-white py-2">
          Commercials
        </h1>
      </div>
    </div>
  );
};
