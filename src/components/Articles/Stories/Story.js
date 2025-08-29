import { IoPricetagOutline } from "react-icons/io5";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import EndPoint from "../../../apis/EndPoint";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PaletteIcon from "@mui/icons-material/Palette";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import { GiThreeLeaves } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

function Story() {
  const [article, setArticle] = useState([]);
  const [Filterarticle, setFilterArticle] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const articlesPerPage = 6;
  const navigate = useNavigate();
  const allArticlesRef = useRef(null);

  const categories = [
    "all",
    "Folk Art",
    "Music",
    "Dance",
    "Handicrafts",
    "Festivals",
    "Traditional Wear",
    "Classical Art",
    "Cultural Heritage",
  ];

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    let response = await axios.get(EndPoint.all_articles);
    setArticle(response.data);
    setFilterArticle(response.data);
  };

  const handleFilter = (category) => {
    setCurrentPage(1);
    let filtered = article;
    if (category && category !== "all") {
      filtered = article.filter((a) => a.category === category);
    }
    if (searchTerm) {
      filtered = filtered.filter((a) =>
        a.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilterArticle(filtered);
    allArticlesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setCurrentPage(1);
    const filtered = article.filter(
      (a) =>
        a.status === "approved" &&
        a.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilterArticle(filtered);
    allArticlesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleRead = (article) => {
    navigate(`/article/${article._id}`, { state: { article } });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

 
  const indexOfLast = currentPage * articlesPerPage;
  const indexOfFirst = indexOfLast - articlesPerPage;
  const currentArticles = Filterarticle
    .filter((item) => item.status === "approved")
    .slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(
    Filterarticle.filter((item) => item.status === "approved").length /
      articlesPerPage
  );

  return (
    <>
      {/* Header */}
      <div
        className="py-5 text-center mb-4"
        style={{ background: "linear-gradient(to right, #fff7f0, #fff2e5)" }}
      >
        <h1 className="mt-5 fw-bold">Articles & Stories</h1>
        <p className="text-muted fs-6 mx-auto" style={{ maxWidth: "800px" }}>
          Explore India's cultural richness through articles, stories, and
          research that celebrate our traditions.
        </p>
      </div>

      {/* Search & Filters */}
      <div
        className="container mb-3 sticky-top bg-white py-3"
        style={{ zIndex: 999 }}
      >
        <div className="d-flex flex-wrap justify-content-center gap-2 mb-2">
          <input
            type="text"
            placeholder="Search articles..."
            className="form-control"
            style={{ maxWidth: "300px" }}
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="d-flex flex-wrap justify-content-center gap-2">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className={`btn ${
                cat === "all" ? "btn-dark" : "btn-outline-secondary"
              } filter-btn`}
              onClick={() => handleFilter(cat)}
            >
              <IoPricetagOutline className="me-1" />
              {cat === "all" ? "All Articles" : cat}
            </button>
          ))}
        </div>
      </div>

      <hr className="mb-0" />

      <div className="container my-5">
        <div className="row">
          <div className="col-lg-9">
            <h4 className="fs-2 mb-4">Featured Articles</h4>
            <div className="row g-4">
              {article
                .filter((item) => item.status === "approved")
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 2)
                .map((item, index) => (
                  <div key={index} className="col-sm-6">
                    <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden hover-shadow transition">
                      <img
                        src={
                          item.images?.[0] || "https://via.placeholder.com/400x220"
                        }
                        className="card-img-top"
                        alt="Article"
                        style={{ height: "220px", objectFit: "cover" }}
                      />
                      <div className="card-body d-flex flex-column p-4">
                        <div className="mb-2 d-flex gap-2">
                          <span className="badge bg-light text-dark fw-medium">
                            {item.category}
                          </span>
                          <span className="badge bg-warning text-white fw-medium">
                            Featured
                          </span>
                        </div>
                        <h5 className="card-title fw-bold mb-2">{item.title}</h5>
                        <p className="text-muted small mb-3">
                         
                          {item.shortDescription?.length > 100
                            ? item.shortDescription.slice(0, 100) + "..."
                            : item.shortDescription || "Explore the rich traditions..."}
                        </p>
                        <div className="d-flex justify-content-between align-items-center mb-3 text-muted small">
                          <span>
                            <PermIdentityIcon style={{ height: "25px", width: "25px" }} />{" "}
                            {item.author?.name || "Admin"}
                          </span>
                          <span>
                            <AccessTimeIcon /> {item.readTime} min
                          </span>
                        </div>
                        <button
                          onClick={() => handleRead(item)}
                          className="btn btn-dark btn-sm w-100 rounded fw-medium"
                          style={{ height: "32px" }}
                        >
                          Read More →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

      
          <div className="col-lg-3">
            <div className="bg-white p-3 mb-4 rounded-4 shadow-sm">
              <h6 className="fw-bold mb-3 fs-6">Popular Picks</h6>
              <ul className="list-unstyled small">
                <li className="mb-2">
                  <PaletteIcon style={{ color: "#f64100" }} /> Indian Art Through the Ages
                </li>
                <li className="mb-2">
                  <ImportContactsIcon style={{ color: "#f64100" }} /> Stories from the Vedas
                </li>
                <li className="mb-2">
                  <GiThreeLeaves style={{ color: "#f64100", height: "20px", width: "20px" }} /> Ayurveda and Ancient Wellness
                </li>
              </ul>
            </div>

            <div className="bg-white p-3 mb-4 rounded-4 shadow-sm">
              <h6 className="fw-bold mb-2">Explore Topics</h6>
              <ul className="list-unstyled small">
                <li>Festivals</li>
                <li>Languages</li>
                <li>Architecture</li>
                <li>Philosophy</li>
                <li>Music & Dance</li>
              </ul>
            </div>

            <div className="bg-white p-3 mb-4 rounded-4 shadow-sm">
              <h6 className="fw-bold mb-2">Quick Insight</h6>
              <p className="small text-muted mb-0">
                “Culture is the widening of the mind and of the spirit.”<br />
                <span className="d-block mt-1 text-end">– Jawaharlal Nehru</span>
              </p>
            </div>
          </div>
        </div>

        <hr />

        
        <div ref={allArticlesRef} className="row mt-4 g-4">
          {currentArticles.length === 0 ? (
            <div className="col-12 text-center text-muted">
              <p>No articles found for your search or selected category.</p>
            </div>
          ) : (
            currentArticles.map((articles, index) => (
              <div key={index} className="col-lg-4 col-md-6 col-sm-12">
                <div className="card rounded-4 overflow-hidden shadow-sm hover-shadow transition">
                  <div className="position-relative">
                    <img
                      src={articles.images?.[0] || "https://via.placeholder.com/400x250"}
                      alt={articles.title}
                      className="card-img-top"
                      style={{ height: "220px", objectFit: "cover" }}
                    />
                    <div className="overlay d-flex justify-content-center align-items-center">
                      <button
                        onClick={() => handleRead(articles)}
                        className="btn btn-dark btn-sm"
                      >
                        Read More →
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <span className="badge bg-danger mb-2">{articles.category}</span>
                    <h5 className="fw-bold">{articles.title}</h5>
                    <p className="text-muted small">{
                      articles.shortDescription?.length > 100
                        ? articles.shortDescription.slice(0, 100) + "..."
                        : articles.shortDescription || "Explore the rich traditions..."
                    }</p>
                    <div className="d-flex justify-content-between small text-muted">
                      <span>
                        <PermIdentityIcon style={{ height: "20px", width: "20px" }} />{" "}
                        {articles.author.name}
                      </span>
                      <span>
                        <CalendarTodayIcon style={{ height: "20px", width: "20px" }} />{" "}
                        {new Date(articles.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-center mt-4 flex-wrap gap-2">
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentPage(idx + 1);
                allArticlesRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`btn pagination-btn ${
                currentPage === idx + 1 ? "btn-dark" : "btn-outline-secondary"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .hover-shadow:hover { box-shadow: 0 8px 25px rgba(0,0,0,0.15); transition: 0.3s; }
        .transition { transition: all 0.3s; }
        .overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.3); opacity: 0; transition: 0.3s; border-radius: 0.5rem; }
        .card:hover .overlay { opacity: 1; }
        .filter-btn { border-radius: 50px; padding: 0.4rem 1rem; font-size: 0.8rem; transition: 0.3s; }
        .filter-btn:hover { background: linear-gradient(90deg, #f64100, #ff7a00); color: white !important; transform: scale(1.05); }
        .pagination-btn { min-width: 40px; transition: 0.3s; }
        .pagination-btn:hover { transform: scale(1.1); }
        .sticky-top { position: sticky; top: 0; background: white; z-index: 999; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
      `}</style>
    </>
  );
}

export default Story;
