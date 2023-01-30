import React from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { Layout } from "../../components/layout/Layout";
import { PostCard } from "../../components/posts/PostCard";
import { dummyPosts } from "../../data/dummyData";

export const PostsPerCountry = () => {
  const { country } = useParams();
  const stories = dummyPosts.filter(
    (x) => x.country.toLowerCase() === country.toLowerCase()
  );
  return (
    <Layout>
      <Helmet>
        <title>{country.toUpperCase()}</title>
      </Helmet>
      <div className="flex flex-wrap">
        {stories.map((story, index) => (
          <div
            key={index}
            className="w-full md:w-[47%] lg:w-[31%] xl:w-[23%] mr-3"
          >
            <PostCard post={story} />
          </div>
        ))}
      </div>
    </Layout>
  );
};
