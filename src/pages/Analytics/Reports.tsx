import { useState } from "react";
import {
  FaBook,
  FaUserGraduate,
  FaChartBar,
  FaChartPie,
  FaChartLine,
  FaFileExport,
  FaCalendarAlt,
} from "react-icons/fa";

const Reports = () => {
  const [activeReport, setActiveReport] = useState("circulation");
  const [dateRange, setDateRange] = useState({
    start: "2023-01-01",
    end: "2023-12-31",
  });

  // Sample data for reports
  const circulationData = [
    { month: "Jan", checkouts: 45, returns: 42, overdue: 3 },
    { month: "Feb", checkouts: 52, returns: 50, overdue: 2 },
    { month: "Mar", checkouts: 60, returns: 58, overdue: 2 },
    { month: "Apr", checkouts: 48, returns: 45, overdue: 3 },
    { month: "May", checkouts: 55, returns: 53, overdue: 2 },
    { month: "Jun", checkouts: 65, returns: 62, overdue: 3 },
  ];

  const popularBooks = [
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", checkouts: 28 },
    { title: "To Kill a Mockingbird", author: "Harper Lee", checkouts: 25 },
    { title: "1984", author: "George Orwell", checkouts: 22 },
    { title: "Pride and Prejudice", author: "Jane Austen", checkouts: 20 },
    { title: "The Hobbit", author: "J.R.R. Tolkien", checkouts: 18 },
  ];

  const activePatrons = [
    { name: "John Smith", membershipId: "M1001", booksCheckedOut: 3 },
    { name: "Emily Johnson", membershipId: "M1002", booksCheckedOut: 2 },
    { name: "Michael Brown", membershipId: "M1003", booksCheckedOut: 1 },
    { name: "Sarah Wilson", membershipId: "M1004", booksCheckedOut: 1 },
  ];

  const overdueBooks = [
    {
      title: "Pride and Prejudice",
      patron: "Michael Brown",
      dueDate: "2023-06-10",
      daysOverdue: 12,
    },
    {
      title: "The Catcher in the Rye",
      patron: "David Lee",
      dueDate: "2023-06-05",
      daysOverdue: 17,
    },
  ];

  const renderReport = () => {
    switch (activeReport) {
      case "circulation":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <FaBook className="text-[#0079C0]"/> Circulation Statistics ({dateRange.start} to{" "}
              {dateRange.end})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <h4 className="font-medium text-gray-700">Total Checkouts</h4>
                <p className="text-3xl font-bold text-blue-600">325</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <h4 className="font-medium text-gray-700">Total Returns</h4>
                <p className="text-3xl font-bold text-green-600">310</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <h4 className="font-medium text-gray-700">Overdue Books</h4>
                <p className="text-3xl font-bold text-red-600">15</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
              <h4 className="font-medium text-gray-700 mb-4">
                Monthly Circulation
              </h4>
              <div className="h-64">
                {/* Placeholder for chart - would be replaced with actual chart library */}
                <div className="flex items-end h-48 gap-2 border-b border-l border-gray-200 p-4">
                  {circulationData.map((data, index) => (
                    <div key={index} className="flex-1 flex gap-1 items-end">
                      <div
                        className="bg-blue-500 w-full rounded-t hover:bg-blue-600 transition-colors"
                        style={{ height: `${data.checkouts * 2}px` }}
                        title={`Checkouts: ${data.checkouts}`}
                      />
                      <div
                        className="bg-green-500 w-full rounded-t hover:bg-green-600 transition-colors"
                        style={{ height: `${data.returns * 2}px` }}
                        title={`Returns: ${data.returns}`}
                      />
                      <div
                        className="bg-red-500 w-full rounded-t hover:bg-red-600 transition-colors"
                        style={{ height: `${data.overdue * 10}px` }}
                        title={`Overdue: ${data.overdue}`}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-2 px-4">
                  {circulationData.map((data, index) => (
                    <div key={index} className="text-xs text-gray-600">
                      {data.month}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case "popular":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <FaBook className="text-[#0079C0]"/> Most Popular Books ({dateRange.start} to{" "}
              {dateRange.end})
            </h3>
            <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Book Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Checkouts
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {popularBooks.map((book, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {book.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {book.author}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {book.checkouts}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
          </div>
        );
      case "patrons":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <FaUserGraduate className="text-[#0079C0]"/> Patron Activity Report ({dateRange.start} to{" "}
              {dateRange.end})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <h4 className="font-medium text-gray-700">Active Patrons</h4>
                <p className="text-3xl font-bold text-purple-600">42</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <h4 className="font-medium text-gray-700">New Signups</h4>
                <p className="text-3xl font-bold text-blue-600">15</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <h4 className="font-medium text-gray-700">
                  Avg. Books Checked Out
                </h4>
                <p className="text-3xl font-bold text-green-600">1.8</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patron Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Membership ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Books Checked Out
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {activePatrons.map((patron, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {patron.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {patron.membershipId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {patron.booksCheckedOut}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case "overdue":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <FaBook className="text-[#0079C0]"/> Overdue Books Report (as of{" "}
              {new Date().toLocaleDateString()})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <h4 className="font-medium text-gray-700">Total Overdue</h4>
                <p className="text-3xl font-bold text-red-600">8</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <h4 className="font-medium text-gray-700">Avg. Days Overdue</h4>
                <p className="text-3xl font-bold text-orange-600">9.5</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <h4 className="font-medium text-gray-700">Fines Accumulated</h4>
                <p className="text-3xl font-bold text-yellow-600">$42.50</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Book Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patron
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Due Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Days Overdue
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {overdueBooks.map((book, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {book.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {book.patron}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {book.dueDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">
                        {book.daysOverdue}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-10 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-6">
            <FaChartBar className="text-[#0079C0]" /> Library Reports
          </h2>
          <p className="text-gray-600 dark:text-gray-300 ps-12">
            Generate and analyze library activity reports
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ">
              <FaCalendarAlt className="text-orange-500" />
            </div>
            <input
              type="date"
              className="pl-10 pr-4 py-2 border border-[#0079C0] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={dateRange.start}
              onChange={(e) =>
                setDateRange({ ...dateRange, start: e.target.value })
              }
            />
          </div>
          <span className="text-gray-500">to</span>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaCalendarAlt className="text-orange-500" />
            </div>
            <input
              type="date"
              className="pl-10 pr-4 py-2 border border-[#0079C0] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={dateRange.end}
              onChange={(e) =>
                setDateRange({ ...dateRange, end: e.target.value })
              }
            />
          </div>
          <button className="flex items-center gap-2 bg-[#0079C0] hover:bg-blue-700 text-white px-4 py-2 rounded-md">
            <FaFileExport /> Export
          </button>
        </div>
      </div>

      {/* buttons all  */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-3 px-6  text-md flex items-center font-[600] gap-2 ${
            activeReport === "circulation"
              ? "text-orange-600 border-b-2 border-orange-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveReport("circulation")}
        >
          <FaChartBar  /> Circulation
        </button>
        <button
          className={`py-3 px-6 font-[600] text-md flex items-center gap-2 ${
            activeReport === "popular"
              ? "text-orange-600 border-b-2 border-orange-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveReport("popular")}
        >
          <FaChartPie /> Popular Books
        </button>
        <button
          className={`py-3 px-6 font-[600] text-md flex items-center gap-2 ${
            activeReport === "patrons"
              ? "text-orange-600 border-b-2 border-orange-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveReport("patrons")}
        >
          <FaUserGraduate /> Patron Activity
        </button>
        <button
          className={`py-3 px-6 font-[600] text-md flex items-center gap-2 ${
            activeReport === "overdue"
              ? "text-orange-600 border-b-2 border-orange-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveReport("overdue")}
        >
          <FaChartLine /> Overdue Books
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        {renderReport()}
      </div>
    </div>
  );
};

export default Reports;
