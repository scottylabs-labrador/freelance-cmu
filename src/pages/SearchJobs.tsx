import React, { useState } from "react";
import JobBox from "../components/jobbox/JobBox";
import Sidebar from "../components/sidebar/Sidebar";

// --- MOCK DATA ---
const MOCK_JOBS = [
  {
    id: 1,
    title: "Groceries from Scotty's",
    description:
      "I WANT MILK FROM SCOTTYS. I'm stuck in studio and need caffeine.",
    poster: "The Milkman",
    price: "$2",
    tags: ["Pickup/Delivery", "On-campus", "$0-$5"],
  },
  {
    id: 2,
    title: "Art Tutoring 60-110",
    description:
      "I hate 60110. Need help with perspective drawing assignments.",
    poster: "Depressed Art Student",
    price: "$15",
    tags: ["Tutoring", "Art & Design", "$10-$20"],
  },
  {
    id: 3,
    title: "Help Moving Out",
    description:
      "I'm getting outta here, can you help me move my couch to storage?",
    poster: "College Dropout",
    price: "$35",
    tags: ["Other", "On-campus", "$20+"],
  },
  {
    id: 4,
    title: "Club Logo Design",
    description:
      "Starting a 'Sad Girl Autumn' club! Need a logo designed ASAP.",
    poster: "Happy Autumn Girl",
    price: "$100",
    tags: ["Art & Design", "Digital", "$20+"],
  },
];

export default function SearchJobs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Toggle tag selection
  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((item) => item !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Filter Logic
  const filteredJobs = MOCK_JOBS.filter((job) => {
    const lowerSearch = searchTerm.toLowerCase();
    const matchesSearch =
      job.title.toLowerCase().includes(lowerSearch) ||
      job.description.toLowerCase().includes(lowerSearch);

    // If no tags selected, show all. Otherwise, job must match AT LEAST one tag.
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => job.tags.includes(tag));

    return matchesSearch && matchesTags;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-row ">
        {/* --- SIDEBAR --- */}
        {/* Changed from w-1/4 bg-gray-300 to a fixed width, clean white sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen hidden md:block">
          <div className="sticky top-20 p-6">
            <Sidebar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedTags={selectedTags}
              onTagClick={handleTagClick}
            />
          </div>
        </aside>

        {/* --- MAIN CONTENT --- */}
        <section className="flex-1 p-8">
          <div className="mb-6 flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Find Work</h1>
              <p className="text-gray-500 mt-1">
                Showing {filteredJobs.length}{" "}
                {filteredJobs.length === 1 ? "job" : "jobs"}
              </p>
            </div>
          </div>

          {/* Grid Layout for Jobs */}
          <div className="flex flex-wrap gap-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <JobBox
                  key={job.id}
                  JobTitle={job.title}
                  JobDescription={job.description}
                  JobPay={job.price}
                  JobPoster={job.poster}
                  JobTags={job.tags}
                />
              ))
            ) : (
              // Empty State
              <div className="w-full flex flex-col items-center justify-center py-20 text-gray-400">
                <p className="text-lg">No jobs match your search.</p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedTags([]);
                  }}
                  className="mt-2 text-blue-500 hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
