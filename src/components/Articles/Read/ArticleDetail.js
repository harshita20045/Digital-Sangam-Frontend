import { useLocation } from "react-router-dom";
import EndPoint from "../../../apis/EndPoint";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import DownloadIcon from "@mui/icons-material/Download";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "react-share";
import DOMPurify from "dompurify";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";
import { getCurrentUser } from "../../auth/Auth";

function ArticleDetail() {
  const { state } = useLocation();
  const article = state?.article;

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(article?.likes?.length || 0);



  const articleUrl = `https://digital-sangam-frontend.onrender.com/article/${article._id}`;

  useEffect(() => {
    const fetchArticleLikes = async () => {
      let response = await axios.get(`${EndPoint.GET_ARTICLE_LIKES}/${article._id}`);
      console.log(response.data.numberOfLikes);
      setLiked(response.data.liked);
      setLikeCount(response.data.numberOfLikes);
    };
    fetchArticleLikes();
  }, [article]);

    if (!article) {
    return <div className="container mt-5">No article data found.</div>;
  }
  const handleDownloadPdf = () => {
    const input = document.getElementById("article-content");
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${article.title}.pdf`);
    });
  };

  const handleLikeToggle = async () => {
    try {
      const currentUserId = getCurrentUser()?._id;
      if (!currentUserId) return alert("Please login to like articles.");

      if (liked) {
        // Unlike
        await axios.post(`${EndPoint.UNLIKE_ARTICLE}`, {
          article: article._id,
          user: currentUserId,
        });
        setLikeCount((prev) => prev - 1);
        setLiked(false);
      } else {
        
        const response = await axios.post(`${EndPoint.LIKE_ARTICLE}`, {
          articleId: article._id,
          userId: currentUserId,
        });
        setLikeCount(response.data.numberOfLikes);
        setLiked(true);
      }
    } catch (err) {
      console.error("Failed to toggle like:", err);
    }
  };

  return (
    <>
      <Header />
      <div className="container my-5">
        <button
          className="btn btn-outline-primary mb-4 d-flex align-items-center gap-2"
          onClick={() => window.history.back()}
        >
          <IoArrowBackCircleOutline size={22} /> Back
        </button>

        <div
          className="shadow-sm p-4 bg-white rounded-4 article-container"
          style={{ maxWidth: "900px", margin: "0 auto" }}
        >
          <img
            src={article.images[0] || "https://via.placeholder.com/900x450"}
            alt={article.title}
            className="img-fluid rounded-4 mb-4"
            style={{ width: "100%", maxHeight: "450px", objectFit: "cover" }}
          />

     
          <div className="text-center mb-4">
            <span className="badge bg-dark px-3 py-2 mb-2 fs-6">
              {article.category || "Culture"}
            </span>
            <h1 className="fw-bold mt-2" style={{ fontSize: "2rem" }}>
              {article.title}
            </h1>
          </div>

        
          <div className="d-flex flex-wrap justify-content-center text-muted small mb-4 gap-4">
            <div className="d-flex align-items-center gap-1">
              <AccountCircleIcon /> {article.author?.name || "Author"}
            </div>
            <div className="d-flex align-items-center gap-1">
              <CalendarMonthIcon /> {new Date(article.createdAt).toDateString()}
            </div>
            <div className="d-flex align-items-center gap-1">
              <AccessTimeFilledIcon /> {article.readTime} min read
            </div>
          </div>

        
          <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
            <button
              className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1"
              onClick={handleLikeToggle}
            >
              {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />} {likeCount}
            </button>

            <button className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1">
              <BookmarkBorderIcon /> Save
            </button>

            <button
              className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1"
              onClick={handleDownloadPdf}
            >
              <DownloadIcon /> Download
            </button>

          
            <div className="d-flex gap-2 mt-2 mt-md-0">
              <FacebookShareButton url={articleUrl} quote={article.title}>
                <FacebookIcon size={36} round />
              </FacebookShareButton>
              <TwitterShareButton url={articleUrl} title={article.title}>
                <TwitterIcon size={36} round />
              </TwitterShareButton>
              <WhatsappShareButton url={articleUrl} title={article.title}>
                <WhatsappIcon size={36} round />
              </WhatsappShareButton>
              <LinkedinShareButton url={articleUrl} title={article.title}>
                <LinkedinIcon size={36} round />
              </LinkedinShareButton>
            </div>
          </div>
           <div className="short-description mb-3">{article.shortDescription}</div>

          <div
            id="article-content"
            className="article-content"
            style={{ lineHeight: "1.8", fontSize: "1.1rem", color: "#333", textAlign: "justify" }}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content) }}
          />
        </div>
      </div>

      <Footer />

      <style>{`
        .article-container { transition: all 0.3s ease; }
        .article-container:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(0,0,0,0.12); }
        .btn-outline-danger:hover { background-color: #dc3545; color: white; border-color: #dc3545; }
        .btn-outline-primary:hover { background: linear-gradient(90deg, #f64100, #ff7a00); color: white; border-color: #f64100; }
         .short-description { font-size: 0.9rem; color: #666; }
        .btn-outline-secondary:hover { background-color: #6c757d; color: white; border-color: #6c757d; }
        @media (max-width: 768px) { .article-container { padding: 1.5rem; } }
      `}</style>
    </>
  );
}

export default ArticleDetail;
