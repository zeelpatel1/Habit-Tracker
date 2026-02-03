import { Search } from "lucide-react";

export const Searchbar = () => {
  return (
    <div className="px-4 py-2 w-80 mt-2 ">
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search for something"
          className="border-2 w-full border-gray-200 p-2 pl-10 rounded-xl"
        />
      </div>
    </div>
  );
};