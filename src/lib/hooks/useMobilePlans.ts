'use client'

import { useState, useEffect, useCallback } from 'react';
import { fetchAllPhonePlans, fetchPhonePlanById, fetchPhonePlansWithFilters } from '../supabase';

export interface MobilePlan {
  id: number;
  provider: string;
  monthly_cost: number;
  data_limit: number;
  minutes: number;
  sms: number;
  uploaded_at: string;
  user_id?: string;
  location?: string;
  description?: string;
  features?: string[];
  contract_length?: string;
  byod?: boolean;
}

export interface MobilePlanFilters {
  searchQuery: string;
  sortBy: 'latest' | 'price-low' | 'price-high' | 'data-high' | 'provider';
  provider: string;
  dataRange: 'all' | '0-5' | '5-10' | '10-20' | '20+';
  minCost?: number;
  maxCost?: number;
}

export interface UseMobilePlansReturn {
  plans: MobilePlan[];
  filteredPlans: MobilePlan[];
  selectedPlan: MobilePlan | null;
  filters: MobilePlanFilters;
  isLoading: boolean;
  error: string | null;
  totalCount: number;
  
  // Actions
  setSelectedPlan: (plan: MobilePlan | null) => void;
  updateFilters: (newFilters: Partial<MobilePlanFilters>) => void;
  clearFilters: () => void;
  loadPlanDetails: (planId: number) => Promise<void>;
  refreshPlans: () => Promise<void>;
}

const defaultFilters: MobilePlanFilters = {
  searchQuery: '',
  sortBy: 'latest',
  provider: 'all',
  dataRange: 'all',
};

export const useMobilePlans = (): UseMobilePlansReturn => {
  const [plans, setPlans] = useState<MobilePlan[]>([]);
  const [filteredPlans, setFilteredPlans] = useState<MobilePlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<MobilePlan | null>(null);
  const [filters, setFilters] = useState<MobilePlanFilters>(defaultFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  // Load all plans
  const loadPlans = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchAllPhonePlans();
      const transformedData = data.map(plan => ({
        ...plan,
        monthly_cost: typeof plan.monthly_cost === 'string' 
          ? parseFloat(plan.monthly_cost.replace('$', '')) 
          : plan.monthly_cost
      }));
      
      setPlans(transformedData);
      setTotalCount(transformedData.length);
    } catch (err) {
      console.error('Error loading mobile plans:', err);
      setError('Failed to load mobile plans. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Apply filters and sorting
  const applyFiltersAndSorting = useCallback(() => {
    let filtered = [...plans];

    // Search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(plan => 
        plan.provider.toLowerCase().includes(query) ||
        plan.description?.toLowerCase().includes(query) ||
        plan.location?.toLowerCase().includes(query)
      );
    }

    // Provider filter
    if (filters.provider !== 'all') {
      filtered = filtered.filter(plan => plan.provider === filters.provider);
    }

    // Data range filter
    if (filters.dataRange !== 'all') {
      switch (filters.dataRange) {
        case '0-5':
          filtered = filtered.filter(plan => plan.data_limit <= 5);
          break;
        case '5-10':
          filtered = filtered.filter(plan => plan.data_limit > 5 && plan.data_limit <= 10);
          break;
        case '10-20':
          filtered = filtered.filter(plan => plan.data_limit > 10 && plan.data_limit <= 20);
          break;
        case '20+':
          filtered = filtered.filter(plan => plan.data_limit > 20);
          break;
      }
    }

    // Cost range filter
    if (filters.minCost !== undefined) {
      filtered = filtered.filter(plan => plan.monthly_cost >= filters.minCost!);
    }
    if (filters.maxCost !== undefined) {
      filtered = filtered.filter(plan => plan.monthly_cost <= filters.maxCost!);
    }

    // Sort
    switch (filters.sortBy) {
      case 'latest':
        filtered.sort((a, b) => new Date(b.uploaded_at).getTime() - new Date(a.uploaded_at).getTime());
        break;
      case 'price-low':
        filtered.sort((a, b) => a.monthly_cost - b.monthly_cost);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.monthly_cost - a.monthly_cost);
        break;
      case 'data-high':
        filtered.sort((a, b) => b.data_limit - a.data_limit);
        break;
      case 'provider':
        filtered.sort((a, b) => a.provider.localeCompare(b.provider));
        break;
    }

    setFilteredPlans(filtered);
  }, [plans, filters]);

  // Load plan details
  const loadPlanDetails = useCallback(async (planId: number) => {
    try {
      const planDetails = await fetchPhonePlanById(planId);
      if (planDetails) {
        setSelectedPlan({
          ...planDetails,
          monthly_cost: typeof planDetails.monthly_cost === 'string' 
            ? parseFloat(planDetails.monthly_cost.replace('$', '')) 
            : planDetails.monthly_cost
        });
      }
    } catch (err) {
      console.error('Error loading plan details:', err);
      setError('Failed to load plan details.');
    }
  }, []);

  // Update filters
  const updateFilters = useCallback((newFilters: Partial<MobilePlanFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Clear filters
  const clearFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  // Refresh plans
  const refreshPlans = useCallback(async () => {
    await loadPlans();
  }, [loadPlans]);

  // Initial load
  useEffect(() => {
    loadPlans();
  }, [loadPlans]);

  // Apply filters when they change
  useEffect(() => {
    applyFiltersAndSorting();
  }, [applyFiltersAndSorting]);

  return {
    plans,
    filteredPlans,
    selectedPlan,
    filters,
    isLoading,
    error,
    totalCount,
    setSelectedPlan,
    updateFilters,
    clearFilters,
    loadPlanDetails,
    refreshPlans,
  };
};