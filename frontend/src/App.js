import Header from "./components/header/Header";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/forms/Login";
import Register from "./pages/forms/Register";
import PostsPage from "./pages/posts-page/PostsPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Footer from "./components/footer/Footer";
import CreatePosts from "./pages/create-posts/CreatePosts";
import PostDetails from "./pages/post-details/PostDetails";
import Category from "./pages/categories/Category";
import Profile from "./pages/profile/Profile";
import UsersTable from "./pages/admin/UsersTable";
import PostTable from "./pages/admin/PostTable";
import CategoryTable from "./pages/admin/CategoyTable";
import CommentTable from "./pages/admin/CommentTable";
import ForgetPassword from "./pages/forms/ForgetPassword";
import ResetPassword from "./pages/forms/ResetPassword";
import NotFound from "./pages/not-found/NotFound";
import { useSelector } from "react-redux";
import VerifyEmail from "./pages/verify-email/VerifyEmail";

function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <BrowserRouter className="App">
      <Header />
      <Routes>
        <Route path="" element={<Home />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />

        <Route
          path="/users/:userId/verify/:token"
          element={!user ? <VerifyEmail /> : <Navigate to="/" />}
        />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile/:id" element={<Profile />} />

        <Route path="posts">
          <Route index element={<PostsPage />} />
          <Route path="category/:category" element={<Category />} />
          <Route
            path="create-posts"
            element={user ? <CreatePosts /> : <Navigate to="/" />}
          />
          <Route path="details/:id" element={<PostDetails />} />
        </Route>

        <Route
          path="/admin-dashboard"
          element={user?.isAdmin ? <AdminDashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/admin-dashboard/users-table"
          element={user?.isAdmin ? <UsersTable /> : <Navigate to="/" />}
        />
        <Route
          path="/admin-dashboard/posts-table"
          element={user?.isAdmin ? <PostTable /> : <Navigate to="/" />}
        />
        <Route
          path="/admin-dashboard/category-table"
          element={user?.isAdmin ? <CategoryTable /> : <Navigate to="/" />}
        />
        <Route
          path="/admin-dashboard/comment-table"
          element={user?.isAdmin ? <CommentTable /> : <Navigate to="/" />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
