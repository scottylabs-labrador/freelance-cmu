import React, { useState, useEffect } from "react";

import { useNavigate, Link } from "@tanstack/react-router";
import { BiDollar } from "react-icons/bi";

// Define the shape of the form data
interface JobFormData {
  title: string;
  description: string;
  price: number | string;
  category: string;
  timeEstimate: string;
  location: string;
  tags: string;
}

const PostJob: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<JobFormData>({
    title: "",
    description: "",
    price: "",
    category: "pickup",
    timeEstimate: "< 30 mins",
    location: "on-campus",
    tags: "",
  });

  // Effect to redirect if not logged in

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Convert tags from a comma-separated string to an array
    const finalData = {
      ...formData,
      price: Number(formData.price) || 0,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };
    console.log("Job Posted:", finalData);
    // Here you would call your API to submit the job
    // e.g., mutation.mutate(finalData);

    // After submission, navigate to the home page
    navigate({ to: "/" });
  };

  // Render helper for form fields to reduce repetition
  const renderInput = (
    label: string,
    name: keyof JobFormData,
    type: string = "text",
    placeholder: string = ""
  ) => (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        placeholder={placeholder}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );

  // Render helper for select fields
  const renderSelect = (
    label: string,
    name: keyof JobFormData,
    options: { value: string; label: string }[]
  ) => (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto p-8 my-10 bg-white rounded-2xl shadow-xl border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Post a New Job
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Fill out the details below to find help from a fellow CMU student.
      </p>

      <form onSubmit={handleSubmit}>
        {/* Job Title */}
        {renderInput(
          "Job Title",
          "title",
          "text",
          'e.g., "Need help moving a couch"'
        )}

        {/* Job Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the job in detail..."
            required
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Price */}
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Payment ($)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BiDollar className="text-gray-400" />
              </div>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="20"
                required
                min="0"
                step="0.01"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category */}
          {renderSelect("Category", "category", [
            { value: "pickup", label: "Pickup & Delivery" },
            { value: "tutoring", label: "Tutoring" },
            { value: "design", label: "Art & Design" },
            { value: "other", label: "Other" },
          ])}

          {/* Time Estimate */}
          {renderSelect("Time Estimate", "timeEstimate", [
            { value: "< 30 mins", label: "< 30 mins" },
            { value: "30 mins - 1 hr", label: "30 mins - 1 hr" },
            { value: "1-2 hrs", label: "1-2 hrs" },
            { value: "2+ hrs", label: "2+ hrs" },
          ])}

          {/* Location */}
          {renderSelect("Location", "location", [
            { value: "on-campus", label: "On-Campus" },
            { value: "off-campus", label: "Off-Campus (Pittsburgh)" },
            { value: "digital", label: "Digital / Remote" },
          ])}
        </div>

        {/* Tags */}
        {renderInput(
          "Tags (comma-separated)",
          "tags",
          "text",
          'e.g., "urgent", "design", "python"'
        )}

        {/* Submit Button */}
        <div className="mt-8 text-center">
          <button
            type="submit"
            className="w-full md:w-1/2 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
          >
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJob;
