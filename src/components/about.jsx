const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="text-4xl sm:text-6xl mb-4">🍔</div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
            About TastyBites
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 sm:mb-16">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-purple-600 mb-4">
                Our Story
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-4">
                Welcome to TastyBites, your premier food delivery destination! This modern web application 
                was crafted with love using ReactJS and styled with Tailwind CSS to bring you the best 
                dining experience right to your doorstep.
              </p>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Whether you're craving authentic pizza, aromatic biryani, or a quick healthy snack — 
                we've partnered with the finest restaurants in your area to satisfy every taste bud.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-pink-600 mb-4">
                What We Offer
              </h2>
              <ul className="space-y-3 text-gray-600 text-sm sm:text-base">
                <li className="flex items-center space-x-3">
                  <span className="text-green-500 text-lg">✓</span>
                  <span>Real-time restaurant listings and menus</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-green-500 text-lg">✓</span>
                  <span>Fast and reliable food delivery</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-green-500 text-lg">✓</span>
                  <span>User-friendly mobile-responsive design</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-green-500 text-lg">✓</span>
                  <span>Secure authentication and cart management</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg p-6 sm:p-8 text-white">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">
                Built with Modern Tech
              </h2>
              <div className="grid grid-cols-2 gap-4 text-sm sm:text-base">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-300">⚛️</span>
                    <span>React.js</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-300">🎨</span>
                    <span>Tailwind CSS</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-300">🔄</span>
                    <span>Redux Toolkit</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-orange-300">🚀</span>
                    <span>React Router</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-purple-300">🔐</span>
                    <span>Auth0</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-red-300">⚡</span>
                    <span>Vite</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-orange-600 mb-4">
                Our Mission
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                To revolutionize the food delivery experience by connecting food lovers with their 
                favorite restaurants through cutting-edge technology, ensuring every meal is just 
                a few clicks away.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-8">
            Why Choose TastyBites?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl mb-2">🏪</div>
              <div className="text-xl sm:text-2xl font-bold text-purple-600 mb-1">500+</div>
              <div className="text-gray-600 text-sm sm:text-base">Partner Restaurants</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl mb-2">⚡</div>
              <div className="text-xl sm:text-2xl font-bold text-green-600 mb-1">30 min</div>
              <div className="text-gray-600 text-sm sm:text-base">Average Delivery</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl mb-2">😊</div>
              <div className="text-xl sm:text-2xl font-bold text-blue-600 mb-1">50K+</div>
              <div className="text-gray-600 text-sm sm:text-base">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl mb-2">⭐</div>
              <div className="text-xl sm:text-2xl font-bold text-yellow-600 mb-1">4.8/5</div>
              <div className="text-gray-600 text-sm sm:text-base">Customer Rating</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12 sm:mt-16">
          <p className="text-gray-600 text-sm sm:text-base mb-6">
            Ready to embark on a delicious journey?
          </p>
          <a
            href="/"
            className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
          >
            Start Ordering Now 🚀
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;