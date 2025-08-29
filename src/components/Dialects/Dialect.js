import { useEffect, useState, useRef } from "react";
import { FaBookOpen } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import axios from "axios";
import EndPoint from "../../apis/EndPoint";
import { useNavigate } from "react-router-dom";

function Dialect() {
  const [lang, setLang] = useState([]);
  const [dialects, setDialect] = useState([]);
  const [allDialects, setAllDialects] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const audioRefs = useRef({});
  const navigate = useNavigate();

  useEffect(() => {
    loadDialects();
  }, []);

  const loadDialects = async () => {
    try {
      let response = await axios.get(EndPoint.DIALECT_LIST);
      let language = await axios.get(EndPoint.LANGUAGE_LIST);
      setLang(language.data.languageName || []);
      setAllDialects(response.data.dialects || []);
      setDialect(response.data.dialects || []);
    } catch (error) {
      console.error("Failed to load dialects:", error);
    }
  };

  const handleFilter = (language) => {
    if (language === "All") {
      setDialect(allDialects);
    } else {
      const filtered = allDialects.filter(
        (dialect) =>
          dialect.language?.language === language || dialect.language === language
      );
      setDialect(filtered);
    }
  };

  const playAudio = (index) => {
    const audioEl = audioRefs.current[index];
    if (!audioEl) return;

    if (audioEl.paused) {
      Object.values(audioRefs.current).forEach((a) => {
        if (a && !a.paused) {
          a.pause();
          a.currentTime = 0;
        }
      });
      audioEl.play().catch((err) => console.warn("Play error:", err));
    } else {
      audioEl.pause();
      audioEl.currentTime = 0;
    }
  };

  return (
    <>
      <Header />

      <div className="py-5" style={{ backgroundColor: "#fef6f0" }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold d-flex justify-content-center align-items-center gap-2">
              <FaBookOpen className="text-danger" />
              Explore Dialects
            </h2>
            <p className="text-muted">
              Discover words, meanings, and pronunciations from India's diverse languages
            </p>
            <div className="d-flex justify-content-center gap-3 text-muted small mt-2 flex-wrap">
              <span>📚 {lang.length} Languages</span>
              <span>🔊 {allDialects.length} Dialect Words</span>
              <span>🧑‍🤝‍🧑 Community Contributed</span>
            </div>
          </div>

          {/* Filter */}
          <div className="row justify-content-center mb-4 g-2">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control shadow-sm"
                placeholder="Search languages, regions, or words..."
              />
            </div>
            <div className="col-auto">
              <div className="input-group shadow-sm">
                <span className="input-group-text bg-white border-end-0">
                  <FiFilter />
                </span>
                <select
                  className="form-select border-start-0"
                  value={selectedLanguage}
                  onChange={(e) => {
                    setSelectedLanguage(e.target.value);
                    handleFilter(e.target.value);
                  }}
                >
                  <option value="All">All Languages</option>
                  {lang.map((lan, index) => (
                    <option key={index} value={lan.language}>
                      {lan.language}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          
          {dialects.length === 0 ? (
            <p className="text-center text-muted mt-5">No dialects found.</p>
          ) : (
            <div className="row g-4">
              {dialects
                .filter((item) => item.status === "approved")
                .map((dialect, index) => (
                  <div className="col-md-6 col-lg-4" key={index}>
                    <div className="card border-0 shadow-sm rounded-4 p-3 hover-card">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="badge bg-success">New</span>
                        {dialect.audioLink && (
                          <button
                            className="btn btn-light rounded-circle p-2 shadow-sm audio-btn"
                            onClick={() => playAudio(index)}
                          >
                            ▶
                          </button>
                        )}
                        {dialect.audioLink && (
                          <audio ref={(el) => (audioRefs.current[index] = el)}>
                            <source src={dialect.audioLink} type="audio/mpeg" />
                          </audio>
                        )}
                      </div>

                      <h4 className="fw-bold mt-2">{dialect.word}</h4>

                      <div className="p-2 rounded-3 mb-2 bg-light-blue">
                        <small className="fw-bold text-primary">🔊 ENGLISH MEANING</small>
                        <p className="mb-0">{dialect.meaning?.english || "—"}</p>
                      </div>

                      <div className="p-2 rounded-3 mb-2 bg-light-orange">
                        <small className="fw-bold text-warning">🔊 HINDI MEANING</small>
                        <p className="mb-0">{dialect.meaning?.hindi || "—"}</p>
                      </div>

                      <div className="d-flex flex-wrap gap-2 mb-2">
                        {dialect.region && (
                          <span className="badge bg-info text-dark">
                            🌍 {dialect.region}
                          </span>
                        )}
                        {dialect.tags &&
                          dialect.tags.length > 0 &&
                          dialect.tags.map((tag, i) => (
                            <span key={i} className="badge bg-light text-secondary border">
                              #{tag}
                            </span>
                          ))}
                      </div>

                      {dialect.examples?.length > 0 && (
                        <div className="p-2 rounded-3 mb-2 bg-light-example">
                          <small className="fw-bold text-secondary">📖 EXAMPLE</small>
                          <p className="mb-0">{dialect.examples[0].exampleSentence}</p>
                          {dialect.examples[0].exampleMeaning && (
                            <small className="text-muted">
                              — {dialect.examples[0].exampleMeaning.english}
                            </small>
                          )}
                        </div>
                      )}

                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <span className="badge bg-warning text-dark">
                          {dialect.languageName ||
                            dialect.language?.language ||
                            dialect.language}
                        </span>
                        <span className="text-muted small">{dialect.author?.name || "Unknown"}</span>
                      </div>

                      <button onClick={() => navigate(`/view-more`, { state: { dialect } })} className="btn btn-danger rounded-pill mt-3 w-100">
                        View More →
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      <Footer />

      <style>{`
        .hover-card {
          transition: all 0.3s ease;
        }
        .hover-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.12);
        }
        .audio-btn:hover {
          background-color: #f64100 !important;
          color: white;
          transform: scale(1.1);
        }
        .bg-light-blue {
          background-color: #eaf3ff;
        }
        .bg-light-orange {
          background-color: #fff5e0;
        }
        .bg-light-example {
          background-color: #fef8f3;
        }
        @media (max-width: 768px) {
          .hover-card {
            padding: 1.5rem;
          }
        }
      `}</style>
    </>
  );
}

export default Dialect;
