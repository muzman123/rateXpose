'use client'

import { useState, useEffect, useCallback } from 'react';
import { fetchAllUtilityPlans, fetchUtilityPlanById } from '../supabase';

export interface UtilityPlan {
  id: number;
  provider: string;
  rate: number;
  service_fee: number;
  uploaded_at: string;
  user_id?: string;
  location?: string;
  description?: string;
  plan_type?: string;
  billing_period?: string;
  usage_tier?: string;
}

export interface UtilityPlanFilters {
  searchQuery: string;
  sortBy: 'latest' | 'rate-low' | 'rate-high' | 'total-low' | 'total-high' | 'provider';
  provider: string;
  rateRange: 'all' | '0-10' | '10-15' | '15-20' | '20+';
  minRate?: number;
  maxRate?: number;
  minServiceFee?: number;
  maxServiceFee?: number;
}

export interface UseUtilityPlansReturn {
  plans: UtilityPlan[];
  filteredPlans: UtilityPlan[];
  selectedPlan: UtilityPlan | null;
  filters: UtilityPlanFilters;
  isLoading: boolean;
  error: string | null;
  totalCount: number;
  
  // Actions
  setSelectedPlan: (plan: UtilityPlan | null) => void;
  updateFilters: (newFilters: Partial<UtilityPlanFilters>) => void;
  clearFilters: () => void;
  loadPlanDetails: (planId: number) => Promise<void>;
  refreshPlans: () => Promise<void>;
}

const defaultFilters: UtilityPlanFilters = {
  searchQuery: '',
  sortBy: 'latest',
  provider: 'all',
  rateRange: 'all',
};

export const useUtilityPlans = (): UseUtilityPlansReturn => {
  const [plans, setPlans] = useState<UtilityPlan[]>([]);
  const [filteredPlans, setFilteredPlans] = useState<UtilityPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<UtilityPlan | null>(null);
  const [filters, setFilters] = useState<UtilityPlanFilters>(defaultFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  // Load all plans
  const loadPlans = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchAllUtilityPlans();
      setPlans(data);
      setTotalCount(data.length);
    } catch (err) {
      console.error('Error loading utility plans:', err);
      setError('Failed to load utility plans. Please try again.');
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
        plan.location?.toLowerCase().includes(query) ||
        plan.plan_type?.toLowerCase().includes(query)
      );
    }

    // Provider filter
    if (filters.provider !== 'all') {
      filtered = filtered.filter(plan => plan.provider === filters.provider);
    }

    // Rate range filter
    if (filters.rateRange !== 'all') {
      switch (filters.rateRange) {
        case '0-10':
          filtered = filtered.filter(plan => plan.rate <= 10);
          break;
        case '10-15':
          filtered = filtered.filter(plan => plan.rate > 10 && plan.rate <= 15);
          break;
        case '15-20':
          filtered = filtered.filter(plan => plan.rate > 15 && plan.rate <= 20);
          break;
        case '20+':
          filtered = filtered.filter(plan => plan.rate > 20);
          break;
      }
    }

    // Rate range filter
    if (filters.minRate !== undefined) {
      filtered = filtered.filter(plan => plan.rate >= filters.minRate!);
    }
    if (filters.maxRate !== undefined) {
      filtered = filtered.filter(plan => plan.rate <= filters.maxRate!);
    }

    // Service fee filter
    if (filters.minServiceFee !== undefined) {
      filtered = filtered.filter(plan => plan.service_fee >= filters.minServiceFee!);
    }
    if (filters.maxServiceFee !== undefined) {
      filtered = filtered.filter(plan => plan.service_fee <= filters.maxServiceFee!);
    }

    // Sort
    switch (filters.sortBy) {
      case 'latest':
        filtered.sort((a, b) => new Date(b.uploaded_at).getTime() - new Date(a.uploaded_at).getTime());
        break;
      case 'rate-low':
        filtered.sort((a, b) => a.rate - b.rate);
        break;
      case 'rate-high':
        filtered.sort((a, b) => b.rate - a.rate);
        break;
      case 'total-low':
        filtered.sort((a, b) => (a.rate + a.service_fee) - (b.rate + b.service_fee));
        break;
      case 'total-high':
        filtered.sort((a, b) => (b.rate + b.service_fee) - (a.rate + a.service_fee));
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
      const planDetails = await fetchUtilityPlanById(planId);
      if (planDetails) {
        setSelectedPlan(planDetails);
      }
    } catch (err) {
      console.error('Error loading plan details:', err);
      setError('Failed to load plan details.');
    }
  }, []);

  // Update filters
  const updateFilters = useCallback((newFilters: Partial<UtilityPlanFilters>) => {
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