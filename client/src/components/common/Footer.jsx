import React from 'react';

const Footer = () => {
  return (

    // this is base component that show app details , navigation links and contact information 
    <footer className="bg-blue-500 dark:bg-gray-900 text-gray-900 dark:text-gray-200 py-8 mt-24 animate-slide-down ">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Branding/Logo Section */}
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold mb-3 text-white">Entertainment Hub</h1>
            <p className="text-sm dark:text-gray-400">
            Your go-to platform for all things entertainment. Discover new movies, TV shows, and more with us.
            </p>
            <p className="mt-4 text-sm dark:text-gray-400">
              &copy; {new Date().getFullYear()} Entertainment Hub. All rights reserved.
            </p>
          </div>

          {/* Navigation Links Section */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-white ">Quick Links</h2>
            <ul className=" sm:flex flex-row font-bold gap-2 md:flex-col lg:flex-row lg:flex-wrap lg:justify-center xl:justify-start">
              <li>
                <a href="/" className="hover:text-red-600 dark:hover:text-blue-400">Home</a>
              </li>
              <li>
                <a href="/movies" className="hover:text-red-600 dark:hover:text-blue-400">Movies</a>
              </li>
              <li>
                <a href="/tvshows" className="hover:text-red-600 dark:hover:text-blue-400">Tv Shows</a>
              </li>
              <li>
                <a href="/bookmarks" className="hover:text-rd-600 dark:hover:text-blue-400">Bookmarks</a>
              </li>
              <li>
                <a href="https://entertainment-5zis.onrender.com/api-docs" target='_blank' className="hover:text-red-600 dark:hover:text-blue-400">Api Docs</a>
              </li>
            </ul>
          </div>

          {/* Contact Information Section */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-white">Get in Touch</h2>
            <p className="text-sm dark:text-gray-400">
              Have questions? Feel free to reach out.
            </p>
            <p className="mt-3">
              <strong>Gmail:</strong>{' '}
              <a href="mailto:maxm26246@gmail.com" className="hover:text-gray-600 dark:hover:text-gray-400">
                maxm26246@gmail.com
              </a>
            </p>
            <p className="mt-1">
              <strong>Phone:</strong>{' '}
              <a href="tel:+918512033271" className="hover:text-gray-600 dark:hover:text-gray-400">
                +91 8512033271
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
