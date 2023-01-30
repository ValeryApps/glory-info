import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { SlideShow } from "../components/slide/SlideShow";
import { dummyPosts } from "../data/dummyData";
import Typewriter from "typewriter-effect";
import { PostCategory } from "../components/posts/PostCategory";
import { CategoryPill } from "../components/posts/CategoryPill";
import { GiPublicSpeaker, GiOpenBook } from "react-icons/gi";
import { FaRunning } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import { MdComputer } from "react-icons/md";
import { HiUsers } from "react-icons/hi2";
import { RightSide } from "../components/rightSide/RightSide";

export const Home = () => {
  const [storyTitles, setStoryTitles] = useState([]);

  useEffect(() => {
    setStoryTitles(dummyPosts.slice(0, 10).map((post) => post.title));
  }, []);
  return (
    <>
      <Helmet>
        <title>Home - Glory Info</title>
      </Helmet>
      <div className="lg:px-5">
        <div className="bg-white border-[#123456] rounded-md border-l-[18px] border-r-[18px] my-4 border-t-2 border-b-2 w-full md:w-[75%] px-3 line-clamp-1">
          <Typewriter
            options={{
              strings: storyTitles,
              autoStart: true,
              deleteSpeed: 1,
              delay: 10,
              loop: true,
              pauseFor: 3000,
            }}
          />
        </div>
        <SlideShow posts={dummyPosts} />
        <div className="flex justify-between">
          <div className=" w-full lg:max-w-[75%] ">
            <div>
              <CategoryPill category={"Politics"}>
                <GiPublicSpeaker />
              </CategoryPill>
              <PostCategory category="Politics" />
            </div>
            <div>
              <CategoryPill category={"Sports"}>
                <FaRunning />
              </CategoryPill>
              <PostCategory category={"Sports"} />
            </div>
            <div>
              <CategoryPill category={"Economy"}>
                <BsGraphUp />
              </CategoryPill>
              <PostCategory category={"Economy"} />
            </div>
            <div>
              <CategoryPill category={"Technology"}>
                <MdComputer />
              </CategoryPill>
              <PostCategory category={"Technology"} />
            </div>
            <div>
              <CategoryPill category={"Education"}>
                <GiOpenBook />
              </CategoryPill>
              <PostCategory category={"Education"} />
            </div>
            <div>
              <CategoryPill category={"Society"}>
                <HiUsers />
              </CategoryPill>
              <PostCategory category={"Society"} />
            </div>
          </div>
          <div className="hidden lg:block w-[24%] mt-8">
            <RightSide />
          </div>
        </div>
      </div>
    </>
  );
};
