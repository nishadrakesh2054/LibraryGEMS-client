import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  FaUser,
  FaCalendarAlt,
  FaArrowLeft,
  FaBookOpen,
  FaBook,
} from "react-icons/fa";
import { useGetStudentsQuery } from "../../service/student";
import { useGetBooksQuery } from "../../service/book";
import { useIssueBookMutation } from "../../service/circulation";
import Select from "react-select";
import { toast } from "react-toastify";

interface Student {
  id: number;
  name: string;
  rollNo: number;
}

interface Book {
  id: number;
  title: string;
  isbnNo?: string;
}

interface StudentOption {
  value: number;
  label: string;
}

interface BookOption {
  value: number;
  label: string;
}

const IssueBook: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentId: "",
    bookId: "",
    issueDate: new Date().toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch students using RTK Query
  const {
    data: studentsResponse,
    isLoading: isLoadingStudents,
    isError: isErrorStudents,
  } = useGetStudentsQuery();

  // Fetch books using RTK Query
  const {
    data: apiResponse,
    isLoading: isLoadingBooks,
    isError: isErrorBooks,
  } = useGetBooksQuery();

  // Get the students array from the response
  const students = studentsResponse?.students || [];
  const apiBooks = apiResponse?.data?.books || [];

  // Format students for react-select
  const studentOptions: StudentOption[] = students.map((student: Student) => ({
    value: student.id,
    label: `${student.name} (Roll No: ${student.rollNo})`,
  }));

  // Format books for react-select
  const bookOptions: BookOption[] = apiBooks.map((book: Book) => ({
    value: book.id,
    label: `${book.title}${book.isbnNo ? ` (ISBN: ${book.isbnNo})` : ""}`,
  }));

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStudentChange = (selectedOption: StudentOption | null) => {
    setFormData((prev) => ({
      ...prev,
      studentId: selectedOption?.value.toString() || "",
    }));
  };

  const handleBookChange = (selectedOption: BookOption | null) => {
    setFormData((prev) => ({
      ...prev,
      bookId: selectedOption?.value.toString() || "",
    }));
  };

  // Add the mutation hook
  const [issueBook] = useIssueBookMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentId || !formData.bookId) {
      alert("Please select both a student and a book");
      return;
    }
    setIsSubmitting(true);
    try {
      const issueData = {
        studentId: Number(formData.studentId),
        bookId: Number(formData.bookId),
        issueDate: formData.issueDate,
        dueDate: formData.dueDate,
      };
      const response = await issueBook(issueData).unwrap();
      toast.success(
        `Book issued successfully! Remaining copies: ${response.remainingCopies}`
      );
      setFormData({
        studentId: "",
        bookId: "",
        issueDate: new Date().toISOString().split("T")[0],
        dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
      });

      navigate("/circulations");
    } catch (error) {
      // Handle error
      console.error("Failed to issue book:", error);
      toast.error("Failed to issue book. Please try again.");
    } finally {
      setIsSubmitting(false);
    }

    console.log("Form submitted:", formData);

    setTimeout(() => {
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="p-6 space-y-10 bg-white rounded-lg shadow-sm">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-800 mr-4"
        >
          <FaArrowLeft className="mr-2 text-orange-600" /> Back
        </button>
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <FaBookOpen className="text-[#0079C0] mr-3" /> Issue New Book
        </h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Student Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Student
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <Select
                  name="studentId"
                  options={studentOptions}
                  onChange={handleStudentChange}
                  isLoading={isLoadingStudents}
                  placeholder="Search for a student"
                  className="basic-select"
                  classNamePrefix="select"
                  noOptionsMessage={() =>
                    isLoadingStudents ? "Loading..." : "No students found"
                  }
                  isDisabled={isSubmitting}
                />
              </div>
              {isErrorStudents && (
                <p className="mt-1 text-sm text-red-600">
                  Error loading students
                </p>
              )}
            </div>

            {/* Book Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Book
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaBook className="text-gray-400" />
                </div>
                <Select
                  name="bookId"
                  options={bookOptions}
                  onChange={handleBookChange}
                  isLoading={isLoadingBooks}
                  placeholder="Search for a book"
                  className="basic-select"
                  classNamePrefix="select"
                  noOptionsMessage={() =>
                    isLoadingBooks ? "Loading..." : "No books available"
                  }
                  isDisabled={isSubmitting}
                />
              </div>
              {isErrorBooks && (
                <p className="mt-1 text-sm text-red-600">Error loading books</p>
              )}
            </div>

            {/* Issue Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Issue Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaCalendarAlt className="text-gray-400" />
                </div>
                <input
                  type="date"
                  name="issueDate"
                  value={formData.issueDate}
                  onChange={handleInputChange}
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaCalendarAlt className="text-gray-400" />
                </div>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 border border-[#0079C0] rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !formData.studentId || !formData.bookId}
              className="px-4 py-2 bg-[#0079C0] text-white rounded-md hover:bg-blue-600  transition-colors"
            >
              {isSubmitting ? "Processing..." : "Issue Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IssueBook;
