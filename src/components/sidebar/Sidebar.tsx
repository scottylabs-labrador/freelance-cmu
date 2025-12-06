import React from "react";
import { IoMdSearch } from "react-icons/io";

interface SidebarProps {
  searchTerm: string;
  onSearchChange: (newValue: string) => void;
  selectedTags: string[];
  onTagClick: (newValue: string) => void;
}

//constants start here
const TAG_OPTIONS = [
  "delivery",
  "tutoring",
  "art/design",
  "other",
  "on-campus",
  "digital",
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
    <div className="flex flex-col gap-4 min-h-0">
      {/*segment for input*/}
      <div className="flex items-center p-2 rounded-full gap-2 border border-gray-200 bg-gray-50">
        <IoMdSearch className="text-gray-600" />
        <input
          type="text"
          id="search"
          placeholder="search here"
          value={searchTerm}
          onChange={(e) => {
            onSearchChange(e.target.value);
          }}
          className="outline-none flex-1 bg-transparent text-gray-900 placeholder-gray-400"
        ></input>
      </div>
      {/*segment for tags*/}
      <div className="flex flex-wrap gap-2 mt-1">
        {TAG_OPTIONS.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagClick(tag)}
            className={`px-2 py-1 rounded border border-gray-200 ${
              selectedTags.includes(tag)
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-50 text-gray-900'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
