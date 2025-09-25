import Layout from './layout'
import Head from 'next/head'
import Header from './components/Header'
import Footer from './components/Footer'
import PhonePlans from './components/phonePlanTable'
import InternetPlans from './components/internetPlanTable'
import UtilityPlans from './components/utilityPlanTable'
import Link from 'next/link'

const LandingPage = () => {
  return (
    <Layout>
      <Head>
        <title>RateXpose - Canadian Rate Transparency Platform</title>
        <meta name="description" content="Discover if you're overpaying for phone, internet, and utility plans. Anonymous rate sharing platform for Canadians." />
      </Head>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section with Key Metrics */}
        <section className="bg-white border-b border-secondary-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-secondary-900 sm:text-5xl lg:text-6xl">
                Stop Overpaying for Your Bills
              </h1>
              <p className="mt-6 text-xl text-secondary-600 max-w-3xl mx-auto">
                Anonymous rate sharing platform where Canadians discover pricing transparency
                and find better deals on phone, internet, and utility plans.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/post-bill">
                  <button className="btn btn-primary text-lg px-8 py-3">
                    Post Your Rate
                  </button>
                </Link>
                <Link href="#latest-rates">
                  <button className="btn btn-secondary text-lg px-8 py-3">
                    Browse Rates
                  </button>
                </Link>
              </div>
            </div>

            {/* Key Metrics Dashboard */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="dashboard-stat text-center">
                <div className="dashboard-stat-number">2,847</div>
                <div className="dashboard-stat-label">Rates Shared</div>
                <div className="dashboard-stat-change positive">+127 this week</div>
              </div>
              <div className="dashboard-stat text-center">
                <div className="dashboard-stat-number">$43</div>
                <div className="dashboard-stat-label">Avg. Monthly Savings</div>
                <div className="dashboard-stat-change positive">+$12 vs. posted rates</div>
              </div>
              <div className="dashboard-stat text-center">
                <div className="dashboard-stat-number">156</div>
                <div className="dashboard-stat-label">Cities Covered</div>
                <div className="dashboard-stat-change positive">All provinces</div>
              </div>
              <div className="dashboard-stat text-center">
                <div className="dashboard-stat-number">89%</div>
                <div className="dashboard-stat-label">Users Save Money</div>
                <div className="dashboard-stat-change positive">Within 3 months</div>
              </div>
            </div>
          </div>
        </section>

        {/* Location and Filter Section */}
        <section className="bg-secondary-50 border-b border-secondary-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-secondary-700">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-medium">Showing rates for:</span>
                  <span className="ml-2 font-semibold text-primary-600">Calgary, AB</span>
                </div>
              </div>
              <div className="mt-4 sm:mt-0 flex items-center space-x-4">
                <span className="text-sm text-secondary-600">Last updated: 2 hours ago</span>
                <div className="flex items-center text-sm text-success-600">
                  <div className="w-2 h-2 bg-success-500 rounded-full mr-2"></div>
                  Live data
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Rates Dashboard */}
        <section id="latest-rates" className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-secondary-900">Latest Rate Submissions</h2>
                <p className="mt-2 text-secondary-600">Real rates from real Canadians, updated in real-time</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <PhonePlans />
              <InternetPlans />
              <UtilityPlans />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary-50 border-t border-primary-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="card max-w-4xl mx-auto text-center bg-gradient-to-r from-primary-500 to-primary-600 text-white border-0">
              <div className="flex flex-col lg:flex-row items-center justify-between">
                <div className="lg:text-left mb-6 lg:mb-0">
                  <h3 className="text-2xl font-bold mb-2">Help Build Price Transparency</h3>
                  <p className="text-primary-100 text-lg">
                    Share your real rates anonymously and help other Canadians save money on their bills.
                  </p>
                  <div className="mt-4 flex items-center text-primary-100 text-sm">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    100% Anonymous • Takes 2 minutes • Helps thousands
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <Link href="/post-bill">
                    <button className="bg-white text-primary-600 hover:bg-primary-50 font-semibold py-3 px-8 rounded-button text-lg transition-colors duration-200">
                      Post Your Rate Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </Layout>
  )
}

export default LandingPage
