'use client'

import { InternetPlanFilters } from '@/lib/hooks/useInternetPlans';

interface SearchAndFiltersProps {
  filters: InternetPlanFilters;
  updateFilters: (newFilters: Partial<InternetPlanFilters>) => void;
  clearFilters: () => void;
  resultsCount: number;
}

const providers = ['Bell', 'Rogers', 'Telus', 'Shaw'];

const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  filters,
  updateFilters,
  clearFilters,
  resultsCount
}) => {
  const hasActiveFilters = 
    filters.searchQuery || 
    filters.sortBy !== 'latest' || 
    filters.provider !== 'all' || 
    filters.speedRange !== 'all' ||
    filters.connectionType !== 'all';

  return (
    <div className="card">
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="input pl-10 w-full"
            placeholder="Search by provider, location, or description..."
            value={filters.searchQuery}
            onChange={(e) => updateFilters({ searchQuery: e.target.value })}
          />
          {filters.searchQuery && (
            <button
              onClick={() => updateFilters({ searchQuery: '' })}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <svg className="h-5 w-5 text-secondary-400 hover:text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-secondary-700">Sort by:</label>
              <select 
                className="input w-auto min-w-32"
                value={filters.sortBy}
                onChange={(e) => updateFilters({ sortBy: e.target.value as InternetPlanFilters['sortBy'] })}
              >
                <option value="latest">Latest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="speed-high">Fastest Speed</option>
                <option value="provider">Provider A-Z</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-secondary-700">Provider:</label>
              <select 
                className="input w-auto min-w-32"
                value={filters.provider}
                onChange={(e) => updateFilters({ provider: e.target.value })}
              >
                <option value="all">All Providers</option>
                {providers.map(provider => (
                  <option key={provider} value={provider}>{provider}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-secondary-700">Speed:</label>
              <select 
                className="input w-auto min-w-32"
                value={filters.speedRange}
                onChange={(e) => updateFilters({ speedRange: e.target.value as InternetPlanFilters['speedRange'] })}
              >
                <option value="all">All Speeds</option>
                <option value="0-50">0-50 Mbps</option>
                <option value="50-100">50-100 Mbps</option>
                <option value="100-500">100-500 Mbps</option>
                <option value="500+">500+ Mbps</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-secondary-700">Type:</label>
              <select 
                className="input w-auto min-w-32"
                value={filters.connectionType}
                onChange={(e) => updateFilters({ connectionType: e.target.value as InternetPlanFilters['connectionType'] })}
              >
                <option value="all">All Types</option>
                <option value="fibre">Fiber</option>
                <option value="cable">Cable/DSL</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-secondary-600">
              {resultsCount} {resultsCount === 1 ? 'plan' : 'plans'} found
            </span>
            
            {hasActiveFilters && (
              <button 
                onClick={clearFilters}
                className="btn btn-secondary text-sm"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilters;