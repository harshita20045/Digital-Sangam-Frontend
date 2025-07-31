import { LuQuote } from "react-icons/lu";
import image from "../../../images/experience-HomePage.jpg";

function Experience() {
  return (
    <div
      className="container-fluid py-5"
    style={{ background: 'linear-gradient(to right,  #ffe3e3,#fff4e6)' }}
    >
      <div className="row align-items-center">
        <div className="col-12 col-md-6 text-center  mb-4 mb-md-0">
          <img
            src={image}
            alt="Experience India"
            className="img-fluid rounded shadow"
            style={{
              borderRadius: "30px",
              maxHeight: "500px",
              objectFit: "cover",
            }}
          />
        </div>

        <div className="col-12 col-md-6 text-center text-md-start px-5 mb-5">
          <h4 className="mb-3 fw-semibold fs-2" >
            Experience India's Living Traditions
          </h4>
          <div
            className="p-4 mt-5  shadow-sm me-5"
            style={{
              backgroundColor: "white",
              borderRadius: "20px",
              border: "1px solid #b1b1b1ff",
              borderLeft: "5px solid #F64100",
            }}
          >
            <p className="mb-0 text-muted font-italic fs-6">
              <LuQuote
                style={{
                  color: "#F64100",
                  width: "30px",
                  height: "30px",
                  display:"block"
                }}
              />
              "India is not just a country, it's a universe of cultures,
              languages, and traditions that have evolved over thousands of
              years. Every dialect tells a story, every tribe carries ancient
              wisdom."
              
            </p>
            <h5 className="text-black mt-3" style={{ fontSize: "15px" }}>
                — Digital Sangam Philosophy
              </h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Experience;
