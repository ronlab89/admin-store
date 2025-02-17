import { lazy, Suspense } from "react";

import { useToggleStore } from "@/store/toggle.store";

const Form = lazy(() => import("@/components/forms/Form"));
const CreateEditEmployee = lazy(() =>
  import("@/components/forms/CreateEditEmployee")
);
const CreateEditSupplier = lazy(() =>
  import("@/components/forms/CreateEditSupplier")
);
const CreateEditCustomer = lazy(() =>
  import("@/components/forms/CreateEditCustomer")
);
const CreateEditProduct = lazy(() =>
  import("@/components/forms/CreateEditProduct")
);
const Ticket = lazy(() => import("@/components/purchases/Ticket"));
const Details = lazy(() => import("@/components/inventory/Details"));

const X = lazy(() => import("@/icons/X"));

const Modal = () => {
  const toggleSidebar = useToggleStore((state) => state.toggleSidebar);
  const toggleModal = useToggleStore((state) => state.toggleModal);
  const handleToggleModal = useToggleStore((state) => state.handleToggleModal);
  const modalType = useToggleStore((state) => state.modalType);
  const handleModalType = useToggleStore((state) => state.handleModalType);
  const handleData = useToggleStore((state) => state.handleData);

  return (
    <section
      className={`${
        toggleSidebar
          ? "lg:ml-[240px] lg:w-[76.5vw] xl:w-[81.2vw] min-[90rem]:w-[83.5vw] 2xl:w-[84.5vw] mt-[60px] "
          : "lg:ml-[72px] lg:w-[92.9vw] xl:w-[94.3vw] min-[90rem]:w-[95.15vw] 2xl:w-[95.45vw] min-h-[100vh] mt-[60px]"
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
          handleModalType("");
          handleData(null);
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
      ) : modalType === "edit-product" || modalType === "create-product" ? (
        <Suspense fallback={""}>
          <CreateEditProduct />
        </Suspense>
      ) : modalType === "edit-supplier" || modalType === "create-supplier" ? (
        <Suspense fallback={""}>
          <CreateEditSupplier />
        </Suspense>
      ) : modalType === "edit-customer" || modalType === "create-customer" ? (
        <Suspense fallback={""}>
          <CreateEditCustomer />
        </Suspense>
      ) : modalType === "edit-purchase" ? (
        <Suspense fallback={""}>
          <Ticket />
        </Suspense>
      ) : modalType === "inventory-details" ? (
        <Suspense fallback={""}>
          <Details />
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
