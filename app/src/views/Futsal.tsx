import Hero from "../components/Hero";
import CardList from "../components/CardList";
import { Search, Funnel } from "lucide-react";
import { useState } from "react";

const Futsal = () => {
  const [price, setPrice] = useState(500);

  return (
    <div>
      <Hero
        img="https://images.pexels.com/photos/16879249/pexels-photo-16879249.jpeg"
        heading1="Find Your Perfect Futsal Court"
        paragraph="Explore futsal courts available near you. Book your favorite
              court easily and get on the field faster!"
      />

      <div className="min-h-screen grid grid-cols-4 gap-8 mt-24 px-4">
        {/* Sidebar Filters */}
        <div className="rounded px-4 py-4 col-span-1 sticky top-24 h-fit">
          <div className="flex gap-2 items-center mb-6">
            <h3 className="text-xl font-semibold">Filter</h3>
            <Funnel size={20} />
          </div>

          {/* Price Range */}
          <div id="priceRange" className="w-full mb-6">
            <label htmlFor="">Price Range</label>
            <input
              type="range"
              min={500}
              max={1500}
              step={100}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full range range-success"
            />
            <div className="flex justify-between text-sm mt-1">
              <span>500</span>
              <span>{price}</span>
              <span>1500</span>
            </div>
          </div>

          {/* City */}
          <div className="w-full relative mb-6">
            <label htmlFor="">City</label>
            <select
              defaultValue="Pokhara"
              className="w-full select select-success bg-[#0C0C0C]"
            >
              <option>Pokhara</option>
              <option>Kathmandu</option>
              <option>Butwal</option>
              <option>Bharatpur</option>
            </select>
          </div>

          {/* Game Format */}
          <div className="w-full relative mb-6">
            <label htmlFor="">Game Format</label>
            <select
              defaultValue="5-a-side"
              className="w-full select select-success bg-[#0C0C0C]"
            >
              <option>5-a-side</option>
              <option>6-a-side</option>
              <option>7-a-side</option>
            </select>
          </div>

          {/* Date & Time */}
          <div id="timeDatePicker" className="w-full mb-6">
            <label htmlFor="">Select Date & Time</label>
            <input
              type="datetime-local"
              className="w-full input input-success bg-[#0C0C0C]"
            />
          </div>

          {/* Ground Type */}
          <div className="w-full relative mb-6">
            <label htmlFor="">Ground Type</label>
            <select
              defaultValue="Turf"
              className="w-full select select-success bg-[#0C0C0C]"
            >
              <option>Turf</option>
              <option>Concrete</option>
              <option>Wooden</option>
              <option>Indoor Carpet</option>
            </select>
          </div>

          {/* Court Type */}
          <div className="w-full relative mb-6">
            <label htmlFor="">Court Type</label>
            <select
              defaultValue="Indoor"
              className="w-full select select-success bg-[#0C0C0C]"
            >
              <option>Indoor</option>
              <option>Outdoor</option>
            </select>
          </div>

          {/* Amenities */}
          <div className="w-full mb-6">
            <label htmlFor="">Amenities</label>
            <div className="space-y-2 mt-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-success bg-[#0C0C0C]"
                />
                Parking
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-success bg-[#0C0C0C]"
                />
                Lighting
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-success bg-[#0C0C0C]"
                />
                Changing Room
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-success bg-[#0C0C0C]"
                />
                Cafeteria
              </label>
            </div>
          </div>

          {/* Rating */}
          <div className="w-full relative mb-6">
            <label htmlFor="">Rating</label>
            <select
              defaultValue="4★ & above"
              className="w-full select select-success bg-[#0C0C0C]"
            >
              <option>4★ & above</option>
              <option>3★ & above</option>
              <option>All</option>
            </select>
          </div>
          <div className="w-full relative">
            <button
              type="submit"
              className="btn btn-success text-black rounded absolute right-0"
              value="apply"
            >
              Apply
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-3 flex flex-col gap-10 px-4">
          {/* Search + Sort */}
          <div className="flex gap-4 px-6">
            <label
              htmlFor=""
              className="input input-success bg-[#0C0C0C] w-96 relative"
            >
              <input
                type="search"
                placeholder="Search by name or location"
                className="w-full"
              />
              <button className="cursor-pointer absolute top-2 right-3 text-gray-400 hover:text-white">
                <Search size={20} />
              </button>
            </label>

            <div className="w-40 relative">
              <select
                defaultValue="Sort by ..."
                className="select select-success bg-[#0C0C0C]"
              >
                <option disabled={true}>Sort by ...</option>
                <option>Price: High to Low</option>
                <option>Price: Low to High</option>
                <option>Name: A to Z</option>
                <option>Name: Z to A</option>
              </select>
            </div>
          </div>

          {/* Card List */}
          <div>
            <CardList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Futsal;
