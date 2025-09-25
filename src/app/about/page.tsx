import Layout from '../layout'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Sections from '../components/Sections';
import styles from '../../styles/Sections.module.css'

const AboutPage = () => {
  return (
    <Layout>
      <Head>
        <title>About RateXpose</title>
      </Head>
      <Header />

    <main className="max-w-5xl mx-auto p-8 mt-10 min-h-screen">
    <Sections>
      <section className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
          <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-900">Compare Utility, Phone, and Insurance Bills for Price Transparency</h1>
                <p className="mt-4 text-gray-600">Find the Most Affordable Options</p>
                <div className="mt-6 space-x-4">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded">Get Started</button>
                    <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded">Learn More</button>
                </div>
            </div>
            <div className="flex-1">
                <div className="bg-gray-300 w-full h-64 flex items-center justify-center">
                    <i className="fas fa-play-circle text-5xl text-gray-500"></i>
                </div>
          </div>
      </section>
    </Sections>
    <Sections>
      <section className="">
            <h2 className="text-2xl font-bold text-gray-900">Price Transparency for Utility, Phone, and Insurance Bills</h2>
            <p className="mt-4 text-gray-600">Compare your bills anonymously with others to find the most affordable options in the market.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                <div className="bg-white p-6 border rounded">
                    <Image src="https://placehold.co/200x200" alt="Illustration of a person reviewing bills" width={200} height={200} className="w-full h-32 object-cover mb-4"/>
                    <h3 className="text-lg font-semibold">How It Works</h3>
                    <p className="mt-2 text-gray-600">1. Users anonymously submit their utility, phone, and insurance bills along with the service provider information.</p>
                    <a href="#" className="text-blue-600 mt-4 inline-block">View Bills <i className="fas fa-arrow-right"></i></a>
                </div>
                <div className="bg-white p-6 border rounded">
                    <Image src="https://placehold.co/200x200" alt="Illustration of bill comparison" width={200} height={200} className="w-full h-32 object-cover mb-4"/>
                    <h3 className="text-lg font-semibold">Compare and Save</h3>
                    <p className="mt-2 text-gray-600">2. Compare your bills with others to find the most affordable options for utility, phone, and insurance services.</p>
                    <a href="#" className="text-blue-600 mt-4 inline-block">Compare Prices <i className="fas fa-arrow-right"></i></a>
                </div>
                <div className="bg-white p-6 border rounded">
                    <Image src="https://placehold.co/200x200" alt="Illustration of affordable options" width={200} height={200} className="w-full h-32 object-cover mb-4"/>
                    <h3 className="text-lg font-semibold">Find Affordable Options</h3>
                    <p className="mt-2 text-gray-600">3. Discover affordable options based on the bills submitted by other users and make informed decisions.</p>
                    <a href="#" className="text-blue-600 mt-4 inline-block">Discover Options <i className="fas fa-arrow-right"></i></a>
                </div>
                <div className="bg-white p-6 border rounded">
                    <Image src="https://placehold.co/200x200" alt="Illustration of making decisions" width={200} height={200} className="w-full h-32 object-cover mb-4"/>
                    <h3 className="text-lg font-semibold">Make Informed Decisions</h3>
                    <p className="mt-2 text-gray-600">4. Use the information from the submitted bills to make informed decisions and choose the best service providers.</p>
                    <a href="#" className="text-blue-600 mt-4 inline-block">Choose Providers <i className="fas fa-arrow-right"></i></a>
                </div>
            </div>
      </section>
    </Sections>
    <Sections>
      <section className="">
            <h2 className="text-2xl font-bold text-gray-900">Price Transparency for Utility, Phone, and Insurance Bills</h2>
            <p className="mt-4 text-gray-600">Compare how much you are paying to others for the most affordable options.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white p-6 border rounded">
                    <Image src="https://placehold.co/600x400" alt="Image showing a group of people on snowy mountains" width={600} height={400} className="w-full h-64 object-cover mb-4"/>
                </div>
                <div className="bg-white p-6 border rounded">
                    <Image src="https://placehold.co/600x400" alt="Image showing a historic building with lights" width={600} height={400} className="w-full h-64 object-cover mb-4"/>
                </div>
            </div>
      </section>
      </Sections>
      <Sections>
      <section className="">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 mb-8">Find answers to common questions about our utility, phone, and insurance bill comparison platform.</p>

            <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900">How does the bill comparison platform work?</h3>
                <p className="text-gray-600 mt-2">
                    Our bill comparison platform allows you to anonymously post your utility, phone, and insurance bills, along with the company you are getting the services from. This helps create price transparency in the market so that you can compare how much you are paying to how much others are paying. You can find the most affordable options by using our platform.
                </p>
            </div>

            <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Is posting bills and using the platform anonymous?</h3>
                <p className="text-gray-600 mt-2">
                    Yes, all posting and platform usage are completely anonymous. We do not collect any personal information that can be used to identify you. Your privacy is our top priority.
                </p>
            </div>

            <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Can I compare bills from different service providers?</h3>
                <p className="text-gray-600 mt-2">
                    Yes, you can compare bills from different service providers. Our platform allows you to see how much others are paying for the same services from different companies. This helps you make informed decisions and find the most affordable options.
                </p>
            </div>

            <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900">How often are the bill postings updated?</h3>
                <p className="text-gray-600 mt-2">
                    The bill postings on our platform are updated in real-time. As soon as someone posts a bill, it becomes visible to others for comparison. This ensures that you always have the latest information.
                </p>
            </div>

            <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Is there a limit to the number of bills I can post?</h3>
                <p className="text-gray-600 mt-2">
                    There is no limit to the number of bills you can post. Feel free to post as many bills as you want to help others and find the best deals.
                </p>
            </div>

            <div className="mt-12 text-center">
                <h3 className="text-xl font-semibold text-gray-900">Contact Us</h3>
                <p className="text-gray-600 mt-2">If you have any other questions or need assistance, please contact our support team.</p>
                <button className="bg-blue-600 text-white px-6 py-2 mt-4 rounded">Contact Support</button>
            </div>
      </section>
      </Sections>
    <Sections>
      <section className="">
            <h2 className="text-2xl font-bold text-gray-900">Find the Best Deals on Utilities and Services</h2>
            <p className="text-gray-600 mt-4">Compare utility, phone, and insurance bills from different providers to find the most affordable options.</p>
            <div className="mt-6 space-x-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded">Compare Prices</button>
                <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded">Get Started</button>
            </div>
      </section>
    </Sections>
      </main>
      <Footer />
    </Layout>
  )
}

export default AboutPage
