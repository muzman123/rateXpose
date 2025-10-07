// components/Header.tsx
'use client'

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Logo from './logo.png';
import { useAuth } from '../../lib/AuthContext';
import { signOut } from '../../lib/auth';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { user, setUser } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    const result = await signOut();
    if (!result.error) {
      setUser(null);
      router.push('/');
    }
  };

  return (
    <header className="bg-white border-b border-secondary-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image src={Logo} alt='RateXpose logo' width={32} height={32} className="rounded-md"/>
              <span className="ml-3 text-xl font-bold text-secondary-900">RateXpose</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link href="/" className="nav-link">
              Home
            </Link>
            <Link href="/about" className="nav-link">
              About
            </Link>
            <Link href="/blog" className="nav-link">
              Blog
            </Link>
            <Link href="/post-bill" className="nav-link bg-primary-50 text-primary-700 border border-primary-200">
              Post Rate
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-secondary-200">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-700">
                      {user.email.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm text-secondary-700 font-medium">
                    {user.email.split('@')[0]}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="btn btn-secondary text-xs"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-secondary-200">
                <Link href="/login">
                  <button className="btn btn-secondary text-sm">
                    Sign In
                  </button>
                </Link>
                <Link href="/sign-up">
                  <button className="btn btn-primary text-sm">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-secondary-700 hover:text-secondary-900 hover:bg-secondary-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {!isMenuOpen ? (
              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 border-t border-secondary-200">
            {/* Mobile Navigation Links */}
            <Link href="/" className="block px-3 py-2 text-base font-medium text-secondary-700 hover:text-secondary-900 hover:bg-secondary-50 rounded-md">
              Home
            </Link>
            <Link href="/about" className="block px-3 py-2 text-base font-medium text-secondary-700 hover:text-secondary-900 hover:bg-secondary-50 rounded-md">
              About
            </Link>
            <Link href="/blog" className="block px-3 py-2 text-base font-medium text-secondary-700 hover:text-secondary-900 hover:bg-secondary-50 rounded-md">
              Blog
            </Link>
            <Link href="/post-bill" className="block px-3 py-2 text-base font-medium text-primary-700 bg-primary-50 hover:bg-primary-100 rounded-md">
              Post Rate
            </Link>

            {/* Mobile Auth Section */}
            <div className="pt-4 pb-3 border-t border-secondary-200">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center px-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-lg font-medium text-primary-700">
                        {user.email.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-secondary-800">
                        {user.email.split('@')[0]}
                      </div>
                      <div className="text-sm text-secondary-500">
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-secondary-700 hover:text-secondary-900 hover:bg-secondary-50 rounded-md"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="space-y-2 px-3">
                  <Link href="/login" className="block">
                    <button className="btn btn-secondary w-full justify-center">
                      Sign In
                    </button>
                  </Link>
                  <Link href="/sign-up" className="block">
                    <button className="btn btn-primary w-full justify-center">
                      Sign Up
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;