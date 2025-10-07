import { createClient } from '@supabase/supabase-js';
import PhoneBill from './phoneBill';
import InternetBill from './internetBill';
import UtilityBill from './utilityBill';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Something's wrong with the API key or URL");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function insertPhonePlans(bill: PhoneBill) {
  // Get current user
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User must be authenticated to submit data');
  }

  // Insert the data using the collected input with user_id
  const { data, error } = await supabase
    .from('phoneplans')
    .insert([
      {
        provider: bill.provider,
        monthly_cost: bill.monthlyCost,
        data_limit: bill.dataLimit,
        minutes: bill.minutes,
        sms: bill.sms,
        uploaded_at: bill.uploadedAt,
        user_id: user.id
      }
    ])

  if (error) {
    console.error('Error inserting data:', error)
    throw error
  } else {
    console.log('Data inserted successfully:', data)
    return data
  }
}

export async function fetchLatestPhonePlans() {
  const { data, error } = await supabase
    .from('phoneplans')
    .select('id, provider, monthly_cost, uploaded_at')
    .order('uploaded_at', { ascending: false })
    .limit(3);

  if (error) {
    console.error('Error fetching latest phone plans:', error);
    return [];
  }
  
  return data || [];
}

export async function fetchAllPhonePlans() {
  const { data, error } = await supabase
    .from('phoneplans')
    .select('*')
    .order('uploaded_at', { ascending: false });

  if (error) {
    console.error('Error fetching all phone plans:', error);
    return [];
  }
  
  return data || [];
}

export async function fetchPhonePlanById(id: number) {
  const { data, error } = await supabase
    .from('phoneplans')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching phone plan by ID:', error);
    return null;
  }
  
  return data;
}

export async function fetchPhonePlansWithFilters({
  provider,
  minCost,
  maxCost,
  minData,
  maxData,
  sortBy = 'uploaded_at',
  sortOrder = 'desc',
  limit,
  offset = 0
}: {
  provider?: string;
  minCost?: number;
  maxCost?: number;
  minData?: number;
  maxData?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
} = {}) {
  let query = supabase
    .from('phoneplans')
    .select('*');

  // Apply filters
  if (provider && provider !== 'all') {
    query = query.eq('provider', provider);
  }
  
  if (minCost !== undefined) {
    query = query.gte('monthly_cost', minCost);
  }
  
  if (maxCost !== undefined) {
    query = query.lte('monthly_cost', maxCost);
  }
  
  if (minData !== undefined) {
    query = query.gte('data_limit', minData);
  }
  
  if (maxData !== undefined) {
    query = query.lte('data_limit', maxData);
  }

  // Apply sorting
  const ascending = sortOrder === 'asc';
  query = query.order(sortBy, { ascending });

  // Apply pagination
  if (limit) {
    query = query.range(offset, offset + limit - 1);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching filtered phone plans:', error);
    return { data: [], count: 0 };
  }
  
  return { data: data || [], count: data?.length || 0 };
}

export async function insertInternetPlans(bill: InternetBill) {
  // Get current user
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User must be authenticated to submit data');
  }

  // Insert the data using the collected input with user_id
  const { data, error } = await supabase
    .from('internetplans')
    .insert([
      {
        provider: bill.provider,
        monthly_cost: bill.monthlyCost,
        speed: bill.internetSpeed,
        isCable: bill.isCopper,
        isFibre: bill.isFibre,
        uploaded_at: bill.uploadedAt,
        user_id: user.id
      }
    ])

  if (error) {
    console.error('Error inserting data:', error)
    throw error
  } else {
    console.log('Data inserted successfully:', data)
    return data
  }
}

export async function fetchLatestInternetPlans() {
  const { data, error } = await supabase
    .from('internetplans')
    .select('id, provider, monthly_cost, uploaded_at')
    .order('uploaded_at', { ascending: false })
    .limit(3);

  if (error) {
    console.error('Error fetching latest internet plans:', error);
    return [];
  }

  return data || [];
}

