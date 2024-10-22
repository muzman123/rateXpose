'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image, { StaticImageData } from 'next/image'

import telusLogo from "./providerLogos/telus_logo.png"
import shawLogo from "./providerLogos/shaw-logo.jpg"
import rogersLogo from "./providerLogos/rogers_logo.png"
import bellLogo from "./providerLogos/bell_logo.png"

import Modal from './Modal';
import InternetBill from '@/lib/internetBill';

import { insertInternetPlans } from '../../lib/supabase'

interface Provider {
  name: string;
  logo: StaticImageData;
}

var defaultInternetBill = new InternetBill(
  'unique-id-123',
  'Default Provider',
  0, // Monthly Cost
  new Date(), // Uploaded At
  0, // Internet Speed
  false, // Is Copper
  false, // Is Fibre
  undefined, // Location
  undefined // Description
);

const providers: Provider[] = [
  { name: 'Telus', logo: telusLogo },  
  { name: 'Shaw', logo: shawLogo },
  { name: 'Rogers', logo: rogersLogo },
  { name: 'Bell', logo: bellLogo }, 
];

const InternetProvider: React.FC = () => {
  const [step, setStep] = useState(1);
  const router = useRouter();

  function handleProviderClick(provider: Provider) {
    defaultInternetBill.provider = provider.name;
    setStep(2);
  };

  function handleFirstSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const monthly_cost = (document.getElementById("monthly_cost") as HTMLInputElement).value;
    const internet_speed = (document.getElementById("internet_speed") as HTMLInputElement).value;
    const is_copper = (document.getElementById("is_copper") as HTMLInputElement).checked;
    const is_fibre = (document.getElementById("is_fibre") as HTMLInputElement).checked;

    if (!monthly_cost || !internet_speed) {
      alert("Please fill in all required fields before proceeding.");
      return;
    }

    defaultInternetBill.monthlyCost = Number(monthly_cost);
    defaultInternetBill.internetSpeed = Number(internet_speed);
    defaultInternetBill.isCopper = is_copper;
    defaultInternetBill.isFibre = is_fibre;
    defaultInternetBill.uploadedAt = new Date();
    setStep(3);
  }

  async function handleFinalSubmit() {
    insertInternetPlans(defaultInternetBill)
    setStep(4);
  }

  function handleCloseModal(): void {
    router.push('/');
  }

  return (
    <div className="container mx-auto">
      {step === 1 && (
      <>
        <h2 className="text-center text-3xl mt-4 mb-10">Who is your current internet provider?</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {providers.map((provider) => (
              <div key={provider.name} onClick={() => handleProviderClick(provider)} className="flex flex-col mt-5 items-center p-4 border-2 rounded-lg cursor-pointer hover:shadow-lg">
                <Image className="p-2" src={provider.logo} alt={provider.name} width={100} height={100}/>
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
              <label className="block mb-2" htmlFor="internet_speed">
                Internet Speed (Mbps):
              </label>
              <input
                type="number"
                id="internet_speed"
                className="border rounded p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Connection Type:</label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_copper"
                  className="mr-2"
                />
                <label htmlFor="is_copper" className="mr-4">Copper</label>
                <input
                  type="checkbox"
                  id="is_fibre"
                  className="mr-2"
                />
                <label htmlFor="is_fibre">Fibre</label>
              </div>
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
          <label className="text-center text-3xl mt-4 mb-10">Additional Comments:</label>
          <textarea
            id="description"
            className="w-full p-2 border rounded"
            rows={4}
            placeholder="Any additional information about your internet plan..."
          ></textarea>
          <div className="mt-4">
            <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={handleFinalSubmit}>
              Submit
            </button>
          </div>
        </div>
      )}
      {step === 4 && (
        <Modal isVisible={true} onClose={handleCloseModal}>
          <p className="text-2xl font-bold">Your internet bill has been submitted!</p>
        </Modal>
      )}
    </div>
  );
};

export default InternetProvider;