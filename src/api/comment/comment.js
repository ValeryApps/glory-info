import {
  doc,
  collection,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
  arrayUnion,
  increment,
} from "firebase/firestore";
import { db } from "../../firebase";

export const create_comment = async (postId, comment, commentId) => {
  try {
    const commentRef = doc(db, "comments", commentId);
    const postRef = doc(db, "posts", postId);
    // const post = await getDoc(postRef);
    await setDoc(commentRef, comment);
    await updateDoc(postRef, {
      comments: arrayUnion(comment),
      commentsCount: increment(1),
    });
  } catch (error) {
    throw error;
  }
};

export const fetch_comment = async (postId) => {
  try {
    const commentRef = collection(db, "comments");
    const q = query(commentRef, where("postId", "==", postId));
    const comments = await getDocs(q);
    return comments.docs.map((comment) => comment.data());
  } catch (error) {
    throw error;
  }
};
