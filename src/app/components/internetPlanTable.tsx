// components/InternetPlans.tsx
"use client"

import { useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { formatTimeAgo } from '@/lib/utils/timeFormat';
import { fetchLatestInternetPlans } from '@/lib/supabase';
import Link from 'next/link';
import { useAuth } from '../../lib/AuthContext';

import telusLogo from "./providerLogos/telus_logo.png"
import shawLogo from "./providerLogos/shaw-logo.jpg"
import rogersLogo from "./providerLogos/rogers_logo.png"
import bellLogo from "./providerLogos/bell_logo.png"

interface InternetPlan {
  id: number;
  provider: string;
  monthly_cost: string;
  uploaded_at: string;
}

// Mapping provider names to logo imports and badge styles
const providerLogos: { [key: string]: StaticImageData } = {
  Bell: bellLogo,
  Shaw: shawLogo,
  Rogers: rogersLogo,
  Telus: telusLogo,
};

const providerBadgeStyles: { [key: string]: string } = {
  Bell: "provider-badge bell",
  Shaw: "provider-badge shaw",
  Rogers: "provider-badge rogers",
  Telus: "provider-badge telus",
};

export default function InternetPlans() {
  const [internetPlans, setInternetPlans] = useState<InternetPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Mock data to show when user is not authenticated
  const mockPlans = [
    { id: 1, provider: 'Bell', monthly_cost: '$85', uploaded_at: '2024-01-15' },
    { id: 2, provider: 'Rogers', monthly_cost: '$92', uploaded_at: '2024-01-14' },
    { id: 3, provider: 'Telus', monthly_cost: '$78', uploaded_at: '2024-01-14' },
    { id: 4, provider: 'Shaw', monthly_cost: '$75', uploaded_at: '2024-01-13' },
    { id: 5, provider: 'Bell', monthly_cost: '$120', uploaded_at: '2024-01-13' },
    { id: 6, provider: 'Rogers', monthly_cost: '$105', uploaded_at: '2024-01-12' },
    { id: 7, provider: 'Telus', monthly_cost: '$95', uploaded_at: '2024-01-12' },
  ];

  useEffect(() => {
    const loadInternetPlans = async () => {
      try {
        const plans = await fetchLatestInternetPlans();
        setInternetPlans(plans);
      } catch (error) {
        console.error('Error loading internet plans:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInternetPlans();
  }, []);

  // Show real data for authenticated users, mock data for non-authenticated
  const displayPlans = user ? internetPlans : mockPlans;
  const showBlur = !user;

  return (
    <div className="card card-hover relative">
      <div className="card-header">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-secondary-900">Internet Plans</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success-500 rounded-full"></div>
            <span className="text-xs text-secondary-500">Live</span>
          </div>
        </div>
        <p className="mt-1 text-sm text-secondary-600">Latest rate submissions from Calgary</p>
      </div>

      <div className="space-y-3 relative">
        {isLoading && user ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="flex items-center space-x-3 p-3">
                  <div className="w-12 h-12 bg-secondary-200 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-secondary-200 rounded w-20"></div>
                    <div className="h-3 bg-secondary-200 rounded w-16"></div>
                  </div>
                  <div className="h-6 bg-secondary-200 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className={showBlur ? 'filter blur-sm pointer-events-none' : ''}>
              {displayPlans.slice(0, 6).map((plan, index) => (
                <div
                  key={plan.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-secondary-100 hover:bg-secondary-25 transition-colors duration-150"
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Image
                        src={providerLogos[plan.provider] || 'https://placehold.co/50'}
                        alt={`${plan.provider} logo`}
                        width={40}
                        height={40}
                        className="rounded-lg object-contain bg-white p-1"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className={providerBadgeStyles[plan.provider] || "provider-badge"}>
                          {plan.provider}
                        </span>
                      </div>
                      <div className="mt-1 text-xs text-secondary-500">
                        Posted {user ? formatTimeAgo(plan.uploaded_at) : '3 days ago'}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-secondary-900">{plan.monthly_cost}</div>
                    <div className="text-xs text-secondary-500">/month</div>
                  </div>
                </div>
              ))}
              
              {displayPlans.length > 6 && (
                <div className="text-center py-3 border-t border-secondary-100">
                  <span className="text-sm text-secondary-500">
                    +{displayPlans.length - 6} more rates available
                  </span>
                </div>
              )}
            </div>

            {showBlur}
          </>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-secondary-100">
        {user ? (
          <Link href="/internet-plans" className="block">
            <button className="w-full btn btn-secondary text-sm justify-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              View All {internetPlans.length} Internet Plans
            </button>
          </Link>
        ) : (
          <Link href="/internet-plans">
            <button className="w-full btn btn-primary text-sm justify-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Sign up to see all rates
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
