import Module from "../pages/Module";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar"


export default function Home() {
    return (
        <div>
            <Navbar />
            <Module />
            <Footer />
        </div>
    );
}