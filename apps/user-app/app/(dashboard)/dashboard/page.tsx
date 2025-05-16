"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-black flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-black/40 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
        <div className="md:flex">
          {/* Left side - Logo and Title */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center items-center md:items-start text-center md:text-left">
            <div className="mb-6 inline-block">
              <div className="h-16 w-16 bg-gradient-to-br from-gray-600 to-gray-800 rounded-2xl shadow-lg flex items-center justify-center transform rotate-12 border border-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-silver" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            
            <h1 className="text-gray-100 text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-md">
              CredFlow
            </h1>
            <p className="text-gray-400 text-xl mb-8">
              Streamlined digital payments
            </p>
            
            <Link href="/transfer" passHref>
              <button 
                className={`px-8 py-3 rounded-full font-medium text-lg transition-all duration-300 ${
                  isHovered 
                    ? "bg-gray-200 text-gray-900 shadow-lg transform -translate-y-1" 
                    : "bg-gray-800 text-gray-200 shadow border border-gray-600"
                }`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Add to Wallet
              </button>
            </Link>
          </div>
          
          {/* Right side - Features */}
          <div className="md:w-1/2 bg-gray-800/30 p-8 md:p-12 border-t md:border-t-0 md:border-l border-gray-700">
            <h2 className="text-gray-200 text-2xl font-bold mb-6">
              Your Digital Wallet Solution
            </h2>
            
            <p className="text-gray-400 mb-6">
              CredFlow is a sleek digital wallet designed for everyday transactions. Send money to friends, manage your balance, and track your spending history all in one elegant interface.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-gray-400 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-300">Instant P2P transfers to friends and family</p>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-gray-400 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-300">Easy bank top-ups with multiple payment methods</p>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-gray-400 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-300">Clean transaction history</p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      
      {/* Footer */}
      <div className="mt-8 text-gray-500 text-sm">
        © {new Date().getFullYear()} CredFlow. All rights reserved.
      </div>
    </div>
  );
}