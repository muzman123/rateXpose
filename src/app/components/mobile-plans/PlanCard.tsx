'use client'

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { formatTimeAgo } from '@/lib/utils/timeFormat';
import { MobilePlan } from '@/lib/hooks/useMobilePlans';

// Import provider logos
import bellLogo from "../providerLogos/bell_logo.png";
import chatrLogo from "../providerLogos/chatr_logo.png";
import eastlinkLogo from "../providerLogos/eastlink_logo.png";
import fidoLogo from "../providerLogos/fido_logo.png";
import fizzLogo from "../providerLogos/fizz_logo.png";
import freedomLogo from "../providerLogos/freedom_logo.png";
import koodoLogo from "../providerLogos/koodo_logo.png";
import rogersLogo from "../providerLogos/rogers_logo.png";
import telusLogo from "../providerLogos/telus_logo.png";

const providerLogos: { [key: string]: StaticImageData } = {
  Bell: bellLogo,
  Chatr: chatrLogo,
  Eastlink: eastlinkLogo,
  Fido: fidoLogo,
  Fizz: fizzLogo,
  Freedom: freedomLogo,
  Koodo: koodoLogo,
  Rogers: rogersLogo,
  Telus: telusLogo,
};

const providerBadgeStyles: { [key: string]: string } = {
  Bell: "provider-badge bell",
  Chatr: "provider-badge",
  Eastlink: "provider-badge",
  Fido: "provider-badge rogers",
  Fizz: "provider-badge",
  Freedom: "provider-badge",
  Koodo: "provider-badge telus",
  Rogers: "provider-badge rogers",
  Telus: "provider-badge telus",
};

interface PlanCardProps {
  plan: MobilePlan;
  onSelect: (plan: MobilePlan) => void;
  isSelected?: boolean;
}

// Utility functions
const formatDataLimit = (limit: number) => {
  if (limit >= 9999) return 'Unlimited';
  return `${limit}GB`;
};

const formatMinutes = (minutes: number) => {
  if (minutes >= 9999) return 'Unlimited';
  return `${minutes} min`;
};

const formatSMS = (sms: number) => {
  if (sms >= 9999) return 'Unlimited';
  return `${sms} texts`;
};

const formatPrice = (cost: number | string) => {
  const numericCost = typeof cost === 'string' ? parseFloat(cost.replace('$', '')) : cost;
  return `$${numericCost.toFixed(2)}`;
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
              {plan.byod && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
                  BYOD
                </span>
              )}
              {plan.contract_length === 'No Contract' && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-warning-100 text-warning-800">
                  No Contract
                </span>
              )}
            </div>
            <div className="text-sm text-secondary-600 flex items-center space-x-4">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.58 4 8 4s8-1.79 8-4M4 7c0-2.21 3.58-4 8-4s8 1.79 8 4" />
                </svg>
                {formatDataLimit(plan.data_limit)}
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {formatMinutes(plan.minutes)}
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                {formatSMS(plan.sms)}
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