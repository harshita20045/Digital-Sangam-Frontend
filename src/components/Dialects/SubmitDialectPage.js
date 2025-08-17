import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getCurrentUser } from "../auth/Auth";
import axios from "axios";
import EndPoint from "../../apis/EndPoint";

export default function SubmitDialectPage() {
  let user = getCurrentUser();
  const [languages, setLanguages] = useState([]);

  const [formData, setFormData] = useState({
    word: "",
    hindiMeaning: "",
    englishMeaning: "",
    author: user?._id || "",
  });

  const [examples, setExamples] = useState([
    {
      id: Date.now().toString(),
      exampleSentence: "",
      exampleMeaning: {
        hindi: "",
        english: "",
      },
    },
  ]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [audioPreviewUrl, setAudioPreviewUrl] = useState(null);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);

  const showToast = (msg, type = "success") => {
    window.alert(msg);
  };

  useEffect(() => {
    loadLanguages();
  }, []);

  const loadLanguages = async () => {
    const user = getCurrentUser();
    if (!user || !user._id) {
      console.warn("User not logged in");
      return;
    }

    try {
      const res = await axios.get(`${EndPoint.LANGUAGE_LIST}`);
      console.log(res.data);
      setLanguages(res.data.languageName);
    } catch (err) {
      console.error("Failed to load dialects:", err);
    }
  };
  const handleLanguageId = (e) => {
    setFormData(prev => ({ ...prev, language: e.target.value }));

  };
  const handleExampleChange = (id, field, value, isMeaning = false) => {
    setExamples((prevExamples) =>
      prevExamples.map((example) => {
        if (example.id === id) {
          if (isMeaning) {
            return {
              ...example,
              exampleMeaning: {
                ...example.exampleMeaning,
                [field]: value,
              },
            };
          }
          return { ...example, [field]: value };
        }
        return example;
      })
    );
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addExample = () => {
    setExamples((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        exampleSentence: "",
        exampleMeaning: {
          hindi: "",
          english: "",
        },
      },
    ]);
  };

  const removeExample = (id) => {
    if (examples.length > 1)
      setExamples((prev) => prev.filter((ex) => ex.id !== id));
  };

 const handleAudioUpload = (e) => {
  const file = e.target.files?.[0];
  if (file) {
    if (!file.type.startsWith("audio/")) {
      showToast("Please upload a valid audio file", "error");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      showToast("Audio file must be smaller than 10MB", "error");
      return;
    }

    setFormData((prev) => ({ ...prev, audioFile: file })); 
    setAudioPreviewUrl(URL.createObjectURL(file));
  }
};

  const handleRemoveAudio = () => {
    if (audioPreviewUrl) URL.revokeObjectURL(audioPreviewUrl);
    setFormData((prev) => ({ ...prev, audioFile: null }));
    setAudioPreviewUrl(null);
    setIsPlayingPreview(false);
  };

  const handlePlayPreview = () => {
    if (audioPreviewUrl) {
      setIsPlayingPreview(true);
      setTimeout(() => setIsPlayingPreview(false), 3000);
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const fd = new FormData();
    fd.append("word", formData.word);
    fd.append("language", formData.language);
    fd.append("author", formData.author);
    fd.append("status", "pending");

    // meanings
    fd.append("meaning[hindi]", formData.hindiMeaning);
    fd.append("meaning[english]", formData.englishMeaning);

    // audio file
    if (formData.audioFile) {
      fd.append("audio", formData.audioFile);
    }

    // examples array
    examples.forEach((ex, idx) => {
      fd.append(`examples[${idx}][exampleSentence]`, ex.exampleSentence);
      fd.append(`examples[${idx}][exampleMeaning][hindi]`, ex.exampleMeaning.hindi);
      fd.append(`examples[${idx}][exampleMeaning][english]`, ex.exampleMeaning.english);
    });

    await axios.post(EndPoint.ADD_DIALECT, fd, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    showToast("Dialect word submitted successfully! It will be reviewed before publishing.");
    setFormData({
      word: "",
      hindiMeaning: "",
      englishMeaning: "",
      language: "",
      author: user?.id || "",
      status: "pending",
      audioFile: null,
    });

    setExamples([{
      id: Date.now().toString(),
      exampleSentence: "",
      exampleMeaning: { hindi: "", english: "" }
    }]);

    if (audioPreviewUrl) {
      URL.revokeObjectURL(audioPreviewUrl);
      setAudioPreviewUrl(null);
    }
    setErrors({});
  } catch (err) {
    console.error(err);
    showToast("Failed to submit dialect word. Please try again.", "error");
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <div
      className="container-fluid py-5"
      style={{ backgroundColor: "#fef6f0" }}
    >
      <div className="text-center mb-4">
        <h1 className="display-5 fw-bold mb-2">Add Dialect Word</h1>
        <p className="lead">
          Contribute to India's linguistic heritage by adding dialect words,
          meanings, and pronunciations.
        </p>
      </div>
      <div className="alert alert-info">
        <strong>Submission Guidelines:</strong> Please ensure your dialect word
        is authentic and commonly used in your region.
      </div>
      <form onSubmit={handleSubmit}>
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="card-title mb-0">Basic Information</h5>
          </div>
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-md-6 mb-3 mb-md-0">
                <label htmlFor="word" className="form-label">
                  Word <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  id="word"
                  maxLength={100}
                  value={formData.word}
                  onChange={(e) => handleInputChange("word", e.target.value)}
                  placeholder="Enter the dialect word"
                />
                <div className="form-text">
                  {formData.word.length}/100 characters
                </div>
              </div>
              <div className="col-md-6">
                <label htmlFor="language" className="form-label">
                  Language <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  value={formData.language}
                  onChange={handleLanguageId}
                  id="language"
                >
                  <option value="">Select language</option>
                  {languages.map((lang) => (
                    <option key={lang._id} value={lang._id}>
                      {lang.language}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6 mb-3 mb-md-0">
                <label htmlFor="meaningEnglish" className="form-label">
                  Meaning in English <span className="text-danger">*</span>
                </label>
                <textarea
                  className="form-control"
                  id="englishMeaning"
                  rows={3}
                  value={formData.englishMeaning}
                  onChange={(e) =>
                    handleInputChange("englishMeaning", e.target.value)
                  }
                  placeholder="Explain what this word means in English"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="hindiMeaning" className="form-label">
                  Meaning in Hindi
                </label>
                <textarea
                  className="form-control"
                  id="hindiMeaning"
                  rows={3}
                  value={formData.hindiMeaning}
                  onChange={(e) =>
                    handleInputChange("hindiMeaning", e.target.value)
                  }
                  placeholder="हिंदी अर्थ (Optional)"
                />
                <div className="form-text">
                  Optional - helps Hindi speakers understand the word
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="card-title mb-0">Usage Examples</h5>
            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              onClick={addExample}
            >
              + Add Example
            </button>
          </div>
          <div className="card-body">
            {examples.map((ex, idx) => (
              <div key={ex.id} className="border rounded p-3 mb-3 bg-light">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <strong>Example {idx + 1}</strong>
                  {examples.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => removeExample(ex.id)}
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="mb-2">
                  <label className="form-label">Example Sentence</label>
                  <input
                    className="form-control"
                    value={ex.exampleSentence}
                    onChange={(e) =>
                      handleExampleChange(
                        ex.id,
                        "exampleSentence",
                        e.target.value
                      )
                    }
                    placeholder="Write a sentence using this dialect word"
                  />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-2">
                    <label className="form-label">Meaning in English</label>
                    <input
                      className="form-control"
                      value={ex.exampleMeaning.english}
                      onChange={(e) =>
                        handleExampleChange(
                          ex.id,
                          "english",
                          e.target.value,
                          true
                        )
                      }
                      placeholder="Translation in English"
                    />
                  </div>
                  <div className="col-md-6 mb-2">
                    <label className="form-label">Meaning in Hindi</label>
                    <input
                      className="form-control"
                      value={ex.exampleMeaning.hindi}
                      onChange={(e) =>
                        handleExampleChange(
                          ex.id,
                          "hindi",
                          e.target.value,
                          true
                        )
                      }
                      placeholder="हिंदी में अर्थ (Optional)"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-header">
            <h5 className="card-title mb-0">Upload file</h5>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label">Pronunciation Audio</label>
              {!formData.audioFile ? (
                <div className="border border-secondary rounded p-4 text-center mb-1">
                  <input
                    type="file"
                    id="audio"
                    accept="audio/*"
                    onChange={handleAudioUpload}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="audio" className="btn btn-outline-secondary">
                    Upload Audio
                  </label>
                  <div className="form-text">
                    Supports MP3, WAV, AAC, OGG formats • Max 10MB
                  </div>
                </div>
              ) : (
                <div className="border border-success rounded p-3 bg-light d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{formData.audioFile.name}</strong>
                    <div className="text-success">
                      {(formData.audioFile.size / (1024 * 1024)).toFixed(2)} MB
                      • {formData.audioFile.type}
                    </div>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="btn btn-outline-success btn-sm me-2"
                      disabled={!audioPreviewUrl || isPlayingPreview}
                      onClick={handlePlayPreview}
                    >
                      {isPlayingPreview ? "Playing..." : "Preview"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={handleRemoveAudio}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
              <div className="form-text">
                Optional - Audio pronunciation helps others learn the correct
                pronunciation
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-center">
            <div>
              <div className="fw-medium">
                Ready to submit your dialect word?
              </div>
              <div className="text-muted small">
                Your submission will be reviewed and published within 2-3
                business days
              </div>
            </div>
            <div className="d-flex gap-2 mt-3 mt-md-0">
              <button type="button" className="btn btn-outline-secondary">
                Cancel
              </button>
              <button type="submit" className="btn btn-warning">
                {isSubmitting ? "Submitting..." : "Submit Dialect"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
