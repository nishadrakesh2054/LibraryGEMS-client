


import { useState, useEffect } from "react";
import {
  FaSearch,
  FaBook,
  FaExchangeAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaHistory,
  FaUndo,
  FaExclamationTriangle,
} from "react-icons/fa";
import {
  useGetAllTransactionsQuery, // Add this import
  useReturnBookMutation,
} from "../../service/circulation";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router";

const Circulation = () => {
  const navigate = useNavigate();
  const [returnBook] = useReturnBookMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;
  const [activeTab, setActiveTab] = useState<
    "all" | "issued" | "returned" | "overdue" | "lost"
  >("all");

  // Use getAllTransactions instead of separate active/overdue queries
  const {
    data: allTransactions,
    isLoading,
    isError,
    refetch,
  } = useGetAllTransactionsQuery({
    // Only fetch what we need based on active tab
    status: activeTab === "all" ? undefined : activeTab,
    showReturned: activeTab === "returned" ? true : undefined,
  });

  // Transform API data to frontend format
  const apiTransactions = allTransactions?.transactions || [];
  const transactions = apiTransactions.map((transaction) => ({
    id: transaction.id,
    bookId: transaction.bookId,
    bookTitle: transaction.Testbook.title,
    bookaccessionNumber: transaction.Testbook.accessionNumber,
    patronId: transaction.studentId,
    patronName: transaction.Student.name,
    patronrollNo: transaction.Student.rollNo,
    patrongrade: transaction.Student.grade,
    checkoutDate: transaction.issueDate,
    dueDate: transaction.dueDate,
    returnDate: transaction.returnDate,
    status: transaction.status,
    isReturned: transaction.isReturned,
  }));

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeTab]);

  // Filter transactions based on search term
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.patronName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toString().includes(searchTerm) ||
      transaction.bookaccessionNumber.toString().includes(searchTerm) ||
      transaction.patronrollNo.toString().includes(searchTerm);

    return matchesSearch;
  });

  // Pagination logic
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );
  const totalPages = Math.ceil(
    filteredTransactions.length / transactionsPerPage
  );

  // Handle return
  const handleReturn = async (transactionId: number) => {
    try {
      const response = await returnBook({ transactionId }).unwrap();
      alert(
        `Book returned successfully! ${
          response.lateFee > 0
            ? `Late Fee: ₹${response.lateFee} `
            : "No late fee applied."
        }`
      );
      refetch(); // Refresh the data
    } catch (error) {
      console.error("Return failed:", error);
      alert("Failed to return book. Please try again.");
    }
  };

  // Status colors mapping
  const statusColors = {
    issued: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    returned: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    overdue: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    lost: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  };

  // Loading and error states
  if (isLoading) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0079C0]"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-red-600 dark:text-red-400">
        Error loading transactions.
        <button
          onClick={refetch}
          className="ml-2 text-[#0079C0] hover:underline"
        >
          Retry
        </button>
      </div>
    );
  }

  // ... rest of your JSX remains exactly the same ...
  return (
    <div className="p-6 space-y-10 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
    {/* Header */}
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-6">
          <FaExchangeAlt className="text-[#0079C0]" /> Book Circulation
        </h2>
        <p className="text-gray-600 dark:text-gray-300 ps-12">
          Manage book checkouts, returns, and circulation history
        </p>
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/issuebook")}
          className="flex items-center text-white bg-[#0079C0] hover:bg-yellow-700 px-4 py-2 rounded-md transition-colors duration-200"
        >
          <FaBook className="mr-2" />
          Borrow Book
        </button>
        <button
          onClick={() => navigate("/returnbook")}
          className="flex items-center text-white bg-[#0079C0] hover:bg-yellow-700 px-4 py-2 rounded-md transition-colors duration-200"
        >
          <FaUndo className="mr-2" /> Return Book
        </button>
      </div>
    </div>

    {/* Tabs */}
    <div className="flex border-b border-gray-200 dark:border-gray-700 gap-6 overflow-x-auto">
      <button
        className={`py-2 px-4 font-[600] text-md flex items-center gap-2 whitespace-nowrap ${
          activeTab === "all"
            ? "text-[#0079C0] border-b-2 border-orange-600 dark:text-orange-400 dark:border-orange-400"
            : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        }`}
        onClick={() => setActiveTab("all")}
      >
        <FaHistory /> All Transactions
      </button>
      <button
        className={`py-2 px-4 font-[600] text-md flex items-center gap-2 whitespace-nowrap ${
          activeTab === "issued"
            ? "text-orange-600 border-b-2 border-orange-600 dark:text-orange-400 dark:border-orange-400"
            : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        }`}
        onClick={() => setActiveTab("issued")}
      >
        <FaBook /> Issued
      </button>
      <button
        className={`py-2 px-4 font-[600] text-md flex items-center gap-2 whitespace-nowrap ${
          activeTab === "returned"
            ? "text-orange-600 border-b-2 border-orange-600 dark:text-orange-400 dark:border-orange-400"
            : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        }`}
        onClick={() => setActiveTab("returned")}
      >
        <FaCheckCircle /> Returned
      </button>
      <button
        className={`py-2 px-4 font-[600] text-md flex items-center gap-2 whitespace-nowrap ${
          activeTab === "overdue"
            ? "text-orange-600 border-b-2 border-orange-600 dark:text-orange-400 dark:border-orange-400"
            : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        }`}
        onClick={() => setActiveTab("overdue")}
      >
        <FaExclamationTriangle /> Overdue
      </button>
      <button
        className={`py-2 px-4 font-[600] text-md flex items-center gap-2 whitespace-nowrap ${
          activeTab === "lost"
            ? "text-orange-600 border-b-2 border-orange-600 dark:text-orange-400 dark:border-orange-400"
            : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        }`}
        onClick={() => setActiveTab("lost")}
      >
        <FaTimesCircle /> Lost
      </button>
    </div>

    {/* Search Bar */}
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="text-[#0079C0]" />
        </div>
        <input
          type="text"
          placeholder="Search by book, student, accession no, roll no, or transaction ID..."
          className="pl-10 pr-4 py-2 w-full border border-[#0079C0] dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 dark:bg-gray-700 dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>

    {/* Transactions Table */}
    <div className="overflow-x-auto shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Txn ID
            </th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Book Details
            </th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Student Details
            </th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Dates
            </th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Status
            </th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {currentTransactions.length > 0 ? (
            currentTransactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="py-4 px-6 font-medium text-gray-800 dark:text-white">
                  #{transaction.id}
                </td>
                <td className="py-4 px-6">
                  <div className="font-medium text-gray-800 dark:text-white">
                    {transaction.bookTitle}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Accession: {transaction.bookaccessionNumber}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="text-gray-800 dark:text-white">
                    {transaction.patronName}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Roll No: {transaction.patronrollNo} | Grade:{" "}
                    {transaction.patrongrade}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="text-gray-600 dark:text-gray-300">
                    <div>
                      Issued:{" "}
                      {new Date(
                        transaction.checkoutDate
                      ).toLocaleDateString()}
                    </div>
                    <div>
                      Due:{" "}
                      {new Date(transaction.dueDate).toLocaleDateString()}
                    </div>
                    {transaction.returnDate && (
                      <div>
                        Returned:{" "}
                        {new Date(
                          transaction.returnDate
                        ).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      statusColors[transaction.status]
                    }`}
                  >
                    {transaction.status.charAt(0).toUpperCase() +
                      transaction.status.slice(1)}
                  </span>
                </td>
                <td className="py-4 px-6">
                  {transaction.status === "issued" ||
                  transaction.status === "overdue" ? (
                    <button
                      onClick={() => handleReturn(transaction.id)}
                      className="bg-teal-500 hover:bg-teal-600 text-white font-normal px-3 py-1 rounded-lg flex items-center gap-1 transition-all duration-300 shadow-md hover:shadow-lg text-sm"
                    >
                      <FaCheckCircle /> Return
                    </button>
                  ) : transaction.status === "returned" ? (
                    <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <FaCheckCircle /> Returned
                    </span>
                  ) : (
                    <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <FaTimesCircle /> Lost
                    </span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                className="py-20 text-center text-red-700 dark:text-gray-400"
              >
                No transactions found matching your criteria
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    {/* Pagination */}
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Showing{" "}
        <span className="font-medium">{indexOfFirstTransaction + 1}</span> to{" "}
        <span className="font-medium">
          {Math.min(indexOfLastTransaction, filteredTransactions.length)}
        </span>{" "}
        of <span className="font-medium">{filteredTransactions.length}</span>{" "}
        transactions
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 disabled:opacity-50 flex items-center gap-1"
        >
          <FiChevronLeft /> Previous
        </button>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 disabled:opacity-50 flex items-center gap-1"
        >
          Next <FiChevronRight />
        </button>
      </div>
    </div>
  </div>
  );
};

export default Circulation;