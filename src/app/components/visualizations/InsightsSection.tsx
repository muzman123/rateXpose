'use client'

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import {
  fetchMobilePriceDistribution,
  fetchInternetPriceDistribution,
  fetchUtilityRateDistribution,
  fetchPriceTrend,
  PriceDistributionData,
  TrendData
} from '@/lib/supabase';
import PriceDistributionChart from './PriceDistributionChart';
import PriceTrendChart from './PriceTrendChart';

interface InsightsSectionProps {
  location?: string;
}

const InsightsSection: React.FC<InsightsSectionProps> = ({ location }) => {
  const { user } = useAuth();
  const [mobileDistribution, setMobileDistribution] = useState<PriceDistributionData[]>([]);
  const [internetDistribution, setInternetDistribution] = useState<PriceDistributionData[]>([]);
  const [utilityDistribution, setUtilityDistribution] = useState<PriceDistributionData[]>([]);
  const [mobileTrend, setMobileTrend] = useState<TrendData[]>([]);
  const [internetTrend, setInternetTrend] = useState<TrendData[]>([]);
  const [utilityTrend, setUtilityTrend] = useState<TrendData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch all visualization data (don't filter by location if not provided)
        const [
          mobileDistData,
          internetDistData,
          utilityDistData,
          mobileTrendData,
          internetTrendData,
          utilityTrendData
        ] = await Promise.all([
          fetchMobilePriceDistribution(location),
          fetchInternetPriceDistribution(location),
          fetchUtilityRateDistribution(location),
          fetchPriceTrend('mobile', location),
          fetchPriceTrend('internet', location),
          fetchPriceTrend('utility', location)
        ]);

        console.log('📊 Visualization Data Fetched:', {
          mobile: mobileDistData,
          internet: internetDistData,
          utility: utilityDistData,
          mobileTrend: mobileTrendData,
          internetTrend: internetTrendData,
          utilityTrend: utilityTrendData
        });

        setMobileDistribution(mobileDistData);
        setInternetDistribution(internetDistData);
        setUtilityDistribution(utilityDistData);
        setMobileTrend(mobileTrendData);
        setInternetTrend(internetTrendData);
        setUtilityTrend(utilityTrendData);
      } catch (error) {
        console.error('Error fetching visualization data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [location]);

  // Check if we have any data to display
  const hasAnyData =
    mobileDistribution.length > 0 ||
    internetDistribution.length > 0 ||
    utilityDistribution.length > 0 ||
    mobileTrend.length > 0 ||
    internetTrend.length > 0 ||
    utilityTrend.length > 0;

  return (
    <section className="bg-secondary-50 border-y border-secondary-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-secondary-900">
            Price Insights & Market Trends
          </h2>
          <p className="mt-2 text-secondary-600 max-w-2xl mx-auto">
            Real-time data visualizations from Canadian rate submissions{location ? ` in ${location}` : ''}
          </p>
          {!user && (
            <p className="mt-2 text-sm text-primary-600 font-medium">
              🔒 Sign up free to unlock detailed insights
            </p>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-8 bg-secondary-200 rounded w-1/2 mb-4"></div>
                <div className="h-64 bg-secondary-100 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {/* Price Distribution Charts */}
            {(mobileDistribution.length > 0 || internetDistribution.length > 0 || utilityDistribution.length > 0) && (
              <div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                  Price Distribution by Provider
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {mobileDistribution.length > 0 && (
                    <PriceDistributionChart
                      data={mobileDistribution}
                      title="Mobile Plans"
                      valueLabel="Monthly Cost ($)"
                      isAuthenticated={!!user}
                    />
                  )}
                  {internetDistribution.length > 0 && (
                    <PriceDistributionChart
                      data={internetDistribution}
                      title="Internet Plans"
                      valueLabel="Monthly Cost ($)"
                      isAuthenticated={!!user}
                    />
                  )}
                  {utilityDistribution.length > 0 && (
                    <PriceDistributionChart
                      data={utilityDistribution}
                      title="Utility Rates"
                      valueLabel="Rate (¢/kWh)"
                      isAuthenticated={!!user}
                    />
                  )}
                </div>
              </div>
            )}

            {/* Trend Charts */}
            {(mobileTrend.length > 0 || internetTrend.length > 0 || utilityTrend.length > 0) && (
              <div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                  90-Day Price Trends
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {mobileTrend.length > 0 && (
                    <PriceTrendChart
                      data={mobileTrend}
                      title="Mobile Plan Trends"
                      serviceType="mobile"
                      valueLabel="Avg Cost ($)"
                      isAuthenticated={!!user}
                    />
                  )}
                  {internetTrend.length > 0 && (
                    <PriceTrendChart
                      data={internetTrend}
                      title="Internet Plan Trends"
                      serviceType="internet"
                      valueLabel="Avg Cost ($)"
                      isAuthenticated={!!user}
                    />
                  )}
                  {utilityTrend.length > 0 && (
                    <PriceTrendChart
                      data={utilityTrend}
                      title="Utility Rate Trends"
                      serviceType="utility"
                      valueLabel="Avg Rate (¢/kWh)"
                      isAuthenticated={!!user}
                    />
                  )}
                </div>
              </div>
            )}

            {/* No data message */}
            {!hasAnyData && (
              <div className="text-center py-12">
                <div className="card max-w-2xl mx-auto">
                  <div className="w-16 h-16 mx-auto mb-4 bg-secondary-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                    No Visualization Data Available Yet
                  </h3>
                  <p className="text-secondary-600 mb-4">
                    Charts will appear here once there are rate submissions in the database.
                    {!user && ' Sign up and be the first to contribute!'}
                  </p>
                  {!user && (
                    <a href="/sign-up" className="btn btn-primary inline-block">
                      Sign Up to Contribute
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* CTA for non-authenticated users */}
            {!user && hasAnyData && (
              <div className="text-center mt-8">
                <div className="card max-w-2xl mx-auto bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
                  <h3 className="text-lg font-semibold text-primary-900 mb-2">
                    Want Full Access to Market Insights?
                  </h3>
                  <p className="text-sm text-primary-700 mb-4">
                    Create a free account to view detailed charts, compare your rates, and access exclusive market analysis.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a href="/sign-up" className="btn btn-primary">
                      Sign Up Free
                    </a>
                    <a href="/login" className="btn btn-secondary">
                      Sign In
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default InsightsSection;