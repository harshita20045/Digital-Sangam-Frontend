import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import { useEffect, useState } from "react";
import EndPoint, { BASE_URL } from "../../../apis/EndPoint";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import { Link, useNavigate } from "react-router-dom";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import axios from "axios";
import { getCurrentUser } from "../../auth/Auth";

function MyArticles() {
  const stats = {
    total: 5,
    published: 2,
    underReview: 2,
    rejected: 1,
  };
  let navigate = useNavigate();
  const [article, setArticles] = useState([]);
  const handleRead = (article) => {
    navigate(`/article/${article._id}`, { state: { article } });
  };
  useEffect(() => {
    loadArticles();
  }, []);
  const loadArticles = async () => {
  const user = getCurrentUser();
  if (!user || !user._id) {
    console.warn("User not logged in or invalid");
    return;
  }

  try {
    const res = await axios.get(`${EndPoint.AUTHOR_ARTICLE}/${user._id}`);
    setArticles(res.data);
  } catch (err) {
    console.error("Failed to load articles:", err);
  }
};


  return (
    <>
      <Header />
      <div className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold">My Articles</h2>
            <p className="text-muted">
              Manage your submitted articles and track their publication status
            </p>
          </div>
          <Link to="/upload-articles" className="btn btn-dark px-4">
            + Post New Article
          </Link>
        </div>

        <div className="row text-center mb-4 g-3">
          <div className="col-md-3">
            <div className="bg-white p-4 rounded shadow-sm">
              <h4 className="mb-0">{stats.total}</h4>
              <small className="text-muted">Total Articles</small>
            </div>
          </div>
          <div className="col-md-3">
            <div className="bg-white p-4 rounded shadow-sm">
              <h4 className="mb-0 text-success">{stats.published}</h4>
              <small className="text-muted">Published</small>
            </div>
          </div>
          <div className="col-md-3">
            <div className="bg-white p-4 rounded shadow-sm">
              <h4 className="mb-0 text-warning">{stats.underReview}</h4>
              <small className="text-muted">Under Review</small>
            </div>
          </div>
          <div className="col-md-3">
            <div className="bg-white p-4 rounded shadow-sm">
              <h4 className="mb-0 text-danger">{stats.rejected}</h4>
              <small className="text-muted">Rejected</small>
            </div>
          </div>
        </div>

        <ul className="nav nav-pills mb-4 justify-content-center">
          <li className="nav-item">
            <button className="nav-link active">All ({stats.total})</button>
          </li>
          <li className="nav-item">
            <button className="nav-link">Published ({stats.published})</button>
          </li>
          <li className="nav-item">
            <button className="nav-link">Pending ({stats.underReview})</button>
          </li>
          <li className="nav-item">
            <button className="nav-link">Rejected ({stats.rejected})</button>
          </li>
        </ul>

        {article.length === 0 ? (
          <div className="text-center my-5">
            <h4>No articles found</h4>
            <p>You have not posted any articles yet.</p>
          </div>
        ) : (
  article.map((articles, index) => (

          <div
            key={index}
            className="card flex-md-row shadow-sm border-0 overflow-hidden mb-4"
          >
            <img
              src={
                articles.images && articles.images.length > 0
                  ? `${BASE_URL}/article/${articles.images[0]}`
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc9APxkj0xClmrU3PpMZglHQkx446nQPG6lA&s"
              }
              className="img-fluid"
              alt="article"
              style={{
                width: "250px",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <div className="card-body">
              <button
                className="mt-0 mb-2 fs-7 rounded-pill"
                style={{
                  border: "#f64100",
                  color: "#f64100",
                  fontSize: "10px",
                }}
              >
                {articles.category}
              </button>
              <h5 className="fw-bold">{articles.title}</h5>
              <p className="text-muted mb-2">{articles.shortDescription}</p>
              <div className="d-flex justify-content-between small text-muted mb-3">
                <span style={{ fontSize: "12px" }}>
                  <PermIdentityIcon style={{ height: "20px", width: "20px" }} />{" "}
                  {articles.author.name}
                </span>
                <span style={{ fontSize: "12px" }}>
                  <CalendarTodayIcon
                    style={{ height: "20px", width: "20px" }}
                  />{" "}
                 {new Date(articles.createdAt).toLocaleDateString()}
                </span>{" "}
                <span style={{ fontSize: "12px" }}>
                  <AccessTimeIcon style={{ height: "20px", width: "20px" }} />{" "}
                  {articles.readTime} minute
                </span>
              </div>
              <button
                onClick={() => handleRead(articles)}
                href="#"
                className="btn btn-outline-dark btn-sm"
              >
                Read Article →
              </button>
            </div>
          </div>
        )))}
      </div>
      <Footer />
    </>
  );
}

export default MyArticles;
