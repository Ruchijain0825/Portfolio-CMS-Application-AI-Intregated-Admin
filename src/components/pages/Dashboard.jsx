import { Outlet } from "react-router-dom";
import Sidebar from "../layouts/Sidebar";
import Header from "../layouts/Header";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <div className="ml-[230px]">
        <Header />

        <main className="p-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;