import { IoPricetagOutline } from "react-icons/io5";
import { FiBookOpen } from "react-icons/fi";
import image from "../../../images/triveniSangam.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import EndPoint, { BASE_URL } from ".././../../apis/EndPoint";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PaletteIcon from "@mui/icons-material/Palette";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import { GiThreeLeaves } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

function Story() {
  const [article, setArticle] = useState([]);
  const [Filterarticle, setFilterArticle] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadArticles();
  }, []);
  const loadArticles = async () => {
    let response = await axios.get(EndPoint.all_articles);
    setArticle(response.data);
    setFilterArticle(response.data);
  };

  const handleFilter = (category) => {
    if (!category || category === "all") {
      setFilterArticle(article); 
    } else {
      const filtered = article.filter((a) => a.category === category);
      setFilterArticle(filtered);
    }
  };

  const handleRead = (article) => {
    navigate(`/article/${article._id}`, { state: { article } });
  };

  return (
    <>
      <div
        className="py-5 text-center mb-4"
        style={{
          background: "linear-gradient(to right, #faf2e8ff, #faececff)",
        }}
      >
        <h1 className="mt-5 fw-semibold">Articles & Stories</h1>
        <p className="text-muted fs-6 mx-auto" style={{ maxWidth: "800px" }}>
          Dive deep into India's rich cultural heritage through expert articles,
          research, and stories that celebrate our diverse traditions.
        </p>
      </div>

      <div className="container mb-3">
        <div className="row justify-content-center gap-1">
          <div className="col-md-4">
            <input
              type="text"
              placeholder="Search articles..."
              className="form-control px-4 py-2 rounded"
              style={{ backgroundColor: "#e3e0e0ff", border: "none" }}
            />
          </div>

          <div className="col-auto">
            <button
              className="btn btn-dark rounded px-3 py-1"
              style={{ fontSize: "12px", color: "white" }}
              onClick={()=>handleFilter("all")}
            >
              <IoPricetagOutline className="me-1" />
              All Articles
            </button>
          </div>
          <div className="col-auto">
            <button
              className="btn btn-outline-secondary rounded px-3 py-1"
              style={{ fontSize: "12px", color: "black" }}
              onClick={()=>handleFilter("Folk Art")}
            >
              <IoPricetagOutline className="me-1" />
              Folk Art
            </button>
          </div>

          <div className="col-auto">
            <button
              className="btn btn-outline-secondary rounded px-3 py-1"
              style={{ fontSize: "12px", color: "black" }}
              onClick={()=>handleFilter("Music")}
            >
              <IoPricetagOutline className="me-1" />
              Music
            </button>
          </div>

          <div className="col-auto">
            <button
              className="btn btn-outline-secondary rounded px-3 py-1"
              style={{ fontSize: "12px", color: "black" }}
              onClick={()=>handleFilter("Dance")}
            >
              <IoPricetagOutline className="me-1" />
              Dance
            </button>
          </div>

          <div className="col-auto">
            <button
              className="btn btn-outline-secondary rounded px-3 py-1"
              style={{ fontSize: "12px", color: "black" }}
              onClick={()=>handleFilter("Handicrafts")}
            >
              <IoPricetagOutline className="me-1" />
              Handicrafts
            </button>
          </div>

          <div className="col-auto">
            <button
              className="btn btn-outline-secondary rounded px-3 py-1"
              style={{ fontSize: "12px", color: "black" }}
              onClick={()=>handleFilter("Festivals")}
            >
              <IoPricetagOutline className="me-1" />
              Festivals
            </button>
          </div>

          <div className="col-auto">
            <button
              className="btn btn-outline-secondary rounded px-3 py-1"
              style={{ fontSize: "12px", color: "black" }}
              onClick={()=>handleFilter("Traditional Wear")}
            >
              <IoPricetagOutline className="me-1" />
              Traditional Wear
            </button>
          </div>

          <div className="col-auto">
            <button
              className="btn btn-outline-secondary rounded px-3 py-1"
              style={{ fontSize: "12px", color: "black" }}
              onClick={()=>handleFilter("Classic Art")}
            >
              <IoPricetagOutline className="me-1" />
              Classical Art
            </button>
          </div>

          <div className="col-auto">
            <button
              className="btn btn-outline-secondary rounded px-3 py-1"
              style={{ fontSize: "12px", color: "black" }}
              onClick={()=>handleFilter("Culture Heritage")}
            >
              <IoPricetagOutline className="me-1" />
              Cultural Heritage
            </button>
          </div>
        </div>
      </div>

      <hr className="mb-0" />

      <div className="container my-5">
        <div className="row pt-3">
          <div className="col-lg-9">
            <div className="d-flex align-items-center mb-1">
              <h4 className="fs-2 mb-1">Featured Articles</h4>
            </div>

            <div className="row g-4 mt-3">
              {article
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 2)
                .map((item, index) => (
                  <div key={index} className="col-sm-6 col-md-6 mb-4">
                    <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
                      <img
                        src={
                          item.images && item.images.length > 0
                            ? `${BASE_URL}/article/${item.images[0]}`
                            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc9APxkj0xClmrU3PpMZglHQkx446nQPG6lA&s"
                        }
                        className="card-img-top"
                        alt="Article"
                        style={{ height: "220px", objectFit: "cover" }}
                      />
                      <div className="card-body d-flex flex-column p-4">
                        <div className="mb-2 d-flex gap-2">
                          <span className="badge bg-light text-dark border fw-medium">
                            {item.category}
                          </span>
                          <span className="badge bg-warning text-white fw-medium">
                            Featured
                          </span>
                        </div>
                        <h5 className="card-title text-dark fw-bold mb-2">
                          {item.title}
                        </h5>
                        <p className="text-muted small mb-3">
                          {item.shortDescription ||
                            "Explore the rich traditions..."}
                        </p>
                        <div className="d-flex justify-content-between align-items-center mb-3 text-muted small">
                          <span>
                            <PermIdentityIcon
                              style={{ height: "25px", width: "25px" }}
                            />{" "}
                            {item.author?.name || "Admin"}
                          </span>
                          <span>
                            <AccessTimeIcon /> {item.readTime +"minute"|| "5 min"}
                          </span>
                        </div>
                        <Link
                          onClick={() => handleRead(item)}
                          className="btn btn-dark btn-sm w-100 mt-3 rounded fw-medium"
                          style={{ height: "32px" }}
                        >
                          Read More →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="col-lg-3">
            <div
              className="sidebar-box mb-4 mt-5 px-3 pt-3 bg-white"
              style={{ border: "1px solid #8c8a8aff", borderRadius: "30px" }}
            >
              <h6 className="fw-bold mb-3 fs-6">Popular Picks</h6>
              <ul className="list-unstyled small">
                <li style={{ marginTop: "8px" }}>
                  <PaletteIcon style={{ color: "#f64100" }} /> Indian Art
                  Through the Ages
                </li>
                <li style={{ marginTop: "5px" }}>
                  <ImportContactsIcon style={{ color: "#f64100" }} /> Stories
                  from the Vedas
                </li>
                <li style={{ marginTop: "5px" }}>
                  <GiThreeLeaves
                    style={{ color: "#f64100", height: "25px", width: "25px" }}
                  />{" "}
                  Ayurveda and Ancient Wellness
                </li>
              </ul>
            </div>

            <div
              className="sidebar-box mb-4 mt-4 p-3 bg-white"
              style={{ border: "1px solid #8c8a8aff", borderRadius: "30px" }}
            >
              <h6 className="fw-bold">Explore Topics</h6>
              <ul className="list-unstyled small">
                <li>Festivals</li>
                <li>Languages</li>
                <li>Architecture</li>
                <li>Philosophy</li>
                <li>Music & Dance</li>
              </ul>
            </div>

            <div
              className="sidebar-box mb-4 mt-4 p-3 bg-white"
              style={{ border: "1px solid #8c8a8aff", borderRadius: "30px" }}
            >
              <h6 className="fw-bold">Quick Insight</h6>
              <p className="mb-0 small text-muted">
                “Culture is the widening of the mind and of the spirit.”
                <br />
                <span className="d-block mt-1 text-end">
                  – Jawaharlal Nehru
                </span>
              </p>
            </div>
          </div>
        </div>
        <hr />
      </div>

      <div className="container mt-3 mb-5">
        <div className="row">
          <div className="col-lg-9">
            <div className="d-flex align-items-center mb-3">
              <FiBookOpen size={26} className="me-2" />
              <h4 className="mb-2 fs-3">All Articles</h4>
            </div>
            {Filterarticle.map((articles, index) => (
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
                      <PermIdentityIcon
                        style={{ height: "20px", width: "20px" }}
                      />{" "}
                      {articles.author.name}
                    </span>
                    <span style={{ fontSize: "12px" }}>
                      <CalendarTodayIcon
                        style={{ height: "20px", width: "20px" }}
                      />{" "}
                      {new Date(articles.createdAt).toLocaleDateString()}
                    </span>{" "}
                    <span style={{ fontSize: "12px" }}>
                      <AccessTimeIcon
                        style={{ height: "20px", width: "20px" }}
                      />{" "}
                      {articles.readTime}minute
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
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Story;
