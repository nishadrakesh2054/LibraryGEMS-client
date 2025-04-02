import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FaUser, FaArrowLeft, FaExchangeAlt } from "react-icons/fa";
import { useReturnBookMutation } from "../../service/circulation";
import { toast } from "react-toastify";

const ReturnBook: React.FC = () => {
  const navigate = useNavigate();
  const [transactionId, setTransactionId] = useState("");
  const [returnBook, { isLoading }] = useReturnBookMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionId.trim()) {
      toast.error("Please enter a valid transaction ID.");
      return;
    }

    try {
      const response = await returnBook({
        transactionId: Number(transactionId),
      }).unwrap();

      toast.success(
        `Book returned successfully! ${
          response.lateFee > 0
            ? `Late Fee: ₹${response.lateFee} (Late Days: ${response.lateDays})`
            : "No late fee applied."
        }`
      );

      setTransactionId(""); // Reset input after success
    } catch (error) {
      console.error("Failed to return book:", error);
      toast.error("Failed to return book. Please try again.");
    }
  };

  return (
    <div className="p-6 space-y-8 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-800 mr-4"
        >
          <FaArrowLeft className="mr-2 text-orange-600" /> Back
        </button>
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <FaExchangeAlt className="text-[#0079C0] mr-3" /> Return Book
        </h2>
      </div>

      {/* Form Section */}
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Transaction ID:
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
              <input
                type="number"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                className="w-full p-2 pl-10 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter Transaction ID"
                required
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 border border-[#0079C0] rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-[#0079C0] text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
            >
              {isLoading ? "Processing..." : "Return Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReturnBook;
