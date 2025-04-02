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
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Transactions"],
  endpoints: (builder) => ({
    // Issue a book
    issueBook: builder.mutation<IssueBookResponse,{ studentId: number; bookId: number; dueDate: string }>({
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

    // Get all transactions with filters
    getAllTransactions: builder.query<TotalActiveTransactionsResponse,{status?: "issued" | "returned" | "overdue";studentId?: number;bookId?: number;showReturned?: boolean;}>({
      query: (params) => ({
        url: "/transactions",
        params: {
          ...params,
          showReturned: params.showReturned ? true : undefined,
        },
      }),
      providesTags: ["Transactions"],
    }),



    // Get all active transactions
    getActiveTransactions: builder.query<TotalActiveTransactionsResponse, void>(
      {
        query: () => "/active",
        providesTags: ["Transactions"],
      }
    ),


    // Get active transactions (overdue)
    getOverdueTransactions: builder.query<TotalActiveTransactionsResponse,void>({
      query: () => "/overdue",
      providesTags: ["Transactions"],
    }),





    // Get transactions for a specific student
    getStudentTransactions: builder.query<StudentTransactionsResponse, number>({
      query: (studentId) => `/student/${studentId}`,
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
  useGetAllTransactionsQuery,
  useGetActiveTransactionsQuery,
  useGetOverdueTransactionsQuery,
  useGetStudentTransactionsQuery, 
  useGetTransactionByIdQuery,

} = circulationApi;
