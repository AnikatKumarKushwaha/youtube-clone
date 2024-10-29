import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import { useState } from "react";
import AuthModel from "../pages/AuthModel";

export default function AppLayout() {
  const [openModal, setOpenModal] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(true);

  function handleSidebar() {
    setOpenSidebar(!openSidebar);
  }

  return (
    <div className="h-screen flex flex-col">
      <Header
        handleSidebar={handleSidebar}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />

      <div className="flex flex-1">
        <div
          className={`duration-300 ease-in-out ${openSidebar ? "w-52" : "w-0"}`}
        >
          <SideBar openSidebar={openSidebar} />
        </div>

        {/* Main content fills the remaining space */}
        <div className="flex-1 p-4 overflow-auto">
          {openModal && (
            <AuthModel setOpenModal={setOpenModal} openModal={openModal} />
          )}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
