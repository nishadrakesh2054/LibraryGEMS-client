import { useParams, useNavigate } from "react-router";
import {
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaArrowLeft,
  FaUniversity,
  FaHistory,
} from "react-icons/fa";
import { MdGrade, MdLibraryBooks } from "react-icons/md";
import { FiClock } from "react-icons/fi";
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
          <FaArrowLeft className="mr-2" /> Back to Students
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
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-24"></div>
            <div className="px-6 pb-6 relative">
              <div className="flex justify-center -mt-12 mb-4">
                <div className="h-24 w-24 rounded-full border-4 border-white dark:border-gray-800 bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <span className="text-3xl uppercase font-bold text-blue-600 dark:text-blue-300">
                    {Viewstudent.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
              </div>

              <h2 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-1">
                {Viewstudent.name}
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
                {Viewstudent.email}
              </p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <FaIdCard className="text-gray-500 dark:text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Student ID
                    </p>
                    <p className="font-medium text-gray-700 dark:text-gray-300">
                      {Viewstudent.rollNo}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <MdGrade className="text-gray-500 dark:text-gray-400 mr-3 text-xl" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Grade
                    </p>
                    <p className="font-medium text-gray-700 dark:text-gray-300">
                      {Viewstudent.grade}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <FaEnvelope className="text-gray-500 dark:text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Email
                    </p>
                    <p className="font-medium text-gray-700 dark:text-gray-300">
                      {Viewstudent.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <FaPhone className="text-gray-500 dark:text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Phone
                    </p>
                    <p className="font-medium text-gray-700 dark:text-gray-300">
                      {Viewstudent.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <FaPhone className="text-gray-500 dark:text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Age
                    </p>
                    <p className="font-medium text-gray-700 dark:text-gray-300">
                      {Viewstudent.age}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <FaUniversity className="text-gray-500 dark:text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Joined On
                    </p>
                    <p className="font-medium text-gray-700 dark:text-gray-300">
                      {new Date(student.joinDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-4 flex items-center">
              <MdLibraryBooks className="mr-2 text-blue-500" />
              Library Stats
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">
                  Total Checkouts
                </span>
                <span className="font-medium text-gray-800 dark:text-white">
                  {student.totalBooksCheckedOut}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">
                  Currently Borrowed
                </span>
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  {student.currentBooksBorrowed}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">
                  Overdue Books
                </span>
                <span
                  className={`font-medium ${
                    student.overdueBooks > 0
                      ? "text-red-600 dark:text-red-400"
                      : "text-gray-800 dark:text-white"
                  }`}
                >
                  {student.overdueBooks}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Book Borrowing History */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-6 py-4 border-b dark:border-gray-700 flex items-center">
              <FaHistory className="text-blue-500 mr-2" />
              <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                Book Borrowing History
              </h3>
            </div>

            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {student.booksBorrowed.map((book, index) => (
                <div
                  key={index}
                  className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-4 md:mb-0">
                      <h4 className="font-medium text-lg text-gray-800 dark:text-white mb-1">
                        {book.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">
                        {book.author}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        ISBN: {book.isbn}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="text-sm">
                        <p className="text-gray-500 dark:text-gray-400">
                          Checked Out
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                          {new Date(book.checkoutDate).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="text-sm">
                        <p className="text-gray-500 dark:text-gray-400">
                          Due Date
                        </p>
                        <p
                          className={`font-medium ${
                            new Date(book.dueDate) < new Date() &&
                            book.status === "Active"
                              ? "text-red-600 dark:text-red-400"
                              : "text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {new Date(book.dueDate).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="text-sm">
                        <p className="text-gray-500 dark:text-gray-400">
                          Status
                        </p>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            book.status === "Active"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                              : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          }`}
                        >
                          {book.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {book.returnDate && (
                    <div className="mt-3 flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <FiClock className="mr-1" />
                      Returned on{" "}
                      {new Date(book.returnDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStudent;
