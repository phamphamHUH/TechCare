import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import {
    LayoutGrid,
    Users,
    BadgeDollarSign,
    Activity,
    FileText,
} from "lucide-react";
import UserManagement from "./pages/UserManagement";
import AdminDashboard from "./pages/AdminDashboard";
import SideBar from "../../components/SideBar";
import ServicePricingManagement from "./pages/ServicePricing";
import ActivityMonitoring from "./pages/ActivityMonitoring";
import ReportBuilder from "./pages/ReportBuilder";
import api from "../../lib/axios";
import type { User } from "../../interface/User";
import type { Service } from "../../interface/Service";
type Activities = {
    id: number;
    activity_id: string;
    user_id: number;
    username: string;
    service_name: string;
    details: Record<string, unknown>;
    created_at: string;
};
// each element must be either:

// No object at all (the array is empty)
// A complete Activity object

function Admin() {
    const [users, setUsers] = useState<User[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [activities, setActivities] = useState<Activities[]>([])  // Acitivities[] this means that this object structure can be a lot of objects // array
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get("page") ?? "dashboard"
    function setPage(newPage: string) {
        setSearchParams({ page: newPage })
    }
    const navItems = [
    {
        page: "dashboard",
        label: "Dashboard",
        icon: <LayoutGrid size={20} />,
    },
    {
        page: "user-management",
        label: "User Management",
        icon: <Users size={20} />,
    },
    {
        page: "service-pricing",
        label: "Service Pricing",
        icon: <BadgeDollarSign size={20} />,
    },
    {
        page: "activity-monitoring",
        label: "Activity Monitoring",
        icon: <Activity size={20} />,
    },
    {
        page: "report-builder",
        label: "Report Builder",
        icon: <FileText size={20} />,
    },
];
    const loadData = useCallback(async () => {
        try {
            setLoading(true);
            const serviceResponse = await api.get("/api/admin/services");
            const userResponse = await api.get("/api/admin/users");
            const activityResponse = await api.get("/api/admin/activities")


            setActivities(activityResponse.data.activities)
            console.log("Services data:", serviceResponse.data);

            setServices(serviceResponse.data.services);
            console.log("services data:", userResponse.data);

            setUsers(userResponse.data.users);
            console.log("Users data:", userResponse.data.users);
        } catch (error) {
            console.log("Error fetching services:", error);
        } finally{
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        (async () => {
            await loadData();
        })();
    }, [loadData]);


    return (
        <div className="flex min-h-screen">
            <SideBar
                open={open}
                page={page}
                setPage={setPage}
                navItems={navItems}
            />

            {page === "dashboard" && (
                <AdminDashboard
                    loading={loading}
                    users={users}
                    open={open}
                    setOpen={setOpen}
                    loadData={loadData}
                />
            )}
            {page === "user-management" && (
                <UserManagement
                    loading={loading}
                    users={users}
                    open={open}
                    setOpen={setOpen}
                    loadData={loadData}
                />
            )}
            {page === "service-pricing" && (
                <ServicePricingManagement
                    loading={loading}
                    services={services}
                    open={open}
                    setOpen={setOpen}
                    loadData={loadData}
                />
            )}
            {page === "activity-monitoring" && (
                <ActivityMonitoring
                    loading={loading}
                    activities={activities}
                    open={open}
                    setOpen={setOpen}
                    loadData={loadData}
                />
            )}
            {page === "report-builder" && (
                <ReportBuilder
                    loading={loading}
                    open={open}
                    setOpen={setOpen}
                    loadData={loadData}
                />
            )}

        </div>
    );
}

export default Admin;