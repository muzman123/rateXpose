import { createClient } from '@supabase/supabase-js';
import PhoneBill from './phoneBill';
import InternetBill from './internetBill';

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

export async function insertInternetPlans(bill : InternetBill) {

  // Insert the data using the collected input
  const { data, error } = await supabase
    .from('internetplans')
    .insert([
      {provider: bill.provider, monthly_cost: bill.monthlyCost, speed: bill.internetSpeed, isCable: bill.isCopper, isFibre: bill.isFibre}
    ])

  if (error) {
    console.error('Error inserting data:', error)
  } else {
    console.log('Data inserted successfully:', data)
  }
}
