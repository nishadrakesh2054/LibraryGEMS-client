import GridShape from "../../components/common/GridShape";
import { Link } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import { FaHome, FaBookOpen } from "react-icons/fa";

export default function NotFound() {
  return (
    <>
      <PageMeta
        title="Page Not Found | GEM Library"
        description="The page you're looking for doesn't exist in our library system"
      />
      <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 z-1">
        <GridShape />
        
        <div className="relative mx-auto w-full max-w-md text-center p-8 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg">
          {/* Animated 404 text */}
          <div className="mb-6 text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            404
          </div>
          
          <h1 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white/90">
            Page Not Found
          </h1>

          <p className="mb-8 text-gray-600 dark:text-gray-400">
            We can't seem to find the book... I mean page you're looking for!
          </p>

          {/* Book illustration */}
          <div className="relative w-40 h-40 mx-auto mb-8">
            <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/50 rounded-lg transform rotate-6"></div>
            <div className="absolute inset-0 bg-purple-100 dark:bg-purple-900/50 rounded-lg transform -rotate-6"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <FaBookOpen className="text-5xl text-blue-600 dark:text-blue-400" />
            </div>
          </div>

          <div className="space-y-4">
            <Link
              to="/"
              className="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-medium transition-all duration-200 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md hover:from-blue-700 hover:to-purple-700 hover:shadow-lg"
            >
              <FaHome className="mr-2" />
              Back to Home Page
            </Link>

         
          </div>
        </div>

        {/* Footer */}
        <p className="absolute text-sm text-center text-gray-500 -translate-x-1/2 bottom-6 left-1/2 dark:text-gray-400">
          &copy; {new Date().getFullYear()} - GEM Library Management System
        </p>
      </div>
    </>
  );
}