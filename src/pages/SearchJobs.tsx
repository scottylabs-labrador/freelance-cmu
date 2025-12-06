import { useState } from "react";
import JobBox from "../components/jobbox/JobBox";
import Sidebar from "../components/sidebar/Sidebar";

//start of mock data

//TO BE REPLACED WITH API !
const MOCK_JOBS = [
  {
    id: 1,
    title: "groceries",
    description: "I WANT MILK FROM SCOTTYS.",
    poster: "the milkman",
    tags: ["delivery", "on-campus", "$0-$5"],
  },
  {
    id: 2,
    title: "art tutoring",
    description: "i hate 60110",
    poster: "depressed art student",
    tags: ["tutoring", "digital", "$10-$20"],
  },
  {
    id: 3,
    title: "im moving out pls hlp",
    description: "im getting tf outta here can u help me move my couch lol",
    poster: "college dropout",
    tags: ["other", "on-campus", "$20+"],
  },
  {
    id: 4,
    title: "logo design",
    description: "starting a sad girl autumn club! need logo",
    poster: "happy autumn girl",
    tags: ["art/design", "digital", "$20+"],
  },
];
//end of mock data

export default function SearchJobs() {
  //state variables start here
  const [searchTerm, setSearchTerm] = useState("");
  //temporarily only allow one tag
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((item) => item !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  console.log("SearchJobs rendered. searchTerm is:", searchTerm);
  console.log("SearchJobs rendered. selectedTag is:", selectedTags);
  //state variables end here

  //filter logic starts here
  const filteredJobs = MOCK_JOBS.filter((job) => {
    // 1. Let's check the search term
    const lowerSearch = searchTerm.toLowerCase();

    const titleMatches = job.title.toLowerCase().includes(lowerSearch);
    const descriptionMatches = job.description
      .toLowerCase()
      .includes(lowerSearch);

    const searchMatches = titleMatches || descriptionMatches;
    const noTagsSelected = selectedTags.length === 0;
    const someTagsMatch = selectedTags.some((tag) => job.tags.includes(tag));
    const tagMatches = noTagsSelected || someTagsMatch;
    return searchMatches && tagMatches;
  });
  //filter logic ends here

  return (
    <div className="flex flex-row">
      <aside className="w-1/4 bg-white border-r border-gray-200 p-4 min-h-0">
        {/* Here we pass the props!
          1. Pass the data DOWN (value)
          2. Pass the function DOWN (to be called UP)
        */}
        <Sidebar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedTags={selectedTags} // Pass the full array down
          onTagClick={handleTagClick}
        />
      </aside>
      <section className="w-3/4 p-4">
        <h1 className="text-xl pb-6 text-gray-600">
          {filteredJobs.length} jobs found!
        </h1>
        <div className="flex flex-wrap gap-4">
          {filteredJobs.length > 0 ? (
            //true, there are jobs
            filteredJobs.map((job) => (
              <JobBox
                key={job.id}
                JobTitle={job.title}
                JobDescription={job.description}
                JobPoster={job.poster}
                JobTags={job.tags}
              />
            ))
          ) : (
            //false, suck my balls yo
            <p className="text-gray-400">
              no jobs match your search.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
