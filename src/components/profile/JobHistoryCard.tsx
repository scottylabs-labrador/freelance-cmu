interface JobHistoryCardProps {
  job: {
    id: number;
    title: string;
    budget: string;
    status: string;
    date: string;
    rating?: number;
  };
  isActive: boolean;
}

export default function JobHistoryCard({ job, isActive }: JobHistoryCardProps) {
  const statusColors = {
    open: { bg: "bg-green-500/20", text: "text-green-400", border: "border-l-green-500" },
    in_progress: { bg: "bg-yellow-500/20", text: "text-yellow-400", border: "border-l-yellow-400" },
    completed: { bg: "bg-gray-600/20", text: "text-gray-400", border: "border-l-gray-600" },
  };

  const statusColor = statusColors[job.status as keyof typeof statusColors] || statusColors.completed;

  return (
    <div
      className={`theme-card border-l-4 ${statusColor.border} rounded-lg p-4 hover:shadow-lg transition-all duration-200`}
    >
      {/* Title */}
      <h4 className="text-sm font-semibold mb-2 line-clamp-2">{job.title}</h4>

      {/* Budget */}
      <p className="text-xs theme-text-secondary mb-2">
        <span className="font-medium text-yellow-400">{job.budget}</span>
      </p>

      {/* Status Badge */}
      <div className="flex items-center justify-between">
        <span className={`${statusColor.bg} ${statusColor.text} px-2 py-1 rounded text-xs font-medium`}>
          {job.status.replace(/_/g, " ")}
        </span>

        {/* Date */}
        <span className="text-xs theme-text-muted">{job.date}</span>
      </div>

      {/* Rating (for completed jobs) */}
      {!isActive && job.rating && (
        <div className="mt-2 pt-2 border-t theme-border flex items-center gap-1">
          <span className="text-yellow-400 text-xs">★</span>
          <span className="text-xs font-medium">{job.rating.toFixed(1)}</span>
        </div>
      )}
    </div>
  );
}
