import { lazy, Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "@/store/auth.store";
import { useToggleStore } from "@/store/toggle.store";
import { useMenuStore } from "@/store/menu.store";
import { useUserStore } from "@/store/user.store";
import { useProductStore } from "@/store/product.store";
import { useCustomerStore } from "@/store/customer.store";
import { useSupplierStore } from "@/store/supplier.store";
import { usePaymentMethodStore } from "@/store/paymentMethod.store";
import { useExpenseCategoryStore } from "@/store/expenseCategory.store";
import { useSaleStore } from "@/store/sale.store";
import { useProductCategoryStore } from "@/store/productCategory.store";
import { usePurchaseStore } from "@/store/purchase.store";

import { logout } from "@/utils/authMethods";

const LinkMenu = lazy(() => import("@/components/navs/LinkMenu"));

import User from "@/icons/User";

const UserDropdown = () => {
  const user = useAuthStore((state) => state.user);
  const resetAuth = useAuthStore((state) => state.resetAuth);
  const resetUser = useUserStore((state) => state.resetUser);
  const resetMenu = useMenuStore((state) => state.resetMenu);
  const resetProduct = useProductStore((state) => state.resetProduct);
  const resetProductCategory = useProductCategoryStore(
    (state) => state.resetProductCategory
  );
  const resetPurchase = usePurchaseStore((state) => state.resetPurchase);
  const resetCustomer = useCustomerStore((state) => state.resetCustomer);
  const resetSupplier = useSupplierStore((state) => state.resetSupplier);
  const resetPaymentMethod = usePaymentMethodStore(
    (state) => state.resetPaymentMethod
  );
  const resetSale = useSaleStore((state) => state.resetSale);
  const resetExpenseCategory = useExpenseCategoryStore(
    (state) => state.resetExpenseCategory
  );
  const toggleDrop = useToggleStore((state) => state.toggleDrop);
  const handleToggleDrop = useToggleStore((state) => state.handleToggleDrop);
  const resetToggles = useToggleStore((state) => state.resetToggles);

  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsSubMenuOpen(true);
  };

  const handleMouseLeave = () => {
    setIsSubMenuOpen(false);
  };

  const handleButtonClick = () => {
    setIsSubMenuOpen((prev) => !prev);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsSubMenuOpen(false);
    }
  };

  const navigate = useNavigate();

  return (
    <section
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative inline-block"
    >
      {/* Botón principal */}
      <span
        id="avatarButton"
        onClick={handleButtonClick}
        aria-expanded={isSubMenuOpen}
        aria-haspopup="true"
        aria-controls="submenu"
        className="w-8 h-8 rounded-full cursor-pointer bg-slate-200 dark:bg-slate-800 text-teal-600 dark:text-teal-400 flex justify-center items-center"
      >
        <User width={20} height={20} styles={""} />
      </span>

      {/* Submenú */}
      {isSubMenuOpen && (
        <article
          id="submenu"
          className={`bg-slate-200 dark:bg-slate-800 flex flex-col content-between rounded-b-[20px] shadow dark:shadow-lg w-[240px] absolute top-[30px] right-[0px] z-[1000]`}
          role="menu"
          aria-labelledby="avatarButton"
        >
          <div className="px-4 py-3 text-xs text-slate-900 dark:text-slate-100 border-b-2 border-slate-100 dark:border-slate-900">
            <div>{user.name}</div>
            <div className="truncate">{user.email}</div>
          </div>
          <ul
            className="py-2 text-xs text-Shippingco-text dark:text-Shippingco-textdark"
            aria-labelledby="avatarButton"
          >
            <li>
              <LinkMenu text={"Perfil"} route={"/perfil"} id={"profile"} />
            </li>
            <li>
              <LinkMenu
                text={"Administración"}
                route={"/administracion"}
                id={"admin"}
              />
            </li>
            {/* <li>
              <LinkMenu
                text={"Configuración"}
                route={"/configuracion"}
                id={"settings"}
              />
            </li> */}
          </ul>
          <div
            className="py-1 text-sm"
            onClick={() => {
              logout({
                navigate,
                resetAuth,
                resetCustomer,
                resetExpenseCategory,
                resetMenu,
                resetPaymentMethod,
                resetProduct,
                resetProductCategory,
                resetPurchase,
                resetSale,
                resetSupplier,
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
        </article>
      )}
    </section>
  );
};

export default UserDropdown;
