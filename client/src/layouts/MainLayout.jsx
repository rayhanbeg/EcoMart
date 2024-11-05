import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
    return (
        <div>
            <Navbar/>
            <div style={{minHeight: "80vh"}}>
                <Outlet/>
            </div>
            <Footer/>
        </div>
    );
};

export default MainLayout;