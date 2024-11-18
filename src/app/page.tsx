import Layout from './layout'
import Head from 'next/head'
import Header from './components/Header'
import Footer from './components/Footer'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import PhonePlans from './components/phonePlanTable'
import InternetPlans from './components/internetPlanTable'
import UtilityPlans from './components/utilityPlanTable'

const LandingPage = () => {
  return (
    <Layout>
      <Head>
        <title>RateXpose Landing Page</title>
      </Head>
      <Header />
      <main>
      <section className="mb-12 max-w-6xl mx-auto p-8 mt-10">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Latest Postings</h2>
                <div className="text-gray-600">Location: Calgary, AB</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <PhonePlans />
                <InternetPlans />
                <UtilityPlans />
            </div>
        </section>

        <div className="flex justify-center items-center mt-20 bg-primary p-4 rounded-lg mx-10">
          <img src="https://placehold.co/50" alt="Help Icon" className="mr-4" />
          <div>
            <h3 className="font-bold text-xl">Help the Cause!</h3>
            <p>Help bring Price Transparency to the market by anonymously posting your prices</p>
            <a href="/post-bill" className="text-blue-500">Post your bill </a>
          </div>
        </div>
      </main>

      <Footer />
    </Layout>
  )
}

export default LandingPage
