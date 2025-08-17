import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { FaRobot } from "react-icons/fa";
import axios from "axios";
import { IoArrowBackCircleOutline } from "react-icons/io5";

function ViewMore() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dialect = state?.dialect;

  const [aiExample, setAiExample] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [loadingAi, setLoadingAi] = useState(false);

  const handleAiGenerate = async () => {
    if (!aiExample) return alert("Please enter a word");
    setLoadingAi(true);
    try {
      const res = await axios.post("http://localhost:3000/chat/example", {
        word: aiExample,
      });

      const rawText = res.data.generatedText || "No example returned";

      const examples = rawText
        .split(/Example \d+:?/i)
        .map((e) => e.trim())
        .filter((e) => e.length > 0);

      setAiResult(examples);
    } catch (err) {
      console.error(err);
      alert("AI generation failed");
    } finally {
      setLoadingAi(false);
    }
  };

  if (!dialect) {
    return (
      <>
        <Header />
        <div className="container py-5 text-center">
          <h4 className="text-danger">No dialect data available</h4>
          <button
            className="btn btn-outline-primary mt-3"
            onClick={() => navigate(-1)}
          >
            ← Go Back
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container py-5">
        <button
          className="btn  mb-4 d-flex align-items-center gap-2"
          style={{
            marginBottom: "20px",
            backgroundColor: "#da5d19ff",
            height: "40px",
            padding: "0 12px",
            borderRadius: "20px",
            width: "fit-content",
          }}
          onClick={() => window.history.back()}
        >
          <IoArrowBackCircleOutline size={22} /> Back
        </button>
        <div className="row g-5 align-items-start">
          <div className="col-lg-8 col-12 mb-4 mb-lg-0">
            <div className="dialect-card shadow-lg border-0">
              <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                <span className="badge bg-gradient-primary px-3 py-1 rounded-pill fs-6">
                  {dialect.language?.language || "Unknown"}
                </span>
                <span
                  className={`badge rounded-pill px-3 py-1 fs-6 status-badge status-${dialect.status}`}
                  style={{ textTransform: "capitalize" }}
                >
                  {dialect.status}
                </span>
              </div>

              <h1 className="fw-bolder mb-4 display-4 text-primary word-title">
                {dialect.word}
              </h1>

              <section className="mb-4">
                <h5 className="fw-semibold mb-3 border-bottom pb-2 text-secondary">
                  Meaning
                </h5>
                <div className="row gx-5">
                  <div className="col-12 col-md-6 mb-2">
                    <div className="p-3 meaning-box shadow-sm">
                      <strong>English:</strong>{" "}
                      {dialect.meaning?.english || "—"}
                    </div>
                  </div>
                  <div className="col-12 col-md-6 mb-2">
                    <div className="p-3 meaning-box shadow-sm">
                      <strong>Hindi:</strong> {dialect.meaning?.hindi || "—"}
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-4">
                <h5 className="fw-semibold mb-3 border-bottom pb-2 text-secondary">
                  Examples
                </h5>
                {dialect.examples?.length > 0 ? (
                  <ul className="list-unstyled">
                    {dialect.examples.map((ex, idx) => (
                      <li key={idx} className="example-card mb-3">
                        <div className="d-flex align-items-start">
                          <span className="example-index badge bg-secondary me-3 mt-1">
                            {idx + 1}
                          </span>
                          <div>
                            <p className="fst-italic mb-1 fs-5">
                              {ex.exampleSentence}
                            </p>
                            <div className="small text-muted">
                              <span className="me-3">
                                <strong>EN:</strong>{" "}
                                {ex.exampleMeaning?.english || "—"}
                              </span>
                              <span>
                                <strong>HI:</strong>{" "}
                                {ex.exampleMeaning?.hindi || "—"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-muted fst-italic">
                    No examples added yet.
                  </div>
                )}
              </section>

              {dialect.author && (
                <section className="mb-4">
                  <h5 className="fw-semibold mb-3 border-bottom pb-2 text-secondary">
                    Author
                  </h5>
                  <div className="author-box d-flex align-items-center gap-4 p-3">
                    <div>
                      <span className="d-block">
                        <strong>Name:</strong>{" "}
                        {dialect.author.name || "Unknown"}
                      </span>
                      <span className="d-block">
                        <strong>Email:</strong>{" "}
                        {dialect.author.email || "Unknown"}
                      </span>
                    </div>
                  </div>
                </section>
              )}

              <section>
                <h5 className="fw-semibold mb-3 border-bottom pb-2 text-secondary">
                  Timestamps
                </h5>
                <div className="row small text-muted">
                  <div className="col-12 col-md-6 mb-2">
                    <span>
                      <strong>Created:</strong>{" "}
                      {new Date(dialect.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="col-12 col-md-6 mb-2">
                    <span>
                      <strong>Updated:</strong>{" "}
                      {new Date(dialect.updatedAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <div className="col-lg-4 col-12">
            <div className="ai-card shadow-lg border-0 px-4 py-4">
              <div className="fw-bold mb-4 d-flex align-items-center gap-2 text-ai-orange fs-5">
                <FaRobot /> <span>AI Suggestions</span>
              </div>
              <input
                type="text"
                className="form-control mb-3 input-focus ai-input"
                placeholder="Type a word to get AI example..."
                value={aiExample}
                onChange={(e) => setAiExample(e.target.value)}
              />
              <button
                className="btn btn-ai-orange w-100 mb-4 fs-6"
                onClick={handleAiGenerate}
                disabled={loadingAi}
              >
                {loadingAi ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />{" "}
                    Generating...
                  </>
                ) : (
                  "See AI Examples"
                )}
              </button>
              {aiResult && (
                <div className="mt-2 p-3 bg-light rounded ai-result-box">
                  <strong>AI Example:</strong>
                  <ul className="ps-3">
                    {Array.isArray(aiResult) ? (
                      aiResult.map((res, i) => (
                        <li key={i} className="mb-1">
                          {res}
                        </li>
                      ))
                    ) : (
                      <li>{aiResult}</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        body { background: #fef6f0 !important; font-family: 'Inter', sans-serif; }
        .dialect-card, .ai-card {
          background: #fff;
          border-radius: 18px;
          padding: 2.2rem 2.5rem;
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, .10);
        }
        .dialect-card {
          border-left: 6px solid #f64100;
          transition: box-shadow 0.2s;
        }
        .dialect-card:hover {
          box-shadow: 0 16px 40px 0 rgba(31,38,135,.14);
        }
        .word-title {
          color: #f64100 !important;
          letter-spacing: 1px;
        }
        .meaning-box {
          background: #f8fafc;
          border: 1.5px solid #eaf0f6;
          border-radius: 10px;
        }
        .example-card {
          background: linear-gradient(90deg, #ffe5dc 0%, #f8fafc 80%);
          border-radius: 12px;
          padding: 16px 20px;
          transition: 0.3s;
          border: 1px solid #ffd2c2;
        }
        .example-card:hover {
          transform: scale(1.025);
          box-shadow: 0 6px 18px rgba(246,65,0,.09);
        }
        .example-index {
          font-size: 1rem;
          min-width: 2rem;
          text-align: center;
          background: #ffd2c2 !important;
          color: #f64100 !important;
        }
        .author-box {
          background: #fff4ef;
          border-radius: 8px;
          border: 1px solid #ffe5dc;
        }
        .ai-card {
          min-width: 0;
          height: fit-content;
          border-left: 6px solid #f6410025;
          background: linear-gradient(135deg, #f8fafc 70%, #ffe5dc 100%);
        }
        .ai-input:focus {
          border-color: #f64100;
          box-shadow: 0 0 0 0.2rem rgba(246,65,0,0.18);
        }
        .btn-ai-orange {
          background: linear-gradient(90deg, #f64100 0%, #ff7a3d 100%);
          border: none;
          color: #fff;
          transition: 0.18s;
        }
        .btn-ai-orange:hover, .btn-ai-orange:focus {
          background: linear-gradient(90deg, #ff7a3d 0%, #f64100 100%);
          filter: brightness(1.15);
          color: #fff;
        }
        .ai-result-box {
          border: 1.5px solid #ffe5dc;
        }
        .status-badge {
          color: #fff !important;
          font-weight: 600;
          border: none;
        }
        .status-approved {
          background: linear-gradient(90deg, #f64100 0%, #ff7a3d 100%) !important;
        }
        .status-pending {
          background: linear-gradient(90deg, #ffe066 0%, #ffd43b 100%) !important;
          color: #6c5100 !important;
        }
        .status-rejected, .status-other {
          background: linear-gradient(90deg, #fc5c7d 0%, #fdaf7b 100%) !important;
        }
        .text-ai-orange {
          color: #f64100 !important;
        }
        @media (max-width: 991.98px) {
          .dialect-card, .ai-card {
            padding: 1.5rem 1.2rem;
          }
          .word-title {
            font-size: 2rem;
          }
        }
        @media (max-width: 767.98px) {
          .dialect-card, .ai-card {
            padding: 1.2rem 0.5rem;
          }
          .word-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </>
  );
}

export default ViewMore;
