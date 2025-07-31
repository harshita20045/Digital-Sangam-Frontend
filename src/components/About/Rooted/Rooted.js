import image from "../../../images/triveniSangam.jpg";
function Rooted() {
  return (
    <>
      <div
        className="container-fluid px-5 py-5 justify-content-center "
      style={{ background: 'linear-gradient(to right, #f8f1e8ff, #f9e5e5ff)' }}
      >
        <div className="row align-items-center gap-4">
          <div className="col-12 col-md-5 pl-5  pt-5 mb-5">
            <h4 className="mb-3 fw-semibold ">Rooted in Ancient Wisdom</h4>
            <p className="text-muted">
              The concept of "Sangam" comes from ancient Indian tradition, where
              rivers meet to create something greater than the sum of their
              parts. Just as the sacred Triveni Sangam brings together three
              rivers, Digital Sangam brings together cultures, languages, and
              traditions from across India.
            </p><p className="text-muted">
              Our platform embodies the ancient Indian philosophy of "Vasudhaiva Kutumbakam" (the world is one family), creating a space where all cultures are celebrated and preserved with equal respect and dignity.
            </p>
            <div
              className="p-4 mt-5 shadow-sm me-2"
              style={{
                backgroundColor: "white",
                borderRadius: "20px",
                border: "1px solid #b1b1b1ff",
                borderLeft: "5px solid #F64100",
              }}
            >
              <p className="mb-0 text-muted font-italic">
               "Just as a river enriches the lands it touches, culture enriches the lives it reaches. Digital Sangam ensures this enrichment flows to every corner of the world."
              </p>
              <h5 className="text-black mt-3" style={{ fontSize: "15px" }}>
              — Digital Sangam Philosophy
              </h5>
            </div>
          </div>
          <div className="col-12 col-md-6 text-center ml-4 mb-4 mb-md-0">
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
        </div>
      </div>
      <hr className="m-0 p-0"/>
    </>
  );
}
export default Rooted;
