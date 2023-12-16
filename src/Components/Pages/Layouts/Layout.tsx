import { Outlet } from "react-router-dom";
import BottomNavBar from "./BottomNavBar";
import Header from "./Header";
import AppSnackBar from "../../GobalCompo/AppSnackBar";

const Layout = () => {
    return (
        <>
            <Header />
            <AppSnackBar />
            <Outlet />
            <BottomNavBar />
        </>
    )
}

export default Layout;