import Link from 'next/link';

const Footer = () => {
    return (
      <footer className="bg-white border-t border-secondary-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-1">
              <div className="flex items-center mb-4">
                <span className="text-xl font-bold text-secondary-900">RateXpose</span>
              </div>
              <p className="text-sm text-secondary-600 mb-4">
                Canada's leading platform for anonymous rate sharing and pricing transparency.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-secondary-400 hover:text-secondary-600 transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-secondary-400 hover:text-secondary-600 transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-secondary-900 tracking-wider uppercase mb-4">Platform</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-sm text-secondary-600 hover:text-secondary-900 transition-colors">
                    Browse Rates
                  </Link>
                </li>
                <li>
                  <Link href="/post-bill" className="text-sm text-secondary-600 hover:text-secondary-900 transition-colors">
                    Post Your Rate
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-sm text-secondary-600 hover:text-secondary-900 transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-secondary-600 hover:text-secondary-900 transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-sm font-semibold text-secondary-900 tracking-wider uppercase mb-4">Categories</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/post-mobile-plan" className="text-sm text-secondary-600 hover:text-secondary-900 transition-colors">
                    Mobile Plans
                  </Link>
                </li>
                <li>
                  <Link href="/post-internet-plan" className="text-sm text-secondary-600 hover:text-secondary-900 transition-colors">
                    Internet Plans
                  </Link>
                </li>
                <li>
                  <Link href="/post-utility-provider" className="text-sm text-secondary-600 hover:text-secondary-900 transition-colors">
                    Utility Bills
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-sm text-secondary-600 hover:text-secondary-900 transition-colors">
                    Insurance Plans
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-sm font-semibold text-secondary-900 tracking-wider uppercase mb-4">Support</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/contact-us" className="text-sm text-secondary-600 hover:text-secondary-900 transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-sm text-secondary-600 hover:text-secondary-900 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-secondary-600 hover:text-secondary-900 transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-secondary-600 hover:text-secondary-900 transition-colors">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-8 pt-8 border-t border-secondary-200">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <p className="text-sm text-secondary-500">
                  © {new Date().getFullYear()} RateXpose. All rights reserved.
                </p>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                  <span className="text-xs text-secondary-500">Platform Status: Operational</span>
                </div>
              </div>
              <div className="flex items-center space-x-6 text-sm text-secondary-500">
                <span>Made with ❤️ for Canadians</span>
                <div className="flex items-center space-x-1">
                  <span>🇨🇦</span>
                  <span>Proudly Canadian</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
export default Footer;