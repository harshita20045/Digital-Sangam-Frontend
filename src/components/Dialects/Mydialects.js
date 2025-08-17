import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { getCurrentUser } from "../auth/Auth";
import EndPoint from "../../apis/EndPoint";
import { FaRegFrown, FaVolumeUp } from "react-icons/fa";

function MyDialects() {
  const navigate = useNavigate();
  const [dialects, setDialects] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");

  const stats = {
    total: dialects.length,
    pending: dialects.filter((d) => d.status === "pending").length,
    approved: dialects.filter((d) => d.status === "approved").length,
    rejected: dialects.filter((d) => d.status === "rejected").length,
  };

  useEffect(() => {
    loadDialects();
  }, []);

  const loadDialects = async () => {
    const user = getCurrentUser();
    if (!user || !user._id) return;

    try {
      const res = await axios.get(`${EndPoint.AUTHOR_DIALECT}/${user._id}`);
      setDialects(res.data.dialects || []);
    } catch (err) {
      console.error("Failed to load dialects:", err);
    }
  };

  const handleView = (dialect) => {
    navigate(`/view-more`, { state: { dialect } });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this dialect?")) return;

    try {
      await axios.delete(`${EndPoint.DELETE_DIALECT}/${id}`);
      setDialects(dialects.filter((d) => d._id !== id));
    } catch (err) {
      console.error("Failed to delete dialect:", err);
    }
  };

  const filteredDialects =
    statusFilter === "all" ? dialects : dialects.filter((d) => d.status === statusFilter);

  return (
    <>
      <Header />
      <div className="container my-5">
        {/* Title + Add Button */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <div>
            <h2 className="fw-bold" style={{ color: "#060606ff" }}>My Dialects</h2>
            <p className="text-muted">
              Manage your submitted dialects and view their classifications
            </p>
          </div>
          <Link
            to="/add-dialect"
            className="btn px-4 shadow-sm"
            style={{
              backgroundColor: "#f64100",
              color: "#fff",
              border: "none",
            }}
          >
            + Add New Dialect
          </Link>
        </div>

       
        <div className="mb-4 d-flex align-items-center gap-2 flex-wrap">
          <label className="fw-semibold mb-0">Filter by Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="form-select w-auto border-primary"
            style={{ minWidth: 140 }}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

      
        <div className="row text-center mb-5 g-3">
          {[
            { label: "Total Dialects", value: stats.total, color: "text-dark" },
            { label: "Pending", value: stats.pending, color: "text-warning" },
            { label: "Approved", value: stats.approved, color: "text-success" },
            { label: "Rejected", value: stats.rejected, color: "text-danger" },
          ].map((stat, i) => (
            <div key={i} className="col-md-3">
              <div className="bg-light p-4 rounded-4 shadow-sm h-100 d-flex flex-column justify-content-center"
              style={{
                 backgroundColor: "#f8f9fa",
                
                 borderRadius: "12px",
                  borderLeft: "4px solid #f64100"
               }}
               >
                <h3 className={`mb-0 fw-bold ${stat.color}`}>{stat.value}</h3>
                <small className="text-muted">{stat.label}</small>
              </div>
            </div>
          ))}
        </div>

        {filteredDialects.length === 0 ? (
          <div className="text-center py-5">
            <FaRegFrown size={60} className="mb-3 text-muted" />
            <h4 className="mb-2">No dialects found</h4>
            <p className="text-muted">
              {dialects.length === 0
                ? "You haven't added any dialects yet. Start by adding one!"
                : "No dialects found for the selected status."}
            </p>
            <Link to="/add-dialect" className="btn btn-primary mt-3">
              + Add New Dialect
            </Link>
          </div>
        ) : (
          <div className="row g-4">
            {filteredDialects.map((dialect, index) => (
              <div key={index} className="col-md-6 col-lg-4">
                <div className="card shadow-sm border-0 h-100 hover-card">
                  <div className="card-body d-flex flex-column">
                    {/* Header: Language + Status */}
                    <div className="d-flex justify-content-between mb-2 flex-wrap gap-2">
                      <span className="badge bg-info text-dark rounded-pill px-3 py-1">
                        {dialect.language?.language || "Unknown"}
                      </span>
                      <span
                        className={`badge rounded-pill px-3 py-1 ${
                          dialect.status === "approved"
                            ? "bg-success"
                            : dialect.status === "pending"
                            ? "bg-warning text-dark"
                            : "bg-danger"
                        }`}
                      >
                        {dialect.status}
                      </span>
                    </div>

                    {/* Word */}
                    <h5 className="fw-bold mt-2 mb-3">{dialect.word}</h5>

                    {/* Meaning */}
                    <div className="mb-2">
                      <span className="fw-semibold">Meaning: </span>
                      <span className="text-muted">
                        {dialect.meaning?.english || "—"} / {dialect.meaning?.hindi || "—"}
                      </span>
                    </div>

                    {/* Example */}
                    {dialect.examples?.length > 0 && (
                      <div className="mb-2">
                        <span className="fw-semibold">Example: </span>
                        <span className="text-muted">
                          {dialect.examples[0]?.exampleSentence || "—"}
                        </span>
                      </div>
                    )}

                    {/* Audio */}
                    {dialect.audioLink && (
                      <div className="mb-3">
                        <audio controls src={dialect.audioLink} style={{ width: "100%" }} />
                        <div className="text-end text-muted small mt-1">
                          <FaVolumeUp /> Listen
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="mt-auto d-flex gap-2 flex-wrap">
                      <button
                        onClick={() => handleView(dialect)}
                        className="btn btn-outline-primary flex-grow-1"
                      >
                        View Dialect →
                      </button>
                      <button
                        onClick={() => handleDelete(dialect._id)}
                        className="btn btn-outline-danger flex-grow-1"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />

      <style>{`
      body {
        background-color: #fef6f0;
      }
        .hover-card {
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.15);
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

export default MyDialects;
