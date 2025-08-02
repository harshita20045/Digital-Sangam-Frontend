import { useEffect, useState } from "react";
import { FaBookOpen } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import axios from "axios";
import EndPoint from "../../apis/EndPoint";

function Dialect() {
  const [lang, setLang] = useState([]);
  const [dialects, setDialect] = useState([]);
  const [allDialects, setAllDialects] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("All");

  useEffect(() => {
    loadDialects();
  }, []);

  const loadDialects = async () => {
    try {
      let response = await axios.get(EndPoint.DIALECT_LIST);
      let language = await axios.get(EndPoint.LANGUAGE_LIST);
      setLang(language.data.languageName);
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
        (dialect) => dialect.language === language
      );
      setDialect(filtered);
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
              Discover words, meanings, and pronunciations from India's diverse
              languages
            </p>
            <div className="d-flex justify-content-center gap-3 text-muted small mt-2">
              <span>📚 12 Languages</span>
              <span>🔊 272 Dialect Words</span>
              <span>🧑‍🤝‍🧑 Community Contributed</span>
            </div>
          </div>

          <div className="row justify-content-center mb-4">
            <div className="col-md-6 mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search languages, regions, or words..."
              />
            </div>
            <div className="col-auto">
              <div className="input-group">
                <span className="input-group-text">
                  <FiFilter />
                </span>
                <select
                  className="form-select"
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
            <p className="text-center text-muted">No dialects found.</p>
          ) : (
            <div className="row g-4">
              {dialects.map((dialect, index) => (
                <div className="col-md-6 col-lg-4" key={index}>
                  <div className="card h-100 shadow-sm border-0 rounded-4">
                    <div className="card-body">
                      <h5 className="card-title text-danger mb-2">
                        {dialect.word}
                      </h5>

                      <p className="mb-1">
                        <strong>Meaning:</strong> {dialect.meaning}
                      </p>

                      <p className="mb-1">
                        <strong>Language:</strong> {dialect.language}
                      </p>

                      <p className="mb-1">
                        <strong>Example:</strong> {dialect.example}
                      </p>

                      {dialect.audioLink && (
                        <audio controls className="w-100 mt-3">
                          <source src={dialect.audioLink} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      )}
                    </div>
                   
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Dialect;
