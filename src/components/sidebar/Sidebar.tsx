import React from "react";
import { IoMdSearch } from "react-icons/io";

interface SidebarProps {
  searchTerm: string;
  onSearchChange: (newValue: string) => void;
  selectedTag: string;
  onTagChange: (newValue: string) => void;
}

//constants start here
const TAG_OPTIONS = [
  "",
  "delivery",
  "tutoring",
  "art-design",
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
  selectedTag,
  onTagChange,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {/*segment for input*/}
      <div className="flex items-center bg-white p-2 rounded-full gap-2">
        <IoMdSearch></IoMdSearch>
        <input
          type="text"
          id="search"
          placeholder="search here"
          value={searchTerm}
          onChange={(e) => {
            onSearchChange(e.target.value);
          }}
        ></input>
      </div>
      {/*segment for tags*/}
      <div>
        <label htmlFor="tags">Filter by Tag</label>
        <select
          id="tags"
          className="bg-white mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 rounded-full"
          value={selectedTag}
          onChange={(e) => {
            onTagChange(e.target.value);
          }}
        >
          {TAG_OPTIONS.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Sidebar;
