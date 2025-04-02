export type Book = {
  id: number;
  title: string;
  accessionNumber: number;
  isbnNo: string;
};
export type Student = {
  id: number;
  name: string;
  email: string;
  rollNo: number;
  grade: string;
};
export type Transaction = {
  id: number;
  studentId: number;
  bookId: number;
  issueDate: string;
  dueDate: string;
  returnDate: string | null;
  isReturned: boolean;
  lateFee: string | number;
  status: "issued" | "returned" | "overdue";
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};
// This is the response type for issuing a book
export type IssueBookResponse = {
  success: boolean;
  message: string;
  transaction: Transaction;
  remainingCopies: number;
};
// This is the response type for returning a book
export type ReturnBookResponse = {
  success: boolean;
  message: string;
  lateFee: number;
  transaction: Transaction;
};
// This is the response type for getting all active transactions
export type TotalActiveTransactionsResponse = {
  success: boolean;
  count: number;
  transactions: (Transaction & { Student: Student; Testbook: Book })[];
};

// This is the response type for getting all  transactions status like .issue ..returned..duedate
export type TransactionsStatusResponse = {
  success: boolean;
  count: number;
  transactions: (Transaction & { Student: Student; Testbook: Book })[];
};

// This is the response type  overdue / issued books
export type OverdueBooksResponse = {
  success: boolean;
  count: number;
  transactions: (Transaction & { Student: Student; Testbook: Book })[];
};

export type StudentTransactionsResponse = {
  success: boolean;
  counts: {
    status: string;
    count: string;
  }[];
  transactions: (Transaction & { Testbook: Book })[];
};

// This is the response details of books  transactions
export type TransactionsDetailsResponse = {
  success: boolean;
  transaction: (Transaction & { Student: Student; Testbook: Book })[];
};
