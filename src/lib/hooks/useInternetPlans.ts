'use client'

import { useState, useEffect, useCallback } from 'react';
import { fetchAllInternetPlans, fetchInternetPlanById } from '../supabase';

export interface InternetPlan {
  id: number;
  provider: string;
  monthly_cost: number;
  speed: number;
  isCable: boolean;
  isFibre: boolean;
  uploaded_at: string;
  user_id?: string;
  location?: string;
  description?: string;
  contract_length?: string;
  installation_fee?: number;
  equipment_fee?: number;
}

export interface InternetPlanFilters {
  searchQuery: string;
  sortBy: 'latest' | 'price-low' | 'price-high' | 'speed-high' | 'provider';
  provider: string;
  speedRange: 'all' | '0-50' | '50-100' | '100-500' | '500+';
  connectionType: 'all' | 'fibre' | 'cable';
  minCost?: number;
  maxCost?: number;
}

export interface UseInternetPlansReturn {
  plans: InternetPlan[];
  filteredPlans: InternetPlan[];
  selectedPlan: InternetPlan | null;
  filters: InternetPlanFilters;
  isLoading: boolean;
  error: string | null;
  totalCount: number;
  
  // Actions
  setSelectedPlan: (plan: InternetPlan | null) => void;
  updateFilters: (newFilters: Partial<InternetPlanFilters>) => void;
  clearFilters: () => void;
  loadPlanDetails: (planId: number) => Promise<void>;
  refreshPlans: () => Promise<void>;
}

const defaultFilters: InternetPlanFilters = {
  searchQuery: '',
  sortBy: 'latest',
  provider: 'all',
  speedRange: 'all',
  connectionType: 'all',
};

export const useInternetPlans = (): UseInternetPlansReturn => {
  const [plans, setPlans] = useState<InternetPlan[]>([]);
  const [filteredPlans, setFilteredPlans] = useState<InternetPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<InternetPlan | null>(null);
  const [filters, setFilters] = useState<InternetPlanFilters>(defaultFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  // Load all plans
  const loadPlans = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchAllInternetPlans();
      const transformedData = data.map(plan => ({
        ...plan,
        monthly_cost: typeof plan.monthly_cost === 'string' 
          ? parseFloat(plan.monthly_cost.replace('$', '')) 
          : plan.monthly_cost
      }));
      
      setPlans(transformedData);
      setTotalCount(transformedData.length);
    } catch (err) {
      console.error('Error loading internet plans:', err);
      setError('Failed to load internet plans. Please try again.');
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

    // Speed range filter
    if (filters.speedRange !== 'all') {
      switch (filters.speedRange) {
        case '0-50':
          filtered = filtered.filter(plan => plan.speed <= 50);
          break;
        case '50-100':
          filtered = filtered.filter(plan => plan.speed > 50 && plan.speed <= 100);
          break;
        case '100-500':
          filtered = filtered.filter(plan => plan.speed > 100 && plan.speed <= 500);
          break;
        case '500+':
          filtered = filtered.filter(plan => plan.speed > 500);
          break;
      }
    }

    // Connection type filter
    if (filters.connectionType !== 'all') {
      if (filters.connectionType === 'fibre') {
        filtered = filtered.filter(plan => plan.isFibre);
      } else if (filters.connectionType === 'cable') {
        filtered = filtered.filter(plan => plan.isCable);
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
      case 'speed-high':
        filtered.sort((a, b) => b.speed - a.speed);
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
      const planDetails = await fetchInternetPlanById(planId);
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
  const updateFilters = useCallback((newFilters: Partial<InternetPlanFilters>) => {
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