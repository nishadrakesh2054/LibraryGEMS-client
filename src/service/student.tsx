import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Student,
  AllStudentsResponse,
  SingleStudentResponse,
  DeleteStudentResponse,
} from "../types/student";

export const studentApi = createApi({
  reducerPath: "studentApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  tagTypes: ["Students"],
  endpoints: (builder) => ({
    getStudents: builder.query<AllStudentsResponse, void>({
      query: () => "/students",
      providesTags: ["Students"],
    }),
    getStudentById: builder.query<SingleStudentResponse, number>({
      query: (id) => `/students/${id}`,
      providesTags: ["Students"],
    }),

    addStudent: builder.mutation<SingleStudentResponse, Omit<Student, "id">>({
      query: (newStudent) => ({
        url: "/students",
        method: "POST",
        body: newStudent,
      }),
      invalidatesTags: ["Students"],
    }),

 


    // In your service file
updateStudent: builder.mutation<SingleStudentResponse, Student>({
    query: (student) => ({
      url: `/students/${student.id}`,
      method: "PUT",
      body: student,
    }),
    invalidatesTags: ["Students"],
  }),
    deleteStudent: builder.mutation<DeleteStudentResponse, number>({
      query: (id) => ({
        url: `/students/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Students"],
    }),
  }),
});

export const {
  useGetStudentByIdQuery,
  useGetStudentsQuery,
  useAddStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentApi;
