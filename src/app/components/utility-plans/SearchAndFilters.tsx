'use client'

import { UtilityPlanFilters } from '@/lib/hooks/useUtilityPlans';

interface SearchAndFiltersProps {
  filters: UtilityPlanFilters;
  updateFilters: (newFilters: Partial<UtilityPlanFilters>) => void;
  clearFilters: () => void;
  resultsCount: number;
}

const providers = ['ENMAX', 'Direct Energy', 'ATCO'];

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
    filters.rateRange !== 'all';

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
            placeholder="Search by provider, location, or plan type..."
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
                onChange={(e) => updateFilters({ sortBy: e.target.value as UtilityPlanFilters['sortBy'] })}
              >
                <option value="latest">Latest</option>
                <option value="rate-low">Rate: Low to High</option>
                <option value="rate-high">Rate: High to Low</option>
                <option value="total-low">Total Cost: Low to High</option>
                <option value="total-high">Total Cost: High to Low</option>
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
              <label className="text-sm font-medium text-secondary-700">Rate:</label>
              <select 
                className="input w-auto min-w-32"
                value={filters.rateRange}
                onChange={(e) => updateFilters({ rateRange: e.target.value as UtilityPlanFilters['rateRange'] })}
              >
                <option value="all">All Rates</option>
                <option value="0-10">0-10¢/kWh</option>
                <option value="10-15">10-15¢/kWh</option>
                <option value="15-20">15-20¢/kWh</option>
                <option value="20+">20¢+/kWh</option>
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