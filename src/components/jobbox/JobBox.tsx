interface Props {
  JobTitle: string;
  JobDescription: string;
  JobPoster: string;
  JobTags: string[];
}

export default function JobBox({
  JobTitle,
  JobDescription,
  JobPoster,
  JobTags,
}: Props) {
  return (
    <div className="flex flex-row w-65 h-80 rounded-2xl">
      <div className="flex flex-col rounded-l-2xl w-10 h-80 bg-indigo-600"></div>
      <div className="flex flex-col w-55 rounded-r-2xl px-2 py-2 bg-white text-gray-900">
        <h1 className="text-2xl h-20">{JobTitle}</h1>
        <p className="h-30 text-gray-600">
          {JobDescription}
        </p>
        <div className="justify-center h-30 flex flex-wrap gap-1">
          {JobTags.map((job) => (
            <p
              key={job}
              className="px-2 py-1 rounded text-xs border border-gray-200 bg-gray-50 text-gray-600"
            >
              {job}
            </p>
          ))}
        </div>
        <p className="h-10 text-sm text-gray-400">
          {JobPoster}
        </p>
      </div>
    </div>
  );
}
