import { Link } from "react-router";
const Home = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg)",
      }}
    >
      <div className="hero-overlay bg-black opacity-60"></div>
      <div className="hero-content text-neutral-content text-center px-4">
        <div className="max-w-lg">
          <h1 className="mb-5 text-5xl font-bold font-[Teko]">
            Book Your Futsal Slot Now!
          </h1>
          <p className="mb-5 text-lg font-[Roboto]">
            Fast and easy online futsal court booking. Secure your game,
            anytime, anywhere.
          </p>
          <Link to="/futsal">
            <button className="btn bg-green-500 text-white btn-lg px-8 py-3 font-semibold border-0">
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
