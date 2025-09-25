import { supabase } from './supabase';
import { User, AuthError } from '@supabase/supabase-js';

export interface AuthUser {
  id: string;
  email: string;
  created_at: string;
}

export interface SignUpData {
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: AuthUser | null;
  error: string | null;
}

// Sign up new user
export async function signUp(data: SignUpData): Promise<AuthResponse> {
  try {
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (error) {
      return { user: null, error: error.message };
    }

    if (authData.user) {
      const user: AuthUser = {
        id: authData.user.id,
        email: authData.user.email || '',
        created_at: authData.user.created_at,
      };
      return { user, error: null };
    }

    return { user: null, error: 'Failed to create user' };
  } catch (error) {
    return { user: null, error: 'An unexpected error occurred' };
  }
}

// Sign in existing user
export async function signIn(data: SignInData): Promise<AuthResponse> {
  try {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      return { user: null, error: error.message };
    }

    if (authData.user) {
      const user: AuthUser = {
        id: authData.user.id,
        email: authData.user.email || '',
        created_at: authData.user.created_at,
      };
      return { user, error: null };
    }

    return { user: null, error: 'Failed to sign in' };
  } catch (error) {
    return { user: null, error: 'An unexpected error occurred' };
  }
}

// Sign out user
export async function signOut(): Promise<{ error: string | null }> {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return { error: error.message };
    }
    return { error: null };
  } catch (error) {
    return { error: 'An unexpected error occurred' };
  }
}

// Get current user
export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      return {
        id: user.id,
        email: user.email || '',
        created_at: user.created_at,
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

// Listen to auth state changes
export function onAuthStateChange(callback: (user: AuthUser | null) => void) {
  return supabase.auth.onAuthStateChange((event, session) => {
    if (session?.user) {
      const user: AuthUser = {
        id: session.user.id,
        email: session.user.email || '',
        created_at: session.user.created_at,
      };
      callback(user);
    } else {
      callback(null);
    }
  });
}