export async function insertUtilityPlans(bill: UtilityBill) {
  // Get current user
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User must be authenticated to submit data');
  }

  // Insert the data using the collected input with user_id
  const { data, error } = await supabase
    .from('utilityplans')
    .insert([
      {
        provider: bill.provider,
        uploaded_at: bill.uploadedAt,
        rate: bill.rate,
        service_fee: bill.serviceFee,
        user_id: user.id
      }
    ])

  if (error) {
    console.error('Error inserting data:', error)
    throw error
  } else {
    console.log('Data inserted successfully:', data)
    return data
  }
}

export async function fetchLatestUtilityPlans() {
  const { data, error } = await supabase
    .from('utilityplans')
    .select('id, provider, rate, service_fee, uploaded_at')
    .order('uploaded_at', { ascending: false })
    .limit(3);

  if (error) {
    console.error('Error fetching latest utility plans:', error);
    return [];
  }

  return data || [];
}

export async function fetchAllInternetPlans() {
  const { data, error } = await supabase
    .from('internetplans')
    .select('*')
    .order('uploaded_at', { ascending: false });

  if (error) {
    console.error('Error fetching all internet plans:', error);
    return [];
  }
  
  return data || [];
}

export async function fetchInternetPlanById(id: number) {
  const { data, error } = await supabase
    .from('internetplans')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching internet plan by ID:', error);
    return null;
  }
  
  return data;
}

export async function fetchAllUtilityPlans() {
  const { data, error } = await supabase
    .from('utilityplans')
    .select('*')
    .order('uploaded_at', { ascending: false });

  if (error) {
    console.error('Error fetching all utility plans:', error);
    return [];
  }
  
  return data || [];
}

export async function fetchUtilityPlanById(id: number) {
  const { data, error } = await supabase
    .from('utilityplans')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching utility plan by ID:', error);
    return null;
  }
  
  return data;
}

// Data aggregation functions for visualizations

export interface PriceDistributionData {
  provider: string;
  min: number;
  max: number;
  avg: number;
  median: number;
  count: number;
}

export interface TrendData {
  date: string;
  avgPrice: number;
  count: number;
}

/**
 * Fetch price distribution for mobile plans by provider
 * Returns all available data regardless of count
 */
export async function fetchMobilePriceDistribution(location?: string): Promise<PriceDistributionData[]> {
  let query = supabase
    .from('phoneplans')
    .select('provider, monthly_cost, location');

  if (location) {
    query = query.ilike('location', `%${location}%`);
  }

  const { data, error } = await query;

  if (error || !data) {
    console.error('Error fetching mobile price distribution:', error);
    return [];
  }

  // Group by provider and calculate statistics
  const grouped = data.reduce((acc: any, plan: any) => {
    const provider = plan.provider;
    if (!acc[provider]) {
      acc[provider] = [];
    }
    acc[provider].push(parseFloat(plan.monthly_cost) || 0);
    return acc;
  }, {});

  const distributions: PriceDistributionData[] = [];

  Object.keys(grouped).forEach(provider => {
    const prices = grouped[provider].sort((a: number, b: number) => a - b);
    
    // Include all data, no minimum threshold
    const sum = prices.reduce((a: number, b: number) => a + b, 0);
    const avg = sum / prices.length;
    const median = prices.length % 2 === 0
      ? (prices[prices.length / 2 - 1] + prices[prices.length / 2]) / 2
      : prices[Math.floor(prices.length / 2)];

    distributions.push({
      provider,
      min: Math.min(...prices),
      max: Math.max(...prices),
      avg: parseFloat(avg.toFixed(2)),
      median: parseFloat(median.toFixed(2)),
      count: prices.length
    });
  });

  return distributions;
}

/**
 * Fetch price distribution for internet plans by provider
 * Returns all available data regardless of count
 */
