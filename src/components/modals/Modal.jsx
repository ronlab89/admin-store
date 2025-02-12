import { useShallow } from "zustand/react/shallow";

import { useToggleStore } from "@/store/toggle.store";
import { lazy, Suspense } from "react";

const Form = lazy(() => import("@/components/Form"));
const X = lazy(() => import("@/icons/X"));
const CreateEditEmployee = lazy(() => import("../forms/CreateEditEmployee"));
const CreateEditSupplier = lazy(() => import("../forms/CreateEditSupplier"));
const CreateEditCustomer = lazy(() => import("../forms/CreateEditCustomer"));

const Modal = () => {
  const { toggleSidebar, toggleModal, handleToggleModal, modalType } =
    useToggleStore(
      useShallow((state) => ({
        toggleSidebar: state.toggleSidebar,
        toggleModal: state.toggleModal,
        handleToggleModal: state.handleToggleModal,
        modalType: state.modalType,
      }))
    );

  return (
    <section
      className={`${
        toggleSidebar
          ? "w-[84.5vw] min-h-[100vh] ml-[240px] mt-[60px] "
          : "w-[95.5vw] min-h-[100vh] ml-[72px] mt-[60px]"
      } ${
        toggleModal
          ? "top-[0px] left-[0px]"
          : "translate-y-[1000px] top-[0px] left-[0px]"
      } px-4 fixed z-40 overflow-hidden transition-transform duration-500 ease-in-out ${
        modalType === "detailsDeliver" || modalType === "detailsBatch"
          ? "pt-4 justify-start items-start"
          : "pt-10 justify-center items-start"
      } bg-slate-100 dark:bg-slate-900 rounded-[0rem] flex border-t-2 border-slate-200 dark:border-slate-800`}
    >
      <span
        onClick={() => {
          handleToggleModal(!toggleModal);
        }}
        className="absolute left-4 top-2 cursor-pointer border-0 w-8 h-8 flex justify-center items-center rounded-full bg-slate-200 dark:bg-slate-800 z-[70]"
      >
        <Suspense fallback={""}>
          <X
            width={16}
            height={16}
            styles={"text-teal-600 dark:text-teal-400"}
          />
        </Suspense>
        <span className="sr-only">Close</span>
      </span>
      {modalType === "edit" ? (
        <Suspense fallback={""}>
          <CreateEditEmployee />
        </Suspense>
      ) : modalType === "edit-supplier" || modalType === "create-supplier" ? (
        <Suspense fallback={""}>
          <CreateEditSupplier />
        </Suspense>
      ) : modalType === "edit-customer" || modalType === "create-customer" ? (
        <Suspense fallback={""}>
          <CreateEditCustomer />
        </Suspense>
      ) : modalType === "login" ? (
        <Suspense fallback={""}>
          <Form type={"login"} />
        </Suspense>
      ) : (
        <Suspense fallback={""}>
          <CreateEditEmployee />
        </Suspense>
      )}
    </section>
  );
};

export default Modal;
