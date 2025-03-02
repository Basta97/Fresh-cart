import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

const Layout = () => (
  <div className="flex flex-col min-h-screen">
    <NavBar />
    <main className="flex-1 ">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout;