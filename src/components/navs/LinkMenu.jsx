import { NavLink } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";

import { useMenuStore } from "@/store/menu.store";
import { useToggleStore } from "@/store/toggle.store";

const LinkMenu = ({ text, icon, id, id2, route }) => {
  const { linkId, handleLinkId, handleSubLinkId } = useMenuStore(
    useShallow((state) => ({
      linkId: state.linkId,
      handleLinkId: state.handleLinkId,
      handleSubLinkId: state.handleSubLinkId,
    }))
  );
  const { handleToggleModal, toggleSidebar } = useToggleStore(
    useShallow((state) => ({
      handleToggleModal: state.handleToggleModal,
      toggleSidebar: state.toggleSidebar,
    }))
  );

  const handleSubMenu = (e, id, id2) => {
    if (id === "profile") return;
    e.preventDefault();
    handleLinkId(id);
    handleSubLinkId(id2);
    handleToggleModal(false);
  };

  let activeClassName =
    "underline decoration-teal-600 font-medium text-teal-600 dark:decoration-teal-400 dark:text-teal-400";

  return (
    <span
      id={id}
      className={`cursor-pointer text-[0.85rem] inline-flex gap-2 mb-0 px-2 pt-2 font-poppins text-slate-900 dark:text-slate-100 font-medium hover:text-teal-600 dark:hover:text-teal-400`}
      onClick={(e) => handleSubMenu(e, id, id2)}
    >
      <span className={`${linkId === id ? activeClassName : undefined} `}>
        {icon}
      </span>
      <NavLink
        to={route}
        className={`${linkId === id ? activeClassName : undefined} ${
          toggleSidebar ? "" : "hidden"
        }`}
      >
        {text}
      </NavLink>
    </span>
  );
};

export default LinkMenu;
