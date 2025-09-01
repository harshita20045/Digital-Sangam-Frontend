import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import EndPoint from "../../../apis/EndPoint";
import { getCurrentUser } from "../../auth/Auth";

import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";


const options = ["Edit", "Delete"];
const ITEM_HEIGHT = 40;

function MyArticles() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articles, setArticles] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const handleClick = (event, article) => {
    setAnchorEl(event.currentTarget);
    setSelectedArticle(article);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRead = (article) => {
    navigate(`/article/${article._id}`, { state: { article } });
  };

  const handleEdit = (article) => {
    handleClose();
    navigate(`/edit-article/${article._id}`, { state: { article } });
  };

  const handleOpenDeleteDialog = () => {
    handleClose();
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setSelectedArticle(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedArticle) return;
    setIsDeleting(true);
    try {
      await axios.delete(`${EndPoint.ARTICLE_DELETE}/${selectedArticle._id}`);
      setArticles((prev) => prev.filter((a) => a._id !== selectedArticle._id));
      handleCloseDeleteDialog();
    } catch (err) {
      console.error("Failed to delete article:", err);
      alert("Failed to delete article. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const loadArticles = async () => {
    const user = getCurrentUser();
     console.log(user);
    if (!user?.id) {
      console.warn("User not logged in or invalid");
      setLoadingArticles(false);
      return;
    }
    setLoadingArticles(true);
    try {
      const res = await axios.get(`${EndPoint.AUTHOR_ARTICLE}/${user.id}`);
      setArticles(res.data);
    } catch (err) {
      console.error("Failed to load articles:", err);
    } finally {
      setLoadingArticles(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const statsDynamic = {
    all: articles.length,
    approved: articles.filter((a) => a.status === "approved").length,
    pending: articles.filter((a) => a.status === "pending" || a.status === "under review").length,
    rejected: articles.filter((a) => a.status === "rejected").length,
  };

  const filteredArticles = articles.filter((a) => {
    if (filter === "all") return true;
    if (filter === "published") return a.status === "approved";
    if (filter === "pending") return a.status === "pending" || a.status === "under review";
    if (filter === "rejected") return a.status === "rejected";
    return true;
  });

  return (
    <>
      <Header />
      <div className="container-fluid mt-0" style={{ padding: "0 5%" }}>
        <div className="d-flex justify-content-between align-items-center mt-5 mb-4">
          <div>
            <h2 className="fw-bold">My Articles</h2>
            <p className="text-muted">
              Manage your submitted articles and track their publication status
            </p>
          </div>
          <Link
            to="/upload-articles"
            className="btn px-4 text-white"
            style={{ backgroundColor: "#f64100" }}
          >
            + Post New Article
          </Link>
        </div>

        <div className="row text-center mb-4 g-5">
          {Object.entries(statsDynamic).map(([key, value]) => {
            const labelMap = {
              all: "Total Articles",
              approved: "Published",
              pending: "Under Review",
              rejected: "Rejected",
            };
            const colorMap = {
              approved: "text-success",
              pending: "text-warning",
              rejected: "text-danger",
            };
            return (
              <div key={key} className="col-md-3">
                <div
                  className="bg-white p-4 rounded-4 shadow-sm h-100"
                  style={{ borderLeft: `5px solid ${colorMap[key] ? "transparent" : "#f64100"}` }}
                >
                  <h4 className={`mb-0 ${colorMap[key] || ""}`}>{value}</h4>
                  <small className="text-muted">{labelMap[key]}</small>
                </div>
              </div>
            );
          })}
        </div>

        <ul className="nav nav-pills mb-4 justify-content-center filter-tabs">
          {Object.entries(statsDynamic).map(([key, value]) => {
            const labelMap = {
              all: `All (${value})`,
              approved: `Published (${value})`,
              pending: `Pending (${value})`,
              rejected: `Rejected (${value})`,
            };
            return (
              <li className="nav-item" key={key}>
                <button
                  className={`nav-link rounded-pill ${filter === key ? "active" : ""}`}
                  onClick={() => setFilter(key)}
                >
                  {labelMap[key]}
                </button>
              </li>
            );
          })}
        </ul>

        {loadingArticles ? (
          <div className="text-center my-5">
            <CircularProgress style={{ color: "#f64100" }} />
            <p className="mt-2 text-muted">Loading articles...</p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center my-5">
            <h4>No articles found</h4>
            <p>You have not posted any articles yet.</p>
          </div>
        ) : (
          filteredArticles.map((article) => (
            <div
              key={article._id}
              className="card flex-md-row shadow-sm border-0 overflow-hidden mb-4 article-card"
            >
              <img
                src={article.images[0]}
                className="img-fluid article-img"
                alt="article"
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <span
                    className="badge mb-2 rounded-pill category-badge"
                  >
                    {article.category}
                  </span>
                  <h5 className="fw-bold">{article.title}</h5>
                  <p className="text-muted mb-2">{article.shortDescription}</p>
                </div>
                <div>
                  <div className="d-flex flex-wrap justify-content-between small text-muted mb-3">
                    <span className="d-flex align-items-center me-3">
                      <PermIdentityIcon style={{ height: "16px", width: "16px" }} className="me-1" />
                      <small>{article.author.name}</small>
                    </span>
                    <span className="d-flex align-items-center me-3">
                      <CalendarTodayIcon style={{ height: "16px", width: "16px" }} className="me-1" />
                      <small>{new Date(article.createdAt).toLocaleDateString()}</small>
                    </span>
                    <span className="d-flex align-items-center">
                      <AccessTimeIcon style={{ height: "16px", width: "16px" }} className="me-1" />
                      <small>{article.readTime} min read</small>
                    </span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <button
                      onClick={() => handleRead(article)}
                      className="btn btn-outline-dark btn-sm read-more-btn"
                    >
                      Read Article →
                    </button>
                    <span
                      className={`badge status-badge status-${article.status}`}
                    >
                      {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <IconButton
                  aria-label="more"
                  onClick={(event) => handleClick(event, article)}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={open && selectedArticle?._id === article._id}
                  onClose={handleClose}
                  PaperProps={{
                    style: { maxHeight: ITEM_HEIGHT * 3, width: "15ch" },
                  }}
                >
                  {options.map((option) => (
                    <MenuItem
                      key={option}
                      onClick={() => {
                        if (option === "Edit") {
                          handleEdit(selectedArticle);
                        } else if (option === "Delete") {
                          handleOpenDeleteDialog();
                        }
                      }}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </div>
          ))
        )}
      </div>

      <Dialog
        open={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this article? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary" disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            style={{ color: "#dc2626" }}
            autoFocus
            disabled={isDeleting}
          >
            {isDeleting ? <CircularProgress size={24} /> : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />

      <style>{`
        body { background-color: #fef6f0; }
        .btn-theme {
          background-color: #f64100;
          color: white;
          border-color: #f64100;
        }
        .btn-theme:hover {
          background-color: #e53900;
          border-color: #e53900;
          color: white;
        }
        .article-card {
          border-radius: 12px;
          min-height: 200px;
        }
        .article-img {
          width: 250px;
          height: 100%;
          object-fit: cover;
        }
        .category-badge {
          background-color: #ffe5dc;
          color: #f64100;
          border: 1px solid #f64100;
          font-weight: 500;
          padding: 5px 10px;
        }
        .read-more-btn {
          color: #f64100 !important;
          border-color: #f64100 !important;
          border-radius: 20px;
          transition: background-color 0.2s, color 0.2s;
        }
        .read-more-btn:hover {
          background-color: #f64100 !important;
          color: white !important;
        }
        .status-badge {
          font-weight: 600;
          text-transform: capitalize;
          padding: 4px 12px;
          border-radius: 20px;
        }
        .status-approved { background-color: #d4edda; color: #155724; }
        .status-pending, .status-under-review { background-color: #fff3cd; color: #856404; }
        .status-rejected { background-color: #f8d7da; color: #721c24; }
        .nav-pills .nav-link.active, .nav-pills .show > .nav-link {
          background-color: #f64100 !important;
        }
        .nav-pills .nav-link {
          color: #f64100;
          margin: 0 5px;
          border: 1px solid #f64100;
          font-weight: 500;
          transition: background-color 0.2s, color 0.2s;
        }
        .nav-pills .nav-link:hover {
          background-color: #ffe5dc;
        }
      `}</style>
    </>
  );
}

export default MyArticles;