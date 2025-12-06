import React from "react";

interface Props {
  title: string;
  estimate: string; 
  location: string; 
  deadline: string; 
  paymentRange: string; 
  paymentType: 'Cash' | 'Digital'; 
  description: string;
  tags: string[]; 
}

export default function JobBox({
  title,
  estimate,
  location,
  deadline,
  paymentRange,
  paymentType,
  description,
  tags,
}: Props) {
  const paymentColor = paymentType === 'Cash' ? 'bg-red-100 text-yellow-800' : 'bg-red-100 text-black-800';

  return (
    // Main Card Container
    <div className="bg-white rounded-xl shadow-lg p-5 w-full max-w-lg mb-6 transition duration-300 hover:shadow-xl">
      
      {/* Top Section: Title and Payment Pill */}
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800">
          {title} Example Job
        </h3>
        {/* Payment Pill */}
        <span className={`px-3 py-1 text-xs font-bold rounded-full ${paymentColor}`}>
          {paymentType}
        </span>
      </div>

      {/* Negotiable Price */}
      <h2 className="text-3xl font-bold text-red-800 mb-4">
        Price: $$ ({paymentRange} {paymentType})
      </h2>

      {/* --- Job Details Grid --- 
          Replacing icons with just text alignment and padding/margin for spacing.
      */}
      <div className="grid grid-cols-1 gap-y-2 mb-4 text-gray-600">
        
        {/* Estimate */}
        <div className="flex items-center space-x-2">
          {/* Using a bullet or a standard character could serve as a visual marker if needed, but text is cleaner */}
          <span className="font-medium w-20">Estimate Time: x mins</span>
          <span className="text-gray-700">{estimate}</span>
        </div>
        
        {/* Location */}
        <div className="flex items-center space-x-2">
          <span className="font-medium w-20">Location: scottys market</span>
          <span className="text-gray-700">{location}</span>
        </div>
        
        {/* Deadline */}
        <div className="flex items-center space-x-2">
          <span className="font-medium w-20">Deadline: 11/28/25</span>
          <span className="text-gray-700">{deadline}</span>
        </div>
      </div>

      {/* --- Description --- */}
      <p className="text-gray-700 mb-4 border-t pt-4">
        {description}
      </p>

      {/* --- View & Apply Button --- */}
      <button className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-150 ease-in-out shadow-md">
        View & Apply
      </button>

    </div>
  );
}
