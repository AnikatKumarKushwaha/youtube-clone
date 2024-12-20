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
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <Header
        handleSidebar={handleSidebar}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={` duration-300 ease-in-out absolute lg:static z-10 lg:z-0 ${
            openSidebar ? "w-52" : "w-0"
          }`}
        >
          <SideBar openSidebar={openSidebar} />
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 overflow-y-auto bg-stone-50">
          {/* Modal */}
          {openModal && (
            <AuthModel setOpenModal={setOpenModal} openModal={openModal} />
          )}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
