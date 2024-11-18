// components/UtilityProvider.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image, { StaticImageData } from 'next/image';

import enmaxLogo from "./providerLogos/enmax_logo.png";
import directEnergyLogo from "./providerLogos/direct_energy_logo.png";
import atcoLogo from "./providerLogos/atco-logo.jpg";

import Modal from './Modal';
import UtilityBill from '@/lib/utilityBill';
import { insertUtilityPlans } from '../../lib/supabase'; // Replace with your actual Supabase insert function

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

const UtilityProvider: React.FC = () => {
  const [step, setStep] = useState(1);
  const router = useRouter();

  function handleProviderClick(provider: Provider) {
    defaultUtilityBill.provider = provider.name;
    setStep(2);
  }

  function handleFirstSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const rate = (document.getElementById("rate") as HTMLInputElement).value;
    const service_fee = (document.getElementById("service_fee") as HTMLInputElement).value;

    if (!rate || !service_fee) {
      alert("Please fill in all fields before proceeding.");
      return;
    }

    // Parse as floats for accurate decimal handling
    defaultUtilityBill.rate = parseFloat(rate);
    defaultUtilityBill.serviceFee = parseFloat(service_fee);
    defaultUtilityBill.uploadedAt = new Date();
    setStep(3);
  }

  async function handleFinalSubmit() {
    await insertUtilityPlans(defaultUtilityBill); // Insert into Supabase
    setStep(4);
  }

  function handleCloseModal(): void {
    router.push('/');
  }

  return (
    <div className="container mx-auto">
      {step === 1 && (
        <>
          <h2 className="text-center text-3xl mt-4 mb-10">Who is your current utility provider?</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {providers.map((provider) => (
              <div key={provider.name} onClick={() => handleProviderClick(provider)} className="flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer hover:shadow-lg">
                <Image className="p-2" src={provider.logo} alt={provider.name} width={100} height={100} />
              </div>
            ))}
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <h2 className="text-center text-3xl mt-4 mb-10">Please provide your utility billing details</h2>
          <form onSubmit={handleFirstSubmit}>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="rate">Rate (kWh):</label>
              <input type="number" step="0.001" id="rate" className="border rounded p-2 w-full" required />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="service_fee">Service Fee (CAD):</label>
              <input type="number" step="0.01" id="service_fee" className="border rounded p-2 w-full" required />
            </div>
            <div className="mt-4">
              <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">Next</button>
            </div>
          </form>
        </>
      )}
      {step === 3 && (
        <div className="text-center">
          <h2 className="text-3xl mt-4 mb-10">Review and Confirm</h2>
          <p>Provider: {defaultUtilityBill.provider}</p>
          <p>Rate: {defaultUtilityBill.rate} kWh</p>
          <p>Service Fee: ${defaultUtilityBill.serviceFee}</p>
          <div className="mt-4">
            <button onClick={handleFinalSubmit} className="px-4 py-2 bg-green-500 text-white rounded">Submit</button>
          </div>
        </div>
      )}
      {step === 4 && (
        <Modal isVisible={true} onClose={handleCloseModal}>
          <p className="text-2xl font-bold">Your utility bill has been submitted!</p>
        </Modal>
      )}
    </div>
  );
};

export default UtilityProvider;
