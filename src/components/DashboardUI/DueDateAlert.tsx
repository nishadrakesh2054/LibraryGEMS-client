import { FaExclamationCircle } from "react-icons/fa";

// Define the type for the alert item
interface Alert {
  book: string;
  dueDate: string;
  status: "Overdue" | "Due Soon";
}

const DueDateAlerts = () => {
  const alerts: Alert[] = [
    {
      book: "Moby Dick",
      dueDate: "March 18, 2025",
      status: "Overdue",
    },
    {
      book: "To Kill a Mockingbird",
      dueDate: "March 20, 2025",
      status: "Due Soon",
    },
    {
      book: "1984",
      dueDate: "March 25, 2025",
      status: "Due Soon",
    },
    {
      book: "The Great Gatsby",
      dueDate: "March 30, 2025",
      status: "Overdue",
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <h4 className="font-bold text-gray-800 dark:text-white">Due Date Alerts</h4>
      <div className="mt-4 space-y-3">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b pb-3 last:border-b-0"
          >
            <div className="flex items-center space-x-4">
              <div
                className={`w-6 h-6 flex items-center justify-center rounded-full ${
                  alert.status === "Overdue" ? "bg-red-800 text-red-300" : "bg-yellow-800 text-yellow-300"
                }`}
              >
                <FaExclamationCircle className="text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-800 dark:text-white">{alert.book}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Due Date: {alert.dueDate}</p>
              </div>
            </div>
            <div>
              <span
                className={`text-sm font-bold ${
                  alert.status === "Overdue" ? "text-red-600" : "text-yellow-600"
                }`}
              >
                {alert.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DueDateAlerts;
