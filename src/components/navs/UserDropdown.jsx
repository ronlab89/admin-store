import { lazy, Suspense, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import { useAuthStore } from "@/store/auth.store";
import { useToggleStore } from "@/store/toggle.store";
import { useMenuStore } from "@/store/menu.store";
import { useUserStore } from "@/store/user.store";
import { logout } from "@/utils/authMethods";
import User from "../../icons/User";

const LinkMenu = lazy(() => import("@/components/navs/LinkMenu"));

const UserDropdown = () => {
  const { user, resetAuth } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      resetAuth: state.resetAuth,
    }))
  );
  const { resetUser } = useUserStore(
    useShallow((state) => ({
      resetUser: state.resetUser,
    }))
  );
  const { resetMenu } = useMenuStore(
    useShallow((state) => ({
      resetMenu: state.resetMenu,
    }))
  );
  const {
    toggleDrop,
    toggleModalSide,
    handleToggleDrop,
    handleToggleModalSide,
    handleModalSideType,
    resetToggles,
  } = useToggleStore(
    useShallow((state) => ({
      toggleDrop: state.toggleDrop,
      toggleModalSide: state.toggleModalSide,
      handleToggleDrop: state.handleToggleDrop,
      handleToggleModalSide: state.handleToggleModalSide,
      handleModalSideType: state.handleModalSideType,
      resetToggles: state.resetToggles,
    }))
  );

  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false); // Estado del submenú

  // Manejadores de eventos para hover
  const handleMouseEnter = () => {
    setIsSubMenuOpen(true);
  };

  const handleMouseLeave = () => {
    setIsSubMenuOpen(false);
  };

  // Manejador para abrir/cerrar el menú con teclado
  const handleButtonClick = () => {
    setIsSubMenuOpen((prev) => !prev);
  };

  // Manejador para cerrar el menú con la tecla Escape
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsSubMenuOpen(false);
    }
  };

  const navigate = useNavigate();

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative inline-block"
    >
      {/* Botón principal */}
      <span
        id="avatarButton"
        onClick={handleButtonClick}
        aria-expanded={isSubMenuOpen} // Indica si el menú está abierto
        aria-haspopup="true" // Indica que el botón controla un menú
        aria-controls="submenu" // Asocia el botón con el submenú
        className="w-8 h-8 rounded-full cursor-pointer bg-slate-200 dark:bg-slate-800 text-teal-600 dark:text-teal-400 flex justify-center items-center"
      >
        <User width={20} height={20} styles={""} />
      </span>

      {/* Submenú */}
      {isSubMenuOpen && (
        <div
          id="submenu"
          className={`bg-slate-200 dark:bg-slate-800 font-poppins divide-y divide-gray-100 rounded-b-lg shadow dark:shadow-lg w-44 dark:divide-gray-700 absolute top-[30px] right-[0px] z-[1000]`}
          role="menu" // Indica que es un menú
          aria-labelledby="avatarButton"
        >
          <div className="px-4 py-3 text-xs text-slate-900 dark:text-slate-100">
            <div>{user.name}</div>
            <div className="truncate">{user.email}</div>
          </div>
          <ul
            className="py-2 text-xs text-Shippingco-text dark:text-Shippingco-textdark"
            aria-labelledby="avatarButton"
          >
            <li
              onClick={() => {
                handleToggleDrop(!toggleDrop);
                handleModalSideType("profile");
                handleToggleModalSide(!toggleModalSide.status, "right");
              }}
            >
              <Suspense fallback={""}>
                <LinkMenu text={"Perfil"} route={"#"} id={"profile"} />
              </Suspense>
            </li>
            {/* <li>
              <Suspense fallback={""}>
                <LinkMenu text={"Configuración"} route={"#"} id={"settings"} />
              </Suspense>
            </li> */}
          </ul>
          <div
            className="py-1 text-sm"
            onClick={() => {
              logout({
                navigate,
                resetAuth,
                resetMenu,
                resetToggles,
                resetUser,
              });
              handleToggleDrop(!toggleDrop);
            }}
          >
            <Suspense fallback={""}>
              <LinkMenu text={"Cerrar sesión"} route={"#"} id={"logout"} />
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
