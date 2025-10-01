import { useNavigate } from "react-router";
import Card from "../components/Card";

import { useGetFutsalsQuery } from "../redux/api/futsal";

const CardList = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetFutsalsQuery();

  const futsals = data?.data;

  const handleBookNow = (id: number) => {
    navigate(`/booking/${id}`);
  };
  return (
    <div>
      {isLoading ? (
        <span className="loading loading-spinner loading-xl text-black"></span>
      ) : (
        <div className="">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 justify-items-center">
            {futsals?.map((futsal) => (
              <div className="w-full max-w-md">
                {" "}
                <Card
                  key={futsal.id}
                  imageURL={futsal.imageURL}
                  name={futsal.name}
                  location={futsal.location}
                  onBook={() => handleBookNow(Number(futsal.id))}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardList;
