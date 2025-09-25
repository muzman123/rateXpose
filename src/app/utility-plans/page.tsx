'use client'

import Layout from '../layout'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Head from 'next/head'
import { useAuth } from '../../lib/AuthContext'
import { useUtilityPlans } from '@/lib/hooks/useUtilityPlans'
import SearchAndFilters from '../components/utility-plans/SearchAndFilters'
import PlanCard from '../components/utility-plans/PlanCard'
import PlanDetailsPane from '../components/utility-plans/PlanDetailsPane'
import AuthenticationGate from '../components/mobile-plans/AuthenticationGate'

// Mock data for non-authenticated users (to show blurred content)
const mockPlansForDisplay = [
  { id: 1, provider: 'ENMAX', rate: 12.5, service_fee: 15, uploaded_at: '2024-01-15T10:30:00Z', location: 'Calgary, AB' },
  { id: 2, provider: 'Direct Energy', rate: 8.9, service_fee: 12, uploaded_at: '2024-01-14T15:45:00Z', location: 'Calgary, AB' },
  { id: 3, provider: 'ATCO', rate: 15.2, service_fee: 18, uploaded_at: '2024-01-14T09:20:00Z', location: 'Calgary, AB' },
  { id: 4, provider: 'ENMAX', rate: 11.8, service_fee: 15, uploaded_at: '2024-01-13T14:10:00Z', location: 'Calgary, AB' },
  { id: 5, provider: 'Direct Energy', rate: 9.5, service_fee: 14, uploaded_at: '2024-01-13T11:30:00Z', location: 'Calgary, AB' },
  { id: 6, provider: 'ATCO', rate: 14.7, service_fee: 16, uploaded_at: '2024-01-12T16:45:00Z', location: 'Calgary, AB' },
  { id: 7, provider: 'ENMAX', rate: 13.2, service_fee: 15, uploaded_at: '2024-01-12T08:30:00Z', location: 'Calgary, AB' },
];

const UtilityPlansPage = () => {
  const { user } = useAuth();
  const {
    plans,
    filteredPlans,
    selectedPlan,
    filters,
    isLoading,
    error,
    totalCount,
    setSelectedPlan,
    updateFilters,
    clearFilters,
    loadPlanDetails,
  } = useUtilityPlans();

  const handlePlanSelect = async (plan: any) => {
    if (!user) return; // Prevent selection for non-authenticated users
    
    setSelectedPlan(plan);
    if (plan.id) {
      await loadPlanDetails(plan.id);
    }
  };

  // Use real data for authenticated users, mock data for display purposes when not authenticated
  const displayPlans = user ? filteredPlans : mockPlansForDisplay;
  const displayCount = user ? totalCount : 394; // Show large number for non-authenticated

  return (
    <Layout>
      <Head>
        <title>Utility Plans - RateXpose</title>
        <meta name="description" content="Browse real utility rates shared by Canadians. Compare electricity pricing and service fees across all major providers." />
      </Head>
      <Header />

      <main className="min-h-screen bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div className="mb-4 md:mb-0">
                <h1 className="text-3xl font-bold text-secondary-900">Utility Plans</h1>
                <p className="text-secondary-600 mt-2">
                  Real electricity rates and fees shared by Canadians
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-sm text-secondary-500">
                  <div className="w-2 h-2 bg-success-500 rounded-full mr-2"></div>
                  Live data
                </div>
                <div className="text-sm text-secondary-500">
                  <span className="font-semibold">{displayCount}</span> plans available
                </div>
              </div>
            </div>

            {/* Search and Filters */}
            <SearchAndFilters
              filters={filters}
              updateFilters={updateFilters}
              clearFilters={clearFilters}
              resultsCount={user ? filteredPlans.length : displayPlans.length}
            />

            {/* Error Display */}
            {error && (
              <div className="mt-4 p-4 bg-danger-50 border border-danger-200 rounded-md">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-danger-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-danger-700">{error}</p>
                </div>
              </div>
            )}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Plans List Section */}
            <div className="lg:col-span-2">
              <div className="relative">
                {/* Blurred content for non-authenticated users */}
                {!user && (
                  <>
                    <div className="filter blur-sm pointer-events-none">
                      <div className="space-y-4">
                        {displayPlans.map((plan) => (
                          <PlanCard 
                            key={plan.id} 
                            plan={plan} 
                            onSelect={() => {}} 
                            isSelected={false}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <AuthenticationGate
                      title="Unlock Utility Rate Data"
                      description="Sign up for free to access detailed utility rate information, compare electricity pricing and service fees across Alberta providers."
                    />
                  </>
                )}

                {/* Real content for authenticated users */}
                {user && (
                  <div className="space-y-4">
                    {isLoading ? (
                      // Loading skeleton
                      <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className="card animate-pulse">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-secondary-200 rounded-full"></div>
                              <div className="flex-1 space-y-2">
                                <div className="h-4 bg-secondary-200 rounded w-1/4"></div>
                                <div className="h-3 bg-secondary-200 rounded w-1/2"></div>
                              </div>
                              <div className="h-8 bg-secondary-200 rounded w-20"></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : filteredPlans.length === 0 ? (
                      // No results state
                      <div className="card text-center py-12">
                        <div className="w-16 h-16 mx-auto mb-4 bg-secondary-100 rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-secondary-900 mb-2">No plans found</h3>
                        <p className="text-secondary-600 mb-4">
                          Try adjusting your search or filter criteria
                        </p>
                        <button onClick={clearFilters} className="btn btn-primary">
                          Clear Filters
                        </button>
                      </div>
                    ) : (
                      // Plans list
                      filteredPlans.map((plan) => (
                        <PlanCard 
                          key={plan.id} 
                          plan={plan} 
                          onSelect={handlePlanSelect}
                          isSelected={selectedPlan?.id === plan.id}
                        />
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Details Pane Section */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <PlanDetailsPane 
                  plan={selectedPlan} 
                  onClose={() => setSelectedPlan(null)} 
                />
              </div>
            </div>
          </div>

          {/* Bottom CTA for authenticated users */}
          {user && (
            <div className="mt-12 text-center">
              <div className="card max-w-2xl mx-auto bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-2">
                  Help Build Canada's Utility Rate Database
                </h3>
                <p className="text-sm text-primary-700 mb-4">
                  Share your utility rates to help other Canadians find better deals and create pricing transparency in the energy market.
                </p>
                <a href="/post-utility-provider" className="btn btn-primary">
                  Share Your Utility Rates
                </a>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </Layout>
  );
};

export default UtilityPlansPage;