import { useState } from "react";
import { FaBookOpen } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const LANGUAGES = [
  {
    name: "Bhojpuri",
    region: "Bihar, Eastern UP",
    description:
      "A widely spoken dialect known for its vibrant cinema, folk music, and rich culture.",
    speakers: "52+ million",
    words: 24,
    icon: "🌽",
  },
  {
    name: "Tamil",
    region: "Tamil Nadu, Sri Lanka",
    description:
      "One of the oldest languages with rich literary traditions spanning over 2,000 years.",
    speakers: "75+ million",
    words: 18,
    icon: "🏛️",
  },
  {
    name: "Marathi",
    region: "Maharashtra",
    description:
      "The official language of Maharashtra with diverse regional variations and literature.",
    speakers: "83+ million",
    words: 31,
    icon: "🌳",
  },
  {
    name: "Gujarati",
    region: "Gujarat",
    description:
      "Known for its business terminology and vibrant cultural expressions.",
    speakers: "56+ million",
    words: 22,
    icon: "🪔",
  },
];

function Dialect() {
  const [selectedLang, setSelectedLang] = useState("All Languages");

  return (
    <>
      <Header />

      <div className="bg-light py-5">
        <div className="container">

          {/* Header */}
          <div className="text-center mb-4">
            <h2 className="fw-bold d-flex justify-content-center align-items-center gap-2">
              <FaBookOpen className="text-danger" />
              Explore Dialects
            </h2>
            <p className="text-secondary">
              Discover words, meanings, and pronunciations from India's diverse languages
            </p>
            <div className="d-flex justify-content-center gap-3 text-muted small mt-2">
              <span>📚 12 Languages</span>
              <span>🔊 272 Dialect Words</span>
              <span>🧑‍🤝‍🧑 Community Contributed</span>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="row justify-content-center mb-4">
            <div className="col-md-6 mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search languages, regions, or words..."
              />
            </div>
            <div className="col-auto">
              <button className="btn btn-outline-secondary">
                <FiFilter className="me-2" />
                {selectedLang}
              </button>
            </div>
          </div>

          {/* Subtitle */}
          <div className="mb-3">
            <h5 className="fw-semibold">Select a Language</h5>
            <p className="text-muted small">
              Choose a language to explore its dialect words, meanings, and pronunciations.
            </p>
          </div>

          {/* Language Cards */}
          <div className="row g-4">
            {LANGUAGES.map((lang, idx) => (
              <div className="col-md-6 col-lg-3" key={idx}>
                <div className="card h-100 shadow-sm border-start border-4 border-danger">
                  <div className="card-body d-flex flex-column">
                    <h6 className="card-title fw-bold d-flex align-items-center gap-2">
                      <span>{lang.icon}</span> {lang.name}
                    </h6>
                    <p className="text-muted small mb-1">{lang.region}</p>
                    <p className="card-text text-secondary small mb-2" style={{ minHeight: "60px" }}>
                      {lang.description}
                    </p>
                    <p className="small mb-1">
                      <strong>Speakers:</strong> {lang.speakers}
                    </p>
                    <p className="small mb-3">
                      <strong>Dialect Words:</strong> {lang.words}
                    </p>
                    <button className="btn btn-link text-danger mt-auto p-0 d-flex align-items-center">
                      Explore Words <IoIosArrowForward className="ms-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default Dialect;
