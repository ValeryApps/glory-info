import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Moment from "react-moment";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  fetch_posts_per_category,
  fetch_post_per_slug,
  like_post,
} from "../../api/post/postApi";
import { Layout } from "../../components/layout/Layout";
import { SimilarPosts } from "../../components/posts/SimilarPosts";
import { createMarkup } from "../../helpers/parseHtml";
import { GiClockwork } from "react-icons/gi";
import { CreateComment } from "../../components/comments/CreateComment";
import { create_comment, fetch_comment } from "../../api/comment/comment";
import { getAuth } from "firebase/auth";
import { v4 as uuid } from "uuid";
import { Comment } from "../../components/comments/Comment";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";

export const PostDetailsPage = () => {
  const [post, setPost] = useState(null);
  const [postsPerCategory, setPostsPerCategory] = useState([]);
  const { slug } = useParams();
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);
  const [commentLoading, setCommentLoading] = useState(false);
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const navigate = useNavigate();
  const auth = getAuth();
  useEffect(() => {
    const getPost = async () => {
      const data = await fetch_post_per_slug(slug);
      setPost(data);
    };
    getPost();
  }, [slug, setPost]);

  useEffect(() => {
    const fetchComments = async () => {
      const data = await fetch_comment(post?.id);
      console.log(data);
      setComments(data);
    };
    fetchComments();
  }, [post, setComments]);

  useEffect(() => {
    const getPosts = async () => {
      if (post) {
        const data = await fetch_posts_per_category(post?.category);
        setPostsPerCategory(data);
      }
    };
    getPosts();
  }, [post, setPostsPerCategory]);

  useEffect(() => {
    if (post?.likes?.indexOf(auth.currentUser?.uid) !== -1) {
      setLike(true);
      setLikeCount(post?.likesCount);
    } else {
      setLike(false);
      setLikeCount(post?.likesCount);
    }
  }, [auth.currentUser?.uid, post?.likes, post?.likesCount]);
  const date = post?.createdAt.toDate();

  const handleCreateComment = async () => {
    if (auth.currentUser) {
      const commentId = uuid();
      const comment = {
        text,
        commentId,
        postId: post?.id,
        commentedBy: auth.currentUser?.uid,
        username: auth.currentUser?.displayName,
        createdAt: Date.now(),
      };
      try {
        setCommentLoading(true);
        await create_comment(post?.id, comment, commentId);
        setComments((prev) => [...prev, comment]);
        setText("");
        setCommentLoading(false);
      } catch (error) {
        setCommentLoading(false);
        console.log(error.message);
      }
    } else {
      navigate("/login");
    }
  };
  const handleLike = async () => {
    try {
      if (auth.currentUser?.uid) {
        const isLiked = await like_post(post?.id, auth.currentUser?.uid);
        if (isLiked) {
          setLikeCount(likeCount + 1);
          setLike(true);
        } else {
          setLikeCount(likeCount - 1);
          setLike(false);
        }
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
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
        <div className="w-full md:max-w-[73%] shadow-md bg-white rounded-t-3xl pb-6">
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
          <div className="flex items-center gap-2 ml-2">
            {like ? (
              <MdFavorite
                className="text-pink-800 text-2xl cursor-pointer"
                onClick={() => handleLike()}
              />
            ) : (
              <MdOutlineFavoriteBorder
                className="text-pink-800 text-2xl cursor-pointer"
                onClick={() => handleLike()}
              />
            )}
            {likeCount > 1 ? (
              <span>{likeCount} likes</span>
            ) : (
              <span>{likeCount} like</span>
            )}
            <div>{comments.length} comments</div>
          </div>
          <Link to={`/edit-post/${post?.id}`}>Edit</Link>
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
          {comments.length > 0 &&
            comments?.map((comment, index) => (
              <div key={index}>
                <Comment comment={comment} />
              </div>
            ))}
          <CreateComment
            text={text}
            setText={setText}
            commentLoading={commentLoading}
            submitComment={handleCreateComment}
          />
        </div>
      </div>
    </Layout>
  );
};
