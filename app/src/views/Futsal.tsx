import { useNavigate } from "react-router";
import Card from "../components/Card";
import Hero from "../components/Hero";
import futsals from "../data/futsals";

const Futsal = () => {
  const navigate = useNavigate();

  const handleBookNow = (id: number) => {
    navigate(`/booking/${id}`);
  };
  return (
    <>
      <Hero
        img="https://images.pexels.com/photos/16879249/pexels-photo-16879249.jpeg"
        heading1="Find Your Perfect Futsal Court"
        paragraph="Explore futsal courts available near you. Book your favorite
              court easily and get on the field faster!"
      />
      <div className="flex flex-wrap justify-around">
        {futsals.map((futsal) => {
          return (
            <Card
              key={futsal.id}
              img={futsal.img}
              name={futsal.name}
              location={futsal.location}
              onBook={() => handleBookNow(futsal.id)}
            />
          );
        })}
      </div>
    </>
  );
};

export default Futsal;
