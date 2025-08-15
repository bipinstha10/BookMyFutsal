import { useNavigate } from "react-router";
import Card from "../components/Card";
import Hero from "../components/Hero";

import { useGetFutsalsQuery } from "../redux/api/futsal";

const Futsal = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetFutsalsQuery();

  const futsals = data?.data;

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
      {isLoading ? (
        <span className="loading loading-spinner loading-xl text-black"></span>
      ) : (
        <div className="px-6 py-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 justify-items-center">
            {futsals?.map((futsal) => (
              <div className="w-full max-w-md">
                {" "}
                {/* controls card width */}
                <Card
                  key={futsal.id}
                  img={futsal.img}
                  name={futsal.name}
                  location={futsal.location}
                  onBook={() => handleBookNow(Number(futsal.id))}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Futsal;
