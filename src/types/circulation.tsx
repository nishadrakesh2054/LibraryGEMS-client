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
  status: "issued" | "returned";
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};
export type IssueBookResponse = {
  success: boolean;
  message: string;
  transaction: Transaction;
  remainingCopies: number;
};
export type ReturnBookResponse = {
  success: boolean;
  message: string;
  gracePeriodDays: number;
  lateDays: number;
  lateFee: number;
  transaction: Transaction;
};
export type StudentTransactionsResponse = {
  success: boolean;
  totalBooks: number;
  activeBooks: number;
  returnedBooks: number;
  showingReturned: boolean;
  transactionsCount: number;
  transactions: (Transaction & { Testbook: Book })[];
};
export type TotalActiveTransactionsResponse = {
  success: boolean;
  count: number;
  transactions: (Transaction & { Student: Student; Testbook: Book })[];
};

export type TransactionsDetailsResponse = {
  success: boolean;
  transaction: (Transaction & { Student: Student; Testbook: Book })[];
};
