// components/MobileProvider.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image, { StaticImageData } from 'next/image'

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

const MobileProvider: React.FC = () => {
  const [step, setStep] = useState(1);
  const router = useRouter();

  function handleProviderClick(provider: Provider) {
    defaultPhoneBill.provider = provider.name;
    setStep(2);
  };

  function handleFirstSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Prevent the default form submission

    const monthly_cost = (document.getElementById("monthly_cost") as HTMLInputElement).value;
    const data_limit = (document.getElementById("data_limit") as HTMLInputElement).value;
    const minutes = (document.getElementById("minutes") as HTMLInputElement).value;
    const sms = (document.getElementById("sms_limit") as HTMLInputElement).value;

    // Check if all fields are filled
    if (!monthly_cost || !data_limit || !minutes || !sms) {
      alert("Please fill in all fields before proceeding.");
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
    insertPhonePlans(defaultPhoneBill)
    setStep(5);
  }

  function handleCloseModal(): void {
    router.push('/landing');
  }

  return (
    <div className="container mx-auto">
      {step === 1 && (
      <>
        <h2 className="text-center text-3xl mt-4 mb-10">Who is your current mobile provider?</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {providers.map((provider) => (
              <div key={provider.name} onClick= {() => handleProviderClick(provider)} className="flex flex-col mt-5 items-center p-4 border-2 rounded-lg cursor-pointer hover:shadow-lg">
                <Image className="p-2" src={provider.logo} alt = {provider.name} width={100} height={100}/>
              </div>
            ))}
          </div>
      </>
      )}  
      {step === 2 && (
        <>
          <div>
          <h2 className="text-center text-3xl mt-4 mb-10">
            Please provide your billing details
          </h2>
          <form onSubmit={handleFirstSubmit}>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="monthly_cost">
                Monthly Cost (CAD):
              </label>
              <input
                type="number"
                id="monthly_cost"
                className="border rounded p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="data_limit">
                Data Limit (GB):
              </label>
              <input
                type="number"
                id="data_limit"
                className="border rounded p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="minutes">
                Calling Minutes:
              </label>
              <input
                type="number"
                id="minutes"
                className="border rounded p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="sms_limit">
                SMS Limit:
              </label>
              <input
                type="number"
                id="sms_limit"
                className="border rounded p-2 w-full"
                required
              />
            </div>
            <div className="mt-4">
              <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
                Next
              </button>
            </div>
          </form>
        </div>
        </>
      )}
      {step === 3 && (
        <div className="mb-4">
        <label className="text-center text-3xl mt-4 mb-10">Bring Your Own Device?</label>
        <div className="flex items-center py-5">
          <input
            type="radio"
            id="byod_yes"
            name="byod"
            value="yes"
            className="mr-2"
          />
          <label htmlFor="byod_yes" className="mr-4">Yes</label>
          <input
            type="radio"
            id="byod_no"
            name="byod"
            value="no"
            className="mr-2"
          />
          <label htmlFor="byod_no">No</label>
        </div>
        <div className="mt-4">
          <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={handleSecondSubmit}>
            Next
          </button>
        </div>
      </div>
    )}
    {step === 4 && (
      <div className="mb-4">
      <label className="text-center text-3xl mt-4 mb-10">Additional Perks:</label>
      <div className="flex flex-col py-5">
        {planPerks.map((perk) => (
          <label key={perk} className="flex items-center">
            <input
              type="checkbox"
              value={perk}
              className="mr-2"
            />
            {perk}
          </label>
        ))}
      </div>
      <div className="mt-4">
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded" onClick={handleFinalSubmit}>
          Submit
        </button>
      </div>
    </div>
    )}
    {step === 5 && (
      <Modal isVisible={true} onClose={handleCloseModal}>
      <p className="text-2xl font-bold">Your bills have been submitted!</p>
      </Modal>
    )}
    </div>
  );
};

export default MobileProvider;