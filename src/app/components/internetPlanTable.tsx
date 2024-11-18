// components/PhonePlans.tsx
"use client"

import { useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { formatTimeAgo } from '@/lib/utils/timeFormat';
import { fetchLatestInternetPlans } from '@/lib/supabase';
import styles from '../../styles/Home.module.css';

import telusLogo from "./providerLogos/telus_logo.png"
import shawLogo from "./providerLogos/shaw-logo.jpg"
import rogersLogo from "./providerLogos/rogers_logo.png"
import bellLogo from "./providerLogos/bell_logo.png"

interface InternetPlan {
  id: number;
  provider: string;
  monthly_cost: string;
  uploaded_at: string;
}

// Mapping provider names to logo imports
const providerLogos: { [key: string]: StaticImageData } = {
  Bell: bellLogo,
  Shaw: shawLogo,
  Rogers: rogersLogo,
  Telus: telusLogo,
};

export default function InternetPlans() {
  const [internetPlans, setInternetPlans] = useState<InternetPlan[]>([]);

  useEffect(() => {
    const loadPhonePlans = async () => {
      const plans = await fetchLatestInternetPlans();
      setInternetPlans(plans);
    };

    loadPhonePlans();
  }, []);

  return (
    <div className="flex flex-col bg-primary p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Internet Plans</h3>
      {internetPlans.slice(0, 2).map((plan) => (
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
      {internetPlans.length > 2 && (
        <div className={`${styles.overlay} mb-2 flex items-center`}>
          <Image
            src={providerLogos[internetPlans[2].provider] || 'https://placehold.co/50'}
            alt={`${internetPlans[2].provider} logo`}
            width={40}
            height={40}
            className="inline-block"
          />
          <span className="ml-2">{internetPlans[2].monthly_cost}/month</span>
          <span className="ml-20 text-xs">{formatTimeAgo(internetPlans[2].uploaded_at)}</span>
        </div>
      )}
      <div className="mt-5">
        <h3 className="text-sm text-blue-600 hover:underline">View All &gt;</h3>
      </div>
    </div>
  );
}
