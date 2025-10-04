import React from "react";

interface Props {
  JobTitle: string;
  JobDescription: string;
  JobPoster: string;
}

export default function JobBox({ JobTitle, JobDescription, JobPoster }: Props) {
  return (
    <div className="flex flex-row w-60 h-80 rounded-2xl">
      <div className="flex flex-col rounded-l-2xl w-10 h-80 bg-blue-200 "></div>
      <div className="flex flex-col w-50 rounded-r-2xl px-2 py-2 bg-gray-100">
        <h1 className="text-2xl">{JobTitle}</h1>
        <p>{JobDescription}</p>
        <div>container for tags</div>
        <p>{JobPoster}</p>
      </div>
    </div>
  );
}
