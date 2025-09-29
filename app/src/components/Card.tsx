type CardProps = {
  imageURL: string;
  name: string;
  location: string;
  onBook?: () => void;
  adminActions?: React.ReactNode;
};
const Card = ({ imageURL, name, location, onBook, adminActions }: CardProps) => {
  return (
    <div className="card bg-[#171717] text-white w-full shadow-sm p-4">
      <figure className="w-full h-48 overflow-hidden">
        <img src={imageURL} alt={name} className="w-full h-full object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-2xl">{name}</h2>
        <p className="text-xl">{location}</p>
        {onBook && (
          <div className="card-actions justify-end mt-2">
            <button className="btn bg-[#63D0A6] text-black border-0" onClick={onBook}>
              Book Now
            </button>
          </div>
        )}
        {adminActions && <div className="flex justify-end mt-2 space-x-2">{adminActions}</div>}
      </div>
    </div>
  );
};

export default Card;
