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
      <div className="flex flex-col rounded-l-2xl w-10 h-80 bg-blue-200 "></div>
      <div className="flex flex-col w-55 rounded-r-2xl px-2 py-2 bg-gray-100">
        <h1 className="text-2xl h-20">{JobTitle}</h1>
        <p className="h-30">{JobDescription}</p>
        <div className="justify-center h-30 flex flex-wrap">
          {JobTags.map((job) => (
            <p className="bg-white"> {job} </p>
          ))}
        </div>
        <p className="h-10">{JobPoster}</p>
      </div>
    </div>
  );
}
