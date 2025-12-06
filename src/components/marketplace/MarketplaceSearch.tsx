// Global search bar component for the marketplace

interface MarketplaceSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function MarketplaceSearch({
  value,
  onChange,
  placeholder = 'Search freelancers or jobs...',
}: MarketplaceSearchProps) {
  return (
    <div className="relative max-w-3xl">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
        🔍
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 bg-white border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
    </div>
  );
}
