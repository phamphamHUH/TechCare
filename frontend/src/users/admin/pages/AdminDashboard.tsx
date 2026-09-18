import { useEffect } from "react";
import {
  Users,
  UserCheck,
  Stethoscope,
  FlaskConical,
  ClipboardList,
  Activity,
  ShieldCheck,
} from "lucide-react";

import Header from "../../../components/Header";
import type { User } from "../../../interface/User";

type AdminDashboardProps = {
  users: User[];
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loadData: () => Promise<void>;
  loading: boolean;
};

function AdminDashboard({
  users,
  open,
  setOpen,
  loadData,
  loading,
}: AdminDashboardProps) {
  useEffect(() => {
    loadData();
  }, [loadData]);

  const doctors = users.filter((user) => user.role === "doctor").length;

  const labStaff = users.filter(
    (user) => user.role === "laboratory-staff",
  ).length;

  const frontDeskStaff = users.filter(
    (user) => user.role === "frontdesk-staff",
  ).length;

  const patients = users.filter((user) => user.role === "patient").length;

  return (
    <main className="flex-1 min-w-0">
      <Header
        loading={loading}
        open={open}
        setOpen={setOpen}
        loadData={loadData}
        page="Admin Dashboard"
      />

      <div className="space-y-6 px-6">
        {/* =========================
                    DASHBOARD SUMMARY
                ========================== */}
        <section className="bg-white border border-gray-300 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-300">
            {/* Total Users */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Users size={20} strokeWidth={1.5} />

                <p className="text-sm text-gray-500">Total Users</p>
              </div>

              <p className="text-3xl font-semibold">{users.length}</p>

              <p className="text-sm text-gray-400 mt-2">Registered accounts</p>
            </div>

            {/* Active Users */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <UserCheck size={20} strokeWidth={1.5} />

                <p className="text-sm text-gray-500">Active Users</p>
              </div>

              <p className="text-3xl font-semibold">{users.length}</p>

              <p className="text-sm text-gray-400 mt-2">Currently registered</p>
            </div>

            {/* Today's Activity */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Activity size={20} strokeWidth={1.5} />

                <p className="text-sm text-gray-500">Today's Activity</p>
              </div>

              <p className="text-3xl font-semibold">—</p>

              <p className="text-sm text-gray-400 mt-2">No activity data</p>
            </div>

            {/* System Status */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck size={20} strokeWidth={1.5} />

                <p className="text-sm text-gray-500">System Status</p>
              </div>

              <p className="text-xl font-semibold">Operational</p>

              <p className="text-sm text-gray-400 mt-2">All systems running</p>
            </div>
          </div>
        </section>

        {/* =========================
                    SYSTEM OVERVIEW
                ========================== */}
        <section className="bg-white border border-gray-300 rounded-2xl overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-300">
            <div className="flex items-center gap-3">
              <ClipboardList size={20} strokeWidth={1.5} />

              <div>
                <h2 className="text-lg font-semibold">System Overview</h2>

                <p className="text-sm text-gray-500 mt-1">
                  Overview of registered users by role
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-300">
            {/* Doctors */}
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Doctors</p>

                  <p className="text-3xl font-semibold mt-2">{doctors}</p>
                </div>

                <Stethoscope size={22} strokeWidth={1.5} />
              </div>

              <p className="text-sm text-gray-400 mt-3">Registered doctors</p>
            </div>

            {/* Laboratory Staff */}
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Laboratory Staff</p>

                  <p className="text-3xl font-semibold mt-2">{labStaff}</p>
                </div>

                <FlaskConical size={22} strokeWidth={1.5} />
              </div>

              <p className="text-sm text-gray-400 mt-3">
                Registered laboratory staff
              </p>
            </div>

            {/* Front Desk */}
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Front Desk Staff</p>

                  <p className="text-3xl font-semibold mt-2">
                    {frontDeskStaff}
                  </p>
                </div>

                <ClipboardList size={22} strokeWidth={1.5} />
              </div>

              <p className="text-sm text-gray-400 mt-3">
                Registered front desk staff
              </p>
            </div>

            {/* Patients */}
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Patients</p>

                  <p className="text-3xl font-semibold mt-2">{patients}</p>
                </div>

                <Users size={22} strokeWidth={1.5} />
              </div>

              <p className="text-sm text-gray-400 mt-3">Registered patients</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default AdminDashboard;

/*
=========================================================
PREVIOUS ADMIN DASHBOARD IMPLEMENTATION
=========================================================

import axios from "axios";
import { useEffect, useState } from "react";

function AdminDashboard() {

    const [totalUsers, setTotalUsers] = useState(0);

    const loadAdminDashboard = async () => {
        try {
            const response = await axios.get("/admin");

            setTotalUsers(response.data.totalUsers);

            console.log("Admin dashboard data:", response.data);

        } catch (error) {
            console.error(
                "Error fetching admin dashboard data:",
                error
            );
        }
    };

    useEffect(() => {
        loadAdminDashboard();
    }, []);

    return (
        <>
            <div className="status">

                <div>
                    <h1>Admin Dashboard</h1>

                    <button
                        onClick={() => {
                            console.log("Reloading dashboard...");
                            loadAdminDashboard();
                        }}
                        className="reload-button"
                    >
                        Reload Dashboard
                    </button>

                    <div className="total-users">
                        Total Users: {totalUsers}
                    </div>
                </div>

            </div>
        </>
    );
}

export default AdminDashboard;
*/
