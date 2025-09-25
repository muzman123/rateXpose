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

interface PlanDetailsPaneProps {
  plan: UtilityPlan | null;
  onClose: () => void;
}

// Utility functions
const formatRate = (rate: number) => {
  return `${rate.toFixed(1)}¢`;
};

const formatServiceFee = (fee: number) => {
  return `$${fee.toFixed(2)}`;
};

const calculateEstimatedBill = (rate: number, serviceFee: number, usage: number = 600) => {
  const energyCost = (rate) * usage;
  return energyCost + serviceFee;
};

const PlanDetailsPane: React.FC<PlanDetailsPaneProps> = ({ plan, onClose }) => {
  if (!plan) {
    return (
      <div className="card text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-secondary-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-secondary-900 mb-2">Select a Plan</h3>
        <p className="text-secondary-600">Click on any plan to view detailed rate information</p>
      </div>
    );
  }

  const lowUsage = calculateEstimatedBill(plan.rate, plan.service_fee, 400);
  const avgUsage = calculateEstimatedBill(plan.rate, plan.service_fee, 600);
  const highUsage = calculateEstimatedBill(plan.rate, plan.service_fee, 1000);

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-secondary-900">Rate Details</h3>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-secondary-100 rounded-lg transition-colors"
          aria-label="Close details"
        >
          <svg className="w-5 h-5 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="space-y-6">
        {/* Provider & Rate Header */}
        <div className="flex items-center space-x-4 p-4 bg-secondary-25 rounded-lg">
          <div className="w-16 h-16 flex items-center justify-center bg-white rounded-lg shadow-sm">
            <Image
              src={providerLogos[plan.provider] || 'https://placehold.co/50'}
              alt={`${plan.provider} logo`}
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-secondary-900">{plan.provider}</h4>
            <p className="text-3xl font-bold text-primary-600">{formatRate(plan.rate)}<span className="text-lg font-normal text-secondary-600">/kWh</span></p>
          </div>
        </div>

        {/* Core Rate Details Grid */}
        <div>
          <h5 className="font-semibold text-secondary-900 mb-3">Rate Structure</h5>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-secondary-50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <svg className="w-4 h-4 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-sm text-secondary-600">Energy Rate</span>
              </div>
              <div className="font-semibold text-secondary-900">{formatRate(plan.rate)}/kWh</div>
            </div>
            
            <div className="bg-secondary-50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <svg className="w-4 h-4 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                <span className="text-sm text-secondary-600">Service Fee</span>
              </div>
              <div className="font-semibold text-secondary-900">{formatServiceFee(plan.service_fee)}/month</div>
            </div>
            
            <div className="bg-secondary-50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <svg className="w-4 h-4 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm text-secondary-600">Billing</span>
              </div>
              <div className="font-semibold text-secondary-900">{plan.billing_period || 'Monthly'}</div>
            </div>

            <div className="bg-secondary-50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <svg className="w-4 h-4 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
                <span className="text-sm text-secondary-600">Plan Type</span>
              </div>
              <div className="font-semibold text-secondary-900">{plan.plan_type || 'Standard'}</div>
            </div>
          </div>
        </div>

        {/* Bill Estimates */}
        <div>
          <h5 className="font-semibold text-secondary-900 mb-3">Estimated Monthly Bills</h5>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-success-25 rounded-lg">
              <div>
                <span className="text-sm font-medium text-secondary-900">Low Usage (400 kWh)</span>
                <div className="text-xs text-secondary-600">Typical for 1-2 people</div>
              </div>
              <span className="font-bold text-success-700">${lowUsage.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-warning-25 rounded-lg">
              <div>
                <span className="text-sm font-medium text-secondary-900">Average Usage (600 kWh)</span>
                <div className="text-xs text-secondary-600">Typical for 2-4 people</div>
              </div>
              <span className="font-bold text-warning-700">${avgUsage.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-danger-25 rounded-lg">
              <div>
                <span className="text-sm font-medium text-secondary-900">High Usage (1000 kWh)</span>
                <div className="text-xs text-secondary-600">Large home or high usage</div>
              </div>
              <span className="font-bold text-danger-700">${highUsage.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="space-y-4">
          {/* Description */}
          {plan.description && (
            <div>
              <h5 className="font-semibold text-secondary-900 mb-2">User Notes</h5>
              <div className="p-3 bg-secondary-50 rounded-lg">
                <p className="text-sm text-secondary-700">{plan.description}</p>
              </div>
            </div>
          )}
        </div>

        {/* Meta Information */}
        <div className="pt-4 border-t border-secondary-200">
          <h5 className="font-semibold text-secondary-900 mb-3">Submission Details</h5>
          <div className="space-y-2 text-sm text-secondary-600">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Posted {formatTimeAgo(plan.uploaded_at)}</span>
            </div>
            
            {plan.location && (
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{plan.location}</span>
              </div>
            )}
            
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Verified submission</span>
            </div>
          </div>
        </div>

        {/* Rate Analysis */}
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
          <h5 className="font-semibold text-primary-900 mb-2 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Rate Analysis
          </h5>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-primary-700">Rate Category:</span>
              <span className="font-semibold text-primary-900">
                {plan.rate <= 10 ? 'Excellent' : plan.rate <= 15 ? 'Good' : plan.rate <= 20 ? 'Average' : 'High'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-primary-700">Service Fee:</span>
              <span className="font-semibold text-primary-900">
                {plan.service_fee <= 15 ? 'Low' : plan.service_fee <= 25 ? 'Average' : 'High'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-primary-700">Total per 600 kWh:</span>
              <span className="font-semibold text-primary-900">
                ${avgUsage.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Tip */}
        <div className="bg-secondary-25 rounded-lg p-4">
          <h5 className="font-semibold text-secondary-900 mb-2 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Pro Tip
          </h5>
          <p className="text-sm text-secondary-700">
            Utility rates can vary significantly by time of use. Check if this provider offers time-of-use pricing for additional savings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlanDetailsPane;