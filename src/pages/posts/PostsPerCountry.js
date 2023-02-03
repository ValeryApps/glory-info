import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { fetch_posts_per_country } from "../../api/post/postApi";
import { Layout } from "../../components/layout/Layout";
import { SpinnerComponent } from "../../components/loader/SpinnerComponent";
import { PostCard } from "../../components/posts/PostCard";

export const PostsPerCountry = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { country } = useParams();

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      const data = await fetch_posts_per_country(country);
      setLoading(false);
      setPosts(data);
    };
    getPosts();
  }, [country, setPosts]);
  if (loading) {
    return <SpinnerComponent />;
  }
  return (
    <Layout>
      <Helmet>
        <title>{country.toUpperCase()}</title>
      </Helmet>
      <div className="flex flex-wrap">
        {posts?.map((story, index) => (
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
