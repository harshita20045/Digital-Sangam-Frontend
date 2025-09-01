import { Link } from "react-router-dom";

function Join() {
  return (
    <>
      <div
        className="mt-5 p-5 text-white text-center"
        style={{ backgroundColor: "#f64100" }}
      >
        <h1 style={{ fontWeight: "200" }}>Join the Cultural Revolution</h1>
        <p className="m-5" style={{ fontSize: "20px" }}>
          Be part of preserving and celebrating India's cultural heritage. Start
          your journey of discovery today.
        </p>
        <div>
          <Link to="/edit-profile" className="btn btn-light" style={{ color: "#f64100" }}>
            Create Your Profile
          </Link>
         
        </div>
      </div>
    </>
  );
}
export default Join;
