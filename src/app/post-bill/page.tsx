'use client';

import Layout from '../layout'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Link from 'next/link'
import Head from 'next/head'
import { useAuth } from '../../lib/AuthContext'

const categories = [
  {
    id: 'mobile',
    title: 'Mobile Plans',
    description: 'Share your phone plan rates and data allowances',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    href: '/post-mobile-plan',
    color: 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100',
    examples: ['$45/month • 10GB', '$65/month • Unlimited', '$30/month • 5GB']
  },
  {
    id: 'internet',
    title: 'Internet Plans',
    description: 'Share your home internet rates and speeds',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
      </svg>
    ),
    href: '/post-internet-plan',
    color: 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100',
    examples: ['$75/month • 100 Mbps', '$95/month • 500 Mbps', '$120/month • 1 Gbps']
  },
  {
    id: 'utility',
    title: 'Utility Bills',
    description: 'Share your electricity and gas rates',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    href: '/post-utility-provider',
    color: 'bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100',
    examples: ['12.5¢/kWh', '8.9¢/kWh + $15 service', '15.2¢/kWh']
  },
  {
    id: 'insurance',
    title: 'Insurance Plans',
    description: 'Share your insurance rates and coverage',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    href: '/post-insurance-provider',
    color: 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100',
    examples: [],
    disabled: true
  }
];

const PostBillPage = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <Head>
        <title>Post Your Rate - RateXpose</title>
        <meta name="description" content="Share your real rates anonymously to help other Canadians find better deals." />
      </Head>
      <Header />

      <main className="min-h-screen py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-secondary-900 mb-4">
              Share Your Rate
            </h1>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto mb-8">
              Help fellow Canadians by anonymously sharing your real rates.
              Your contribution helps create pricing transparency and gives everyone better negotiation power.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-secondary-500">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>100% Anonymous</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-success-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Takes 30 seconds</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-success-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Helps thousands</span>
              </div>
            </div>
          </div>

          {/* Category Selection - with conditional blurring */}
          <div className="mb-8 relative">
            <h2 className="text-2xl font-bold text-secondary-900 text-center mb-8">
              Choose Your Category
            </h2>
            
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto ${!user ? 'filter blur-sm pointer-events-none' : ''}`}>
              {categories.map((category) => (
                <div key={category.id} className="relative">
                  {category.disabled ? (
                    <div className={`card card-hover p-6 ${category.color} opacity-60 cursor-not-allowed relative overflow-hidden`}>
                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800">
                          Coming Soon
                        </span>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          {category.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
                          <p className="text-sm opacity-75 mb-4">{category.description}</p>
                          <div className="space-y-1">
                            {category.examples.map((example, index) => (
                              <div key={index} className="text-xs opacity-60">
                                • {example}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link href={category.href}>
                      <div className={`card card-hover p-6 ${category.color} transition-all duration-200 cursor-pointer transform hover:scale-105`}>
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            {category.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
                            <p className="text-sm opacity-75 mb-4">{category.description}</p>
                            <div className="space-y-1">
                              <div className="text-xs font-medium opacity-60 mb-1">Recent submissions:</div>
                              {category.examples.map((example, index) => (
                                <div key={index} className="text-xs opacity-60">
                                  • {example}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            <svg className="w-5 h-5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Authentication Gate Overlay */}
            {!user && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-lg">
                <div className="text-center p-8 max-w-md mx-auto">
                  <div className="w-16 h-16 mx-auto mb-6 bg-primary-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-secondary-900 mb-4">
                    Join the Rate Revolution
                  </h3>
                  <p className="text-secondary-600 mb-6">
                    Sign up for free to share your rates anonymously and help fellow Canadians save money on their bills.
                  </p>
                  <div className="space-y-3">
                    <Link href="/sign-up">
                      <button className="btn btn-primary text-lg w-full py-3">
                        Sign Up to Share Rates
                      </button>
                    </Link>
                    <p className="text-sm text-secondary-500">
                      Already have an account? <Link href="/login" className="text-primary-600 hover:text-primary-500 font-medium">Sign in here</Link>
                    </p>
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
            )}
          </div>

          {/* Bottom CTA - only show for authenticated users */}
          {user && (
            <div className="text-center">
              <div className="card max-w-2xl mx-auto bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-primary-900 mb-2">
                    Why Share Your Rates?
                  </h3>
                  <p className="text-sm text-primary-700 mb-4">
                    Your anonymous contribution helps build Canada&apos;s largest database of real pricing data,
                    empowering consumers to negotiate better deals and avoid overpaying.
                  </p>
                  <div className="flex flex-wrap justify-center gap-6 text-xs text-primary-600">
                    <span>🔒 Always anonymous</span>
                    <span>📊 Real market data</span>
                    <span>💰 Help others save</span>
                    <span>🇨🇦 Built for Canadians</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </Layout>
  )
}

export default PostBillPage
