export interface Book {
  id: number;
  title: string;
  subtitle: string[];
  accessionNumber: number;
  isbnNo: string;
  noOfCopies: number;
  barCodes: string[];
  availabilities?: string[]; 
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
