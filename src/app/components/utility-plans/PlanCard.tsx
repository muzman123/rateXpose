'use client'

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { formatTimeAgo } from '@/lib/utils/timeFormat';
import { UtilityPlan } from '@/lib/hooks/useUtilityPlans';

// Import provider logos
import enmaxLogo from "../providerLogos/enmax_logo.png";
import directEnergyLogo from "../providerLogos/direct_energy_logo.png";
import atcoLogo from "../providerLogos/atco-logo.jpg";

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

interface PlanCardProps {
  plan: UtilityPlan;
  onSelect: (plan: UtilityPlan) => void;
  isSelected?: boolean;
}

// Utility functions
const formatRate = (rate: number) => {
  return `${rate.toFixed(2)}¢`;
};

const formatServiceFee = (fee: number) => {
  return `$${fee.toFixed(2)}`;
};

const calculateEstimatedMonthly = (rate: number, serviceFee: number, usage: number = 600) => {
  // Estimate based on average 600 kWh usage
  const energyCost = (rate/100) * usage; // Convert cents to dollars
  return energyCost + serviceFee;
};

const PlanCard: React.FC<PlanCardProps> = ({ plan, onSelect, isSelected }) => {
  const estimatedMonthly = calculateEstimatedMonthly(plan.rate, plan.service_fee);

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
              {plan.plan_type && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800">
                  {plan.plan_type}
                </span>
              )}
            </div>
            <div className="text-sm text-secondary-600 flex items-center space-x-4">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {formatRate(plan.rate)}/kWh
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                {formatServiceFee(plan.service_fee)} service
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
          <div className="text-lg font-bold text-secondary-900">{formatRate(plan.rate)}</div>
          <div className="text-xs text-secondary-500">per kWh</div>
          <div className="text-sm text-secondary-600 mt-1">
            ~${estimatedMonthly.toFixed(0)}/mo*
          </div>
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