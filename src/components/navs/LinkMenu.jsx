import { NavLink } from "react-router-dom";

import { useMenuStore } from "@/store/menu.store";
import { useToggleStore } from "@/store/toggle.store";
import { useAuthStore } from "@/store/auth.store";
import { useUserStore } from "@/store/user.store";

const LinkMenu = ({ text, icon, id, id2, route }) => {
  const user = useAuthStore((state) => state.user);
  const handleDataProfile = useUserStore((state) => state.handleDataProfile);
  const linkId = useMenuStore((state) => state.linkId);
  const handleLinkId = useMenuStore((state) => state.handleLinkId);
  const handleSubLinkId = useMenuStore((state) => state.handleSubLinkId);
  const handleToggleModal = useToggleStore((state) => state.handleToggleModal);
  const toggleSidebar = useToggleStore((state) => state.toggleSidebar);

  const handleSubMenu = (e, id, id2) => {
    e.preventDefault();
    handleLinkId(id);
    handleSubLinkId(id2);
    handleToggleModal(false);
    if (id === "profile") {
      handleDataProfile({ ...user, type: "loggued" });
    }
  };

  let activeClassName =
    "underline decoration-teal-600 font-medium text-teal-600 dark:decoration-teal-400 dark:text-teal-400";

  return (
    <span
      id={id}
      className={`cursor-pointer text-[0.85rem] inline-flex gap-2 mb-0 px-2 pt-2 font-poppins text-slate-900 dark:text-slate-100 font-medium hover:text-teal-600 dark:hover:text-teal-400`}
      onClick={(e) => handleSubMenu(e, id, id2)}
    >
      <NavLink
        to={route}
        className={`${
          linkId === id ? activeClassName : undefined
        } flex justify-start items-center gap-2`}
      >
        <span className={`${linkId === id ? activeClassName : undefined} `}>
          {icon}
        </span>
        <span
          className={`${
            !toggleSidebar &&
            (id === "profile" ||
              id === "admin" ||
              id === "settings" ||
              id === "logout")
              ? ""
              : toggleSidebar && id
              ? ""
              : "hidden"
          }`}
        >
          {text}
        </span>
      </NavLink>
    </span>
  );
};

export default LinkMenu;
