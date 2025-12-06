import { useState } from "react";
import { MarketplaceMode } from "../types/marketplace";
import { MOCK_FREELANCERS, MOCK_JOBS } from "../constants/marketplaceData";
import ModeToggle from "../components/marketplace/ModeToggle";
import MarketplaceSearch from "../components/marketplace/MarketplaceSearch";
import FreelancerCard from "../components/marketplace/FreelancerCard";
import JobCard from "../components/marketplace/JobCard";
import MarketplaceSidebar from "../components/marketplace/MarketplaceSidebar";

export default function Home() {
  // Mode state
  const [mode, setMode] = useState<MarketplaceMode>("hire");

  // Search states
  const [globalSearch, setGlobalSearch] = useState("");
  const [jobSearchTerm, setJobSearchTerm] = useState("");

  // Filter states for jobs mode
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPayRange, setSelectedPayRange] = useState("any");
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState("");
  const [sortBy, setSortBy] = useState("relevance");

  // Filter handlers
  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleJobTypeToggle = (type: string) => {
    if (selectedJobTypes.includes(type)) {
      setSelectedJobTypes(selectedJobTypes.filter((t) => t !== type));
    } else {
      setSelectedJobTypes([...selectedJobTypes, type]);
    }
  };

  const handleLocationToggle = (location: string) => {
    if (selectedLocations.includes(location)) {
      setSelectedLocations(selectedLocations.filter((l) => l !== location));
    } else {
      setSelectedLocations([...selectedLocations, location]);
    }
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedPayRange("any");
    setSelectedJobTypes([]);
    setSelectedLocations([]);
    setSelectedExperience("");
    setJobSearchTerm("");
  };

  // Filter freelancers based on global search
  const filteredFreelancers = MOCK_FREELANCERS.filter((freelancer) => {
    const search = globalSearch.toLowerCase();
    return (
      freelancer.name.toLowerCase().includes(search) ||
      freelancer.title.toLowerCase().includes(search) ||
      freelancer.description.toLowerCase().includes(search) ||
      freelancer.skills.some((skill) => skill.toLowerCase().includes(search))
    );
  });

  // Filter jobs based on all criteria
  const filteredJobs = MOCK_JOBS.filter((job) => {
    // Global search
    const globalSearchLower = globalSearch.toLowerCase();
    const jobSearchLower = jobSearchTerm.toLowerCase();
    const searchMatch =
      job.title.toLowerCase().includes(globalSearchLower) ||
      job.title.toLowerCase().includes(jobSearchLower) ||
      job.description.toLowerCase().includes(globalSearchLower) ||
      job.description.toLowerCase().includes(jobSearchLower) ||
      job.skills.some(
        (skill) =>
          skill.toLowerCase().includes(globalSearchLower) ||
          skill.toLowerCase().includes(jobSearchLower)
      );

    // Category filter
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.some((cat) =>
        job.skills.some((skill) => skill.toLowerCase().includes(cat.toLowerCase()))
      );

    // Job type filter
    const jobTypeMatch =
      selectedJobTypes.length === 0 ||
      selectedJobTypes.some((type) =>
        type.toLowerCase() === "hourly"
          ? job.payType === "hourly"
          : job.payType === "fixed"
      );

    // Location filter
    const locationMatch =
      selectedLocations.length === 0 ||
      selectedLocations.some((loc) => {
        if (loc === "Remote only") return job.location.toLowerCase().includes("remote");
        if (loc === "In-person") return !job.location.toLowerCase().includes("remote") && !job.location.toLowerCase().includes("hybrid");
        if (loc === "Hybrid") return job.location.toLowerCase().includes("hybrid");
        return true;
      });

    // Pay range filter
    let payRangeMatch = true;
    if (selectedPayRange !== "any" && job.payType === "hourly") {
      const [min, max] = selectedPayRange.split("-").map((v) => (v === "+" ? Infinity : parseInt(v)));
      if (max) {
        payRangeMatch = job.payRate >= min && job.payRate <= max;
      } else {
        payRangeMatch = job.payRate >= min;
      }
    }

    return searchMatch && categoryMatch && jobTypeMatch && locationMatch && payRangeMatch;
  });

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Title Row + Mode Toggle + Search */}
      <section className="bg-white border-b border-slate-200 px-6 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Welcome, find your next match.
            </h1>
            <p className="text-slate-600 mt-1">
              Connect with top talent or discover exciting opportunities
            </p>
          </div>
          <ModeToggle mode={mode} onChange={setMode} />
        </div>

        <MarketplaceSearch
          value={globalSearch}
          onChange={setGlobalSearch}
          placeholder="Search freelancers or jobs..."
        />
      </section>

      {/* Main Content */}
      <main className="py-6">
        {mode === "hire" ? (
          // Hire Talent Mode - Freelancer Grid
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-6">
            {filteredFreelancers.map((freelancer) => (
              <FreelancerCard key={freelancer.id} {...freelancer} />
            ))}
            {filteredFreelancers.length === 0 && (
              <div className="col-span-full text-center py-12 text-slate-600">
                No freelancers found matching your search.
              </div>
            )}
          </div>
        ) : (
          // Find Jobs Mode - Sidebar + Job List
          <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-6 px-6">
            {/* Sidebar */}
            <MarketplaceSidebar
              selectedCategories={selectedCategories}
              onCategoryToggle={handleCategoryToggle}
              selectedPayRange={selectedPayRange}
              onPayRangeChange={setSelectedPayRange}
              selectedJobTypes={selectedJobTypes}
              onJobTypeToggle={handleJobTypeToggle}
              selectedLocations={selectedLocations}
              onLocationToggle={handleLocationToggle}
              selectedExperience={selectedExperience}
              onExperienceChange={setSelectedExperience}
              onClear={handleClearFilters}
            />

            {/* Job Results */}
            <div>
              {/* Job-specific search + sort */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="relative flex-1">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    🔍
                  </div>
                  <input
                    type="text"
                    value={jobSearchTerm}
                    onChange={(e) => setJobSearchTerm(e.target.value)}
                    placeholder="Search job titles or keywords..."
                    className="w-full pl-12 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="relevance">Sort by: Relevance</option>
                  <option value="newest">Sort by: Newest</option>
                  <option value="highest-pay">Sort by: Highest pay</option>
                </select>
              </div>

              {/* Job cards */}
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} {...job} />
                ))}
                {filteredJobs.length === 0 && (
                  <div className="text-center py-12 text-slate-600 bg-white border border-slate-200 rounded-xl">
                    No jobs found matching your criteria. Try adjusting your filters.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
