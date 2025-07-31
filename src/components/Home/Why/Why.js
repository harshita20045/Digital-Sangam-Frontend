function Why() {
  return (
    <>
      <div className="container-fluid mt-5 text-center px-5">
        <h1 className="my-5 text-center mx-5" style={{ fontWeight: "100" }}>
          Why Digital Sangam?
        </h1>

        <p className="m-5 px-5 text-muted">
          In an increasingly digital world, India's rich cultural heritage faces the challenge of preservation and accessibility. Digital Sangam bridges this gap by creating a comprehensive digital repository that makes our diverse cultural wealth accessible to everyone, everywhere.
        </p>

        <p className="m-5 px-5 text-muted">
          We believe that culture is not just about the past—it's a living, breathing entity that evolves while maintaining its core essence. Our platform serves as a meeting point (Sangam) where traditional knowledge meets modern technology, where ancient wisdom finds new expressions, and where every Indian can connect with their roots regardless of geographical boundaries.
        </p>

        <p className="m-5 px-5 text-muted">
          From the snow-capped mountains of Kashmir to the tropical shores of Kerala, from the deserts of Rajasthan to the forests of Northeast India, every region has its unique voice. Digital Sangam ensures these voices are heard, preserved, and celebrated for generations to come.
        </p>
      </div>

   
      <div className="d-flex justify-content-center align-items-stretch gap-4 flex-wrap mx-5 my-4">
        <div className="text-center text-muted p-4 rounded shadow-sm" style={{ backgroundColor: "#fffdf1ff", width: "300px" }}>
          <h5 className="fw-semibold">Preserve</h5>
          <p className="text-center">
            Safeguarding cultural knowledge and traditions through digital archiving and documentation.
          </p>
        </div>

        <div className="text-center text-muted p-4 rounded shadow-sm" style={{ backgroundColor: "#fbf1fbff", width: "300px" }}>
          <h5 className="fw-semibold">Promote</h5>
          <p className="text-center">
            Sharing cultural insights globally to foster understanding and appreciation of India's heritage.
          </p>
        </div>

        <div className="text-center text-muted p-4 rounded shadow-sm" style={{ backgroundColor: "#fbf8e8ff", width: "300px" }}>
          <h5 className="fw-semibold">Participate</h5>
          <p className="text-center">
            Engaging communities to contribute, learn, and collaborate in keeping traditions alive.
          </p>
        </div>
      </div>
    </>
  );
}

export default Why;
