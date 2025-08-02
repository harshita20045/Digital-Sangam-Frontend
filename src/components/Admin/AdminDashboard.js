import { useEffect, useState } from "react";
import axios from "axios";
import EndPoint from "../../apis/EndPoint";
import "./AdminDashboard.css";
import {
  Nav,
  Table,
  Badge,
  Button,
  Spinner,
  Alert,
  Form,
} from "react-bootstrap";

function AdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [articles, setArticles] = useState([]);
  const [dialects, setDialects] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [filter, setFilter] = useState("all");
  const [language, setNewLanguage] = useState("");
  const [stats, setStats] = useState({
    users: 0,
    articles: 0,
    languages: 0,
    dialects: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    if (activePage === "dialects") {
      fetchDialects();
    }
    if (activePage === "languages") {
      fetchLanguages();
    }
    if (activePage === "articles") {
      fetchArticles();
    }
  }, [activePage]);

  const handleAddLanguage = async () => {
    if (language.trim() === "") return;
    console.log(language);
    setLoading(true);
    setError(null);
    try {
      await axios.post(`${EndPoint.ADD_LANGUAGE}`, { language });
      setNewLanguage("");
      fetchLanguages();
    } catch (err) {
      setError("Failed to add language.");
      console.error("Failed to add language:", err);
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteLanguage = async (languageId) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${EndPoint.DELETE_LANGUAGE}/${languageId}`);
      fetchLanguages();
    } catch (err) {
      setError("Failed to delete language.");
      console.error("Failed to delete language:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateArticleStatus = async (articleId, status) => {
    setLoading(true);
    setError(null);
    try {
      console.log(articleId);
      console.log("Calling:", `${EndPoint.UPDATE_ARTICLE_STATUS}/${articleId}`);

      await axios.put(`${EndPoint.UPDATE_ARTICLE_STATUS}/${articleId}`, {
        status,
      });

      fetchArticles();
    } catch (err) {
      setError("Failed to update article status.");
      console.error("Failed to update article status:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateDialectStatus = async (dialectId, status) => {
    setLoading(true);
    setError(null);
    try {
      await axios.put(`${EndPoint.UPDATE_DIALECT_STATUS}/${dialectId}`, {
        status,
      });
      fetchDialects();
    } catch (err) {
      setError("Failed to update dialect status.");
      console.error("Failed to update dialect status:", err);
    } finally {
      setLoading(false);
    }
  };
  const fetchDialects = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${EndPoint.ADMIN_ALL_DIALECTS}`);
      setDialects(res.data.dialects || []);
    } catch (err) {
      setError("Failed to fetch dialects.");
      console.error("Failed to fetch dialects:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchLanguages = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${EndPoint.ADMIN_ALL_LANGUAGES}`);
      console.log(res.data.languageName);
      setLanguages(res.data.languageName || []);
    } catch (err) {
      setError("Failed to fetch languages.");
      console.error("Failed to fetch languages:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchArticles = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${EndPoint.ADMIN_ALL_ARTICLES}`);
      setArticles(res.data.articles || []);
    } catch (err) {
      setError("Failed to fetch articles.");
      console.error("Failed to fetch articles:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${EndPoint.STATS}`);
      setStats(res.data);
    } catch (err) {
      setError("Failed to fetch stats.");
      console.error("Failed to fetch stats:", err);
    } finally {
      setLoading(false);
    }
  };

  const getBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "warning";
      case "approved":
        return "success";
      case "rejected":
        return "danger";
      default:
        return "secondary";
    }
  };

  const filteredDialects =
    filter === "all"
      ? dialects
      : dialects.filter((d) => d.status.toLowerCase() === filter);

  const filteredArticles = articles.filter((article) => {
    if (filter === "all") return true;
    return article.status.toLowerCase() === filter;
  });

  const renderContent = () => {
    if (loading) {
      return <Spinner animation="border" />;
    }

    if (error) {
      return <Alert variant="danger">{error}</Alert>;
    }

    switch (activePage) {
      case "dashboard":
        return (
          <>
            <h2 className="mt-3">Admin Dashboard</h2>
            <p className="text-muted">
              Overview of your content moderation platform
            </p>
            <div className="d-flex gap-3 flex-wrap mb-4">
              {[
                {
                  id: 1,
                  label: "Total Users",
                  value: stats.users,
                  icon: "👥",
                  bg: "bg-primary text-white",
                },
                {
                  id: 2,
                  label: "Languages",
                  value: stats.languages,
                  icon: "🌐",
                  bg: "bg-success text-white",
                },
                {
                  id: 3,
                  label: "Articles",
                  value: stats.articles,
                  icon: "📰",
                  bg: "bg-warning text-dark",
                },
                {
                  id: 4,
                  label: "Dialects",
                  value: stats.dialects,
                  icon: "🗣️",
                  bg: "bg-secondary text-dark",
                },
              ].map((stat) => (
                <div
                  key={stat.id}
                  className={`rounded-3 p-3 flex-grow-1 flex-shrink-0 ${stat.bg}`}
                  style={{ minWidth: "220px" }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="mb-1">{stat.label}</p>
                      <h4 className="fw-bold">{stat.value}</h4>
                    </div>
                    <div className="opacity-75 fs-2">{stat.icon}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        );

      case "articles":
        return (
          <div className="container py-4">
            <h2 className="mb-2">Articles Management</h2>
            <p className="text-muted mb-4">
              Manage and moderate article submissions
            </p>
            <ul className="nav nav-pills mb-3">
              {["all", "pending", "approved", "rejected"].map((tab) => (
                <li className="nav-item" key={tab}>
                  <button
                    className={`nav-link ${filter === tab ? "active" : ""}`}
                    onClick={() => setFilter(tab)}
                  >
                    {tab === "all"
                      ? "All Articles"
                      : tab.charAt(0).toUpperCase() +
                        tab.slice(1) +
                        " Articles"}
                  </button>
                </li>
              ))}
            </ul>
            <div className="table-responsive rounded shadow-sm border">
              <table className="table table-striped align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredArticles.map((article) => (
                    <tr key={article._id}>
                      <td>{article.title}</td>
                      <td>
                        <div>{article.author.name}</div>
                        <div className="text-muted small">
                          {article.author.email}
                        </div>
                      </td>
                      <td>
                        <span
                          className={`badge bg-${getBadgeColor(
                            article.status
                          )}`}
                        >
                          {article.status}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary me-2">
                          View
                        </button>
                        {article.status.toLowerCase() === "pending" && (
                          <>
                            <button
                              onClick={() =>
                                handleUpdateArticleStatus(
                                  article._id,
                                  "approved"
                                )
                              }
                              className="btn btn-sm btn-success me-2"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() =>
                                handleUpdateArticleStatus(
                                  article._id,
                                  "rejected"
                                )
                              }
                              className="btn btn-sm btn-danger me-2"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        <button className="btn btn-sm btn-dark">Delete</button>
                      </td>
                    </tr>
                  ))}
                  {filteredArticles.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center text-muted py-3">
                        No articles found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "dialects":
        return (
          <div className="container mt-4">
            <h2>Dialect Management</h2>
            <p>Manage and moderate dialect submissions</p>
            <Nav
              variant="tabs"
              activeKey={filter}
              onSelect={(k) => setFilter(k)}
            >
              <Nav.Item>
                <Nav.Link eventKey="all">All Dialects</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="pending">Pending Dialects</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="approved">Approved Dialects</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="rejected">Rejected Dialects</Nav.Link>
              </Nav.Item>
            </Nav>
            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>Dialect</th>
                  <th>Language</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDialects.map((d) => (
                  <tr key={d.id}>
                    <td>{d.name}</td>
                    <td>{d.language}</td>
                    <td>
                      <Badge bg={getBadgeColor(d.status)}>{d.status}</Badge>
                    </td>
                    <td>
                      <Button size="sm" variant="secondary" className="me-2">
                        View
                      </Button>
                      {d.status === "pending" && (
                        <>
                          <Button
                            onClick={() =>
                              handleUpdateDialectStatus(d._id, "approved")
                            }
                            size="sm"
                            variant="success"
                            className="me-2"
                          >
                            Approve
                          </Button>
                          <Button
                            onClick={() =>
                              handleUpdateDialectStatus(d.id, "rejected")
                            }
                            size="sm"
                            variant="danger"
                            className="me-2"
                          >
                            Reject
                          </Button>
                        </>
                      )}
                      <Button size="sm" variant="danger">
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        );

      case "languages":
        return (
          <div className="container mt-4">
            <h2>Languages Management</h2>
            <p>Manage and moderate language submissions</p>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddLanguage();
              }}
            >
              <Form.Group controlId="formNewLanguage">
                <Form.Label>Add New Language</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter new language"
                  value={language}
                  onChange={(e) => setNewLanguage(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Add Language
              </Button>
            </Form>
            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>Language</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {languages.map((lang) => (
                  <tr key={lang.id}>
                    <td>{lang.language}</td>
                    <td>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDeleteLanguage(lang._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
                {languages.length === 0 && (
                  <tr>
                    <td colSpan="2" className="text-center text-muted py-3">
                      No languages found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        );

      default:
        return <h2>Select a page</h2>;
    }
  };

  const handleLogout = () => {
    alert("Logged out!");
  };

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <h3 className="logo">Admin</h3>
        <ul>
          <li onClick={() => setActivePage("dashboard")}>Dashboard</li>
          <li onClick={() => setActivePage("articles")}>Articles</li>
          <li onClick={() => setActivePage("dialects")}>Dialects</li>
          <li onClick={() => setActivePage("languages")}>Languages</li>

          <li onClick={handleLogout} className="logout">
            Logout
          </li>
        </ul>
      </div>
      <div className="admin-main">
        <div className="admin-header">
          <h2>{activePage.replace("-", " ").toUpperCase()}</h2>
        </div>
        <div className="admin-content">{renderContent()}</div>
      </div>
    </div>
  );
}

export default AdminDashboard;
