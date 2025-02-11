import { useShallow } from "zustand/react/shallow";
import { useToggleStore } from "@/store/toggle.store";

const Select = ({ actions, id }) => {
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
              action.func === "modal"
                ? openModal(action.type, action.data)
                : action.func === "modalDelete"
                ? openModalDelete(action.type, action.data)
                : avoid;
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
