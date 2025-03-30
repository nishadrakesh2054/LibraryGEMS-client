import { useState, useEffect } from "react";
import {
  FaPlusCircle,
  FaSearch,
  FaUserGraduate,
  FaTrash,
  FaEdit,
} from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { MdGrade } from "react-icons/md";
import { useNavigate } from "react-router";
import {
  useGetStudentsQuery,
  useDeleteStudentMutation,
} from "../../service/student";
import { toast } from "react-toastify";

const StudentsPage = () => {
  const navigate = useNavigate();
  const {
    data: studentsResponse,
    isLoading,
    isError,
    refetch,
  } = useGetStudentsQuery();
  const [deleteStudent] = useDeleteStudentMutation();
  const students = studentsResponse?.students || [];

  const [searchTerm, setSearchTerm] = useState("");
  const [filterGrade, setFilterGrade] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  // Filter students based on search and grade
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.toString().includes(searchTerm);
    const matchesGrade = filterGrade === "all" || student.grade === filterGrade;
    return matchesSearch && matchesGrade;
  });

  // Pagination logic
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterGrade]);

  const handleViewStudent = (id: number) => {
    navigate(`/viewstudent/${id}`);
  };

  const handleEditStudent = (id: number) => {
    navigate(`/editstudent/${id}`);
  };

  const handleDeleteStudent = async (id: number) => {
    try {
      await deleteStudent(id).unwrap();
      toast.success("Student deleted successfully!");

      refetch();
    } catch (err) {
      toast.error("Failed to delete student");

      console.error("Failed to delete student:", err);
    }
  };

  if (isLoading)
    return <div className="p-6 text-center">Loading students...</div>;
  if (isError)
    return (
      <div className="p-6 text-center text-red-500">Error loading students</div>
    );

  return (
    <div className="p-6 space-y-10 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-6">
            <FaUserGraduate className="text-[#0079C0]" /> Student Management
          </h2>
          <p className="text-gray-600 dark:text-gray-300 ps-12">
            Manage all student records in the library system
          </p>
        </div>
        <button
          className="flex items-center text-white bg-[#0079C0] hover:bg-yellow-700 px-4 py-2 rounded-md transition-colors duration-200"
          onClick={() => navigate("/addstudent")}
        >
          <FaPlusCircle className="mr-2" /> Add New Student
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 ">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-[#0079C0]" />
          </div>
          <input
            type="text"
            placeholder="Search by name, email or roll number..."
            className="pl-10 pr-4 py-2 w-1/2 border border-[#0079C0] dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 dark:bg-gray-700 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="relative w-full md:w-48">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MdGrade className="text-[#0079C0]" />
          </div>
          <select
            className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 dark:bg-gray-700 dark:text-white appearance-none"
            value={filterGrade}
            onChange={(e) => setFilterGrade(e.target.value)}
          >
            <option value="all">All Grades</option>
            <option value="A+">A+</option>
            <option value="A">A</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B">B</option>
            <option value="B-">B-</option>
            <option value="C+">C+</option>
            <option value="C">C</option>
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="overflow-x-auto shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Name
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Email
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Phone
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Grade
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Roll
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Age
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {currentStudents.length > 0 ? (
              currentStudents.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <div className="font-medium text-gray-600 dark:text-white">
                        {student.name}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6  dark:text-white text-gray-600 ">
                    {student.email}
                  </td>
                  <td className="py-4 px-6 dark:text-white text-gray-600">
                    {student.phone}
                  </td>
                  <td className="py-4 px-6 dark:text-white text-gray-600 ">
                    {student.grade}
                  </td>
                  <td className="py-4 px-6 dark:text-white text-gray-600">
                    {student.rollNo}
                  </td>
                  <td className="py-4 px-6 dark:text-white text-gray-600">
                    {student.age}
                  </td>
                  <td className="py-3 px-6 flex gap-2">
                    <button
                      onClick={() => handleViewStudent(student.id)}
                      className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-gray-600 transition-colors"
                      title="View Details"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleEditStudent(student.id)}
                      className="p-2 text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300 rounded-full hover:bg-yellow-200 dark:hover:bg-gray-600 transition-colors"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteStudent(student.id)}
                      className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 rounded-full hover:bg-red-200 dark:hover:bg-gray-600 transition-colors"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={12}
                  className="py-20 text-center text-red-700 dark:text-gray-400"
                >
                  No students found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing <span className="font-medium">{indexOfFirstStudent + 1}</span>{" "}
          to{" "}
          <span className="font-medium">
            {Math.min(indexOfLastStudent, filteredStudents.length)}
          </span>{" "}
          of <span className="font-medium">{filteredStudents.length}</span>{" "}
          students
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border  flex items-center border-[#0079C0] rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 "
          >
            <FiChevronLeft className="mr-1" /> Previous
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 border flex items-center border-[#0079C0] rounded-md text-white dark:text-gray-300 bg-[#0079C0] dark:bg-gray-700 "
          >
            Next <FiChevronRight className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentsPage;
