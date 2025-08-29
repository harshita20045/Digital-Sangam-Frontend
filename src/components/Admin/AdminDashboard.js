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
    if (activePage === "dialects") fetchDialects();
    if (activePage === "languages") fetchLanguages();
    if (activePage === "articles") fetchArticles();
  }, [activePage]);

  const handleAddLanguage = async () => {
    if (language.trim() === "") return;
    setLoading(true);
    setError(null);
    try {
      await axios.post(`${EndPoint.ADD_LANGUAGE}`, { language });
      setNewLanguage("");
      fetchLanguages();
    } catch (err) {
      setError("Failed to add language.");
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
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateArticleStatus = async (articleId, status) => {
    setLoading(true);
    setError(null);
    try {
      await axios.put(`${EndPoint.UPDATE_ARTICLE_STATUS}/${articleId}`, { status });
      fetchArticles();
    } catch (err) {
      setError("Failed to update article status.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateDialectStatus = async (dialectId, status) => {
    setLoading(true);
    setError(null);
    try {
      await axios.put(`${EndPoint.UPDATE_DIALECT_STATUS}/${dialectId}`, { status });
      fetchDialects();
    } catch (err) {
      setError("Failed to update dialect status.");
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
    } finally {
      setLoading(false);
    }
  };

  const fetchLanguages = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${EndPoint.ADMIN_ALL_LANGUAGES}`);
      setLanguages(res.data.languageName || []);
    } catch (err) {
      setError("Failed to fetch languages.");
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
    } finally {
      setLoading(false);
    }
  };

  const getBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending": return "warning";
      case "approved": return "success";
      case "rejected": return "danger";
      default: return "secondary";
    }
  };

  const filteredDialects = filter === "all" ? dialects : dialects.filter((d) => d.status.toLowerCase() === filter);
  const filteredArticles = filter === "all" ? articles : articles.filter((a) => a.status.toLowerCase() === filter);

  const renderContent = () => {
    if (loading) return <div className="text-center p-5"><Spinner animation="border" /></div>;
    if (error) return <Alert variant="danger">{error}</Alert>;

    switch (activePage) {
      case "dashboard":
        return (
          <>
            <h2 className="mb-4 fw-semibold">Dashboard</h2>
            <div className="row g-3">
              {[{
                label: "Total Users", value: stats.users, icon: "👥", bg: "primary"
              }, {
                label: "Languages", value: stats.languages, icon: "🌐", bg: "success"
              }, {
                label: "Articles", value: stats.articles, icon: "📰", bg: "warning"
              }, {
                label: "Dialects", value: stats.dialects, icon: "🗣️", bg: "secondary"
              }].map((stat, i) => (
                <div className="col-md-3" key={i}>
                  <div className="card shadow-sm border-0">
                    <div className="card-body d-flex justify-content-between align-items-center">
                      <div>
                        <p className="text-muted mb-1 small">{stat.label}</p>
                        <h4 className="fw-bold mb-0">{stat.value}</h4>
                      </div>
                      <div className={`icon-circle bg-${stat.bg} text-white`}>
                        {stat.icon}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        );

      case "articles":
        return (
          <div>
            <h2 className="mb-4 fw-semibold">Articles Management</h2>
            <ul className="nav nav-pills mb-3">
              {["all", "pending", "approved", "rejected"].map((tab) => (
                <li className="nav-item" key={tab}>
                  <button className={`nav-link ${filter === tab ? "active" : ""}`} onClick={() => setFilter(tab)}>
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
            <div className="card shadow-sm border-0">
              <div className="card-body p-0">
                <Table responsive hover striped className="mb-0">
                  <thead className="table-light">
                    <tr><th>Title</th><th>Author</th><th>Status</th><th className="text-end">Actions</th></tr>
                  </thead>
                  <tbody>
                    {filteredArticles.map((article) => (
                      <tr key={article._id}>
                        <td>{article.title}</td>
                        <td>
                          <div>{article.author.name}</div>
                          <small className="text-muted">{article.author.email}</small>
                        </td>
                        <td><Badge bg={getBadgeColor(article.status)}>{article.status}</Badge></td>
                        <td className="text-end">
                          <div className="btn-group">
                            <Button size="sm" variant="outline-primary">View</Button>
                            {article.status.toLowerCase() === "pending" && (
                              <>
                                <Button onClick={() => handleUpdateArticleStatus(article._id, "approved")} size="sm" variant="success">Approve</Button>
                                <Button onClick={() => handleUpdateArticleStatus(article._id, "rejected")} size="sm" variant="danger">Reject</Button>
                              </>
                            )}
                            <Button size="sm" variant="dark">Delete</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredArticles.length === 0 && <tr><td colSpan="4" className="text-center text-muted py-3">No articles found</td></tr>}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        );
      case "languages":
        return (
          <div>
            <h2 className="mb-3 fw-bold">🌐 Languages Management</h2>
            <Form onSubmit={(e) => { e.preventDefault(); handleAddLanguage(); }} className="d-flex gap-2 mb-3">
              <Form.Control type="text" placeholder="Enter new language" value={language} onChange={(e) => setNewLanguage(e.target.value)} />
              <Button variant="primary" type="submit">Add</Button>
            </Form>
            <Table hover bordered responsive>
              <thead className="table-light">
                <tr><th>Language</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {languages.map((lang) => (
                  <tr key={lang._id}>
                    <td>{lang.language}</td>
                    <td>
                      <Button size="sm" variant="danger" onClick={() => handleDeleteLanguage(lang._id)}>Delete</Button>
                    </td>
                  </tr>
                ))}
                {languages.length === 0 && <tr><td colSpan="2" className="text-center text-muted py-3">No languages found</td></tr>}
              </tbody>
            </Table>
          </div>
        );

      case "dialects":
        return (
          <div>
            <h2 className="mb-3 fw-bold">🗣️ Dialect Management</h2>
            <Nav variant="tabs" activeKey={filter} onSelect={(k) => setFilter(k)}>
              <Nav.Item><Nav.Link eventKey="all">All</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link eventKey="pending">Pending</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link eventKey="approved">Approved</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link eventKey="rejected">Rejected</Nav.Link></Nav.Item>
            </Nav>
            <Table hover bordered responsive className="mt-3">
              <thead className="table-light">
                <tr><th>Dialect</th><th>Language</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {filteredDialects.map((d) => (
                  <tr key={d._id}>
                    <td>{d.name}</td>
                    <td>{d.language}</td>
                    <td><Badge bg={getBadgeColor(d.status)}>{d.status}</Badge></td>
                    <td>
                      <Button size="sm" variant="outline-secondary" className="me-2">View</Button>
                      {d.status === "pending" && (
                        <>
                          <Button size="sm" variant="success" className="me-2" onClick={() => handleUpdateDialectStatus(d._id, "approved")}>Approve</Button>
                          <Button size="sm" variant="danger" onClick={() => handleUpdateDialectStatus(d._id, "rejected")}>Reject</Button>
                        </>
                      )}
                      <Button size="sm" variant="dark">Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        );

      default:
        return <h2>Select a page</h2>;
    }
  };

 return (
    <div className="d-flex admin-wrapper">
      {/* Sidebar */}
      <aside className="admin-sidebar shadow-sm">
        <div className="logo mb-4">⚙️ <span>Admin Panel</span></div>
        <ul className="nav flex-column gap-2">
          {["dashboard", "articles", "dialects", "languages"].map((item) => (
            <li key={item}>
              <Button
                variant={activePage === item ? "primary" : "outline-light"}
                className="w-100 text-start sidebar-btn"
                onClick={() => setActivePage(item)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Button>
            </li>
          ))}
          <li className="mt-auto">
            <Button variant="danger" className="w-100 sidebar-btn">Logout</Button>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-grow-1 p-4 bg-light">
        <div className="card shadow-sm border-0 p-4 admin-content">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
