import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { Layout } from "../../components/layout/Layout";
import { PostCard } from "../../components/posts/PostCard";
import { fetch_posts_per_category } from "../../api/post/postApi";
import { SpinnerComponent } from "../../components/loader/SpinnerComponent";

export const PostsPerCategory = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { category } = useParams();

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      const data = await fetch_posts_per_category(category);
      setLoading(false);
      setPosts(data);
    };
    getPosts();
  }, [category, setPosts]);
  console.log(posts);
  if (loading) {
    return <SpinnerComponent />;
  }
  return (
    <Layout>
      <Helmet>
        <title>{category.toUpperCase()}</title>
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
