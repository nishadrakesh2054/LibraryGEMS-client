import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import {
  FaBook,
  FaUserEdit,
  FaBarcode,
  FaCalendarAlt,
  FaArrowLeft,
  FaHashtag,
  FaSave,
} from "react-icons/fa";
import { useUpdateBookMutation, useGetBookByIdQuery } from "../../service/book";

const EditBook = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: bookData, isLoading, isError } = useGetBookByIdQuery(Number(id));
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

  const [formData, setFormData] = useState({
    date: "",
    title: "",
    subtitle: "",
    accessionNumber: "",
    isbnNo: "",
    noOfCopies: "",
    barCodes: "",
  });



  useEffect(() => {
    if (bookData) {
      setFormData({
        date: bookData.data?.date
          ? new Date(bookData.data.date).toISOString().split("T")[0]
          : "",
        title: bookData.data?.title || "",
        subtitle: bookData.data?.subtitle?.join(", ") || "",
        accessionNumber: bookData.data?.accessionNumber?.toString() || "",
        isbnNo: bookData.data?.isbnNo || "",
        noOfCopies: bookData.data?.noOfCopies?.toString() || "",
        barCodes: bookData.data?.barCodes?.join(", ") || "",
      });
    }
  }, [bookData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) return;

    try {
      // Prepare the data for API submission
      const updatedBook = {
        ...formData,
        subtitle: formData.subtitle.split(",").map((item) => item.trim()),
        barCodes: formData.barCodes.split(",").map((item) => item.trim()),
        accessionNumber: Number(formData.accessionNumber),
        noOfCopies: Number(formData.noOfCopies),
      };

      // Send the update to your backend
      await updateBook({
        id: Number(id),
        updatedBook,
      }).unwrap();

      // After successful update, navigate back to the books list
      navigate("/books");
    } catch (error) {
      console.error("Failed to update book:", error);
      // You might want to show an error message to the user here
    }
  };

  if (isLoading)
    return <div className="p-6 text-center">Loading book data...</div>;
  if (isError)
    return (
      <div className="p-6 text-center text-red-500">
        Error loading book data
      </div>
    );

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header with back button */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate("/books")}
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white mr-6"
          >
            <FaArrowLeft className="mr-2" /> Back to Books
          </button>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center">
            <FaSave className="text-[#0079C0] mr-3" /> Edit Book
          </h1>
        </div>

        {/* Book Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title Field */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Book Title *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaBook className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                    placeholder="Enter book title"
                  />
                </div>
              </div>

              {/* Subtitle Field (Authors) */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Authors (Subtitle) *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUserEdit className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleInputChange}
                    className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                    placeholder="Comma separated author names (e.g., Rakesh, Ranzeth)"
                  />
                </div>
              </div>

              {/* ISBN Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  ISBN Number *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaBarcode className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="isbnNo"
                    value={formData.isbnNo}
                    onChange={handleInputChange}
                    className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                    placeholder="e.g., 9784-0597743"
                  />
                </div>
              </div>

              {/* Accession Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Accession Number *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaHashtag className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="accessionNumber"
                    value={formData.accessionNumber}
                    onChange={handleInputChange}
                    className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                    placeholder="e.g., 7100"
                  />
                </div>
              </div>

              {/* Date Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Date *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaCalendarAlt className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
              </div>

              {/* Barcodes Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Barcodes *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaBarcode className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="barCodes"
                    value={formData.barCodes}
                    onChange={handleInputChange}
                    className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                    placeholder="Comma separated barcodes (e.g., 00001100,00001101)"
                  />
                </div>
              </div>

              {/* Number of Copies */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Number of Copies *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaHashtag className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="noOfCopies"
                    value={formData.noOfCopies}
                    onChange={handleInputChange}
                    min="1"
                    className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                    placeholder="e.g., 5"
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="mt-8 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate("/books")}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#0079C0] text-white rounded-md hover:bg-[#0066a7] transition-colors flex items-center gap-2"
                disabled={isUpdating}
              >
                {isUpdating ? (
                  "Updating..."
                ) : (
                  <>
                    <FaSave /> Update Book
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
