"use client"

import { useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { formatTimeAgo } from '@/lib/utils/timeFormat';
import { fetchLatestUtilityPlans } from '../../lib/supabase';
import Link from 'next/link';
import { useAuth } from '../../lib/AuthContext';

import enmaxLogo from "./providerLogos/enmax_logo.png";
import directEnergyLogo from "./providerLogos/direct_energy_logo.png";
import atcoLogo from "./providerLogos/atco-logo.jpg";

interface UtilityPlan {
  id: number;
  provider: string;
  rate: number;
  uploaded_at: string;
  service_fee: string;
}

// Mapping provider names to logo imports and badge styles
const providerLogos: { [key: string]: StaticImageData } = {
  ENMAX: enmaxLogo,
  'Direct Energy': directEnergyLogo,
  ATCO: atcoLogo
};

const providerBadgeStyles: { [key: string]: string } = {
  ENMAX: "provider-badge",
  'Direct Energy': "provider-badge",
  ATCO: "provider-badge",
};

export default function UtilityPlans() {
  const [utilityPlans, setUtilityPlans] = useState<UtilityPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Mock data to show when user is not authenticated
  const mockPlans = [
    { id: 1, provider: 'ENMAX', rate: 12.5, uploaded_at: '2024-01-15', service_fee: '$15' },
    { id: 2, provider: 'Direct Energy', rate: 8.9, uploaded_at: '2024-01-14', service_fee: '$12' },
    { id: 3, provider: 'ATCO', rate: 15.2, uploaded_at: '2024-01-14', service_fee: '$18' },
    { id: 4, provider: 'ENMAX', rate: 11.8, uploaded_at: '2024-01-13', service_fee: '$15' },
    { id: 5, provider: 'Direct Energy', rate: 9.5, uploaded_at: '2024-01-13', service_fee: '$14' },
    { id: 6, provider: 'ATCO', rate: 14.7, uploaded_at: '2024-01-12', service_fee: '$16' },
  ];

  useEffect(() => {
    const loadUtilityPlans = async () => {
      try {
        const plans = await fetchLatestUtilityPlans();
        setUtilityPlans(plans);
      } catch (error) {
        console.error('Error loading utility plans:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUtilityPlans();
  }, []);

  // Show real data for authenticated users, mock data for non-authenticated
  const displayPlans = user ? utilityPlans : mockPlans;
  const showBlur = !user;

  return (
    <div className="card card-hover relative">
      <div className="card-header">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-secondary-900">Utility Plans</h3>
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
                        Posted {user ? formatTimeAgo(plan.uploaded_at) : '1 day ago'}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-secondary-900">{plan.rate}¢</div>
                    <div className="text-xs text-secondary-500">/kWh</div>
                    {plan.service_fee && (
                      <div className="text-xs text-secondary-400 mt-1">
                        +{plan.service_fee} service fee
                      </div>
                    )}
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
          <Link href="/utility-plans" className="block">
            <button className="w-full btn btn-secondary text-sm justify-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              View All {utilityPlans.length} Utility Plans
            </button>
          </Link>
        ) : (
          <Link href="/sign-up">
            <button className="w-full btn btn-primary text-sm justify-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Sign Up To Get Free Access
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
