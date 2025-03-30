export interface Book {
  id: number;
  date?: Date | null;
  title: string;
  subtitle: string[];
  accessionNumber: number;
  isbnNo: string;
  noOfCopies: number;
  barCodes: string[];
  availabilities?: object[];
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}
export interface BooksResponse {
  Total_Books: number;
  books: Book[];
}

export type GetBooksApiResponse = ApiResponse<BooksResponse>;
