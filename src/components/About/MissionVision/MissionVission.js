import { FaEye } from "react-icons/fa6";
import { FiTarget } from "react-icons/fi";

function MissionVission() {
  return (
    <>
      <div className="container my-5">
        <div className="row g-4 justify-content-center">
       
          <div className="col-12 col-md-5">
            <div
              className="p-4 h-100 shadow-sm"
              style={{
                borderRadius: "20px",
                border: "1px solid #d1d1d1",
                borderLeft: "6px solid #F64100",
                backgroundColor: "#fff",
              }}
            >
              <h5 className="fw-bold mb-3">
                <FiTarget style={{ color: "#F64100" }} /> Our Mission
              </h5>
              <p className="text-muted">
                To create the world's most comprehensive digital repository of Indian cultural heritage, making it accessible, interactive, and engaging for current and future generations.
              </p>
              <ul className="text-muted ps-3">
                <li>Preserve endangered languages and dialects through digital documentation</li>
                <li>Connect tribal communities with the modern world while respecting their traditions</li>
                <li>Educate young Indians about their rich cultural heritage</li>
              </ul>
            </div>
          </div>

       
          <div className="col-12 col-md-5">
            <div
              className="p-4 h-100 shadow-sm"
              style={{
                borderRadius: "20px",
                border: "1px solid #d1d1d1",
                borderLeft: "6px solid #F64100",
                backgroundColor: "#fff",
              }}
            >
              <h5 className="fw-bold mb-3">
                <FaEye style={{ color: "#F64100" }} /> Our Vision
              </h5>
              <p className="text-muted">
                To empower every Indian to engage with their cultural identity through immersive digital experiences, making culture a living and evolving part of daily life.
              </p>
              <ul className="text-muted ps-3">
                <li>Digitize cultural artifacts, stories, and traditions from every region of India</li>
                <li>Encourage participation from citizens, scholars, and communities in preserving heritage</li>
                <li>Bridge the cultural gap between urban and rural India through technology</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MissionVission;
