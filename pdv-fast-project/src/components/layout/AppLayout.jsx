import { Outlet } from "react-router-dom";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";

export default function AppLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-neutral-950">
            <Navbar />


            <main className="flex-1 px-4 py-6 overflow-x-hidden">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}
