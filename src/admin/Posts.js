import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { delete_post, fetch_posts } from "../api/post/postApi";
import { FaRegEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

export const Posts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPost = async () => {
      const posts = await fetch_posts();
      setPosts(posts);
    };
    fetchPost();
  }, [setPosts]);
  const navigate = useNavigate();
  const deletePost = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await delete_post(id);
    } else {
      return;
    }
  };
  return (
    <div className="px-20 py-10">
      <div className="bg-white py-5 rounded-md shadow-md">
        <div className="font-bold pl-10 text-teal-600">
          <h1>Number of Posts: {posts.length}</h1>
        </div>
        <div className="overflow-x-auto">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Main Image
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Comments
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Likes
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post, index) => (
                    <tr className="border-b cursor-pointer" key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <img
                          src={post?.images[0]}
                          alt=""
                          className="w-10 object-cover"
                          onClick={() => navigate(`/post/${post?.slug}`)}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <span onClick={() => navigate(`/post/${post?.slug}`)}>
                          {post?.title}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {post?.commentsCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {post?.likesCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <div className="flex ml-auto gap-4">
                          <FaRegEdit
                            className="text-green-600"
                            onClick={() => navigate(`/edit-post/${post?.id}`)}
                            title="Edit post"
                          />
                          <AiFillDelete
                            className="text-red-600"
                            onClick={() => deletePost(post?.id)}
                            title="Delete post"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
