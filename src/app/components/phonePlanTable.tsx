// components/PhonePlans.tsx
"use client"

import { useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { formatTimeAgo } from '@/lib/utils/timeFormat';
import { fetchLatestPhonePlans } from '../../lib/supabase';
import styles from '../../styles/Home.module.css';

import bellLogo from "./providerLogos/bell_logo.png";
import chatrLogo from "./providerLogos/chatr_logo.png";
import eastlinkLogo from "./providerLogos/eastlink_logo.png";
import fidoLogo from "./providerLogos/fido_logo.png";
import fizzLogo from "./providerLogos/fizz_logo.png";
import freedomLogo from "./providerLogos/freedom_logo.png";
import koodoLogo from "./providerLogos/koodo_logo.png";
import rogersLogo from "./providerLogos/rogers_logo.png";
import telusLogo from "./providerLogos/telus_logo.png";

interface PhonePlan {
  id: number;
  provider: string;
  monthly_cost: string;
  uploaded_at: string;
}

// Mapping provider names to logo imports
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

export default function PhonePlans() {
  const [phonePlans, setPhonePlans] = useState<PhonePlan[]>([]);

  useEffect(() => {
    const loadPhonePlans = async () => {
      const plans = await fetchLatestPhonePlans();
      setPhonePlans(plans);
    };

    loadPhonePlans();
  }, []);

  return (
    <div className="flex flex-col bg-primary p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Phone Plans</h3>
      {phonePlans.slice(0, 2).map((plan) => (
        <div key={plan.id} className="mb-2 flex items-center">
          <Image
            src={providerLogos[plan.provider] || 'https://placehold.co/50'}
            alt={`${plan.provider} logo`}
            width={40}
            height={40}
            className="inline-block"
          />
          <span className="ml-2">{plan.monthly_cost}/month</span>
          <span className="ml-20 text-xs">{formatTimeAgo(plan.uploaded_at)}</span>
        </div>
      ))}
      {phonePlans.length > 2 && (
        <div className={`${styles.overlay} mb-2 flex items-center`}>
          <Image
            src={providerLogos[phonePlans[2].provider] || 'https://placehold.co/50'}
            alt={`${phonePlans[2].provider} logo`}
            width={40}
            height={40}
            className="inline-block"
          />
          <span className="ml-2">{phonePlans[2].monthly_cost}/month</span>
          <span className="ml-20 text-xs">{formatTimeAgo(phonePlans[2].uploaded_at)}</span>
        </div>
      )}
      <div className="mt-5">
        <h3 className="text-sm text-blue-600 hover:underline">View All &gt;</h3>
      </div>
    </div>
  );
}
