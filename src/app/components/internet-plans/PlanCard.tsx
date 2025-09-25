'use client'

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { formatTimeAgo } from '@/lib/utils/timeFormat';
import { InternetPlan } from '@/lib/hooks/useInternetPlans';

// Import provider logos
import telusLogo from "../providerLogos/telus_logo.png"
import shawLogo from "../providerLogos/shaw-logo.jpg"
import rogersLogo from "../providerLogos/rogers_logo.png"
import bellLogo from "../providerLogos/bell_logo.png"

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

interface PlanCardProps {
  plan: InternetPlan;
  onSelect: (plan: InternetPlan) => void;
  isSelected?: boolean;
}

// Utility functions
const formatSpeed = (speed: number) => {
  if (speed >= 1000) {
    return `${(speed / 1000).toFixed(1)} Gbps`;
  }
  return `${speed} Mbps`;
};

const formatPrice = (cost: number) => {
  return `$${cost.toFixed(2)}`;
};

const getConnectionType = (plan: InternetPlan) => {
  if (plan.isFibre) return 'Fiber';
  if (plan.isCable) return 'Cable';
  return 'Unknown';
};

const PlanCard: React.FC<PlanCardProps> = ({ plan, onSelect, isSelected }) => {
  return (
    <div 
      className={`card card-hover cursor-pointer transition-all duration-200 ${
        isSelected ? 'ring-2 ring-primary-500 border-primary-300 bg-primary-25' : ''
      }`}
      onClick={() => onSelect(plan)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 flex items-center justify-center bg-white rounded-lg shadow-sm border border-secondary-100">
            <Image
              src={providerLogos[plan.provider] || 'https://placehold.co/50'}
              alt={`${plan.provider} logo`}
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <span className={providerBadgeStyles[plan.provider] || "provider-badge"}>
                {plan.provider}
              </span>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                plan.isFibre 
                  ? 'bg-success-100 text-success-800' 
                  : plan.isCable 
                    ? 'bg-warning-100 text-warning-800'
                    : 'bg-secondary-100 text-secondary-800'
              }`}>
                {getConnectionType(plan)}
              </span>
            </div>
            <div className="text-sm text-secondary-600 flex items-center space-x-4">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {formatSpeed(plan.speed)}
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
                {getConnectionType(plan)}
              </span>
            </div>
            <div className="text-xs text-secondary-500 mt-1 flex items-center space-x-4">
              <span>Posted {formatTimeAgo(plan.uploaded_at)}</span>
              {plan.location && (
                <>
                  <span>•</span>
                  <span>{plan.location}</span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-secondary-900">{formatPrice(plan.monthly_cost)}</div>
          <div className="text-sm text-secondary-500">/month</div>
          {isSelected && (
            <div className="text-xs text-primary-600 mt-1 font-medium">
              Selected
            </div>
          )}
        </div>
      </div>

      {/* Quick preview of description if available */}
      {plan.description && (
        <div className="mt-3 pt-3 border-t border-secondary-100">
          <p className="text-sm text-secondary-600 line-clamp-2">
            {plan.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default PlanCard;