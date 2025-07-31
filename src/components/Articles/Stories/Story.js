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
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

function Story() {
  const [article, setArticle] = useState([]);
  useEffect(() => {
    loadArticles();
  }, []);
  const loadArticles = async () => {
    let response = await axios.get(EndPoint.all_articles);
    console.log(response.data[1].images[0]);

    setArticle(response.data);
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
              className="btn btn-outline-secondary rounded px-3 py-1"
              style={{
                fontSize: "12px",
                backgroundColor: "#000000",
                color: "white",
              }}
            >
              <IoPricetagOutline className="me-1" />
              All Topics
            </button>
          </div>{" "}
          <div className="col-auto">
            <button
              className="btn btn-outline-secondary rounded px-3 py-1"
              style={{ fontSize: "12px", color: "black" }}
            >
              <IoPricetagOutline className="me-1" />
              All Topics
            </button>
          </div>
          <div className="col-auto">
            <button
              className="btn btn-outline-secondary rounded  px-3 py-1"
              style={{ fontSize: "12px", color: "black" }}
            >
              <IoPricetagOutline className="me-1" />
              All Topics
            </button>
          </div>
          <div className="col-auto">
            <button
              className="btn btn-outline-secondary rounded px-3 py-1"
              style={{ fontSize: "12px", color: "black" }}
            >
              <IoPricetagOutline className="me-1" />
              All Topics
            </button>
          </div>
          <div className="col-auto">
            <button
              className="btn btn-outline-secondary rounded px-3 py-1"
              style={{ fontSize: "12px", color: "black" }}
            >
              <IoPricetagOutline className="me-1" />
              All Topics
            </button>
          </div>
          <div className="col-auto">
            <button
              className="btn btn-outline-secondary rounded px-3 py-1"
              style={{ fontSize: "12px", color: "black" }}
            >
              <IoPricetagOutline className="me-1" />
              All Topics
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
              {[...article]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 2)
                .map((article, index) => (
                  <div key={index} className="col-sm-6 col-md-6 mb-4">
                    <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
                      <img
                        src={
                          article.images && article.images.length > 0
                            ? `${BASE_URL}/article/${article.images[0]}`
                            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc9APxkj0xClmrU3PpMZglHQkx446nQPG6lA&s"
                        }
                        className="card-img-top"
                        alt="Article"
                        style={{ height: "220px", objectFit: "cover" }}
                      />
                      <div className="card-body d-flex flex-column p-4">
                        <div className="mb-2 d-flex gap-2">
                          <span className="badge bg-light text-dark border fw-medium">
                            {article.category}
                          </span>
                          <span className="badge bg-warning text-white fw-medium">
                            Featured
                          </span>
                        </div>
                        <h5 className="card-title text-dark fw-bold mb-2">
                          {article.title}
                        </h5>
                        <p className="text-muted small mb-3">
                          {article.shortDescription ||
                            "Explore the rich traditions of classical arts in India."}
                        </p>
                        <div className="d-flex justify-content-between align-items-center mb-3 text-muted small">
                          <span>
                            <PermIdentityIcon
                              style={{ height: "25px", width: "25px" }}
                            />{" "}
                            {article.author?.name || "Admin"}
                          </span>
                          <span>
                            <AccessTimeIcon /> {article.readTime || "5 min"}
                          </span>
                        </div>
                        <a
                          href={`/article/${article._id}`}
                          className="btn btn-dark btn-sm w-100 mt-3 rounded fw-medium"
                          style={{ height: "32px" }}
                        >
                          Read More →
                        </a>
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

            <div className="card flex-md-row shadow-sm border-0 overflow-hidden mb-4">
              <img
                src={image}
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
                  Category
                </button>
                <h5 className="fw-bold">
                  The Living Traditions of Classical Dance
                </h5>
                <p className="text-muted mb-2">
                  Explore how Bharatnatyam, Kathak, and other classical forms
                  evolve while preserving their ancient essence.
                </p>
                <div className="d-flex justify-content-between small text-muted mb-3">
                  <span style={{ fontSize: "12px" }}>
                    <PermIdentityIcon
                      style={{ height: "20px", width: "20px" }}
                    />{" "}
                    Dr. Priya Krishnan
                  </span>
                  <span style={{ fontSize: "12px" }}>
                    <CalendarTodayIcon style={{ height: "20px", width: "20px" }} />{" "}
                    8 min read
                  </span>{" "}
                  <span style={{ fontSize: "12px" }}>
                    <AccessTimeIcon style={{ height: "20px", width: "20px" }} />{" "}
                    8 min read
                  </span>
                </div>
                <a href="#" className="btn btn-outline-dark btn-sm">
                  Read Article →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Story;
