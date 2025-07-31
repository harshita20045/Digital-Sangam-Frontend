import { IoMdMail } from "react-icons/io";
import footer from "../../images/Footer.png";
import {
  FaFacebookF,
  FaInstagram,
  FaLocationDot,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";

function Footer() {
  return (
    <div className="container-fluid py-5"  style={{ background: 'linear-gradient(to right, #f8f1e8ff, #f9e5e5ff)' }}>
      <div className="row gy-4 px-3 px-md-5">
 
        <div className="col-12 col-md-4">
          <img src={footer} alt="DigitalSangam" style={{ width: "60%", maxWidth: "200px" }} />
          <p className="text-muted mt-3">
            Preserving and celebrating India's rich cultural heritage through digital innovation.
            Connecting communities, languages, and traditions for future generations.
          </p>
          <p className="text-muted"><IoMdMail className="me-2" /> contact@digitalsangam.org</p>
          <p className="text-muted"><FaPhoneAlt className="me-2" /> +91 7470361548</p>
          <p className="text-muted"><FaLocationDot className="me-2" /> Indore, India</p>
          <div className="d-flex gap-2 mt-3">
            {[FaFacebookF, FaInstagram, FaTwitter, FaYoutube].map((Icon, idx) => (
              <div key={idx} className="rounded-circle bg-white p-2 text-muted shadow-sm" style={{ width: 36, height: 36, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Icon size={16} />
              </div>
            ))}
          </div>
        </div>

 
        <div className="col-6 col-md-2">
          <h6 className="mb-3 fw-bold">Explore</h6>
          {["Indian Dialects", "Tribal Heritage", "Cultural Articles", "Media Gallery"].map((item, idx) => (
            <p key={idx} className="text-muted small m-0 py-1">{item}</p>
          ))}
        </div>

        <div className="col-6 col-md-2">
          <h6 className="mb-3 fw-bold">Learn</h6>
          {["Cultural Quizzes", "About Us", "Help & FAQs", "Contact Us"].map((item, idx) => (
            <p key={idx} className="text-muted small m-0 py-1">{item}</p>
          ))}
        </div>

        <div className="col-12 col-md-4 col-lg-2">
          <h6 className="mb-3 fw-bold">Connect</h6>
          {["Community", "Newsletter", "Events", "Partnerships"].map((item, idx) => (
            <p key={idx} className="text-muted small m-0 py-1">{item}</p>
          ))}
        </div>
      </div>

      <hr className="my-4 mx-auto" style={{ width: "90%", color: "#7c7b7bff" }} />

    
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center px-3 px-md-5 text-muted" style={{ fontSize: "14px" }}>
        <div className="mb-2 mb-md-0">© 2025 Digital Sangam</div>
        <div>All rights reserved</div>
      </div>
    </div>
  );
}

export default Footer;
