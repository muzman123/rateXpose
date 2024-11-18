"use client"

import { useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { formatTimeAgo } from '@/lib/utils/timeFormat';
import { fetchLatestUtilityPlans } from '../../lib/supabase';
import styles from '../../styles/Home.module.css';

import enmaxLogo from "./providerLogos/enmax_logo.png";
import directEnergyLogo from "./providerLogos/direct_energy_logo.png";
import atcoLogo from "./providerLogos/atco-logo.jpg";

interface UtilityPlan {
  id: number;
  provider: string;
  rate: number;
  uploaded_at: string;
  service_fee: string;
}

// Mapping provider names to logo imports
const providerLogos: { [key: string]: StaticImageData } = {
  ENMAX: enmaxLogo,
  'Direct Energy': directEnergyLogo,
  ATCO: atcoLogo
};

export default function UtilityPlans() {
  const [utilityPlans, setUtilityPlans] = useState<UtilityPlan[]>([]);

  useEffect(() => {
    const loadUtilityPlans = async () => {
      const plans = await fetchLatestUtilityPlans();
      setUtilityPlans(plans);
    };

    loadUtilityPlans();
  }, []);

  return (
    <div className="flex flex-col bg-primary p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Utility Plans</h3>
      {utilityPlans.slice(0, 2).map((plan) => (
        <div key={plan.id} className="mb-2 flex items-center">
          <Image
            src={providerLogos[plan.provider] || 'https://placehold.co/50'}
            alt={`${plan.provider} logo`}
            width={40}
            height={40}
            className="inline-block"
          />
          <span className="ml-2">{plan.rate} kWh</span>
          <span className="ml-20 text-xs">{formatTimeAgo(plan.uploaded_at)}</span>
        </div>
      ))}
      {utilityPlans.length > 2 && (
        <div className={`${styles.overlay} mb-2 flex items-center`}>
          <Image
            src={providerLogos[utilityPlans[2].provider] || 'https://placehold.co/50'}
            alt={`${utilityPlans[2].provider} logo`}
            width={40}
            height={40}
            className="inline-block"
          />
          <span className="ml-2">{utilityPlans[2].rate}/month</span>
          <span className="ml-20 text-xs">{formatTimeAgo(utilityPlans[2].uploaded_at)}</span>
        </div>
      )}
      <div className="mt-5">
        <h3 className="text-sm text-blue-600 hover:underline">View All &gt;</h3>
      </div>
    </div>
  );
}
