import { useParams, useNavigate } from "react-router";
import { useGetBookByIdQuery } from "../../service/book";
import {
  FaArrowLeft,
  FaUserEdit,
  FaBarcode,
  FaHashtag,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { useDeleteBookMutation } from "../../service/book";
import { toast } from "react-toastify";

const ViewBook = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();
  const {
    data: apiResponse,
    isLoading,
    isError,
  } = useGetBookByIdQuery(Number(id));
  const book = apiResponse?.data;
  const [deleteBook] = useDeleteBookMutation();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await deleteBook(Number(id)).unwrap();
        toast.success("Book deleted successfully");
        navigate("/books");
      } catch (error) {
        toast.error("Failed to delete book");
        console.error("Delete error:", error);
      }
    }
  };

  const handleEdit = () => {
    navigate(`/editbook/${id}`);
  };

  if (isLoading)
    return <div className="p-6 text-center">Loading book details...</div>;
  if (isError)
    return (
      <div className="p-6 text-center text-red-500">
        Error loading book details
      </div>
    );
  if (!book) return <div className="p-6 text-center">Book not found</div>;

  return (
    <div className="p-6 space-y-10 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      {/* Header with back button */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate("/books")}
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
        >
          <FaArrowLeft className="mr-2 text-orange-600" /> Back
        </button>
        <div className="flex gap-3">
          <button
            onClick={handleEdit}
            className="flex items-center px-4 py-2 bg-[#0079C0] text-white rounded-md hover:bg-[#00649e] transition-colors"
          >
            <FaEdit className="mr-2" /> Edit
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
          >
            <FaTrash className="mr-2" /> Delete
          </button>
        </div>
      </div>

      {/* Book Details Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Book Details */}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            {book.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {book.subtitle?.join(", ")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div >
              <DetailItem
                icon={<FaBarcode />}
                label="ISBN"
                value={book.isbnNo}
              />
              <DetailItem
                icon={<FaHashtag />}
                label="Accession Number"
                value={book.accessionNumber}
              />
            </div>

            {/* Right Column */}
            <div>
              <DetailItem
                icon={<FaHashtag />}
                label="Copies Available"
                value={`${
                  book.noOfCopies -
                  (book.availabilities?.filter((a) => a !== "Available")
                    .length || 0)
                }/${book.noOfCopies}`}
              />
              <DetailItem
                icon={<FaBarcode />}
                label="Barcodes"
                value={book.barCodes?.join(", ")}
              />
              <DetailItem
                icon={<FaUserEdit />}
                label="Status"
                value={
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      book.availabilities?.includes("Available")
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : book.availabilities?.includes("Borrowed")
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    }`}
                  >
                    {book.availabilities?.includes("Available")
                      ? "Available"
                      : book.availabilities?.includes("Borrowed")
                      ? "Borrowed"
                      : "Reserved"}
                  </span>
                }
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

// Reusable detail item component
const DetailItem = ({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) => (
  <div className="mb-4">
    <div className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </div>
    <div className="text-gray-800 dark:text-gray-200">{value || "-"}</div>
  </div>
);

export default ViewBook;
