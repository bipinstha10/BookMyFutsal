import Hero from "../components/Hero";

import CardList from "../components/CardList";

const Futsal = () => {
  return (
    <div>
      <Hero
        img="https://images.pexels.com/photos/16879249/pexels-photo-16879249.jpeg"
        heading1="Find Your Perfect Futsal Court"
        paragraph="Explore futsal courts available near you. Book your favorite
              court easily and get on the field faster!"
      />
      <CardList />
    </div>
  );
};

export default Futsal;
