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

interface PlanDetailsPaneProps {
  plan: MobilePlan | null;
  onClose: () => void;
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

const formatPrice = (cost: number) => {
  return `$${cost.toFixed(2)}`;
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
        <p className="text-secondary-600">Click on any plan to view detailed information</p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-secondary-900">Plan Details</h3>
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
        {/* Provider & Price Header */}
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
            <p className="text-3xl font-bold text-primary-600">{formatPrice(plan.monthly_cost)}<span className="text-lg font-normal text-secondary-600">/month</span></p>
          </div>
        </div>

        {/* Core Plan Details Grid */}
        <div>
          <h5 className="font-semibold text-secondary-900 mb-3">Plan Specifications</h5>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-secondary-50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <svg className="w-4 h-4 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.58 4 8 4s8-1.79 8-4M4 7c0-2.21 3.58-4 8-4s8 1.79 8 4" />
                </svg>
                <span className="text-sm text-secondary-600">Data</span>
              </div>
              <div className="font-semibold text-secondary-900">{formatDataLimit(plan.data_limit)}</div>
            </div>
            
            <div className="bg-secondary-50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <svg className="w-4 h-4 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-sm text-secondary-600">Minutes</span>
              </div>
              <div className="font-semibold text-secondary-900">{formatMinutes(plan.minutes)}</div>
            </div>
            
            <div className="bg-secondary-50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <svg className="w-4 h-4 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="text-sm text-secondary-600">SMS</span>
              </div>
              <div className="font-semibold text-secondary-900">{formatSMS(plan.sms)}</div>
            </div>
            
            <div className="bg-secondary-50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <svg className="w-4 h-4 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm text-secondary-600">Contract</span>
              </div>
              <div className="font-semibold text-secondary-900">{plan.contract_length || 'Not specified'}</div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        {plan.features && plan.features.length > 0 && (
          <div>
            <h5 className="font-semibold text-secondary-900 mb-3">Included Features</h5>
            <div className="space-y-2">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-success-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-secondary-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Additional Details */}
        <div className="space-y-4">
          {plan.byod !== undefined && (
            <div className="flex items-center justify-between p-3 bg-secondary-25 rounded-lg">
              <span className="text-sm font-medium text-secondary-700">Bring Your Own Device</span>
              <span className={`text-sm font-semibold ${plan.byod ? 'text-success-600' : 'text-secondary-600'}`}>
                {plan.byod ? 'Yes' : 'No'}
              </span>
            </div>
          )}

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

        {/* Value Analysis */}
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
          <h5 className="font-semibold text-primary-900 mb-2 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Value Analysis
          </h5>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-primary-700">Cost per GB:</span>
              <span className="font-semibold text-primary-900">
                ${(plan.monthly_cost / (plan.data_limit >= 9999 ? 50 : plan.data_limit)).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-primary-700">Data type:</span>
              <span className="font-semibold text-primary-900">
                {plan.data_limit >= 9999 ? 'Unlimited' : 'Capped'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanDetailsPane;