import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import EndPoint, { BASE_URL } from "../../../apis/EndPoint";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { Popover, OverlayTrigger, Button, Form } from "react-bootstrap";

function EditArticle() {
  const { state } = useLocation();
  const article = state?.article;
  const navigate = useNavigate();

  const [aiOption, setAiOption] = useState("");
  const [aiInput, setAiInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);

  const [formData, setFormData] = useState({
    title: article?.title || "",
    content: article?.content || "",
    shortDescription: article?.shortDescription || "",
    readTime: article?.readTime || "",
    category: article?.category || "",
    status: article?.status || "pending",
    images: article?.images || [],
  });

  if (!article) {
    return <div className="container mt-5">No article data found.</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFiles([...e.target.files]);
  };

  function handleAiOption(option) {
    setAiOption(option);
  }

  const handleAiGenerate = async () => {
    setAiLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/chat/ai-generate`, {
        type: aiOption,
        content: formData.content,
        input: aiInput,
      });

      setFormData((prev) => ({
        ...prev,
        content: res.data.generatedText,
      }));

      setAiLoading(false);
      setAiInput("");
      setAiOption("");
    } catch (err) {
      console.error(err);
      alert("AI generation failed");
      setAiLoading(false);
    }
  };

  const aiPopover = (
    <Popover id="ai-popover" style={{ borderRadius: "15px", minWidth: "300px" }}>
      <Popover.Body>
        <div className="d-flex flex-column gap-3 p-2">
          <Button
            className="d-flex align-items-center justify-content-center shadow-sm"
            style={{
              borderRadius: "12px",
              height: "45px",
              fontWeight: "500",
              background: "linear-gradient(90deg, #007bff, #00c6ff)",
              border: "none",
            }}
            onClick={() => handleAiOption("enhance")}
          >
            Enhance It
          </Button>
          <Button
            className="d-flex align-items-center justify-content-center shadow-sm"
            style={{
              borderRadius: "12px",
              height: "45px",
              fontWeight: "500",
              background: "linear-gradient(90deg, #28a745, #a3e635)",
              border: "none",
            }}
            onClick={() => handleAiOption("topic")}
          >
            🔍 Search by Topic
          </Button>
        </div>
      </Popover.Body>
    </Popover>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      for (let key in formData) {
        data.append(key, formData[key]);
      }
      imageFiles.forEach((file) => data.append("images", file));

      await axios.put(EndPoint.ARTICLE_UPDATE + `/${article._id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Article updated successfully!");
      navigate(-1);
    } catch (error) {
      console.error(error);
      alert("Update failed!");
    }
  };

  return (
    <>
      <Header />
      <div className="d-flex justify-content-center my-4 px-3">
        <div
          className="w-100"
          style={{
            maxWidth: "800px",
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "10px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            padding: "40px",
            position: "relative",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <button
            className="btn btn-outline-dark mb-4"
            onClick={() => navigate(-1)}
          >
            <KeyboardBackspaceIcon /> Back
          </button>

          <h2 className="mb-3 text-center" style={{ color: "#f64100", fontWeight: "700" }}>
            Edit Article
          </h2>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Title */}
            <div className="mb-4">
              <label className="form-label fw-semibold" style={{ color: "#444", fontSize: "14px" }}>
                Title
              </label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter article title"
                style={{ borderRadius: "10px", border: "1px solid #ddd", padding: "12px" }}
              />
            </div>

            {/* Short Description */}
            <div className="mb-4">
              <label className="form-label fw-semibold" style={{ color: "#444", fontSize: "14px" }}>
                Short Description
              </label>
              <textarea
                className="form-control"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                required
                placeholder="Briefly describe your article"
                style={{ borderRadius: "10px", border: "1px solid #ddd", padding: "12px" }}
              />
            </div>

            {/* Content + AI */}
            <div className="mb-4 position-relative">
              <label className="form-label fw-semibold" style={{ color: "#444", fontSize: "14px" }}>
                Content
              </label>
              <textarea
                className="form-control"
                name="content"
                rows={6}
                value={formData.content}
                onChange={handleChange}
                required
                placeholder="Write your full article here..."
                style={{ borderRadius: "10px", border: "1px solid #ddd", padding: "12px" }}
              />
              <OverlayTrigger trigger="click" placement="top" overlay={aiPopover} rootClose>
                <Button
                  className="mt-2"
                  style={{
                    backgroundColor: "#f64100",
                    color: "#fff",
                    borderRadius: "8px",
                    fontWeight: "500",
                    padding: "8px 16px",
                    fontSize: "14px",
                    border: "none",
                  }}
                >
                  <AutoAwesomeIcon className="me-1" /> Write with AI
                </Button>
              </OverlayTrigger>

              {aiOption && (
                <div className="mt-3">
                  <Form.Control
                    type="text"
                    placeholder={aiOption === "enhance" ? "Want to add Anything Specific?" : "Enter a topic..."}
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                  />
                  <Button className="mt-2" onClick={handleAiGenerate} disabled={aiLoading || !aiInput.trim()}>
                    {aiLoading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Generate Content"}
                  </Button>
                  <Button className="mt-2 ms-2" onClick={() => { setAiOption(""); setAiInput(""); }}>Cancel</Button>
                </div>
              )}
            </div>

            {/* Category */}
            <div className="mb-4">
              <label className="form-label fw-semibold" style={{ color: "#444", fontSize: "14px" }}>
                Category
              </label>
              <select
                className="form-select"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                style={{ borderRadius: "10px", border: "1px solid #ddd", padding: "12px" }}
              >
                <option value="">-- Select Category --</option>
                <option value="Folk Art">Folk Art</option>
                <option value="Music">Music</option>
                <option value="Dance">Dance</option>
                <option value="Handicrafts">Handicrafts</option>
                <option value="Festivals">Festivals</option>
                <option value="Traditional Wear">Traditional Wear</option>
                <option value="Classical Art">Classical Art</option>
                <option value="Cultural Heritage">Cultural Heritage</option>
              </select>
            </div>

            {/* Images */}
            <div className="mb-5">
              <label className="form-label fw-semibold" style={{ color: "#444", fontSize: "14px" }}>
                Upload Images
              </label>
              <input
                type="file"
                className="form-control"
                name="images"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                style={{ borderRadius: "10px", border: "1px solid #ddd", padding: "10px" }}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn w-100 py-3 fw-semibold"
              style={{
                backgroundColor: "#f64100",
                color: "#fff",
                borderRadius: "12px",
                fontWeight: "600",
                fontSize: "16px",
                border: "none",
              }}
            >
              Update Article
            </button>
          </form>
        </div>
      </div>
      <Footer />
       <style>{`
        body {
          background-color: #fef6f0;
        }
      `}</style>
    </>
  );
}

export default EditArticle;
