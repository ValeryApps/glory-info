import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { DraftEditor } from "../../components/editor/DraftEditor";
import { Input, Select } from "../../components/inputs/Input";
import { Layout } from "../../components/layout/Layout";
import { categories } from "../../data/categories";
import { countries } from "../../data/countries";
import * as Yup from "yup";
import { EditorState } from "draft-js";
import { convertToHTML } from "draft-convert";
import { serverTimestamp } from "firebase/firestore";
import { v4 as uuid } from "uuid";
// import { uuidv4 } from "@firebase/util";
import { create_post } from "../../api/post/postApi";
import { ImagePreview } from "../../components/images/ImagePreview";
import { storeImage } from "../../api/images/uploadImages";

const initialValues = {
  title: "",
  description: "",
  type: "",
  author: "",
  externUrl: "",
  category: "",
  country: "",
};
export const AddPost = () => {
  const [postData, setPostData] = useState(initialValues);
  const [images, setImages] = useState([]);
  const [filesArray, setFilesArray] = useState([]);
  const { title, description, type, author, externUrl, category, country } =
    postData;
  let imageFiles = [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleImages = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((img) => {
      imageFiles.push(img);
      setFilesArray(imageFiles);
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (ev) => {
        setImages((imgs) => [...imgs, ev.target.result]);
      };
    });
  };
  const [editorState, SetEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const handleEditorChange = (state) => {
    SetEditorState(state);
    convertContentToHTML();
  };

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setPostData((prev) => ({ ...prev, description: currentContentAsHTML }));
  };
  const validate = Yup.object({
    title: Yup.string().required(),
    type: Yup.string().required(),
    author: Yup.string().required(),
    category: Yup.string().required(),
    country: Yup.string().required(),
  });
  const submitPost = async () => {
    let imageUrls;
    try {
      const slug = `${postData.title
        .replaceAll(" ", "-")
        .replaceAll("/", "")
        .replaceAll("?", "")}-${Date.now()}`;
      if (filesArray.length > 0) {
        imageUrls = await Promise.all(
          [...filesArray].map((file) => {
            const path = `Posts/images/${file?.name}`;
            return storeImage(file, path);
          })
        ).catch((err) => {
          console.log("Could not upload images");
          return;
        });
        const post = {
          ...postData,
          slug,
          id: uuid(),
          images: imageUrls,
          likes: [],
          comments: [],
          likesCount: 0,
          commentsCount: 0,
          createdAt: serverTimestamp(),
        };
        await create_post(post);
      } else {
        const post = {
          ...postData,
          slug,
          id: uuid(),
          likes: [],
          comments: [],
          likesCount: 0,
          commentsCount: 0,
          createdAt: serverTimestamp(),
        };
        await create_post(post);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Layout>
      <Helmet>
        <title>Create Post - Glory Info</title>
      </Helmet>
      <div className="w-[80%] pb-24 px-5 shadow-md bg-white mb-5 mx-auto rounded-md">
        <h1 className="text-center py-5 text-3xl font-bold text-teal-700">
          Add New Post
        </h1>
        <Formik
          enableReinitialize
          validationSchema={validate}
          initialValues={{
            title,
            description,
            type,
            author,
            externUrl,
            category,
            country,
          }}
          onSubmit={submitPost}
        >
          {({ isValid, isSubmitting }) => (
            <Form className="w-full flex flex-col gap-4">
              <div className="md:flex gap-3">
                <Input
                  type="text"
                  name="title"
                  placeholder="Enter Story Title"
                  onChange={handleChange}
                  value={title}
                />
                <Select
                  onChange={handleChange}
                  name="category"
                  value={category}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.text} value={cat.link}>
                      {cat.text}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="md:flex gap-3">
                <Input
                  type="text"
                  name="externUrl"
                  placeholder="Enter Story Url"
                  onChange={handleChange}
                  value={externUrl}
                />
                <Input
                  type="text"
                  name="author"
                  placeholder="Enter Story Author"
                  onChange={handleChange}
                  value={author}
                />
              </div>
              <div className="md:flex gap-3">
                <Select onChange={handleChange} name="country" value={country}>
                  <option value="">Select a country</option>
                  {countries.map((country) => (
                    <option key={country.name} value={country.value}>
                      {country.name}
                    </option>
                  ))}
                </Select>
                <Select onChange={handleChange} name="type" value={type}>
                  <option value="">Select a type</option>
                  <option value="video">Video</option>
                  <option value="text">Text</option>
                  <option value="images">Images</option>
                </Select>
              </div>
              <div>
                <DraftEditor
                  editorState={editorState}
                  onEditorStateChange={handleEditorChange}
                />
              </div>
              <div>
                <ImagePreview
                  images={images}
                  setImages={setImages}
                  handleImage={handleImages}
                />
              </div>
              <button
                type="submit"
                className={`${
                  !isValid || isSubmitting
                    ? "bg-gray-400 text-black cursor-not-allowed"
                    : "bg-teal-800 text-white"
                } w-full text-center py-2 rounded-md mt-5`}
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? "Creating post..." : "Create Post"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  );
};
