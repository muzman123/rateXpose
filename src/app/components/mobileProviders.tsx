// components/MobileProvider.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link';

import bellLogo from "./providerLogos/bell_logo.png"
import chatrLogo from "./providerLogos/chatr_logo.png"
import eastlinkLogo from "./providerLogos/eastlink_logo.png"
import fidoLogo from "./providerLogos/fido_logo.png"
import fizzLogo from "./providerLogos/fizz_logo.png"
import freedomLogo from "./providerLogos/freedom_logo.png"
import koodoLogo from "./providerLogos/koodo_logo.png"
import rogersLogo from "./providerLogos/rogers_logo.png"
import telusLogo from "./providerLogos/telus_logo.png"

import Modal from './Modal';
import PhoneBill from '@/lib/phoneBill';
import { insertPhonePlans } from '../../lib/supabase'
import { useAuth } from '../../lib/AuthContext';

interface Provider {
  name: string;
  logo: StaticImageData;
}

var defaultPhoneBill = new PhoneBill(
  'unique-id-123',
  'Default Provider',
  undefined, // Monthly Cost
  undefined, // Data Limit
  undefined, // Minutes
  undefined, // SMS
  undefined, // Uploaded At
  undefined, // Description
);

const providers: Provider[] = [
  { name: 'Bell', logo: bellLogo },
  { name: 'Chatr', logo: chatrLogo },
  { name: 'Eastlink', logo: eastlinkLogo },
  { name: 'Fido', logo: fidoLogo },
  { name: 'Fizz', logo: fizzLogo },
  { name: 'Freedom', logo: freedomLogo },
  { name: 'Koodo', logo: koodoLogo },
  { name: 'Rogers', logo: rogersLogo },
  { name: 'Telus', logo: telusLogo },
];

const planPerks = [
  "Unlimited talk Canada",
  "Unlimited text Canada",
  "Unlimited talk US",
  "Unlimited text US",
  "5G",
  "Voicemail",
];

const stepTitles = [
  "Select Provider",
  "Plan Details",
  "Device Info",
  "Additional Features",
  "Complete"
];

const MobileProvider: React.FC = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const router = useRouter();
  const { user } = useAuth();

  function handleProviderClick(provider: Provider) {
    defaultPhoneBill.provider = provider.name;
    setSelectedProvider(provider);
    setStep(2);
  };

  function handleFirstSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    const monthly_cost = (document.getElementById("monthly_cost") as HTMLInputElement).value;
    const data_limit = (document.getElementById("data_limit") as HTMLInputElement).value;
    const minutes = (document.getElementById("minutes") as HTMLInputElement).value;
    const sms = (document.getElementById("sms_limit") as HTMLInputElement).value;

    if (!monthly_cost || !data_limit || !minutes || !sms) {
      setError("Please fill in all fields before proceeding.");
      return;
    }

    defaultPhoneBill.monthlyCost = Number(monthly_cost);
    defaultPhoneBill.dataLimit = Number(data_limit);
    defaultPhoneBill.minutes = Number(minutes);
    defaultPhoneBill.sms = Number(sms);
    defaultPhoneBill.uploadedAt = new Date();
    setStep(3);
  }
  
  function handleSecondSubmit() {
    setStep(4);
  }

  async function handleFinalSubmit() {
    if (!user) {
      setError('Please log in to submit your mobile bill');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await insertPhonePlans(defaultPhoneBill);
      setStep(5);
    } catch (err) {
      console.error('Error submitting mobile bill:', err);
      setError('Failed to submit mobile bill. Please try again.');
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
              Select Your Mobile Provider
            </h2>
            <p className="text-secondary-600">
              Choose your current mobile service provider to get started
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {providers.map((provider) => (
              <div
                key={provider.name}
                onClick={() => handleProviderClick(provider)}
                className="card card-hover p-6 cursor-pointer transition-all duration-200 hover:scale-105 hover:border-primary-300"
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-16 h-16 flex items-center justify-center bg-white rounded-lg shadow-sm">
                    <Image
                      src={provider.logo}
                      alt={`${provider.name} logo`}
                      width={48}
                      height={48}
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
                <h2 className="text-2xl font-bold text-secondary-900">Plan Details</h2>
                <p className="text-secondary-600">
                  Enter your current {selectedProvider?.name} plan information
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
                <label className="block text-sm font-medium text-secondary-700 mb-2" htmlFor="monthly_cost">
                  Monthly Cost (CAD)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-500">$</span>
                  <input
                    type="number"
                    id="monthly_cost"
                    className="input pl-8"
                    placeholder="65.00"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2" htmlFor="data_limit">
                  Data Allowance (GB)
                </label>
                <input
                  type="number"
                  id="data_limit"
                  className="input"
                  placeholder="10"
                  min="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2" htmlFor="minutes">
                  Calling Minutes
                </label>
                <input
                  type="number"
                  id="minutes"
                  className="input"
                  placeholder="Unlimited (enter 9999)"
                  min="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2" htmlFor="sms_limit">
                  SMS/Text Messages
                </label>
                <input
                  type="number"
                  id="sms_limit"
                  className="input"
                  placeholder="Unlimited (enter 9999)"
                  min="0"
                  required
                />
              </div>
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

      {/* Step 3: Device Info */}
      {step === 3 && (
        <div className="card">
          <div className="card-header">
            <h2 className="text-2xl font-bold text-secondary-900">Device Information</h2>
            <p className="text-secondary-600 mt-2">
              Did you bring your own device or get one from the carrier?
            </p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="card p-6 cursor-pointer hover:bg-primary-25 hover:border-primary-300 transition-colors">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="byod_yes"
                    name="byod"
                    value="yes"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300"
                  />
                  <div>
                    <div className="font-medium text-secondary-900">Bring Your Own Device</div>
                    <div className="text-sm text-secondary-600">I used my existing phone</div>
                  </div>
                </div>
              </label>

              <label className="card p-6 cursor-pointer hover:bg-primary-25 hover:border-primary-300 transition-colors">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="byod_no"
                    name="byod"
                    value="no"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300"
                  />
                  <div>
                    <div className="font-medium text-secondary-900">Carrier Device</div>
                    <div className="text-sm text-secondary-600">I got a phone from the carrier</div>
                  </div>
                </div>
              </label>
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
                onClick={handleSecondSubmit}
                className="btn btn-primary"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Additional Features */}
      {step === 4 && (
        <div className="card">
          <div className="card-header">
            <h2 className="text-2xl font-bold text-secondary-900">Plan Features</h2>
            <p className="text-secondary-600 mt-2">
              Select any additional features included in your plan
            </p>
          </div>

          {!user && (
            <div className="mb-6 p-4 bg-warning-50 border border-warning-200 rounded-md">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-warning-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.99-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <p className="text-sm text-warning-700">
                  Please <Link href="/login" className="font-medium text-primary-600 hover:text-primary-500">sign in</Link> to submit your mobile plan details.
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
          
          <div className="space-y-4 mb-8">
            {planPerks.map((perk) => (
              <label key={perk} className="flex items-center p-3 rounded-lg hover:bg-secondary-25 transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  value={perk}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded mr-3"
                />
                <span className="text-secondary-700">{perk}</span>
              </label>
            ))}
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setStep(3)}
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
                'Submit Plan Details'
              )}
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Success */}
      {step === 5 && (
        <Modal isVisible={true} onClose={handleCloseModal}>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-success-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-secondary-900 mb-2">
              Plan Submitted Successfully!
            </h3>
            <p className="text-secondary-600 mb-6">
              Thank you for sharing your mobile plan details. Your contribution helps other Canadians find better deals.
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

export default MobileProvider;