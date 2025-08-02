import React, { useState } from "react";
import axios from "axios";
import { getCurrentUser } from "../../auth/Auth";

function ArticleUploadForm() {
  let user =getCurrentUser()
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    shortDescription: "",
    readTime: "",
    category: "",
    author:user._id,
    images: [],
  });

  const [imageFiles, setImageFiles] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFiles([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      for (let key in formData) {
        data.append(key, formData[key]);
      }
      imageFiles.forEach((file) => data.append("images", file));

      const res = await axios.post("http://localhost:3000/article", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Article uploaded!");
      console.log(res.data);
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Upload Article</h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required minLength={2} maxLength={200} />
        </div>

        <div className="mb-3">
          <label className="form-label">Short Description</label>
          <textarea className="form-control" name="shortDescription" value={formData.shortDescription} onChange={handleChange} required maxLength={300} />
        </div>

        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea className="form-control" name="content" rows={6} value={formData.content} onChange={handleChange} required />
        </div>

     
        <div className="mb-3">
  <label className="form-label">Category</label>
  <select
    className="form-select"
    name="category"
    value={formData.category}
    onChange={handleChange}
    required
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


        <div className="mb-3">
          <label className="form-label">Images (multiple allowed)</label>
          <input type="file" className="form-control" name="images" multiple accept="image/*" onChange={handleImageChange} />
        </div>

        <button type="submit" className="btn btn-primary">Submit Article</button>
      </form>
    </div>
  );
};

export default ArticleUploadForm;
