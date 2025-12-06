// Freelancer card component for displaying freelancer profiles

import { Freelancer } from '../../types/marketplace';
import StarRating from './StarRating';

export default function FreelancerCard(freelancer: Freelancer) {
  const getStatusConfig = () => {
    switch (freelancer.status) {
      case 'available':
        return {
          color: 'emerald',
          dotBg: 'bg-emerald-500',
          textColor: 'text-emerald-600',
          borderColor: 'bg-emerald-500',
          label: 'Available now',
        };
      case 'limited':
        return {
          color: 'amber',
          dotBg: 'bg-amber-500',
          textColor: 'text-amber-600',
          borderColor: 'bg-amber-500',
          label: 'Taking limited projects',
        };
      case 'unavailable':
        return {
          color: 'slate',
          dotBg: 'bg-slate-400',
          textColor: 'text-slate-500',
          borderColor: 'bg-slate-400',
          label: 'Booked until next week',
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-150">
      {/* Status indicator bar */}
      <div className={`h-1 ${statusConfig.borderColor}`} />

      <div className="p-5">
        {/* Status row */}
        <div className="flex items-center gap-2 mb-3">
          <span className={`w-2 h-2 rounded-full ${statusConfig.dotBg}`} />
          <span className={`text-xs font-medium ${statusConfig.textColor}`}>
            {statusConfig.label}
          </span>
        </div>

        {/* Name + Title */}
        <h3 className="font-bold text-slate-900 hover:underline cursor-pointer">
          {freelancer.name}
        </h3>
        <p className="text-sm text-slate-600 mb-3">{freelancer.title}</p>

        {/* Rating row */}
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <StarRating rating={freelancer.rating} />
          <span className="text-xs text-slate-600">
            {freelancer.rating} · {freelancer.reviewCount} reviews
          </span>
          {freelancer.rating >= 4.5 && !freelancer.isScamRisk && (
            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-xs font-medium rounded-full border border-emerald-200">
              Top Rated
            </span>
          )}
        </div>

        {/* Scam alert / Verified badge */}
        {freelancer.isScamRisk ? (
          <div className="mb-3 inline-flex items-center gap-1 px-2 py-1 bg-red-50 text-red-600 border border-red-200 text-xs font-medium rounded-full">
            ⚠️ Scam Alert
          </div>
        ) : freelancer.isVerified ? (
          <div className="mb-3 inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-600 border border-emerald-200 text-xs font-medium rounded-full">
            ✓ Verified
          </div>
        ) : null}

        {/* Description */}
        <p className="text-sm text-slate-500 mb-4 line-clamp-2">
          {freelancer.description}
        </p>

        {/* Meta info */}
        <p className="text-xs text-slate-600 mb-4">
          From ${freelancer.hourlyRate}/hr · {freelancer.jobsCompleted} jobs
          completed · {freelancer.skills.join(', ')}
        </p>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition">
            View Profile
          </button>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-md border border-slate-300 hover:border-indigo-500 hover:text-indigo-600 flex items-center justify-center transition">
              🔖
            </button>
            <button className="w-8 h-8 rounded-md border border-slate-300 hover:border-indigo-500 hover:text-indigo-600 flex items-center justify-center transition">
              ✉️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
