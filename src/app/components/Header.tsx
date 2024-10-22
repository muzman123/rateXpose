// components/Header.tsx
'use client'

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from './logo.png';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <header className="bg-secondary p-4">
      <div className="flex flex-wrap items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center">
          <Image src={Logo} alt='logo' width={40} height={40}/>
          <span className="ml-2 font-bold">RateXpose</span>
        </div>
        
        <button 
          className="lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className={`w-full lg:flex lg:items-baseline lg:w-auto ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="flex-grow mx-16 my-4 lg:my-0 mx-16">
            <input type="text" className="p-2 border border-black rounded w-full" placeholder="Search the community..." />
          </div>
          
          <nav className="flex flex-col items-end lg:flex-row ml-5 gap-3 lg:space-x-20">
            <Link href="/" className="text-black text-sm font-bold">Home</Link>
            <Link href="/about" className="text-black text-sm font-bold">About</Link>
            <Link href="/blog" className="text-black text-sm font-bold">Blog</Link>
            <Link href="/post-bill" className="text-black text-sm font-bold">Post Bill</Link>
            <Link href="/login" className="inline-block text-sm">
              <button className="text-text border-2 bg-primary rounded-md px-2 py-1">Login/Signup</button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;