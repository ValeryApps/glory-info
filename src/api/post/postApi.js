// import { getAuth } from "firebase/auth"
import {
  setDoc,
  doc,
  collection,
  getDocs,
  query,
  orderBy,
  where,
  limit,
} from "firebase/firestore";
import { db } from "../../firebase";

// const auth = getAuth();
export const create_post = async (post) => {
  try {
    await setDoc(doc(db, "posts", post.id), post);
  } catch (error) {
    throw error;
  }
};

export const fetch_posts = async () => {
  try {
    const postRef = collection(db, "posts");
    const qu = query(postRef, orderBy("createdAt", "desc"));
    const postData = await getDocs(qu);
    const posts = postData.docs.map((post) => {
      if (post.exists()) {
        return post.data();
      }
      return [];
    });
    return posts;
  } catch (error) {
    throw error;
  }
};

export const fetch_posts_per_category = async (category) => {
  try {
    const postRef = collection(db, "posts");
    const postQuery = query(
      postRef,
      where("category", "==", category),
      orderBy("createdAt", "desc"),
      limit(4)
    );
    const postData = await getDocs(postQuery);
    const posts = postData.docs.map((post) => {
      if (post.exists()) {
        return post.data();
      }
      return [];
    });
    return posts;
  } catch (error) {
    throw error;
  }
};

export const fetch_post_per_slug = async (slug) => {
  try {
    const postRef = collection(db, "posts");
    const postData = query(postRef, where("slug", "==", slug));
    const postSnapshot = await getDocs(postData);
    const post = postSnapshot.docs[0];
    if (post.exists()) {
      return post.data();
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const fetch_posts_per_country = async (country) => {
  try {
    const postRef = collection(db, "posts");
    const postQuery = query(
      postRef,
      where("country", "==", country),
      orderBy("createdAt", "desc"),
      limit(4)
    );
    const postData = await getDocs(postQuery);
    const posts = postData.docs.map((post) => {
      if (post.exists()) {
        return post.data();
      }
      return [];
    });
    return posts;
  } catch (error) {
    throw error;
  }
};