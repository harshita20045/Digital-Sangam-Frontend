import { FiSend } from "react-icons/fi";
import { HiLocationMarker } from "react-icons/hi";
import { IoMdMail, IoMdTime } from "react-icons/io";
import { LuPhone } from "react-icons/lu";

function Form() {
  return (
    <>
      <div className="container px-4 px-md-5 py-5">
        <div className="row justify-content-center align-items-stretch g-5">
          <div className="col-12 col-md-5 pt-3 mb-4 mb-md-0">
            <h3 className="mb-3 text-dark">Get in Touch</h3>{" "}
            <p className="text-muted mb-5" style={{ fontSize: "0.9rem" }}>
              Whether you're a researcher, educator, or someone passionate about
              Indian culture, we welcome your questions, suggestions, and
              collaboration ideas.
            </p>
            <div className="d-flex align-items-center mb-4">
              <div className=" d-flex justify-content-center align-items-center me-3">
                <IoMdMail
                  style={{ color: "#F64100", height: "25px", width: "25px" }}
                />
              </div>
              <div>
                <h6
                  className="fw-semibold mb-0"
                  style={{ fontSize: "0.95rem" }}
                >
                  Email
                </h6>
                <p className="text-muted mb-0" style={{ fontSize: "0.85rem" }}>
                  contact@digitalsangam.org
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center mb-4">
              <div className="d-flex justify-content-center align-items-center me-3">
                <LuPhone
                  style={{ color: "#F64100", height: "25px", width: "25px" }}
                />
              </div>
              <div>
                <h6
                  className="fw-semibold mb-0"
                  style={{ fontSize: "0.95rem" }}
                >
                  Phone
                </h6>
                <p className="text-muted mb-0" style={{ fontSize: "0.85rem" }}>
                  +91 7470361548
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center mb-4">
              <div className="d-flex justify-content-center align-items-center me-3">
                <HiLocationMarker
                  style={{ color: "#F64100", height: "25px", width: "25px" }}
                />
              </div>
              <div>
                <h6
                  className="fw-semibold mb-0"
                  style={{ fontSize: "0.95rem" }}
                >
                  Address
                </h6>
                <p className="text-muted mb-0" style={{ fontSize: "0.85rem" }}>
                  Indore, Madhya Pradesh
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center mb-4">
              <div className=" d-flex justify-content-center align-items-center me-3">
                <IoMdTime
                  style={{ color: "#F64100", height: "25px", width: "25px" }}
                />
              </div>
              <div>
                <h6
                  className="fw-semibold mb-0"
                  style={{ fontSize: "0.95rem" }}
                >
                  Hours
                </h6>
                <p className="text-muted mb-0" style={{ fontSize: "0.85rem" }}>
                  Monday - Friday: 9:00 AM - 6:00 PM IST
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div
              className="card rounded-4 h-100"
              style={{ border: "1px solid #cdcdcdff" }}
            >
              <div className="card-body p-1 p-md-5">
                <h6 className="card-title mb-4" style={{ fontWeight: "100" }}>
                  Send Message
                </h6>
                <form>
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control px-3"
                        style={{
                          backgroundColor: "#f5f1f1ff",
                          borderRadius: "10px",
                          fontSize: "12px",
                        }}
                        placeholder="Your Name"
                        aria-label="Your Name"
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="email"
                        style={{
                          backgroundColor: "#f5f1f1ff",
                          borderRadius: "10px",
                          fontSize: "12px",
                        }}
                        className="form-control  px-3"
                        placeholder="Your Email"
                        aria-label="Your Email"
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control px-3"
                      style={{
                        backgroundColor: "#f5f1f1ff",
                        borderRadius: "10px",
                        fontSize: "12px",
                      }}
                      placeholder="Subject"
                      aria-label="Subject"
                    />
                  </div>
                  <div className="mb-4">
                    <textarea
                      className="form-control py-3 px-3"
                      style={{
                        backgroundColor: "#f5f1f1ff",
                        borderRadius: "10px",
                        fontSize: "12px",
                      }}
                      placeholder="Your Message"
                      rows="4"
                    ></textarea>
                  </div>
                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn fw-semibold btn-primary py-2"
                      style={{
                        background:
                          "linear-gradient(to right, #f97316, #dc2626)",
                        fontSize: "12px",
                        color: "white",
                      }}
                    >
                      <FiSend style={{ color: "white" }} />
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="m-0 p-0" />
    </>
  );
}

export default Form;
