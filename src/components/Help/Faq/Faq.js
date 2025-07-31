import { FaQuestionCircle } from "react-icons/fa";
import { LuMessageCircle } from "react-icons/lu";
import { MdMailOutline } from "react-icons/md";

const faqs = [
  {
    id: "collapseOne",
    question: "How do I create an account on Digital Sangam?",
    answer:
      "You can create an account by clicking on the 'Login/Register' button in the top right corner and selecting 'Register'. Follow the simple steps to set up your profile.",
  },
  {
    id: "collapseTwo",
    question: "Are the cultural articles and content free to access?",
    answer:
      "Yes, all cultural articles, dialect information, and tribal content on Digital Sangam are completely free to access and explore.",
  },
  {
    id: "collapseThree",
    question: "How can I contribute content to Digital Sangam?",
    answer:
      "We welcome contributions! Once logged in, you can find a 'Submit Content' option (e.g., in your user dashboard or main navigation) where you can submit articles or dialect posts for review.",
  },
  {
    id: "collapseFour",
    question: "Can I download the quiz results or certificates?",
    answer:
      "Currently, you can view your quiz results directly on your User Profile Dashboard. Certificate download functionality is planned for a future update.",
  },
  {
    id: "collapseFive",
    question: "How often is new content added to the platform?",
    answer:
      "New articles, quizzes, and dialect insights are added regularly, typically on a weekly basis, to keep the content fresh and engaging.",
  },
  {
    id: "collapseSix",
    question: "Is the platform available in Indian languages?",
    answer:
      "While the primary interface is in English, we are actively working on incorporating more Indian languages for content, navigation, and even the quiz sections. Our 'Explore Dialects' section already highlights many regional languages.",
  },
];

const Faq = () => {
  return (
    <>
      <div className="d-flex justify-content-center w-100 py-5 ">
        <div
          className="card  border-0 rounded-4"
          style={{ maxWidth: "768px", width: "100%" }}
        >
          <div
            className="card-body p-4 p-md-5"
            style={{ border: "1px solid #c4c2c2ff", borderRadius: "30px" }}
          >
            <h2 className="fs-3 fw-bold text-dark mx-4 mb-5 mt-3 d-flex align-items-center">
              <FaQuestionCircle
                className="me-3"
                style={{ fontSize: "2rem", color: "#FF7C4D" }}
              />
              Frequently Asked Questions
            </h2>

            {/* Accordion Section */}
            <div className="accordion" id="faqAccordion">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="accordion-item mb-4 border rounded-4 overflow-hidden"
                  style={{ borderColor: "#ddd" }}
                >
                  <h2 className="accordion-header" id={`heading${faq.id}`}>
                    <button
                      className="accordion-button collapsed fs-7 fw-semibold text-dark"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#${faq.id}`}
                      aria-expanded="false"
                      aria-controls={faq.id}
                      style={{ borderRadius: "0", backgroundColor: "#fff" }}
                    >
                      {faq.question}
                    </button>
                  </h2>
                  <div
                    id={faq.id}
                    className="accordion-collapse collapse"
                    aria-labelledby={`heading${faq.id}`}
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body text-muted pt-0 pb-4 fs-6">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mb-5">
        <div className="row g-4 justify-content-center">
          <div className="col-12 col-md-4 ">
            <div
              className="p-3 d-flex flex-column justify-content-between"
              style={{
                borderRadius: "20px",
                border: "1px solid #d1d1d1",
                backgroundColor: "#fff",
              }}
            >
              <div>
                <h5
                  className="mb-3"
                  style={{ fontWeight: "100", fontSize: "18px" }}
                >
                  Still Need Help?
                </h5>
                <p className="text-muted" style={{ fontSize: "15px" }}>
                  Can't find what you're looking for? Our support team is here
                  to help.
                </p>
              </div>
              <button
                className="btn mx-auto fw-semibold d-block"
                style={{
                  backgroundColor: "#F64100",
                  color: "white",
                  width: "100%",
                  fontSize: "12px",
                  fontWeight: "400",
                }}
              >
              <MdMailOutline style={{height:"15px" ,width:"15px"}} />   Contact Support
              </button>
            </div>
          </div>
          <div className="col-12 col-md-4 ">
            <div
              className="p-3  d-flex flex-column justify-content-between"
              style={{
                borderRadius: "20px",
                border: "1px solid #d1d1d1",
                backgroundColor: "#fff",
              }}
            >
              <div>
                <h5
                  className="mb-3"
                  style={{ fontWeight: "100", fontSize: "18px" }}
                >
                  Community Support
                </h5>
                <p className="text-muted" style={{ fontSize: "15px" }}>
                  Reach out to our active community members for additional help
                  and insights.
                </p>
              </div>
              <button
                className="btn mx-auto fw-semibold d-block "
                style={{
                  border: "1px solid #d1d1d1",
                  width: "100%",
                  fontSize: "12px",
                }}
              >
            <LuMessageCircle style={{height:"15px",width:"15px"}}/>
    Join Community
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Faq;
