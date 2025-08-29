import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Help from "./components/Help/Help";
import Contact from "./components/Contact/Contact";
import Login from "./components/login/Login";
import SignUp from "./components/signUp/SignUp";
import Article from "./components/Articles/Article";
import Profile from "./components/Profile/Profile";
import Dialect from "./components/Dialects/Dialect";
import EditProfile from "./components/Profile/EditProfile";
import ArticleDetail from "./components/Articles/Read/ArticleDetail";
import MyArticles from "./components/Articles/My Articles/MyArticles";
import ArticleUploadForm from "./components/Articles/My Articles/ArticleUploadForm";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminLogin from "./components/Admin/AdminLogin";
import MyDialects from "./components/Dialects/Mydialects";
import SubmitDialectPage from "./components/Dialects/SubmitDialectPage";
import ViewMore from "./components/Dialects/ViewMore";
import EditArticle from "./components/Articles/My Articles/EditArticle";
import Auth from "./components/auth/Auth";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/articles" element={<Article />} />
        <Route path="/profile" element={<Auth><Profile /></Auth>} />
        <Route path="/edit-profile" element={<Auth><EditProfile /></Auth>} />
        <Route path="/dialects" element={<Dialect />} />
        <Route path="/article/:id" element={<Auth><ArticleDetail /></Auth>} />
        <Route path="/my-articles" element={<Auth><MyArticles /></Auth>} />
        <Route path="/my-dialects" element={<Auth><MyDialects /></Auth>} />
        <Route path="/add-dialect" element={<Auth><SubmitDialectPage /></Auth>} />
        <Route path="/view-more" element={<Auth><ViewMore /></Auth>} />
        <Route path="/upload-articles" element={<Auth><ArticleUploadForm /></Auth>} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/edit-article/:id" element={<Auth><EditArticle /></Auth>} />
      </Routes>
      
    </>
  );
}

export default App;
