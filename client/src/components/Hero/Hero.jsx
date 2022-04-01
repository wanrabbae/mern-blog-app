import React from "react";

export default function Hero() {
  return (
    <div className="container py-5 flex flex-col md:flex-row md:justify-around">
      <img
        src="/images/undraw_blogging.svg"
        alt="blogging"
        className="max-w-screen-sm mb-10 md:mb-0"
      />

      <div className="mt-5 md:mt-0">
        <div className="p-6 mb-5 max-w-xl md:max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-0 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Recent Posts
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </div>

        <div className="p-6 max-w-xl md:max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-0 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            All Categories
          </h5>
          <ul className="w-full text-lg font-medium dark:text-white">
            <li className="dark:text-white border-b py-3 cursor-pointer dark:hover:text-gray-300">
              Web Development
            </li>
            <li className="dark:text-white border-b py-3 cursor-pointer dark:hover:text-gray-300">
              Blockchain
            </li>
            <li className="dark:text-white border-b py-3 cursor-pointer dark:hover:text-gray-300">
              Metaverse
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
