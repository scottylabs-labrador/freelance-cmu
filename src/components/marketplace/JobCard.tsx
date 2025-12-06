// Job card component for displaying job listings

import { Job } from '../../types/marketplace';

export default function JobCard(job: Job) {
  const payDisplay =
    job.payType === 'hourly'
      ? `$${job.payRate}–$${job.payMax}/hr`
      : `$${job.payRate}–$${job.payMax}`;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition">
      {/* Job title */}
      <h3 className="font-bold text-lg text-slate-900 mb-2 hover:text-indigo-600 cursor-pointer transition">
        {job.title}
      </h3>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600 mb-3">
        <span>{job.company}</span>
        <span>·</span>
        <span>{job.location}</span>
        <span>·</span>
        <span className="font-medium text-slate-900">{payDisplay}</span>
        <span>·</span>
        <span>Posted {job.postedDays} days ago</span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {job.skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full border border-indigo-200"
          >
            {skill}
          </span>
        ))}
        {job.location.toLowerCase().includes('remote') && (
          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full border border-emerald-200">
            Remote
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-slate-600 mb-4">{job.description}</p>

      {/* Bottom row */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition">
          View Details
        </button>
        <div className="flex items-center gap-3 text-xs text-slate-600">
          <span>{job.applicants} applicants</span>
          {job.isVerified && (
            <span className="px-2 py-1 bg-emerald-50 text-emerald-600 font-medium rounded-full border border-emerald-200">
              ✓ Verified client
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
