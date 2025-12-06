// Mode toggle component for switching between "Hire Talent" and "Find Jobs"

import { MarketplaceMode } from '../../types/marketplace';

interface ModeToggleProps {
  mode: MarketplaceMode;
  onChange: (mode: MarketplaceMode) => void;
}

export default function ModeToggle({ mode, onChange }: ModeToggleProps) {
  return (
    <div className="flex rounded-lg border border-slate-300 p-1 bg-slate-50">
      <button
        onClick={() => onChange('hire')}
        className={`px-6 py-2 rounded-md font-medium transition ${
          mode === 'hire'
            ? 'bg-indigo-600 text-white'
            : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        Hire Talent
      </button>
      <button
        onClick={() => onChange('jobs')}
        className={`px-6 py-2 rounded-md font-medium transition ${
          mode === 'jobs'
            ? 'bg-indigo-600 text-white'
            : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        Find Jobs
      </button>
    </div>
  );
}
