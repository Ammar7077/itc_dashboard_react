import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SidebarLinkGroup from "./SidebarLinkGroup";
import Logo from "../../assets/images/logo/itc_logo.png";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLDivElement>(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(
    storedSidebarExpanded === null ? true : storedSidebarExpanded === "false"
  );

  // Close sidebar on click outside
  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(event.target as Node) ||
        trigger.current.contains(event.target as Node)
      )
        return;
      setSidebarOpen(false);
    };

    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [sidebarOpen]);

  // Close if the esc key is pressed
  useEffect(() => {
    const keyHandler = (event: KeyboardEvent) => {
      if (!sidebarOpen || event.key !== "Escape") return;
      setSidebarOpen(false);
    };

    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [sidebarOpen]);

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.body.classList.add("sidebar-expanded");
    } else {
      document.body.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-[9999] flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink
          to="/"
          className="flex items-center justify-start gap-2 md:gap-4 p-2 md:p-4"
        >
          <img
            src={Logo}
            alt="Logo"
            className="w-16 rounded-full h-auto md:w-20 lg:w-24"
          />
          <span className="font-bold text-bodydark2 text-stone-300 md:text-lg lg:text-xl">
            Data<span className="text-amber-500">bank</span>
          </span>
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z" />
          </svg>
        </button>
      </div>
      {/* Sidebar Header */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* Sidebar Menu */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              {/* Menu Item Dashboard */}
              <SidebarLinkGroup activeCondition={pathname === "/"}>
                {(handleClick, open) => (
                  <React.Fragment>
                    <NavLink
                      to="#"
                      className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4  hover:text-blue-600 ${
                        pathname === "/" && "bg-meta-4 dark:bg-meta-4"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        sidebarExpanded
                          ? handleClick()
                          : setSidebarExpanded(true);
                      }}
                    >
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z"
                          fill=""
                        />
                        <path
                          d="M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z"
                          fill=""
                        />
                        <path
                          d="M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z"
                          fill=""
                        />
                        <path
                          d="M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z"
                          fill=""
                        />
                      </svg>
                      <span className="text-white hover:text-blue-600">
                        Databank
                      </span>
                      <svg
                        className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                          open && "rotate-180"
                        }`}
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                          fill=""
                        />
                      </svg>
                    </NavLink>
                    {/* <!-- Dropdown Menu Start --> */}
                    <div
                      className={`translate transform overflow-hidden ${
                        !open && "hidden"
                      }`}
                    >
                      <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                        <SidebarLinkGroup
                          activeCondition={pathname.includes("ai")}
                        >
                          {(handleClick, open) => (
                            <React.Fragment>
                              <NavLink
                                to="data/ai"
                                className={` group relative flex bg-graydark text-white items-center gap-2.5 rounded-sm px-4 py-2 font-medium ${
                                  (pathname === "/data/ai" ||
                                    pathname.includes("AI")) &&
                                  "bg-white text-blue-600	 dark:bg-meta-4"
                                } duration-300 ease-in-out hover:bg-meta-4 hover:text-black`}
                                onClick={handleClick}
                              >
                                <svg
                                  height="800px"
                                  width="800px"
                                  className="w-6 h-6 text-blue-500"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g data-name="Product Icons">
                                    <polygon
                                      className="fill-[#4285f4]"
                                      points="16.64 15.13 17.38 13.88 20.91 13.88 22 12 19.82 8.25 16.75 8.25 15.69 6.39 14.5 6.39 14.5 5.13 16.44 5.13 17.5 7 19.09 7 16.9 3.25 12.63 3.25 12.63 8.25 14.36 8.25 15.09 9.5 12.63 9.5 12.63 12 14.89 12 15.94 10.13 18.75 10.13 19.47 11.38 16.67 11.38 15.62 13.25 12.63 13.25 12.63 17.63 16.03 17.63 15.31 18.88 12.63 18.88 12.63 20.75 16.9 20.75 20.18 15.13 18.09 15.13 17.36 16.38 14.5 16.38 14.5 15.13 16.64 15.13"
                                    />
                                    <polygon
                                      className="fill-[#669df6]"
                                      points="7.36 15.13 6.62 13.88 3.09 13.88 2 12 4.18 8.25 7.25 8.25 8.31 6.39 9.5 6.39 9.5 5.13 7.56 5.13 6.5 7 4.91 7 7.1 3.25 11.38 3.25 11.38 8.25 9.64 8.25 8.91 9.5 11.38 9.5 11.38 12 9.11 12 8.06 10.13 5.25 10.13 4.53 11.38 7.33 11.38 8.38 13.25 11.38 13.25 11.38 17.63 7.97 17.63 8.69 18.88 11.38 18.88 11.38 20.75 7.1 20.75 3.82 15.13 5.91 15.13 6.64 16.38 9.5 16.38 9.5 15.13 7.36 15.13"
                                    />
                                  </g>
                                </svg>{" "}
                                <span>AI</span>
                              </NavLink>
                            </React.Fragment>
                          )}
                        </SidebarLinkGroup>

                        {/* Menu Item Consulting */}
                        <SidebarLinkGroup
                          activeCondition={pathname.includes("consulting")}
                        >
                          {(handleClick, open) => (
                            <React.Fragment>
                              <NavLink
                                to="data/consultings"
                                className={` group relative bg-graydark text-white flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:bg-meta-4 hover:text-black ${
                                  (pathname === "/data/consultings" ||
                                    pathname.includes("consultings")) &&
                                  "bg-white text-blue-600 dark:bg-meta-4"
                                }`}
                                onClick={handleClick}
                              >
                                <svg
                                  height="800px"
                                  width="800px"
                                  version="1.1"
                                  id="Layer_1"
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  viewBox="0 0 512 512"
                                  xmlSpace="preserve"
                                  className="w-6 h-5"
                                >
                                  <g transform="translate(1 1)">
                                    <polygon
                                      style={{ fill: "#FFFFFF" }}
                                      points="24.6,58.733 485.4,58.733 485.4,417.133 24.6,417.133"
                                    />
                                    <path
                                      style={{ fill: "#0096E6" }}
                                      d="M493.933,425.667H16.067V50.2h477.867V425.667z M33.133,408.6h443.733V67.267H33.133V408.6z"
                                    />
                                    <polygon
                                      style={{ fill: "#D0E8F9" }}
                                      points="7.533,7.533 502.467,7.533 502.467,58.733 7.533,58.733"
                                    />
                                    <g>
                                      <path
                                        style={{ fill: "#0096E6" }}
                                        d="M511,67.267H-1V-1h512V67.267z M16.067,50.2h477.867V16.067H16.067V50.2z"
                                      />
                                      <path
                                        style={{ fill: "#0096E6" }}
                                        d="M255,451.267c-5.12,0-8.533-3.413-8.533-8.533v-25.6c0-5.12,3.413-8.533,8.533-8.533 s8.533,3.413,8.533,8.533v25.6C263.533,447.853,260.12,451.267,255,451.267z"
                                      />
                                    </g>
                                    <path
                                      style={{ fill: "#D0E8F9" }}
                                      d="M280.6,476.867c0,14.507-11.093,25.6-25.6,25.6c-14.507,0-25.6-11.093-25.6-25.6 c0-14.507,11.093-25.6,25.6-25.6C269.507,451.267,280.6,462.36,280.6,476.867L280.6,476.867z"
                                    />
                                    <g>
                                      <path
                                        style={{ fill: "#0096E6" }}
                                        d="M255,511c-18.773,0-34.133-15.36-34.133-34.133s15.36-34.133,34.133-34.133 s34.133,15.36,34.133,34.133S273.773,511,255,511z M255,459.8c-9.387,0-17.067,7.68-17.067,17.067s7.68,17.067,17.067,17.067 s17.067-7.68,17.067-17.067S264.387,459.8,255,459.8z"
                                      />
                                      <path
                                        style={{ fill: "#0096E6" }}
                                        d="M442.733,357.4H67.267v-17.067h25.6V203.8h68.267v136.533h34.133v-102.4h51.2v-51.2h51.2V127 h68.267v25.6h51.2v187.733h25.6V357.4z M365.933,340.333h34.133V169.667h-34.133V340.333z M314.733,340.333h34.133V144.067 h-34.133V340.333z M263.533,340.333h34.133V203.8h-34.133V340.333z M212.333,340.333h34.133V255h-34.133V340.333z M109.933,340.333h34.133V220.867h-34.133V340.333z"
                                      />
                                    </g>
                                    <polygon
                                      style={{ fill: "#D0E8F9" }}
                                      points="152.6,161.133 203.8,161.133 203.8,348.867 152.6,348.867"
                                    />
                                    <g>
                                      <path
                                        style={{ fill: "#0096E6" }}
                                        d="M212.333,357.4h-68.267V152.6h68.267V357.4z M161.133,340.333h34.133V169.667h-34.133V340.333z"
                                      />
                                      <path
                                        style={{ fill: "#0096E6" }}
                                        d="M152.6,169.667c0,5.12,3.413,8.533,8.533,8.533c5.12,0,8.533-3.413,8.533-8.533 c0-5.12-3.413-8.533-8.533-8.533C156.013,161.133,152.6,164.547,152.6,169.667"
                                      />
                                      <path
                                        style={{ fill: "#0096E6" }}
                                        d="M502.467,425.667H7.533c-5.12,0-8.533-3.413-8.533-8.533s3.413-8.533,8.533-8.533h494.933 c5.12,0,8.533,3.413,8.533,8.533S507.587,425.667,502.467,425.667z"
                                      />
                                      <path
                                        style={{ fill: "#0096E6" }}
                                        d="M186.733,169.667c0,5.12,3.413,8.533,8.533,8.533c5.12,0,8.533-3.413,8.533-8.533 c0-5.12-3.413-8.533-8.533-8.533C190.147,161.133,186.733,164.547,186.733,169.667"
                                      />
                                      <path
                                        style={{ fill: "#0096E6" }}
                                        d="M169.667,186.733c0,5.12,3.413,8.533,8.533,8.533c5.12,0,8.533-3.413,8.533-8.533 c0-5.12-3.413-8.533-8.533-8.533C173.08,178.2,169.667,181.613,169.667,186.733"
                                      />
                                      <path
                                        style={{ fill: "#0096E6" }}
                                        d="M152.6,203.8c0,5.12,3.413,8.533,8.533,8.533c5.12,0,8.533-3.413,8.533-8.533 c0-5.12-3.413-8.533-8.533-8.533C156.013,195.267,152.6,198.68,152.6,203.8"
                                      />
                                      <path
                                        style={{ fill: "#0096E6" }}
                                        d="M186.733,203.8c0,5.12,3.413,8.533,8.533,8.533c5.12,0,8.533-3.413,8.533-8.533 c0-5.12-3.413-8.533-8.533-8.533C190.147,195.267,186.733,198.68,186.733,203.8"
                                      />
                                      <path
                                        style={{ fill: "#0096E6" }}
                                        d="M169.667,220.867c0,5.12,3.413,8.533,8.533,8.533c5.12,0,8.533-3.413,8.533-8.533 c0-5.12-3.413-8.533-8.533-8.533C173.08,212.333,169.667,215.747,169.667,220.867"
                                      />
                                    </g>
                                    <g>
                                      <path
                                        style={{ fill: "#0096E6" }}
                                        d="M169.667,237.933c0,5.12,3.413,8.533,8.533,8.533c5.12,0,8.533-3.413,8.533-8.533 c0-5.12-3.413-8.533-8.533-8.533C173.08,229.4,169.667,232.813,169.667,237.933"
                                      />
                                    </g>
                                  </g>
                                </svg>

                                <span>Consulting</span>
                              </NavLink>
                            </React.Fragment>
                          )}
                        </SidebarLinkGroup>

                        {/* Menu Item Media */}
                        <SidebarLinkGroup
                          activeCondition={pathname.includes("media")}
                        >
                          {(handleClick, open) => (
                            <React.Fragment>
                              <NavLink
                                to="data/media"
                                className={` group relative bg-graydark text-white flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:bg-meta-4 hover:text-black ${
                                  (pathname === "/data/media" ||
                                    pathname.includes("media")) &&
                                  "bg-white text-blue-600  dark:bg-meta-4"
                                }`}
                                onClick={handleClick}
                              >
                                <svg
                                  width="800px"
                                  height="800px"
                                  viewBox="-4.04 0 78.086 78.086"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-6 h-6" // Add Tailwind classes for width and height
                                >
                                  <path
                                    d="m -54.391436,534.07573 -17.5382,-9.6261 0,-6.8738 0,-6.8738 1.6083,-0.047 c 1.8398,-0.054 3.9895,0.1593 5.1886,0.5154 1.2072,0.3585 2.096,1.3167 2.7625,2.9783 2.8672,7.1484 7.1822,12.0533 13.2633,15.0762 3.3151,1.648 6.1727,2.416 10.0094,2.6902 6.0362,0.4313 11.8774,-1.0221 16.6426,-4.1412 4.5185,-2.9576 8.0276,-7.3021 10.2845,-12.7328 0.5053,-1.216 1.1068,-2.397 1.388,-2.7256 1.009498,-1.1793 2.925298,-1.6897 6.342498,-1.6897 l 2.1348,0 0.1493,0.3929 c 0.088,0.2316 0.1494,2.92 0.1494,6.5497 l 0,6.1568 -17.170898,9.9347 c -9.444,5.4642 -17.2845,9.959 -17.4234,9.9885 -0.1388,0.03 -8.1446,-4.278 -17.7907,-9.5723 z m 15.9191,-10.917 c -7.4947,-0.5408 -13.8641,-5.9272 -15.8832,-13.4318 -0.3576,-1.329 -0.3979,-1.7575 -0.4055,-4.3094 -0.01,-2.455 0.038,-3.0167 0.3378,-4.2031 1.4299,-5.6544 5.3331,-10.2163 10.6007,-12.3897 1.337,-0.5516 3.1917,-1.0673 4.4837,-1.2467 1.2581,-0.1746 4.1147,-0.1026 5.4725,0.138 6.763,1.1982 12.422,6.3762 14.1562,12.9532 2.426,9.2002 -2.5154,18.5012 -11.4794,21.6072 -2.236,0.7747 -4.676,1.0703 -7.2828,0.8823 z m 5.6495,-12.0738 c 4.3901,-2.9065 7.9847,-5.324 7.9879,-5.3724 0,-0.048 -3.5956,-2.4563 -7.9974,-5.3509 -4.4018,-2.8946 -8.1928,-5.3928 -8.4245,-5.5516 l -0.4212,-0.2886 0,11.2071 0,11.207 0.4366,-0.2831 c 0.2401,-0.1557 4.0285,-2.6611 8.4186,-5.5675 z m 26.068098,-9.7493 c -2.6742,-0.4034 -3.7994,-1.3195 -4.897798,-3.9878 -2.2011,-5.3469 -4.0089,-8.1832 -7.356,-11.5413 -2.4492,-2.4572 -4.2316,-3.7658 -6.9694,-5.1166 -3.7166,-1.8339 -6.853,-2.5557 -11.105,-2.5557 -7.1582,0 -13.3128,2.6539 -18.3848,7.9275 -2.9926,3.1116 -4.7401,5.9189 -7.1213,11.4404 -0.7403,1.7167 -1.2589,2.4281 -2.1508,2.9508 -1.0856,0.6363 -2.1704,0.8239 -4.7787,0.8266 l -2.3373,0 0.04,-7.8964 0.04,-7.8965 17.4057,-9.9619 17.4057,-9.9619 17.3644,9.7289 17.364498,9.7288 0.1069,6.1 c 0.059,3.355 0.1277,7.0478 0.1531,8.2063 l 0.046,2.1064 -2.221,-0.021 c -1.2215,-0.012 -2.3933,-0.047 -2.6039,-0.079 z"
                                    fill="#00bcf2"
                                    transform="translate(71.93 -465.563)"
                                  />
                                </svg>
                                <span>Media</span>
                              </NavLink>
                            </React.Fragment>
                          )}
                        </SidebarLinkGroup>

                        {/* Menu Item JSON */}

                        <SidebarLinkGroup
                          activeCondition={pathname.includes("json")}
                        >
                          {(handleClick, open) => (
                            <React.Fragment>
                              <NavLink
                                to="data/JSONLs"
                                className={` group relative flex text-white items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 bg-graydark  ease-in-out hover:bg-meta-4 hover:text-black ${
                                  (pathname === "/data/JSONLs" ||
                                    pathname.includes("JSONLs")) &&
                                  "bg-white text-blue-600 dark:bg-meta-4"
                                }`}
                                onClick={handleClick}
                              >
                                <svg
                                  width="800px"
                                  height="800px"
                                  viewBox="-1.26 0 70 70"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-6 h-5"
                                >
                                  <path
                                    d="m -99.01584,570.83675 c -3.17264,-0.83123 -5.72847,-3.33808 -6.6453,-6.51797 l -0.31664,-1.0982 0,-27.04305 c 0,-22.20209 0.0331,-27.17821 0.18483,-27.79807 0.10166,-0.41525 0.46444,-1.34185 0.80619,-2.05911 0.53117,-1.11483 0.79324,-1.47372 1.80565,-2.47272 1.3546,-1.33668 2.55993,-2.0244 4.32924,-2.47015 1.06307,-0.26783 1.55942,-0.27346 23.67983,-0.26872 l 22.594,0.005 7.0428,6.96184 7.0428,6.96184 -0.0418,24.22893 -0.0418,24.22893 -0.3245,0.96092 c -1.11816,3.31113 -3.48791,5.56775 -6.71307,6.39261 -1.00711,0.25758 -1.77491,0.26498 -26.71957,0.25764 -24.81831,-0.007 -25.71633,-0.0164 -26.68265,-0.26955 z m 52.72739,-5.81192 c 0.91283,-0.44823 1.63615,-1.31556 1.87019,-2.24254 0.0992,-0.39302 0.14532,-7.522 0.14532,-22.47714 l 0,-21.90158 -5.59393,-0.0359 -5.59393,-0.0359 -0.0358,-5.73121 -0.0358,-5.73121 -20.96716,10e-4 -20.96716,0.001 -0.68637,0.3203 c -0.3775,0.17617 -0.91454,0.57341 -1.1934,0.88277 -1.00274,1.11235 -0.93435,-0.93979 -0.93435,28.03679 0,28.12625 -0.0363,26.70391 0.71059,27.80828 0.41847,0.61872 1.20418,1.15671 2.00639,1.3738 0.51402,0.1391 5.74384,0.16956 25.56154,0.14889 l 24.9153,-0.026 0.79862,-0.39215 z m -33.58527,-10.52771 c -2.07448,-0.34818 -3.85541,-1.28358 -4.60848,-2.42051 -1.03081,-1.55623 -1.24495,-2.77747 -1.24737,-7.11352 -9.6e-4,-1.81202 -0.0613,-3.65769 -0.13397,-4.10149 -0.26208,-1.60032 -1.06953,-2.51537 -2.35842,-2.67267 l -0.7338,-0.0896 0,-1.99048 0,-1.99048 0.72272,-0.0882 c 0.96215,-0.11743 1.61069,-0.62298 2.06925,-1.61304 0.35217,-0.76034 0.35757,-0.82135 0.4449,-5.02519 0.0969,-4.66462 0.17189,-5.17713 0.97897,-6.69138 0.98381,-1.84581 3.12129,-2.8581 6.50415,-3.08031 l 1.29152,-0.0848 0,2.00496 0,2.00496 -0.51478,0.0864 c -1.34755,0.22622 -1.92878,0.58528 -2.40112,1.48334 -0.27967,0.53174 -0.30621,0.82651 -0.39126,4.34548 -0.0962,3.98223 -0.22748,4.96729 -0.83601,6.27496 -0.3246,0.69753 -1.56109,2.01727 -2.02923,2.16585 -0.39839,0.12644 -0.34602,0.22272 0.38004,0.69853 1.9389,1.27065 2.48674,3.20727 2.49424,8.81714 0.004,2.94207 0.11288,3.60717 0.70946,4.33093 0.41997,0.5095 1.39165,0.91197 2.20176,0.91197 l 0.3869,0 0,1.99047 0,1.99048 -1.13251,-0.0161 c -0.62288,-0.009 -1.43151,-0.0663 -1.79696,-0.12767 z m 10.06774,-1.84667 0,-1.99047 0.38691,0 c 0.63986,0 1.73822,-0.38637 2.04172,-0.71821 0.75038,-0.82048 0.78105,-1.00164 0.87767,-5.18459 0.095,-4.11199 0.19695,-4.92132 0.77574,-6.15729 0.44884,-0.95846 1.02167,-1.59742 1.86271,-2.07776 l 0.68106,-0.38897 -0.5331,-0.27505 c -1.13501,-0.58561 -1.99911,-1.84602 -2.4632,-3.5929 -0.18497,-0.69624 -0.25537,-1.73679 -0.32046,-4.73597 -0.0818,-3.76983 -0.09,-3.85545 -0.42644,-4.4561 -0.43586,-0.77815 -1.05013,-1.19054 -2.07315,-1.39181 l -0.80946,-0.15925 0,-1.99325 0,-1.99325 1.34685,0.0883 c 1.61808,0.10604 3.14128,0.47567 4.2347,1.02763 0.93228,0.47061 2.01042,1.55758 2.38512,2.40465 0.63579,1.4373 0.71164,2.04496 0.80797,6.47312 0.0788,3.62111 0.12851,4.33736 0.33358,4.8046 0.46963,1.07 1.35555,1.71593 2.35345,1.71593 l 0.48854,0 -0.038,2.02326 -0.038,2.02326 -0.63535,0.0907 c -0.80056,0.11433 -1.07486,0.26234 -1.60496,0.8661 -0.74099,0.84395 -0.84825,1.51108 -0.84934,5.28284 -10e-4,5.04322 -0.34069,6.72253 -1.64669,8.1515 -0.40374,0.44176 -1.01069,0.90447 -1.53651,1.17136 -1.05998,0.53802 -3.09591,0.97788 -4.53751,0.98032 l -1.06388,0.002 0,-1.99048 z"
                                    fill="#00bcf2"
                                    transform="translate(105.978 -501.108)"
                                  />
                                </svg>
                                <span>JSONL</span>
                              </NavLink>
                            </React.Fragment>
                          )}
                        </SidebarLinkGroup>
                      </ul>
                    </div>
                    {/* <!-- Dropdown Menu End --> */}
                  </React.Fragment>
                )}
              </SidebarLinkGroup>

              {/* Menu Item AI */}
            </ul>
          </div>
        </nav>
        {/* Sidebar Menu */}
      </div>
    </aside>
  );
};

export default Sidebar;
