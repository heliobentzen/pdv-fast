import Module from "../components/Module/Module";
import Footer from "../components/layout/Footer";
import Navbar from "../components/navbar/Navbar"


export default function Home() {
    return (
        <div>
            <Navbar />
            <Module />
            <Footer />
        </div>
    );
}