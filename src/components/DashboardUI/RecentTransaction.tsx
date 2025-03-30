import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
  } from "../ui/table";
  import Badge from "../ui/badge/Badge";
  
  interface BookTransaction {
    id: number;
    bookTitle: string;
    borrower: string;
    dateBorrowed: string;
    dueDate: string;
    status: "Returned" | "Overdue" | "Borrowed";
  }
  
  // Define the table data using the interface
  const transactions: BookTransaction[] = [
    {
      id: 1,
      bookTitle: "The Great Gatsby",
      borrower: "Alice Johnson",
      dateBorrowed: "2025-03-01",
      dueDate: "2025-03-15",
      status: "Borrowed",
    },
    {
      id: 2,
      bookTitle: "1984",
      borrower: "Bob Smith",
      dateBorrowed: "2025-02-20",
      dueDate: "2025-03-05",
      status: "Overdue",
    },
    {
      id: 3,
      bookTitle: "To Kill a Mockingbird",
      borrower: "Charlie Brown",
      dateBorrowed: "2025-03-05",
      dueDate: "2025-03-19",
      status: "Borrowed",
    },
    {
      id: 4,
      bookTitle: "Moby Dick",
      borrower: "David Wilson",
      dateBorrowed: "2025-02-25",
      dueDate: "2025-03-10",
      status: "Returned",
    },
  ];
  
  export default function RecentTransactions() {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
        <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Recent Book Transactions
            </h3>
          </div>
        </div>
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
              <TableRow>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Book Title
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Borrower
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Date Borrowed
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Due Date
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Status
                </TableCell>
              </TableRow>
            </TableHeader>
  
            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="py-3">
                    <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {transaction.bookTitle}
                    </p>
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {transaction.borrower}
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {transaction.dateBorrowed}
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {transaction.dueDate}
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        transaction.status === "Returned"
                          ? "success"
                          : transaction.status === "Borrowed"
                          ? "warning"
                          : "error"
                      }
                    >
                      {transaction.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
  