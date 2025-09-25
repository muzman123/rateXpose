// components/UtilityProvider.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

import enmaxLogo from "./providerLogos/enmax_logo.png";
import directEnergyLogo from "./providerLogos/direct_energy_logo.png";
import atcoLogo from "./providerLogos/atco-logo.jpg";

import Modal from './Modal';
import UtilityBill from '@/lib/utilityBill';
import { insertUtilityPlans } from '../../lib/supabase';
import { useAuth } from '../../lib/AuthContext';

interface Provider {
  name: string;
  logo: StaticImageData;
}

// Default utility bill instance
const defaultUtilityBill = new UtilityBill(
  'unique-id-456',
  'Default Provider',
  new Date(), // Uploaded at
  0, // Service Fee
  0, // rate (kWh)
);

const providers: Provider[] = [
  { name: 'ENMAX', logo: enmaxLogo },
  { name: 'Direct Energy', logo: directEnergyLogo },
  { name: 'ATCO', logo: atcoLogo },
];

const stepTitles = [
  "Select Provider",
  "Billing Details",
  "Review & Submit",
  "Complete"
];

const UtilityProvider: React.FC = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const router = useRouter();
  const { user } = useAuth();

  function handleProviderClick(provider: Provider) {
    defaultUtilityBill.provider = provider.name;
    setSelectedProvider(provider);
    setStep(2);
  }

  function handleFirstSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    const rate = (document.getElementById("rate") as HTMLInputElement).value;
    const service_fee = (document.getElementById("service_fee") as HTMLInputElement).value;

    if (!rate || !service_fee) {
      setError("Please fill in all fields before proceeding.");
      return;
    }

    // Parse as floats for accurate decimal handling
    defaultUtilityBill.rate = parseFloat(rate);
    defaultUtilityBill.serviceFee = parseFloat(service_fee);
    defaultUtilityBill.uploadedAt = new Date();
    setStep(3);
  }

  async function handleFinalSubmit() {
    if (!user) {
      setError('Please log in to submit your utility bill');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await insertUtilityPlans(defaultUtilityBill);
      setStep(4);
    } catch (err) {
      console.error('Error submitting utility bill:', err);
      setError('Failed to submit utility bill. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleCloseModal(): void {
    router.push('/');
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {stepTitles.map((title, index) => (
            <div key={index} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                index + 1 <= step
                  ? 'bg-primary-600 text-white'
                  : 'bg-secondary-200 text-secondary-500'
              }`}>
                {index + 1}
              </div>
              <span className={`ml-2 text-sm font-medium hidden sm:block ${
                index + 1 <= step ? 'text-primary-600' : 'text-secondary-500'
              }`}>
                {title}
              </span>
              {index < stepTitles.length - 1 && (
                <div className={`hidden sm:block w-12 h-0.5 ml-4 ${
                  index + 1 < step ? 'bg-primary-600' : 'bg-secondary-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Provider Selection */}
      {step === 1 && (
        <div className="card">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Select Your Utility Provider
            </h2>
            <p className="text-secondary-600">
              Choose your current electricity provider to get started
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            {providers.map((provider) => (
              <div
                key={provider.name}
                onClick={() => handleProviderClick(provider)}
                className="card card-hover p-6 cursor-pointer transition-all duration-200 hover:scale-105 hover:border-primary-300"
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-20 h-20 flex items-center justify-center bg-white rounded-lg shadow-sm">
                    <Image
                      src={provider.logo}
                      alt={`${provider.name} logo`}
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium text-secondary-900 text-center">
                    {provider.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Billing Details */}
      {step === 2 && (
        <div className="card">
          <div className="card-header">
            <div className="flex items-center space-x-3">
              {selectedProvider && (
                <Image
                  src={selectedProvider.logo}
                  alt={selectedProvider.name}
                  width={32}
                  height={32}
                  className="object-contain"
                />
              )}
              <div>
                <h2 className="text-2xl font-bold text-secondary-900">Utility Billing Details</h2>
                <p className="text-secondary-600">
                  Enter your current {selectedProvider?.name} electricity rates
                </p>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-danger-50 border border-danger-200 rounded-md">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-danger-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-danger-700">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleFirstSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2" htmlFor="rate">
                  Electricity Rate (¢/kWh)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="rate"
                    className="input pr-12"
                    placeholder="12.5"
                    step="0.001"
                    min="0"
                    required
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-500">¢/kWh</span>
                </div>
                <p className="mt-1 text-xs text-secondary-500">
                  Check your bill for the energy charge per kilowatt-hour
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2" htmlFor="service_fee">
                  Monthly Service Fee (CAD)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-500">$</span>
                  <input
                    type="number"
                    id="service_fee"
                    className="input pl-8"
                    placeholder="15.00"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
                <p className="mt-1 text-xs text-secondary-500">
                  Fixed monthly service or delivery charge
                </p>
              </div>
            </div>

            <div className="bg-secondary-50 rounded-lg p-4">
              <h4 className="font-medium text-secondary-900 mb-2">💡 Where to find this information:</h4>
              <ul className="text-sm text-secondary-600 space-y-1">
                <li>• Look for "Energy Charge" or "Electricity Rate" on your bill</li>
                <li>• Service fees are often listed as "Delivery Charge" or "Basic Service Fee"</li>
                <li>• Don't include taxes or one-time charges</li>
              </ul>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn btn-secondary"
              >
                Back
              </button>
              <button type="submit" className="btn btn-primary">
                Continue
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Step 3: Review and Confirm */}
      {step === 3 && (
        <div className="card">
          <div className="card-header">
            <h2 className="text-2xl font-bold text-secondary-900">Review Your Submission</h2>
            <p className="text-secondary-600 mt-2">
              Please verify your utility rate information before submitting
            </p>
          </div>

          {!user && (
            <div className="mb-6 p-4 bg-warning-50 border border-warning-200 rounded-md">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-warning-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.99-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <p className="text-sm text-warning-700">
                  Please <Link href="/login" className="font-medium text-primary-600 hover:text-primary-500">sign in</Link> to submit your utility rates.
                </p>
              </div>
            </div>
          )}
          
          {error && (
            <div className="mb-6 p-4 bg-danger-50 border border-danger-200 rounded-md">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-danger-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-danger-700">{error}</p>
              </div>
            </div>
          )}

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card bg-secondary-25">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-white rounded-lg flex items-center justify-center">
                    {selectedProvider && (
                      <Image
                        src={selectedProvider.logo}
                        alt={selectedProvider.name}
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    )}
                  </div>
                  <div className="text-sm text-secondary-600">Provider</div>
                  <div className="font-semibold text-secondary-900">{defaultUtilityBill.provider}</div>
                </div>
              </div>

              <div className="card bg-secondary-25">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-primary-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="text-sm text-secondary-600">Electricity Rate</div>
                  <div className="font-semibold text-secondary-900">{defaultUtilityBill.rate}¢/kWh</div>
                </div>
              </div>

              <div className="card bg-secondary-25">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-success-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <div className="text-sm text-secondary-600">Service Fee</div>
                  <div className="font-semibold text-secondary-900">${defaultUtilityBill.serviceFee}/month</div>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="btn btn-secondary"
              >
                Back
              </button>
              <button
                type="button"
                className="btn btn-primary disabled:opacity-50"
                onClick={handleFinalSubmit}
                disabled={!user || loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </div>
                ) : (
                  'Submit Utility Rates'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Success */}
      {step === 4 && (
        <Modal isVisible={true} onClose={handleCloseModal}>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-success-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-secondary-900 mb-2">
              Utility Rates Submitted Successfully!
            </h3>
            <p className="text-secondary-600 mb-6">
              Thank you for sharing your utility rates. Your contribution helps other Canadians find better deals.
            </p>
            <button onClick={handleCloseModal} className="btn btn-primary">
              Return to Home
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UtilityProvider;
