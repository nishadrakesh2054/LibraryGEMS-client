import { FaBook, FaUsers, FaArrowRight, FaCheck } from "react-icons/fa";

export default function DashboardCard() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4 ">
      {/* <!-- Total Books --> */}
      <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 text-center">
        <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-xl dark:bg-blue-900">
          <FaBook className="text-blue-600 size-8 dark:text-blue-300" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
              Total Books
            </span>
            <h4 className="mt-2 font-bold text-blue-700 text-title-sm dark:text-blue-400">
              12,345
            </h4>
          </div>
        </div>
      </div>

      {/* <!-- Total Students --> */}
      <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 text-center">
        <div className="flex items-center justify-center w-16 h-16 bg-blue-50 rounded-xl dark:bg-blue-900">
          <FaUsers className="text-yellow-600 size-8 dark:text-yellow-300" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Total Students
            </span>
            <h4 className="mt-2 font-bold text-yellow-600 text-title-sm dark:text-white/90">
              1,890
            </h4>
          </div>
        </div>
      </div>

      {/* <!-- Issued Books --> */}
      <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 text-center">
        <div className="flex items-center justify-center w-16 h-16 bg-orange-100 rounded-xl dark:bg-orange-900">
          <FaArrowRight className="text-orange-600 size-8 dark:text-orange-300" />
        </div>

        <div className="mt-3">
          <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
            Issued Books
          </span>
          <h4 className="mt-2 font-bold text-orange-700 text-title-sm dark:text-orange-400">
            2,134
          </h4>
        </div>
      </div>

      {/* <!-- Returned Books --> */}
      <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 text-center">
        <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-xl dark:bg-green-900">
          <FaCheck className="text-green-600 size-8 dark:text-green-300" />
        </div>

        <div className="mt-3">
          <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
            Returned Books
          </span>
          <h4 className="mt-2 font-bold text-green-700 text-title-sm dark:text-green-400">
            1,654
          </h4>
        </div>
      </div>
    </div>
  );
}
