import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Moment from "react-moment";
import { useParams } from "react-router-dom";
import {
  fetch_posts_per_category,
  fetch_post_per_slug,
} from "../../api/post/postApi";
import { Layout } from "../../components/layout/Layout";
import { SimilarPosts } from "../../components/posts/SimilarPosts";
import { createMarkup } from "../../helpers/parseHtml";
import { GiClockwork } from "react-icons/gi";

export const PostDetailsPage = () => {
  const [post, setPost] = useState(null);
  const [postsPerCategory, setPostsPerCategory] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
    const getPost = async () => {
      const data = await fetch_post_per_slug(slug);
      setPost(data);
    };
    getPost();
  }, [slug, setPost]);

  useEffect(() => {
    const getPosts = async () => {
      const data = await fetch_posts_per_category(post?.category);
      setPostsPerCategory(data);
    };
    getPosts();
  }, [post, setPostsPerCategory]);
  const date = post?.createdAt.toDate();

  return (
    <Layout>
      <Helmet>
        <title>{post?.title}</title>
      </Helmet>
      <div className="flex justify-between">
        <div className="hidden md:block md:w-[25%] bg-white rounded-t-3xl">
          <h1 className="py-5 px-3 bg-teal-700 text-white font-bold text-3xl rounded-t-3xl">
            Similar Stories
          </h1>
          <div>
            <SimilarPosts posts={postsPerCategory} />
          </div>
        </div>
        <div className="w-full md:max-w-[73%] shadow-md bg-white rounded-t-3xl">
          <h1 className="py-5 px-3 bg-teal-700 text-white font-bold text-3xl rounded-t-3xl">
            {post?.title}
          </h1>
          <div className="pb-6">
            <img src={post?.images[0]} alt="" className="w-full object-cover" />
            <div className="text-gray-700 px-3">
              <div
                dangerouslySetInnerHTML={createMarkup(post?.description)}
              ></div>
            </div>
          </div>
          <div className="px-4 border-slate-300 py-5 flex items-center border-2 justify-between">
            <span className="flex gap-2 items-center">
              <GiClockwork />
              <Moment
                fromNow
                date={date}
                className="text-[12px] italic font-bold"
              ></Moment>
            </span>
            <span className="text-[12px] italic font-bold">
              By: {post?.author}
            </span>
            <span className="text-[12px] italic font-bold">
              Country: {post?.country}
            </span>
            <span className="text-[12px] italic font-bold">
              Category: {post?.category}
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
};
