import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Book ,ApiResponse, BooksResponse} from "../types/book";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    getBooks: builder.query<ApiResponse<BooksResponse>, void>({
      query: () => "/books",
      providesTags: ["Books"],
    }),
    getBookById: builder.query<ApiResponse<Book>, number>({
      query: (id) => `/books/${id}`,
      providesTags: ["Books"],
    }),
    addBook: builder.mutation<ApiResponse<Book>, Omit<Book, "id">>({
      query: (newBook) => ({
        url: "/books",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["Books"],
    }),
    updateBook: builder.mutation<
    ApiResponse<Book>,
      { id: number; updatedBook: Partial<Book> }
    >({
      query: ({ id, updatedBook }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: updatedBook,
      }),
      invalidatesTags: ["Books"],
    }),

    deleteBook: builder.mutation<ApiResponse<void>, number>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery ,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;
