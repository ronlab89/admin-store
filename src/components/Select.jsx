import { useShallow } from "zustand/react/shallow";
import { useNavigate } from "react-router-dom";

import { useToggleStore } from "@/store/toggle.store";
import { useUserStore } from "@/store/user.store";

const Select = ({ actions, id, toggleState, setToggleState }) => {
  const {
    toggleSelect,
    handleToggleSelect,
    toggleModal,
    handleToggleModal,
    toggleModalDelete,
    handleToggleModalDelete,
    handleModalType,
    handleData,
  } = useToggleStore(
    useShallow((state) => ({
      toggleSelect: state.toggleSelect,
      handleToggleSelect: state.handleToggleSelect,
      toggleModal: state.toggleModal,
      handleToggleModal: state.handleToggleModal,
      toggleModalDelete: state.toggleModalDelete,
      handleToggleModalDelete: state.handleToggleModalDelete,
      handleModalType: state.handleModalType,
      handleData: state.handleData,
    }))
  );
  const handleDataProfile = useUserStore((state) => state.handleDataProfile);
  const navigate = useNavigate();

  const openModal = (type, data) => {
    handleToggleModal(!toggleModal);
    handleModalType(type);
    handleData(data);
    handleToggleSelect(true, data._id);
  };

  const openModalDelete = (type, data) => {
    handleToggleModalDelete(!toggleModalDelete);
    handleModalType(type);
    handleData(data);
    handleToggleSelect(true, data._id);
  };

  return (
    <div
      role="menu"
      id="radix-:r49:"
      className={`${
        toggleSelect.status && toggleSelect.id === id ? "" : "hidden"
      } z-[500] min-w-[4rem] min-h-[4rem] overflow-hidden rounded-md border border-slate-200 dark:border-slate-800 text-center font-poppins bg-slate-200 dark:bg-slate-800 p-1 shadow-md w-[90px]`}
      dataorientation="vertical"
    >
      {actions.map((action, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              if (action.func === "url") {
                navigate("/perfil");
                handleDataProfile(action.data);
                handleToggleSelect(false, null);
                return;
              }
              if (action.func === "modal") {
                openModal(action.type, action.data);
                return;
              }
              if (action.func === "modalDelete") {
                openModalDelete(action.type, action.data);
                return;
              }
              if (action.func === "isEdit") {
                setToggleState({
                  status: !toggleState.status,
                  id: action.data._id,
                  data: action.data,
                });
                handleToggleSelect(false, null);
                return;
              }
              avoid;
            }}
            role="menuitem"
            className="relative cursor-pointer flex select-none items-center rounded-[.5rem] px-2 py-1 text-xs outline-none transition-colors hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-teal-600 dark:hover:text-teal-400 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            dataorientation="vertical"
          >
            {action.name}
          </div>
        );
      })}
    </div>
  );
};

export default Select;
