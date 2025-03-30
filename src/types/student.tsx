// export interface Student {
//   id: number;
//   name: string;
//   phone: string;
//   email: string;
//   rollNo: number;
//   grade: string;
//   age: number;
// }
// export interface ApiResponse<T> {
//   message: string;
//   student: T;
// }
// export interface StudentsResponse {
//   Total_students: number;
//   students: Student[];
// }

// export type GetStudentApiResponse = ApiResponse<StudentsResponse>;


// Single student interface
export interface Student {
    id: number;
    name: string;
    phone: string;
    email: string;
    rollNo: number;
    grade: string;
    age: number;
  }
  
  // Response for getting all students
  export interface AllStudentsResponse {
    Total_students: number;
    message: string;
    students: Student[];
  }
  
  // Response for single student operations (get, add, update)
  export interface SingleStudentResponse {
    message: string;
    student: Student;
  }
  
  // Response for delete operation
  export interface DeleteStudentResponse {
    message: string;
  }
  
  // Generic API response types (if needed)
  export interface ApiResponse<T> {
    message: string;
    data: T;
  }