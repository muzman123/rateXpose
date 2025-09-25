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