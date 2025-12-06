interface JobPreviewCardProps {
  title: string;
  description: string;
  category: string;
  location: string;
  budget: string;
  tags: string[];
  posterName?: string;
  hasErrors?: boolean;
}

export default function JobPreviewCard({
  title,
  description,
  category,
  location,
  budget,
  tags,
  posterName = "You",
  hasErrors = false,
}: JobPreviewCardProps) {
  const displayTitle = title || "Your job title here";
  const displayDescription = description || "Your job description will appear here...";
  const displayBudget = budget || "$--";

  return (
    <div className="sticky top-6">
      <h3 className="text-lg font-semibold mb-3 theme-text-secondary">Preview</h3>
      <div
        className={`theme-card border-r-4 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col ${
          hasErrors ? "border-r-red-500" : "border-r-green-500"
        }`}
      >
        <div className="p-5 flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-green-500">●</span>
              <span className="text-xs text-neutral-400">Posted just now</span>
            </div>
            <button
              className="text-xs text-red-400 hover:text-red-300 transition-colors"
              title="Report"
            >
              ⚠
            </button>
          </div>

          {/* Title */}
          <h3
            className={`text-lg font-semibold mb-2 line-clamp-2 ${
              !title ? "text-neutral-600 italic" : ""
            }`}
          >
            {displayTitle}
          </h3>

          {/* Posted by */}
          <p className="text-sm theme-text-secondary mb-2">Posted by {posterName}</p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              <span className="text-yellow-400 text-sm">★</span>
              <span className="text-sm font-medium ml-1">4.5</span>
            </div>
            <span className="text-xs theme-text-muted">(New posting)</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {category && (
              <span className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full">
                {category}
              </span>
            )}
            {location && (
              <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded-full">
                {location}
              </span>
            )}
            {budget && (
              <span className="px-2 py-1 bg-yellow-600/20 text-yellow-400 text-xs rounded-full font-medium">
                {displayBudget}
              </span>
            )}
          </div>

          {/* Skills Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 bg-neutral-800 text-neutral-400 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          <p
            className={`text-sm mb-4 flex-1 line-clamp-3 ${
              !description ? "theme-text-muted italic" : "theme-text-secondary"
            }`}
          >
            {displayDescription}
          </p>

          {/* Bottom Action Row */}
          <div className="flex items-center justify-between pt-3 mt-auto border-t theme-border">
            <button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-xs font-semibold px-5 py-2.5 rounded-lg transition-all">
              View Details
            </button>
            <button
              className="w-9 h-9 rounded-lg border theme-border hover:theme-input hover:border-yellow-500 flex items-center justify-center text-base transition-all"
              title="Bookmark"
            >
              ★
            </button>
          </div>
        </div>
      </div>

      {hasErrors && (
        <p className="text-red-400 text-xs mt-2 flex items-center gap-1">
          <span>⚠</span>
          Please fill all required fields
        </p>
      )}
    </div>
  );
}
