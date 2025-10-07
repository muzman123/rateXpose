import Layout from '../layout'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Link from 'next/link'

const AboutPage = () => {
  return (
    <Layout>
      <Head>
        <title>About RateXpose - Canadian Rate Transparency Platform</title>
        <meta name="description" content="Learn how RateXpose helps Canadians save money through anonymous rate sharing and price transparency." />
      </Head>
      <Header />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary-50 to-white border-b border-secondary-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-secondary-900 sm:text-5xl">
                About RateXpose
              </h1>
              <p className="mt-6 text-xl text-secondary-600 max-w-3xl mx-auto">
                Canada&apos;s first anonymous rate-sharing platform helping thousands of Canadians
                save money through pricing transparency
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/post-bill">
                  <button className="btn btn-primary text-lg px-8 py-3">
                    Share Your Rate
                  </button>
                </Link>
                <Link href="/">
                  <button className="btn btn-secondary text-lg px-8 py-3">
                    Browse Rates
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-secondary-900">How It Works</h2>
              <p className="mt-4 text-secondary-600">
                Compare your bills anonymously with others to find the most affordable options
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card card-hover text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">1. Submit Bills</h3>
                <p className="text-secondary-600 text-sm">
                  Anonymously submit your utility, phone, and internet bills with provider information
                </p>
              </div>

              <div className="card card-hover text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-success-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">2. Compare Rates</h3>
                <p className="text-secondary-600 text-sm">
                  View real rates from other Canadians and see how your bills compare
                </p>
              </div>

              <div className="card card-hover text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-warning-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">3. Find Better Deals</h3>
                <p className="text-secondary-600 text-sm">
                  Discover affordable options based on real submissions
                </p>
              </div>

              <div className="card card-hover text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">4. Save Money</h3>
                <p className="text-secondary-600 text-sm">
                  Negotiate better rates or switch to more affordable providers
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-secondary-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-secondary-900">Frequently Asked Questions</h2>
              <p className="mt-4 text-secondary-600">
                Find answers to common questions about our platform
              </p>
            </div>

            <div className="space-y-6">
              <div className="card">
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                  How does the bill comparison platform work?
                </h3>
                <p className="text-secondary-600">
                  Our platform allows you to anonymously post your utility, phone, and internet bills with provider information.
                  This creates price transparency so you can compare what you&apos;re paying to what others pay and find the most
                  affordable options.
                </p>
              </div>

              <div className="card">
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                  Is the platform completely anonymous?
                </h3>
                <p className="text-secondary-600">
                  Yes, all submissions and platform usage are completely anonymous. We do not collect any personal 
                  information that can identify you. Your privacy is our top priority.
                </p>
              </div>

              <div className="card">
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                  Can I compare bills from different providers?
                </h3>
                <p className="text-secondary-600">
                  Absolutely! Our platform shows rates from all major providers, allowing you to compare what different 
                  companies charge for similar services. This helps you make informed decisions and find the best deals.
                </p>
              </div>

              <div className="card">
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                  How often is the data updated?
                </h3>
                <p className="text-secondary-600">
                  Rate submissions are updated in real-time. As soon as someone posts a bill, it becomes visible to others 
                  for comparison, ensuring you always have access to the latest pricing information.
                </p>
              </div>

              <div className="card">
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                  Is there a limit to submissions?
                </h3>
                <p className="text-secondary-600">
                  No! You can submit as many bills as you want. The more data we have, the better insights we can provide 
                  to help Canadians save money.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white border-t border-secondary-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Ready to Start Saving?
            </h2>
            <p className="text-xl text-secondary-600 mb-8">
              Join thousands of Canadians who are finding better deals on their bills
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sign-up">
                <button className="btn btn-primary text-lg px-8 py-3">
                  Sign Up Free
                </button>
              </Link>
              <Link href="/contact-us">
                <button className="btn btn-secondary text-lg px-8 py-3">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </Layout>
  )
}

export default AboutPage
