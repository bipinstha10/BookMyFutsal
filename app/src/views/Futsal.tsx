import Hero from "../components/Hero";
import CardList from "../components/CardList";
import { Search, Funnel } from "lucide-react";

const Futsal = () => {
  return (
    <div>
      <Hero
        img="https://images.pexels.com/photos/16879249/pexels-photo-16879249.jpeg"
        heading1="Find Your Perfect Futsal Court"
        paragraph="Explore futsal courts available near you. Book your favorite
              court easily and get on the field faster!"
      />

      <div className="min-h-screen grid grid-cols-4 gap-8 mt-24 px-4">
        <div className="rounded px-4 py-4 col-span-1 sticky top-24 h-fit">
          <div className="flex gap-2 items-center mb-6">
            <h3 className="text-xl font-semibold">Filter</h3>
            <Funnel size={20} />
          </div>

          <div className="mb-6">
            <label className="text-sm text-gray-300 mb-1 block">
              Select City
            </label>
            <select className="w-full bg-[#1e1e1e] text-white p-3 rounded-md outline-none">
              <option value="">Select City</option>
              <option value="pokhara">Pokhara</option>
              <option value="kathmandu">Kathmandu</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="text-sm text-gray-300 mb-1 block">
              Select Time & Date
            </label>
            <select className="w-full bg-[#1e1e1e] text-white p-3 rounded-md outline-none">
              <option value="">Select Time & Date</option>
              <option value="morning">Morning</option>
              <option value="evening">Evening</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="text-sm text-gray-300 mb-1 block">
              Select Cost
            </label>
            <select className="w-full bg-[#1e1e1e] text-white p-3 rounded-md outline-none">
              <option value="">Select Cost</option>
              <option value="pokhara">Pokhara</option>
              <option value="kathmandu">Kathmandu</option>
            </select>
          </div>
        </div>

        <div className="col-span-3 flex flex-col gap-10 px-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search by name or location"
                className="w-full bg-[#1e1e1e] text-white p-3 rounded-md outline-none"
              />
              <button className="absolute top-3 right-3 text-gray-400 hover:text-white">
                <Search size={20} />
              </button>
            </div>

            <div className="w-40 relative">
              <select className="w-full bg-[#1e1e1e] text-white p-3 rounded-md outline-none appearance-none">
                <option value="">Sort by...</option>
                <option value="cost">Cost</option>
                <option value="city">City</option>
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
