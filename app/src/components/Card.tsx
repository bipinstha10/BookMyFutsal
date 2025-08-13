type CardProps = {
  img: string;
  name: string;
  location: string;
  onBook: () => void;
};
const Card = ({ img, name, location, onBook }: CardProps) => {
  return (
    <div className="card bg-white text-base-100 w-96 shadow-sm m-4">
      <figure className="w-auto h-50 shrink-0">
        <img src={img} alt={name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{location}</p>
        <div className="card-actions justify-end">
          <button
            className="btn bg-green-700 text-white border-0"
            onClick={onBook}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
