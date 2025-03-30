import React from 'react';
import { FaBook, FaUserPlus, FaExchangeAlt, FaRegCalendarAlt, FaFileExport } from 'react-icons/fa';

const QuickAction = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Quick Actions
          </h3>
        </div>
      </div>

      <div className="flex flex-col gap-6 sm:flex-row sm:gap-6 py-8 flex-wrap items-center justify-center">
        {/* Add Book */}
        <button
          className="flex flex-col items-center justify-center px-10 py-5 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none transition-all"
          onClick={() => alert('Add Book action triggered')}
        >
          <FaBook className="text-3xl mb-2" />
          <span>Add Book</span>
        </button>

        {/* Add Student */}
        <button
          className="flex flex-col items-center justify-center px-10 py-5 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 focus:outline-none transition-all"
          onClick={() => alert('Add Student action triggered')}
        >
          <FaUserPlus className="text-3xl mb-2" />
          <span>Add Student</span>
        </button>

        {/* Issue Book */}
        <button
          className="flex flex-col items-center justify-center px-10 py-5 bg-yellow-500 text-white rounded-lg shadow-lg hover:bg-yellow-600 focus:outline-none transition-all"
          onClick={() => alert('Issue Book action triggered')}
        >
          <FaExchangeAlt className="text-3xl mb-2" />
          <span>Issue Book</span>
        </button>

        {/* Return Book */}
        <button
          className="flex flex-col items-center justify-center px-10 py-5 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 focus:outline-none transition-all"
          onClick={() => alert('Return Book action triggered')}
        >
          <FaRegCalendarAlt className="text-3xl mb-2" />
          <span>Return Book</span>
        </button>

        {/* Generate Report */}
        <button
          className="flex flex-col items-center justify-center px-10 py-5 bg-purple-500 text-white rounded-lg shadow-lg hover:bg-purple-600 focus:outline-none transition-all"
          onClick={() => alert('Generate Report action triggered')}
        >
          <FaFileExport className="text-3xl mb-2" />
          <span>Generate Report</span>
        </button>
      </div>
    </div>
  );
}

export default QuickAction;
