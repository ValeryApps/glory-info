import React, { useEffect, useState } from "react";
import { fetch_posts_per_category } from "../../api/post/postApi";

import { MainPost } from "./MainPost";
import { RightPost } from "./RightPost";

export const PostCategory = ({ category }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      const data = await fetch_posts_per_category(category);
      setPosts(data);
    };
    getPosts();
  }, [setPosts, category]);
  return (
    <div className="flex justify-between flex-wrap mb-2">
      <div className="w-full md:w-[41%]">
        <MainPost post={posts[0]} />
      </div>
      <div className="w-full md:w-[58%] flex flex-col gap-1">
        {posts.slice(1, 4).map((post, index) => (
          <RightPost post={post} key={index} />
        ))}
      </div>
    </div>
  );
};
