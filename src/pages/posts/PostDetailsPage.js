import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { Layout } from "../../components/layout/Layout";
import { dummyPosts } from "../../data/dummyData";

export const PostDetailsPage = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  useEffect(() => {
    const story = dummyPosts.find((x) => x.slug === slug);
    setPost(story);
  }, [slug, setPost]);

  return (
    <Layout>
      <Helmet>
        <title>{post?.title}</title>
      </Helmet>
      <div className="flex justify-between">
        <div className="hidden md:block md:min-w-[25%]">
          <h1 className="py-5 px-3 bg-teal-700 text-white font-bold text-3xl rounded-t-3xl">
            Similar Stories
          </h1>
        </div>
        <div className="w-full md:max-w-[73%] shadow-md">
          <h1 className="py-5 px-3 bg-teal-700 text-white font-bold text-3xl rounded-t-3xl">
            {post?.title}
          </h1>
          <div className="pb-6">
            <img src={post?.images[0]} alt="" className="w-full object-cover" />
            <div className="text-gray-700 px-3">{post?.body}</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
