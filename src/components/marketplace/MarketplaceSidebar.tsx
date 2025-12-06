// Filter sidebar component for job search

import { JOB_CATEGORIES, PAY_RANGES, JOB_TYPES, LOCATIONS, EXPERIENCE_LEVELS } from '../../constants/marketplaceData';

interface MarketplaceSidebarProps {
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
  selectedPayRange: string;
  onPayRangeChange: (range: string) => void;
  selectedJobTypes: string[];
  onJobTypeToggle: (type: string) => void;
  selectedLocations: string[];
  onLocationToggle: (location: string) => void;
  selectedExperience: string;
  onExperienceChange: (level: string) => void;
  onClear: () => void;
}

export default function MarketplaceSidebar({
  selectedCategories,
  onCategoryToggle,
  selectedPayRange,
  onPayRangeChange,
  selectedJobTypes,
  onJobTypeToggle,
  selectedLocations,
  onLocationToggle,
  selectedExperience,
  onExperienceChange,
  onClear,
}: MarketplaceSidebarProps) {
  return (
    <aside className="bg-white border border-slate-200 rounded-xl p-4 h-fit lg:sticky lg:top-6">
      <h2 className="font-bold text-slate-900 mb-4">Filter jobs</h2>

      {/* Categories */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Job Categories
        </label>
        <div className="space-y-2">
          {JOB_CATEGORIES.map((category) => (
            <label key={category} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => onCategoryToggle(category)}
                className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
              />
              <span className="text-sm text-slate-700">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Pay Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Pay Range
        </label>
        <select
          value={selectedPayRange}
          onChange={(e) => onPayRangeChange(e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {PAY_RANGES.map((range) => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </div>

      {/* Job Type */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Job Type
        </label>
        <div className="space-y-2">
          {JOB_TYPES.map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedJobTypes.includes(type)}
                onChange={() => onJobTypeToggle(type)}
                className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
              />
              <span className="text-sm text-slate-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Location
        </label>
        <div className="space-y-2">
          {LOCATIONS.map((loc) => (
            <label key={loc} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedLocations.includes(loc)}
                onChange={() => onLocationToggle(loc)}
                className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
              />
              <span className="text-sm text-slate-700">{loc}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Experience Level */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Experience Level
        </label>
        <div className="space-y-2">
          {EXPERIENCE_LEVELS.map((level) => (
            <label key={level} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="experience"
                checked={selectedExperience === level}
                onChange={() => onExperienceChange(level)}
                className="w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-500"
              />
              <span className="text-sm text-slate-700">{level}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Filter buttons */}
      <div className="flex flex-col gap-2">
        <button
          onClick={onClear}
          className="w-full px-4 py-2 border border-slate-300 text-slate-700 text-sm font-medium rounded-md hover:bg-slate-50 transition"
        >
          Clear Filters
        </button>
      </div>
    </aside>
  );
}
