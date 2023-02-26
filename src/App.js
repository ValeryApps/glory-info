import { useCycle } from "framer-motion";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AppHeader } from "./components/appbar/AppHeader";
import { SignIn } from "./pages/auth/SignIn";
import { SignUp } from "./pages/auth/SignUp";
import { Home } from "./pages/Home";
import "react-toastify/dist/ReactToastify.css";
import { PostDetailsPage } from "./pages/posts/PostDetailsPage";
import { PostsPerCategory } from "./pages/posts/PostsPerCategory";
import { PostsPerCountry } from "./pages/posts/PostsPerCountry";
import { AddPost } from "./pages/posts/AddPost";
import { PrivateRoute } from "./private_route/PrivateRoute";
import { EditPost } from "./pages/posts/EditPost";
import { Posts } from "./admin/Posts";

function App() {
  const [openCountries, setOpenCountries] = useCycle(false, true);
  const [openCategories, setOpenCategories] = useCycle(false, true);
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {(openCountries || openCategories) && (
        <div className="top-0 bottom-0 right-0 left-0 bg-black opacity-80 h-full flex justify-center items-center fixed z-50"></div>
      )}
      <AppHeader
        openCountries={openCountries}
        setOpenCountries={setOpenCountries}
        openCategories={openCategories}
        setOpenCategories={setOpenCategories}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/countries/:country" element={<PostsPerCountry />} />
        <Route path="/categories/:category" element={<PostsPerCategory />} />
        <Route path="/post/:slug" element={<PostDetailsPage />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/create-post" element={<AddPost />} />
          <Route path="/admin/posts" element={<Posts />} />
          <Route path="/edit-post/:id" element={<EditPost />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
