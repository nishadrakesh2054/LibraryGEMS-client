import { useState, useEffect } from "react";
import {
  FaSearch,
  FaBook,
  FaExchangeAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaHistory,
  FaUndo,
} from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type Transaction = {
  id: number;
  bookId: number;
  bookTitle: string;
  patronId: number;
  patronName: string;
  checkoutDate: string;
  dueDate: string;
  returnDate: string | null;
  status: "Active" | "Returned" | "Overdue";
};

const Circulation = () => {
  // Sample transaction data
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      bookId: 2,
      bookTitle: "To Kill a Mockingbird",
      patronId: 1,
      patronName: "John Smith",
      checkoutDate: "2023-05-15",
      dueDate: "2023-06-15",
      returnDate: null,
      status: "Active",
    },
    {
      id: 2,
      bookId: 4,
      bookTitle: "Pride and Prejudice",
      patronId: 3,
      patronName: "Michael Brown",
      checkoutDate: "2023-05-10",
      dueDate: "2023-06-10",
      returnDate: null,
      status: "Overdue",
    },
    {
      id: 3,
      bookId: 1,
      bookTitle: "The Great Gatsby",
      patronId: 2,
      patronName: "Emily Johnson",
      checkoutDate: "2023-04-01",
      dueDate: "2023-05-01",
      returnDate: "2023-04-28",
      status: "Returned",
    },
    {
      id: 4,
      bookId: 3,
      bookTitle: "1984",
      patronId: 4,
      patronName: "Sarah Wilson",
      checkoutDate: "2023-06-01",
      dueDate: "2023-06-15",
      returnDate: null,
      status: "Active",
    },
    {
      id: 5,
      bookId: 5,
      bookTitle: "The Hobbit",
      patronId: 1,
      patronName: "John Smith",
      checkoutDate: "2023-05-20",
      dueDate: "2023-06-03",
      returnDate: "2023-06-02",
      status: "Returned",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;
  const [activeTab, setActiveTab] = useState<
    "all" | "borrowed" | "returned" | "overdue"
  >("all");

  // Filter transactions based on search and active tab
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.patronName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toString().includes(searchTerm);

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "borrowed" && transaction.status === "Active") ||
      (activeTab === "returned" && transaction.status === "Returned") ||
      (activeTab === "overdue" && transaction.status === "Overdue");

    return matchesSearch && matchesTab;
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
  const handleReturn = (transactionId: number) => {
    const today = new Date().toISOString().split("T")[0];
    const updatedTransactions = transactions.map((transaction) => {
      if (transaction.id === transactionId) {
        return {
          ...transaction,
          returnDate: today,
          status: "Returned",
        };
      }
      return transaction;
    });
    setTransactions(updatedTransactions);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeTab]);

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
          <button className="flex items-center text-white bg-[#0079C0] hover:bg-yellow-700 px-4 py-2 rounded-md transition-colors duration-200">
            <FaBook className="mr-2" />
            Borrow Book
          </button>
          <button className="flex items-center text-white bg-[#0079C0] hover:bg-yellow-700 px-4 py-2 rounded-md transition-colors duration-200">
            <FaUndo className="mr-2" /> Return Book
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 gap-6 ">
        <button
          className={`py-2 px-4 font-[600] text-md flex items-center  gap-2 ${
            activeTab === "all"
              ? "text-[#0079C0] border-b-2 border-orange-600 dark:text-orange-400 dark:border-orange-400"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          }`}
          onClick={() => setActiveTab("all")}
        >
          <FaHistory /> All Transactions
        </button>
        <button
          className={`py-2 px-4 font-[600] text-md flex items-center  gap-2 ${
            activeTab === "borrowed"
              ? "text-orange-600 border-b-2 border-orange-600 dark:text-orange-400 dark:border-orange-400"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          }`}
          onClick={() => setActiveTab("borrowed")}
        >
          <FaBook /> Borrowed
        </button>
        <button
          className={`py-2 px-4 font-[600] text-md flex items-center  gap-2 ${
            activeTab === "returned"
              ? "text-orange-600 border-b-2 border-orange-600 dark:text-orange-400 dark:border-orange-400"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          }`}
          onClick={() => setActiveTab("returned")}
        >
          <FaCheckCircle /> Returned
        </button>
        <button
          className={`py-2 px-4 font-[600] text-md flex items-center  gap-2  ${
            activeTab === "overdue"
              ? "text-orange-600 border-b-2 border-orange-600 dark:text-orange-400 dark:border-orange-400"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          }`}
          onClick={() => setActiveTab("overdue")}
        >
          <FaTimesCircle /> Overdue
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
            placeholder="Search by book, student, or transaction ID..."
            className="pl-10 pr-4 py-2 w-1/2 border border-[#0079C0] dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 dark:bg-gray-700 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 ">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Txn ID
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Book Name
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Student Name
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Due Date
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
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-gray-800 dark:text-white">
                      {transaction.patronName}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-600 dark:text-gray-300">
                    {new Date(transaction.dueDate).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        transaction.status === "Active"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          : transaction.status === "Returned"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {transaction.status === "Active" ||
                    transaction.status === "Overdue" ? (
                      <button
                        onClick={() => handleReturn(transaction.id)}
                        className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 flex items-center gap-1"
                      >
                        <FaCheckCircle /> Return
                      </button>
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <FaTimesCircle /> Returned on{" "}
                        {transaction.returnDate &&
                          new Date(transaction.returnDate).toLocaleDateString()}
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={12}
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
