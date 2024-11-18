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

export async function insertPhonePlans(bill : PhoneBill) {

  // Insert the data using the collected input
  const { data, error } = await supabase
    .from('phoneplans')
    .insert([
      {provider: bill.provider, monthly_cost: bill.monthlyCost, data_limit: bill.dataLimit, minutes: bill.minutes, sms: bill.sms, uploaded_at: bill.uploadedAt}
    ])

  if (error) {
    console.error('Error inserting data:', error)
  } else {
    console.log('Data inserted successfully:', data)
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

export async function insertInternetPlans(bill : InternetBill) {

  // Insert the data using the collected input
  const { data, error } = await supabase
    .from('internetplans')
    .insert([
      {provider: bill.provider, monthly_cost: bill.monthlyCost, speed: bill.internetSpeed, isCable: bill.isCopper, isFibre: bill.isFibre, uploaded_at: bill.uploadedAt}
    ])

  if (error) {
    console.error('Error inserting data:', error)
  } else {
    console.log('Data inserted successfully:', data)
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

export async function insertUtilityPlans(bill : UtilityBill) {

  // Insert the data using the collected input
  const { data, error } = await supabase
    .from('utilityplans')
    .insert([
      {provider: bill.provider, uploaded_at: bill.uploadedAt, rate: bill.rate, service_fee: bill.serviceFee}
    ])

  if (error) {
    console.error('Error inserting data:', error)
  } else {
    console.log('Data inserted successfully:', data)
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