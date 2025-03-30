import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  FaUserGraduate,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaBook,
  FaArrowLeft,
} from "react-icons/fa";
import { MdGrade } from "react-icons/md";
import {
    useUpdateStudentMutation,
  useGetStudentByIdQuery,
} from "../../service/student";
import { toast } from "react-toastify";

const EditStudent = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    rollNo: "",
    grade: "A",
    age: "",
  });

  // Fetch student data
  const { data: studentData, isLoading } = useGetStudentByIdQuery(Number(id));
  const [updateStudent, { isLoading: isUpdating }] = useUpdateStudentMutation();

  // Populate form when student data is loaded
  useEffect(() => {
    if (studentData?.student) {
      setFormData({
        name: studentData.student.name,
        email: studentData.student.email,
        phone: studentData.student.phone,
        rollNo: studentData.student.rollNo.toString(),
        grade: studentData.student.grade,
        age: studentData.student.age.toString(),
      });
    }
  }, [studentData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Convert string numbers to actual numbers
      const studentData = {
        ...formData,
        id: Number(id), 
        rollNo: Number(formData.rollNo),
        age: Number(formData.age),
      };

      await updateStudent(studentData).unwrap();

      toast.success("Student updated successfully!");
      navigate("/students");
    } catch (error) {
      toast.error("Failed to update student");
      console.error("Error updating student:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-10 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="flex items-center mb-6 ">
        <button
          onClick={() => navigate("/students")}
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white mr-4"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>
        <h2 className="text-2xl   font-bold text-gray-800 dark:text-white flex items-center">
          <FaUserGraduate className="text-[#0079C0] mr-3" /> Update Existing
          Student
        </h2>
      </div>

      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-600">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUserGraduate className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
            </div>

            {/* Roll Number Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Roll Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaIdCard className="text-gray-400" />
                </div>
                <input
                  type="number"
                  name="rollNo"
                  value={formData.rollNo}
                  onChange={handleInputChange}
                  className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
            </div>

            {/* Grade Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Grade
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdGrade className="text-gray-400" />
                </div>
                <select
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white appearance-none"
                  required
                >
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

            {/*age  Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Age
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaBook className="text-gray-400" />
                </div>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  min="0"
                  className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/students")}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="px-4 py-2 bg-[#0079C0] text-white rounded-md hover:bg-[#0066a7] transition-colors"
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudent;
