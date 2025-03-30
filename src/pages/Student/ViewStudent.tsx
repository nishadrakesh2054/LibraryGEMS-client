import { useParams, useNavigate } from "react-router";
import {
  FaPhone,
  FaIdCard,
  FaArrowLeft,
  FaUniversity,
  FaHistory,
  FaCalendarAlt,
} from "react-icons/fa";
import {
  MdBookmark,
  MdGrade,
  MdLibraryBooks,
  MdOutlineBook,
  MdWarning,
} from "react-icons/md";

import { useGetStudentByIdQuery } from "../../service/student";
import { toast } from "react-toastify";

const ViewStudent = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: response,
    isLoading,
    isError,
  } = useGetStudentByIdQuery(Number(id));
  const navigate = useNavigate();

  // Sample data - in a real app, you'd fetch this from your API
  const student = {
    joinDate: "2022-09-15",
    booksBorrowed: [
      {
        id: 101,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        isbn: "9780743273565",
        checkoutDate: "2023-05-10",
        dueDate: "2023-06-10",
        status: "Active",
      },
      {
        id: 102,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        isbn: "9780061120084",
        checkoutDate: "2023-04-15",
        dueDate: "2023-05-15",
        returnDate: "2023-05-10",
        status: "Returned",
      },
    ],
    totalBooksCheckedOut: 12,
    currentBooksBorrowed: 1,
    overdueBooks: 0,
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }
  if (isError || !response?.student) {
    toast.error("Failed to load student data");
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Error loading student data</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    );
  }
  const Viewstudent = response.student;

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen">
      {/* Header with back button */}
      <div className="flex items-center mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white mr-6"
        >
          <FaArrowLeft className="mr-2 text-orange-600" /> Back
        </button>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Student Details
        </h1>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student Profile Card */}

        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Gradient Header with Avatar */}
            <div className="bg-gradient-to-r to-[#0079C0] from-[#F7BC41] h-16 relative">
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="h-16 w-16 rounded-full border-4 border-orange-600 dark:border-gray-100 bg-blue-100 dark:bg-blue-800 flex items-center justify-center shadow-md">
                  <span className="text-xl uppercase font-bold text-blue-600 dark:text-blue-300">
                    {Viewstudent.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
              </div>
            </div>

            {/* Compact Profile Info */}
            <div className="px-4 pb-4 pt-10">
              <h2 className="text-lg font-bold text-center text-gray-800 dark:text-white truncate">
                {Viewstudent.name}
              </h2>
              <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-4 truncate">
                {Viewstudent.email}
              </p>

              {/* Dense Info Grid */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-start space-x-2">
                  <FaIdCard className="flex-shrink-0 mt-0.5 text-gray-500 dark:text-gray-400 text-sm" />
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">
                      Student ID
                    </p>
                    <p className="font-medium text-gray-700 dark:text-gray-300">
                      {Viewstudent.rollNo}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <MdGrade className="flex-shrink-0 mt-0.5 text-gray-500 dark:text-gray-400 text-sm" />
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Grade</p>
                    <p className="font-medium text-gray-700 dark:text-gray-300">
                      {Viewstudent.grade}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <FaPhone className="flex-shrink-0 mt-0.5 text-gray-500 dark:text-gray-400 text-sm" />
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Phone</p>
                    <p className="font-medium text-gray-700 dark:text-gray-300">
                      {Viewstudent.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <FaCalendarAlt className="flex-shrink-0 mt-0.5 text-gray-500 dark:text-gray-400 text-sm" />
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Age</p>
                    <p className="font-medium text-gray-700 dark:text-gray-300">
                      {Viewstudent.age}
                    </p>
                  </div>
                </div>

                <div className="col-span-2 flex items-start space-x-2">
                  <FaUniversity className="flex-shrink-0 mt-0.5 text-gray-500 dark:text-gray-400 text-sm" />
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">
                      Joined On
                    </p>
                    <p className="font-medium text-gray-700 dark:text-gray-300">
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Card */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Card   Header */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-xl text-gray-800 dark:text-white flex items-center">
              <MdLibraryBooks className="mr-3 text-blue-500 text-2xl" />
              Library Activity
            </h3>
          </div>

          {/* Stats Content */}
          <div className="px-4 py-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Total Checkouts */}
              <div className="bg-blue-50 dark:bg-gray-700 px-4 py-8 rounded-lg border border-blue-100 dark:border-gray-600">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-md font-medium text-gray-600 dark:text-gray-300 mb-1">
                      Total Checkouts
                    </p>
                    <p className="text-3xl font-bold text-gray-800 dark:text-white">
                      {student.totalBooksCheckedOut}
                    </p>
                  </div>
                  <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full">
                    <MdOutlineBook className="text-blue-500 dark:text-blue-400 text-3xl" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  All-time borrowed books
                </p>
              </div>

              {/* Currently Borrowed */}
              <div className="bg-green-50 dark:bg-gray-700 p-4 rounded-lg border border-green-100 dark:border-gray-600">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-md font-medium text-gray-600 dark:text-gray-300 mb-1">
                      Currently Borrowed
                    </p>
                    <p className="text-4xl font-bold text-green-600 dark:text-green-400">
                      {student.currentBooksBorrowed}
                    </p>
                  </div>
                  <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-full">
                    <MdBookmark className="text-green-500 dark:text-green-400 text-3xl" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Active checkouts
                </p>
              </div>

              {/* Overdue Books */}
              <div
                className={`p-4 rounded-lg border ${
                  student.overdueBooks > 0
                    ? "bg-red-50 dark:bg-gray-700 border-red-100 dark:border-gray-600"
                    : "bg-gray-50 dark:bg-gray-700 border-gray-100 dark:border-gray-600"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-md font-medium text-gray-600 dark:text-gray-300 mb-1">
                      Overdue Books
                    </p>
                    <p
                      className={`text-3xl font-bold ${
                        student.overdueBooks > 0
                          ? "text-orange-600 dark:text-red-400"
                          : "text-orange-700 dark:text-white"
                      }`}
                    >
                      {student.overdueBooks}
                    </p>
                  </div>
                  <div
                    className={`p-3 rounded-full ${
                      student.overdueBooks > 0
                        ? "bg-red-100 dark:bg-red-900/50"
                        : "bg-gray-200 dark:bg-gray-600"
                    }`}
                  >
                    <MdWarning
                      className={
                        student.overdueBooks > 0
                          ? "text-red-500 dark:text-red-400 text-xl"
                          : "text-orange-600 dark:text-orange-400 text-2xl"
                      }
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {student.overdueBooks > 0
                    ? "Past due date"
                    : "All books on time"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Book Borrowing History */}

        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Card Header */}
            <div className="px-6 py-4 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
              <div className="flex items-center">
                <FaHistory className="text-orange-600 mr-3 text-lg" />
                <h3 className="font-semibold text-2xl text-gray-800 dark:text-white">
                  Book Borrowing History
                </h3>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Book Details
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Checkout Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Due Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Return Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {student.booksBorrowed.length > 0 ? (
                    student.booksBorrowed.map((book, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        {/* Book Details */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {book.title}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {book.author}
                              </div>
                              <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                ISBN: {book.isbn}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Checkout Date */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-gray-200">
                            {new Date(book.checkoutDate).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </div>
                        </td>

                        {/* Due Date */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            className={`text-sm ${
                              new Date(book.dueDate) < new Date() &&
                              book.status === "Active"
                                ? "text-red-600 dark:text-red-400 font-medium"
                                : "text-gray-900 dark:text-gray-200"
                            }`}
                          >
                            {new Date(book.dueDate).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </div>
                        </td>

                        {/* Return Date */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-gray-200">
                            {book.returnDate ? (
                              new Date(book.returnDate).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )
                            ) : (
                              <span className="text-gray-400 dark:text-gray-500">
                                -
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              book.status === "Active"
                                ? new Date(book.dueDate) < new Date()
                                  ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                  : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            }`}
                          >
                            {book.status === "Active" &&
                            new Date(book.dueDate) < new Date()
                              ? "Overdue"
                              : book.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center">
                        <div className="flex flex-col items-center justify-center py-8">
                          <FaHistory className="text-gray-400 dark:text-gray-500 text-3xl mb-3" />
                          <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">
                            No borrowing history yet
                          </h4>
                          <p className="text-gray-500 dark:text-gray-400">
                            This student hasn't borrowed any books yet.
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStudent;