export async function fetchInternetPriceDistribution(location?: string): Promise<PriceDistributionData[]> {
  let query = supabase
    .from('internetplans')
    .select('provider, monthly_cost, location');

  if (location) {
    query = query.ilike('location', `%${location}%`);
  }

  const { data, error } = await query;

  if (error || !data) {
    console.error('Error fetching internet price distribution:', error);
    return [];
  }

  const grouped = data.reduce((acc: any, plan: any) => {
    const provider = plan.provider;
    if (!acc[provider]) {
      acc[provider] = [];
    }
    acc[provider].push(parseFloat(plan.monthly_cost) || 0);
    return acc;
  }, {});

  const distributions: PriceDistributionData[] = [];

  Object.keys(grouped).forEach(provider => {
    const prices = grouped[provider].sort((a: number, b: number) => a - b);
    
    // Include all data, no minimum threshold
    const sum = prices.reduce((a: number, b: number) => a + b, 0);
    const avg = sum / prices.length;
    const median = prices.length % 2 === 0
      ? (prices[prices.length / 2 - 1] + prices[prices.length / 2]) / 2
      : prices[Math.floor(prices.length / 2)];

    distributions.push({
      provider,
      min: Math.min(...prices),
      max: Math.max(...prices),
      avg: parseFloat(avg.toFixed(2)),
      median: parseFloat(median.toFixed(2)),
      count: prices.length
    });
  });

  return distributions;
}

/**
 * Fetch price distribution for utility plans by provider
 * Returns all available data regardless of count
 */
export async function fetchUtilityRateDistribution(location?: string): Promise<PriceDistributionData[]> {
  let query = supabase
    .from('utilityplans')
    .select('provider, rate, location');

  if (location) {
    query = query.ilike('location', `%${location}%`);
  }

  const { data, error } = await query;

  if (error || !data) {
    console.error('Error fetching utility rate distribution:', error);
    return [];
  }

  const grouped = data.reduce((acc: any, plan: any) => {
    const provider = plan.provider;
    if (!acc[provider]) {
      acc[provider] = [];
    }
    acc[provider].push(parseFloat(plan.rate) || 0);
    return acc;
  }, {});

  const distributions: PriceDistributionData[] = [];

  Object.keys(grouped).forEach(provider => {
    const rates = grouped[provider].sort((a: number, b: number) => a - b);
    
    // Include all data, no minimum threshold
    const sum = rates.reduce((a: number, b: number) => a + b, 0);
    const avg = sum / rates.length;
    const median = rates.length % 2 === 0
      ? (rates[rates.length / 2 - 1] + rates[rates.length / 2]) / 2
      : rates[Math.floor(rates.length / 2)];

    distributions.push({
      provider,
      min: Math.min(...rates),
      max: Math.max(...rates),
      avg: parseFloat(avg.toFixed(2)),
      median: parseFloat(median.toFixed(2)),
      count: rates.length
    });
  });

  return distributions;
}

/**
 * Fetch 90-day price trend for a specific service type
 * Returns all available data from the last 90 days
 */
export async function fetchPriceTrend(
  serviceType: 'mobile' | 'internet' | 'utility',
  location?: string
): Promise<TrendData[]> {
  const tableName = serviceType === 'mobile' ? 'phoneplans'
    : serviceType === 'internet' ? 'internetplans'
    : 'utilityplans';
  
  const priceField = serviceType === 'utility' ? 'rate' : 'monthly_cost';

  // Fetch data from last 90 days
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

  let query = supabase
    .from(tableName)
    .select(`uploaded_at, ${priceField}, location`)
    .gte('uploaded_at', ninetyDaysAgo.toISOString());

  if (location) {
    query = query.ilike('location', `%${location}%`);
  }

  const { data, error } = await query;

  if (error || !data || data.length === 0) {
    // Return empty if no data
    return [];
  }

  // Group by week and calculate average
  const weeklyData = data.reduce((acc: any, item: any) => {
    const date = new Date(item.uploaded_at);
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay()); // Start of week
    const weekKey = weekStart.toISOString().split('T')[0];

    if (!acc[weekKey]) {
      acc[weekKey] = { total: 0, count: 0 };
    }

    const price = parseFloat(item[priceField]) || 0;
    acc[weekKey].total += price;
    acc[weekKey].count += 1;

    return acc;
  }, {});

  const trends: TrendData[] = Object.keys(weeklyData)
    .sort()
    .map(date => ({
      date,
      avgPrice: parseFloat((weeklyData[date].total / weeklyData[date].count).toFixed(2)),
      count: weeklyData[date].count
    }));

  return trends;
}