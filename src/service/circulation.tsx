import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IssueBookResponse,
  ReturnBookResponse,
  StudentTransactionsResponse,
  TotalActiveTransactionsResponse,
  TransactionsDetailsResponse,
} from "../types/circulation";

export const circulationApi = createApi({
  reducerPath: "circulationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/bookscirculation",
  }),
  tagTypes: ["Transactions"],
  endpoints: (builder) => ({
    // Issue a book
    issueBook: builder.mutation<
      IssueBookResponse,
      { studentId: number; bookId: number }
    >({
      query: (issueData) => ({
        url: "/issue",
        method: "POST",
        body: issueData,
      }),
      invalidatesTags: ["Transactions"],
    }),

    // Return a book
    returnBook: builder.mutation<ReturnBookResponse, { transactionId: number }>(
      {
        query: (returnData) => ({
          url: "/return",
          method: "POST",
          body: returnData,
        }),
        invalidatesTags: ["Transactions"],
      }
    ),

    // Get all active transactions
    getActiveTransactions: builder.query<TotalActiveTransactionsResponse, void>(
      {
        query: () => "/active",
        providesTags: ["Transactions"],
      }
    ),

    // Get transactions for a specific student
    getStudentTransactions: builder.query<StudentTransactionsResponse, number>({
      query: (studentId) => `/student/${studentId}`,
      providesTags: ["Transactions"],
    }),

    // Get overdue transactions
    getOverdueTransactions: builder.query<
      TotalActiveTransactionsResponse,
      void
    >({
      query: () => "/overdue",
      providesTags: ["Transactions"],
    }),

    // Get transaction details by ID
    getTransactionById: builder.query<TransactionsDetailsResponse, number>({
      query: (transactionId) => `/${transactionId}`,
      providesTags: ["Transactions"],
    }),
  }),
});

export const {
  useIssueBookMutation,
  useReturnBookMutation,
  useGetActiveTransactionsQuery,
  useGetOverdueTransactionsQuery,
  useGetStudentTransactionsQuery,
  useGetTransactionByIdQuery,
} = circulationApi;
