import DashboardCard from "../../components/DashboardUI/DashboardCard";
import BookCharts from "../../components/DashboardUI/BookCharts";
import RecentActivities from "../../components/DashboardUI/RecentActivities";
import PageMeta from "../../components/common/PageMeta";
import DueDateAlert from "../../components/DashboardUI/DueDateAlert";
import RecentTransactions from "../../components/DashboardUI/RecentTransaction";
import QuickAction from "../../components/DashboardUI/QuickAction";

export default function Home() {
  return (
    <>
      <PageMeta
        title="GEMS Library Managent System"
        description="GEMS Library Managent System"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-12">
          <DashboardCard />
        </div>

        <div className="col-span-12 xl:col-span-6 mt-4">
          <RecentActivities />
        </div>
        <div className="col-span-12 xl:col-span-6 mt-4">
          <RecentTransactions />
        </div>

        <div className="col-span-12 xl:col-span-6 mt-4">
          <DueDateAlert />
        </div>
        <div className="col-span-12 xl:col-span-6 mt-4">
          <QuickAction />
        </div>
        <div className="col-span-12 xl:col-span-12 mt-4">
          <BookCharts />
        </div>
      </div>
    </>
  );
}
