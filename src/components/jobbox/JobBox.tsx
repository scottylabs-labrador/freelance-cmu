import React, { useState } from "react";

interface Props {
  JobTitle: string;
  JobDescription: string;
  JobPay: string;
  JobPoster: string;
  JobTags: string[];
}

export default function JobBox({
  JobTitle,
  JobDescription,
  JobPay,
  JobPoster,
  JobTags,
}: Props) {
  // 1. Memory: State to track if the modal is open
  const [isOpen, setIsOpen] = useState(false);

  // 2. Action: Open the modal (Your code!)
  const openModal = () => {
    setIsOpen(true);
  };

  // 3. Action: Close the modal
  const closeModal = (e: React.MouseEvent) => {
    // This prevents clicks inside the modal from triggering parent clicks
    e.stopPropagation();
    setIsOpen(false);
  };

  return (
    <>
      {/* --- MAIN CARD (Click to Open) --- */}
      <div
        onClick={openModal}
        className="flex flex-row w-64 h-80 rounded-2xl shadow-md hover:shadow-xl transition-shadow cursor-pointer bg-white overflow-hidden"
      >
        {/* Left Blue Bar */}
        <div className="w-4 bg-gray-300 h-full"></div>

        {/* Content Area */}
        <div className="flex flex-col flex-1 p-3">
          <h1 className="text-xl font-bold text-gray-800 mb-2 h-16 overflow-hidden">
            {JobTitle}
          </h1>

          <p className="text-sm text-gray-600 mb-4 h-24 overflow-hidden relative">
            {JobDescription}
            <span className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent"></span>
          </p>

          <div className="flex flex-wrap gap-1 mb-auto content-start h-20 overflow-hidden">
            {JobTags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-2 pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Posted by: <span className="font-semibold">{JobPoster}</span>
            </p>
          </div>
        </div>
      </div>

      {/* --- MODAL --- */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-20 z-50 flex justify-center items-center p-4 backdrop-blur-sm"
          onClick={closeModal} // Clicking the background closes it
        >
          <div
            className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()} // Clicking inside does NOT close it
          >
            {/* Header */}
            <div className="bg-gray-500 p-6 flex justify-between items-start text-white">
              <div>
                <h2 className="text-3xl font-bold">{JobTitle}</h2>
                <p className="opacity-90 mt-1">Posted by {JobPoster}</p>
              </div>
            </div>

            {/* Body */}
            <div className="p-8 overflow-y-auto">
              <div className="flex flex-wrap gap-2 mb-6">
                {JobTags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-gray-800 font-medium rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Description
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap mb-8">
                {JobDescription}
              </p>

              <h3 className="text-lg font-bold text-gray-800 mb-2">Price</h3>
              <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap mb-8">
                {JobPay}
              </p>

              <div className="flex gap-4 border-t pt-6">
                <button className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-xl font-bold text-lg transition-colors shadow-lg">
                  Accept Job
                </button>
                <button
                  onClick={closeModal}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
