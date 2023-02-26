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
  updateDoc,
  deleteDoc,
  getDoc,
  arrayUnion,
  increment,
  arrayRemove,
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
export const fetch_post_by_id = async (postId) => {
  try {
    const postRef = doc(db, "posts", postId);
    const postData = await getDoc(postRef);
    if (postData.exists()) {
      return postData.data();
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

export const update_post = async (id, data) => {
  try {
    const postRef = doc(db, "posts", id);
    await updateDoc(postRef, data);
  } catch (error) {
    throw error;
  }
};

export const delete_post = async (postId) => {
  try {
    const postRef = doc(db, "posts", postId);
    await deleteDoc(postRef);
  } catch (error) {}
};

export const like_post = async (postId, userId) => {
  const postRef = doc(db, "posts", postId);
  const post = await getDoc(postRef);
  const userHasLiked = post.data()["likes"].indexOf(userId);
  if (userHasLiked === -1) {
    await updateDoc(postRef, {
      likes: arrayUnion(userId),
      likesCount: increment(1),
    });
    return true;
  } else {
    await updateDoc(postRef, {
      likes: arrayRemove(userId),
      likesCount: increment(-1),
    });
    return false;
  }
};
