'use client'

import React from 'react';
import Link from 'next/link';

interface AuthenticationGateProps {
  title: string;
  description: string;
  ctaText?: string;
  showSignInLink?: boolean;
}

const AuthenticationGate: React.FC<AuthenticationGateProps> = ({
  title,
  description,
  ctaText = "Sign Up - It's Free!",
  showSignInLink = true
}) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-lg">
      <div className="text-center p-8 max-w-md">
        <div className="w-16 h-16 mx-auto mb-6 bg-primary-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        
        <h3 className="text-2xl font-bold text-secondary-900 mb-4">
          {title}
        </h3>
        
        <p className="text-secondary-600 mb-6">
          {description}
        </p>
        
        <div className="space-y-3">
          <Link href="/sign-up">
            <button className="btn btn-primary text-lg w-full py-3">
              {ctaText}
            </button>
          </Link>
          
          {showSignInLink && (
            <p className="text-sm text-secondary-500">
              Already have an account?{' '}
              <Link href="/login" className="text-primary-600 hover:text-primary-500 font-medium">
                Sign in here
              </Link>
            </p>
          )}
        </div>
        
        <div className="mt-6 flex flex-wrap justify-center gap-6 text-xs text-secondary-500">
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-success-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            100% Anonymous
          </span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-success-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Always Free
          </span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-success-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Help Others Save
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationGate;