import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import { useState } from "react";

export default function AppLayout() {
  const [openSidebar, setOpenSidebar] = useState(true);

  function handelSidebar() {
    setOpenSidebar(!openSidebar);
  }
  return (
    <div className="">
      <Header handelSidebar={handelSidebar} />

      <main className="flex">
        <SideBar openSidebar={openSidebar} handelSidebar={handelSidebar} />
        <Outlet />
      </main>
    </div>
  );
}
