import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const auth = getAuth();

export const register_user = async (userData) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );
    await updateProfile(auth.currentUser, { displayName: userData.username });
    const user = userCredentials.user;
    await setDoc(doc(db, "users", user.uid), {
      username: userData.username,
      email: userData.email,
      roles: ["user"],
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    throw error;
  }
};

export const login_user = async (userData) => {
  try {
    await signInWithEmailAndPassword(auth, userData.email, userData.password);
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    const userData = await getDoc(doc(db, "users", userId));
    if (userData.exists()) {
      return userData.data();
    }
    return null;
  } catch (error) {
    throw error;
  }
};
