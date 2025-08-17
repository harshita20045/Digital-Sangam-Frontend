import { FaAward, FaMusic, FaReadme } from "react-icons/fa6";
import { IoCameraOutline, IoPeople } from "react-icons/io5";
import { TbWorld } from "react-icons/tb";

function Offers() {
  return (
    <>
      <div className="container-fluid mt-3 py-5 text-center">
        <h1 className="mb-4 display-4" style={{fontWeight:"400"}}>What Digital Sangam Offers</h1>
        <p className="lead">A comprehensive platform to explore, learn, and preserve India's incredible cultural diversity</p>
      </div>
      <div className="container">
        <div className="row">
          <div className="col m-5 pl-4 pe-5 py-2 " style={{ borderRadius:"20px",border:"1px solid #b1b1b1ff" ,borderLeft:"5px solid #F64100"}}>
            <FaReadme
              style={{
                color: "#F64100",
                width: "50px",
                height: "50px",
              }}
            />
            <h4>Rich Content Library</h4>
            <p className="text-muted">
              Explore thousands of articles about Indian culture, traditions,
              and heritage.
            </p>
          </div>{" "}
         <div className="col m-5 pl-4 pe-5 py-2 " style={{ borderRadius:"20px",border:"1px solid #b1b1b1ff" ,borderLeft:"5px solid #F64100"}}>
            <TbWorld
              style={{
                color: "#F64100",
                width: "50px",
                height: "50px",
              }}
            />
            <h4>Language Diversity</h4>
            <p className="text-muted">
              Discover dialects and languages from every corner of India with
              audio samples.
            </p>
          </div>{" "}
         <div className="col m-5 pl-4 pe-5 py-2 " style={{ borderRadius:"20px",border:"1px solid #b1b1b1ff" ,borderLeft:"5px solid #F64100"}}>
            <IoPeople
              style={{
                color: "#F64100",
                width: "50px",
                height: "50px",
              }}
            />
            <h4>Tribal Heritage</h4>
            <p className="text-muted">
              Learn about India's diverse tribal communities and their unique
              traditions.
            </p>
          </div>
        </div>{" "}
        <div className="row">
         <div className="col m-5 pl-4 pe-5 py-2 " style={{ borderRadius:"20px",border:"1px solid #b1b1b1ff" ,borderLeft:"5px solid #F64100"}}>
            <FaMusic
              style={{
                color: "#F64100",
                width: "50px",
                height: "50px",
              }}
            />
            <h4>Cultural Performances</h4>
            <p className="text-muted">
              Watch traditional dances, music, and performances from different
              regions.
            </p>
          </div>{" "}
         <div className="col m-5 pl-4 pe-5 py-2 " style={{ borderRadius:"20px",border:"1px solid #b1b1b1ff" ,borderLeft:"5px solid #F64100"}}>
            <IoCameraOutline
              style={{
                color: "#F64100",
                width: "50px",
                height: "50px",
              }}
            />
            <h4>Visual Stories</h4>
            <p className="text-muted">
              Browse through stunning photography showcasing India's cultural
              beauty.
            </p>
          </div>{" "}
         <div className="col m-5 pl-4 pe-5 py-2 " style={{ borderRadius:"20px",border:"1px solid #b1b1b1ff" ,borderLeft:"5px solid #F64100"}}>
            <FaAward
              style={{
                color: "#F64100",
                width: "50px",
                height: "50px",
              }}
            />
            <h4>Interactive Learning</h4>
            <p className="text-muted">
              Test your knowledge with fun cultural quizzes and educational
              games.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Offers;
