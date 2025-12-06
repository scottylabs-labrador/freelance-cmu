import React from "react";
// Removed react-icons to ensure stability in preview
// import { IoMdSearch } from "react-icons/io";

interface SidebarProps {
  searchTerm: string;
  onSearchChange: (newValue: string) => void;
  selectedTags: string[];
  onTagClick: (newValue: string) => void;
}

//constants start here
const TAG_OPTIONS = [
  "Pickup/Delivery", // Updated to match mock data
  "Tutoring",
  "Art & Design",
  "Other",
  "On-campus",
  "Digital",
  "$0-$5",
  "$10-$20",
  "$20+",
];
//constants end here

const Sidebar: React.FC<SidebarProps> = ({
  searchTerm,
  onSearchChange,
  selectedTags,
  onTagClick,
}) => {
  return (
    <div className="flex flex-col gap-6 min-h-0 w-full">
      {/* Segment for input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {/* Inline Search Icon */}
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          type="text"
          id="search"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => {
            onSearchChange(e.target.value);
          }}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-shadow shadow-sm"
        />
      </div>

      {/* Segment for tags */}
      <div>
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
          Filter by Tag
        </h3>
        <div className="flex flex-wrap gap-2">
          {TAG_OPTIONS.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagClick(tag)}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 border ${
                selectedTags.includes(tag)
                  ? "bg-blue-600 text-white border-blue-600 shadow-md transform scale-105"
                  : "bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-500"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
