import { Link } from "react-router";
import CardList from "../components/CardList";
const Home = () => {
  return (
    <div>
      <div
        className="flex-1 hero min-h-screen"
        style={{
          backgroundImage: "url(https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg)",
        }}>
        <div className="hero-overlay bg-black opacity-60"></div>
        <div className="hero-content text-neutral-content text-center px-4">
          <div className="max-w-lg">
            <h1 className="mb-5 text-5xl font-bold font-[Teko]">Book Your Futsal Slot Now!</h1>
            <p className="mb-5 text-lg font-[Roboto]">Fast and easy online futsal court booking. Secure your game, anytime, anywhere.</p>
            <Link to="/futsal">
              <button className="btn bg-[#63D0A6] text-black btn-lg px-8 py-3 font-semibold border-0">Explore Futsals</button>
            </Link>
          </div>
        </div>
      </div>
      <CardList />
    </div>
  );
};

export default Home;
