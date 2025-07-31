import front from "../../../images/Digital.jpg";
import "./Digital.css";

function Digital() {
  return (
    <div className="digital-section">
      <div className="row">
        <div className="col-12 col-md-6 text-part ">
          <h1 className="ml-5 mt-5 " style={{fontWeight:"400" ,fontSize:"60px"}}>
            Digital <br />
            <span className="highlight">Sangam</span>
          </h1>
          <p className="ml-5 mt-5">
             
            Where India's rich cultural heritage meets digital innovation.
            Explore languages, tribes, traditions, and stories that define our nation.
          </p>
          <button className="ml-5 mt-5" style={{width:"60%",background: "linear-gradient(to right, #f97316, #dc2626)", }}>Start Exploring</button>
        </div>
        <div className="col-12 col-md-6 image-part">
          <img src={front} alt="Digital Sangam" />
        </div>
      </div>
    </div>
  );
}

export default Digital;
