import { lazy, Suspense } from "react";
import { useShallow } from "zustand/react/shallow";

import { useMenuStore } from "@/store/menu.store";
import { useToggleStore } from "@/store/toggle.store";

import LinkMenu from "@/components/navs/LinkMenu";

import Logo from "@/components/Logo";
import Insights from "@/icons/Insights";
import Inventory from "@/icons/Inventory";
import Product from "@/icons/Product";
import Supplier from "@/icons/Supplier";
import Customer from "@/icons/Customer";
import Sale from "@/icons/Sale";
import Purchase from "@/icons/Purchase";
import Balance from "@/icons/Balance";
import Employees from "@/icons/Employees";

const Sidebar = () => {
  const { linkId } = useMenuStore(
    useShallow((state) => ({
      linkId: state.linkId,
    }))
  );
  const { toggleSidebar, handleToggleSidebar } = useToggleStore(
    useShallow((state) => ({
      toggleSidebar: state.toggleSidebar,
      handleToggleSidebar: state.handleToggleSidebar,
    }))
  );

  const handleSidebar = () => {
    handleToggleSidebar(!toggleSidebar);
  };

  const handleResetData = (id) => {
    // handleQuote(null);
    // handleBase64(null);
    // handleLabel(null);
    // resetPackages();
    // handleCitySelected(null);
    // handleProvinceSelected(null);
    // handleValidAddress(false);
    // handleSelectedCarrier(null);
    // resetProccess();
    // resetToggles();
    // resetErrors();
    // resetBatch();
  };

  const links = [
    {
      id: "insights",
      text: "Dashboard",
      url: "/dashboard",
      icon: (
        <Insights
          width={20}
          height={20}
          styles={`${
            toggleSidebar ? "w-[20px] h-[20px]" : "w-[25px] h-[25px]"
          }`}
        />
      ),
    },
    {
      id: "inventory",
      text: "Inventario",
      url: "/inventario",
      icon: (
        <Inventory
          width={20}
          height={20}
          styles={`${
            toggleSidebar ? "w-[20px] h-[20px]" : "w-[25px] h-[25px]"
          }`}
        />
      ),
    },
    {
      id: "products",
      text: "Productos",
      url: "/productos",
      icon: (
        <Product
          width={20}
          height={20}
          styles={`${
            toggleSidebar ? "w-[20px] h-[20px]" : "w-[25px] h-[25px]"
          }`}
        />
      ),
    },
    {
      id: "suppliers",
      text: "Proveedores",
      url: "/proveedores",
      icon: (
        <Supplier
          width={20}
          height={20}
          styles={`${
            toggleSidebar ? "w-[20px] h-[20px]" : "w-[25px] h-[25px]"
          }`}
        />
      ),
    },
    {
      id: "customers",
      text: "Clientes",
      url: "/clientes",
      icon: (
        <Customer
          width={20}
          height={20}
          styles={`${
            toggleSidebar ? "w-[20px] h-[20px]" : "w-[25px] h-[25px]"
          }`}
        />
      ),
    },
    {
      id: "sales",
      text: "Ventas",
      url: "/ventas",
      icon: (
        <Sale
          width={20}
          height={20}
          styles={`${
            toggleSidebar ? "w-[20px] h-[20px]" : "w-[25px] h-[25px]"
          }`}
        />
      ),
    },
    {
      id: "purchases",
      text: "Compras",
      url: "/compras",
      icon: (
        <Purchase
          width={20}
          height={20}
          styles={`${
            toggleSidebar ? "w-[20px] h-[20px]" : "w-[25px] h-[25px]"
          }`}
        />
      ),
    },
    {
      id: "balances",
      text: "Finanzas",
      url: "/finanzas",
      icon: (
        <Balance
          width={20}
          height={20}
          styles={`${
            toggleSidebar ? "w-[20px] h-[20px]" : "w-[25px] h-[25px]"
          }`}
        />
      ),
    },
    {
      id: "employees",
      text: "Empleados",
      url: "/empleados",
      icon: (
        <Employees
          width={20}
          height={20}
          styles={`${
            toggleSidebar ? "w-[20px] h-[20px]" : "w-[25px] h-[25px]"
          }`}
        />
      ),
    },
  ];

  return (
    <>
      {/* drawer init and show */}
      <div className="text-center fixed bottom-0 z-[500]">
        <div
          onClick={handleSidebar}
          className="bg-slate-100 dark:bg-slate-900 rounded-full shadow absolute bottom-[10px] left-[15px] z-50 text-teal-600 dark:text-teal-400 cursor-pointer font-medium text-sm px-2.5 py-2.5"
          data-drawer-target="drawer-navigation"
          data-drawer-show="drawer-navigation"
          aria-controls="drawer-navigation"
        >
          <svg
            className={`w-6 h-6 ${
              toggleSidebar ? "rotate-[-180deg]" : "rotate-0"
            } transition-transform duration-300`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 12H5m14 0-4 4m4-4-4-4"
            />
          </svg>
        </div>
      </div>

      {/* drawer component */}
      <div
        id="drawer-navigation"
        className={`fixed rounded-[.0rem] z-40 w-[240px] h-[100vh] ${
          toggleSidebar ? "px-4" : "px-1"
        } pt-4 overflow-hidden transition-transform duration-500 ${
          toggleSidebar
            ? "top-[0px] left-[0px]"
            : "-translate-x-[70%] top-[0px] left-[0px]"
        } bg-slate-200 dark:bg-slate-800`}
        tabIndex="-1"
        aria-labelledby="drawer-navigation-label"
      >
        <div
          className={`${
            toggleSidebar ? "justify-start" : "absolute top-[17px] right-[30px]"
          } flex  items-start gap-2 transition-all duration-500`}
        >
          <Logo
            width={20}
            height={20}
            styles="text-teal-600 dark:text-teal-400"
          />

          <span
            className={`${
              toggleSidebar ? "block" : "hidden"
            } text-semibold text-lg`}
          >
            Admin Store
          </span>
        </div>
        <div className="mt-[70px]">
          {/* Links */}
          <article
            id="aside-menu"
            className={`w-full min-h-[50vh] h-[80vh] max-h-[100vh] overflow-hidden overflow-y-auto pt-0`}
          >
            <ul
              className={`${
                toggleSidebar
                  ? "w-[80%] items-start"
                  : "w-[95%] items-end mt-[20px]"
              } flex flex-col justify-start gap-3 `}
            >
              {links.map((link) => (
                <li key={link.id} onClick={() => handleResetData("insights")}>
                  <LinkMenu
                    text={link.text}
                    icon={link.icon}
                    route={link.url}
                    id={link.id}
                  />
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
