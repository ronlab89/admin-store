import { useState, useEffect } from "react";
import { useShallow } from "zustand/shallow";

import { useAuthStore } from "@/store/auth.store";
import { useToggleStore } from "@/store/toggle.store";
import { useSupplierStore } from "@/store/supplier.store";
import { usePurchaseStore } from "@/store/purchase.store";
import { usePaymentMethodStore } from "@/store/paymentMethod.store";
import { useProductStore } from "@/store/product.store";

import { formatterco } from "@/utils/formatter";
import { createPurchase } from "@/utils/PurchaseMethod";

import Loader from "@/components/Loader";
import Button from "@/components/Button";

import Minus from "@/icons/Minus";
import Create from "@/icons/Create";

const Ticket = () => {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const supplierList = useSupplierStore((state) => state.supplierList);
  const handleSupplierList = useSupplierStore(
    (state) => state.handleSupplierList
  );
  const toggleModal = useToggleStore((state) => state.toggleModal);
  const handleToggleModal = useToggleStore((state) => state.handleToggleModal);
  const handleModalType = useToggleStore((state) => state.handleModalType);
  const preticket = usePurchaseStore((state) => state.preticket);
  const handlePreticket = usePurchaseStore((state) => state.handlePreticket);
  const paymentMethodList = usePaymentMethodStore(
    (state) => state.paymentMethodList
  );
  const resetPreticket = usePurchaseStore((state) => state.resetPreticket);
  const productList = useProductStore((state) => state.productList);
  const purchaseList = usePurchaseStore((state) => state.purchaseList);
  const handlePurchaseList = usePurchaseStore(
    (state) => state.handlePurchaseList
  );
  const toggleSidebar = useToggleStore((state) => state.toggleSidebar);
  const { modalType, data } = useToggleStore(
    useShallow((state) => ({
      modalType: state.modalType,
      data: state.data,
    }))
  );

  const [loading, setLoading] = useState({});
  const [errorAxios, setErrorAxios] = useState(null);

  const handleQuantityChange = (e, index) => {
    const newQuantity = parseInt(e.target.value, 10); // Convertir a número entero

    const productsUpdated = preticket.products.map((product, idx) => {
      if (idx === index) {
        return {
          ...product,
          quantity: newQuantity, // Actualizar cantidad
          total: product.price * (newQuantity || 1), // Calcular total
        };
      }
      return product;
    });

    handlePreticket({
      ...preticket,
      products: productsUpdated,
    });
  };

  const handleCreateTicket = () => {
    console.log("Preticket: ", preticket);
    createPurchase({
      data: {
        supplierId: preticket.supplier.id,
        products: preticket.products.map((p) => ({
          productId: p._id,
          quantity: p.quantity,
          price: p.price,
        })),
        total_amount: preticket.total,
        payment_method: preticket.paymentMethod._id,
      },
      token,
      user: user.id,
      setLoading,
      setErrorAxios,
      resetPreticket,
      purchaseList,
      handlePurchaseList,
    });
  };

  useEffect(() => {
    if (preticket.products.length > 0) {
      const total = preticket.products.reduce((acc, product) => {
        return acc + product.quantity * product.price;
      }, 0);
      handlePreticket({
        ...preticket,
        total,
      });
    }
  }, [preticket.products]);

  useEffect(() => {
    if (supplierList === null) {
      getSupplierList({
        setLoading,
        token,
        setErrorAxios,
        handleSupplierList,
      });
    }
  }, []);

  const preticketPurchase = modalType === "edit-purchase" ? data : preticket;

  return (
    <section
      className={`${
        toggleSidebar
          ? "lg:w-[74vw] xl:w-[79.2vw] min-[90rem]:w-[81.5vw] 2xl:w-[82.5vw] mt-[0px] px-[10px]"
          : "lg:w-[90.5vw] xl:w-[92.3vw] min-[90rem]:w-[93.15vw] 2xl:w-[93.45vw] px-[10px]"
      } overflow-hidden flex flex-col justify-center items-center`}
    >
      <section className="w-full h-full ">
        <article className="w-full h-full grid grid-cols-3 gap-10">
          <div className="w-full h-[25vh] col-span-2">
            <div className="w-full flex justify-between items-center mb-1">
              <span className="font-semibold">Proveedor:</span>
              <span
                className="cursor-pointer font-medium text-sm flex justify-center items-center gap-0 text-teal-600 dark:text-teal-400"
                onClick={() => {
                  handleModalType("create-supplier");
                  handleToggleModal(!toggleModal);
                }}
              >
                Nuevo proveedor
                <Create
                  width={20}
                  height={20}
                  styles={"ml-2 text-teal-600 dark:text-teal-400"}
                />
              </span>
            </div>
            <div className="w-full mb-3">
              <select
                className={` lowercase flex h-9 w-full rounded-[.5rem] border border-slate-100 dark:border-slate-900 ${"bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"} border-input px-3 py-1 text-xs shadow-sm transition-colors font-medium placeholder:text-slate-400 dark:placeholder:text-slate-600 placeholder:font-normal focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-600 dark:focus-visible:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50`}
                id={"supplier"}
                value={preticketPurchase?.supplier?._id || ""}
                onChange={(e) => {
                  console.log({ value: e.target.value });
                  const selectedSupplierId = e.target.value;
                  const selectedSupplier = supplierList.find(
                    (supplier) => supplier._id === selectedSupplierId
                  );

                  if (selectedSupplier) {
                    handlePreticket({
                      ...preticketPurchase,
                      supplier: {
                        name: selectedSupplier.name,
                        surname: selectedSupplier.surname,
                        email: selectedSupplier.email,
                        phone: selectedSupplier.phone,
                        addressline: selectedSupplier.address.addressline,
                        city: selectedSupplier.address.city,
                        province: selectedSupplier.address.province,
                        country: selectedSupplier.address.country,
                        id: selectedSupplier._id,
                      },
                    });
                  }
                }}
                name={"supplier"}
              >
                <option value="" disabled>
                  Seleccione el proveedor
                </option>
                {supplierList.map((opt, index) => (
                  <option key={opt._id} value={opt._id}>
                    {opt.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-1 text-sm">
              <span>
                <span className="font-semibold">Nombre: </span>
                {preticketPurchase?.supplier?.name
                  ? preticketPurchase?.supplier?.name
                  : "--"}
              </span>
              <span>
                <span className="font-semibold">Apellido: </span>
                {preticketPurchase?.supplier?.surname
                  ? preticketPurchase?.supplier?.surname
                  : "--"}
              </span>
              <span>
                <span className="font-semibold">Correo electrónico: </span>
                {preticketPurchase?.supplier?.email
                  ? preticketPurchase?.supplier?.email
                  : "--"}
              </span>
              <span>
                <span className="font-semibold">Teléfono: </span>
                {preticketPurchase?.supplier?.phone
                  ? preticketPurchase?.supplier?.phone
                  : "--"}
              </span>
              <span>
                <span className="font-semibold">Dirección: </span>
                {preticketPurchase?.supplier?.addressline
                  ? preticketPurchase?.supplier?.addressline
                  : "--"}
              </span>
              <span>
                <span className="font-semibold">Ciudad: </span>
                {preticketPurchase?.supplier?.city
                  ? preticketPurchase?.supplier?.city
                  : "--"}
              </span>
              <span>
                <span className="font-semibold">Provincia: </span>
                {preticketPurchase?.supplier?.province
                  ? preticketPurchase?.supplier?.province
                  : "--"}
              </span>
              <span>
                <span className="font-semibold">País: </span>
                {preticketPurchase?.supplier?.country
                  ? preticketPurchase?.supplier?.country
                  : "--"}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-0">
            <span className="mb-1">
              <span className="font-semibold">Metodo de pago: </span>
              {preticketPurchase?.paymentMethod
                ? preticketPurchase?.paymentMethod.name
                : "--"}
            </span>
            <div className="w-full mb-10">
              <select
                className={` lowercase flex h-9 w-full rounded-[.5rem] border border-slate-100 dark:border-slate-900 ${"bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"} border-input px-3 py-1 text-xs shadow-sm transition-colors font-medium placeholder:text-slate-400 dark:placeholder:text-slate-600 placeholder:font-normal focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-600 dark:focus-visible:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50`}
                id={"payment-method"}
                value={preticketPurchase?.paymentMethod?._id || ""}
                onChange={(e) => {
                  console.log({ value: e.target.value });
                  const selectedPaymentMethodId = e.target.value;
                  const selectedPayment = paymentMethodList.find(
                    (p) => p._id === selectedPaymentMethodId
                  );

                  if (selectedPayment) {
                    handlePreticket({
                      ...preticketPurchase,
                      paymentMethod: selectedPayment,
                    });
                  }
                }}
                name={"payment-method"}
              >
                <option value="" disabled>
                  Seleccione el metodo de pago
                </option>
                {paymentMethodList.map((opt, index) => (
                  <option key={opt._id} value={opt._id}>
                    {opt.name}
                  </option>
                ))}
              </select>
            </div>
            <span className="font-semibold">Total venta: </span>
            <span className="font-semibold text-teal-600 dark:text-teal-400">
              {preticketPurchase.total
                ? formatterco.format(preticketPurchase.total)
                : formatterco.format(0)}
            </span>
          </div>
        </article>
      </section>
      <section className="w-full min-[40vh] h-[50vh] rounded-[.5rem] px-4 max-h-full overflow-hidden bg-slate-100 dark:bg-slate-900">
        <article className="w-full flex justify-between items-center pt-5">
          <span className="font-semibold">Productos</span>
          <div className="flex justify-end items-center gap-4 p-0 border-t-0 border-slate-200 rounded-b-[.5rem] dark:border-slate-800">
            <Button
              text={"Limpiar"}
              onClick={() => resetPreticket()}
              icon={""}
              type={"button"}
              styles={"cursor-pointer mt-0"}
              mode={"default"}
              variant={"cancel"}
            />
            <Button
              text={"Guardar"}
              onClick={() => handleCreateTicket()}
              icon={""}
              type={"button"}
              styles={"cursor-pointer mt-0"}
              mode={"default"}
              variant={"primary"}
            />
          </div>
        </article>
        <article className="w-full h-full  overflow-x-hidden overflow-y-scroll pb-[100px] mt-5 text-xs">
          {!preticketPurchase
            ? null
            : preticketPurchase?.products.map((product, index) => (
                <div
                  key={product.id}
                  className="w-full h-fit mb-2 grid grid-cols-6 place-items-center gap-2 bg-slate-200 dark:bg-slate-800 px-4 py-1 rounded-[.5rem]"
                >
                  <span>
                    <select
                      className={` lowercase flex h-6 w-full rounded-[.5rem] border border-slate-100 dark:border-slate-900 ${"bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"} border-input px-3 py-1 text-xs shadow-sm transition-colors font-medium placeholder:text-slate-400 dark:placeholder:text-slate-600 placeholder:font-normal focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-600 dark:focus-visible:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50`}
                      id={"product"}
                      value={product._id || ""}
                      onChange={(e) => {
                        const selectedProductId = e.target.value;
                        const selectedProduct = productList.find(
                          (product) => product._id === selectedProductId
                        );

                        if (selectedProduct) {
                          const productsUpdated =
                            preticketPurchase.products.map((product) => {
                              if (product.id === index + 1) {
                                return {
                                  ...product,
                                  name: selectedProduct.name,
                                  category: selectedProduct.category.name,
                                  price: selectedProduct.price,
                                  quantity: 1,
                                  total: selectedProduct.price * 1,
                                  _id: selectedProduct._id,
                                };
                              }
                              return product;
                            });

                          handlePreticket({
                            ...preticketPurchase,
                            products: productsUpdated,
                          });
                        }
                      }}
                      name={"product"}
                    >
                      <option value="" disabled>
                        Seleccione el producto
                      </option>
                      {productList.map((opt, index) => (
                        <option key={opt._id} value={opt._id}>
                          {opt.name}
                        </option>
                      ))}
                    </select>
                  </span>
                  <span>{product.category}</span>
                  <span>{formatterco.format(product.price)}</span>
                  <span>
                    {" "}
                    <input
                      type="number"
                      min="1"
                      value={product.quantity || 1} // Valor predeterminado si no hay cantidad
                      onChange={(e) => handleQuantityChange(e, index)}
                      className={`lowercase flex h-6 w-[50%] rounded-[.5rem] border border-slate-100 dark:border-slate-900 ${"bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"} border-input px-3 py-1 text-xs shadow-sm transition-colors font-medium placeholder:text-slate-400 dark:placeholder:text-slate-600 placeholder:font-normal focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-600 dark:focus-visible:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50`}
                    />
                  </span>
                  <span>{formatterco.format(product.total)}</span>
                  <div className="flex justify-end items-end gap-2 ml-auto">
                    <span
                      className={`${index === 0 ? "hidden" : ""} ml-auto`}
                      onClick={() => {
                        const filterProducts = preticketPurchase.products
                          .filter((p) => p.id !== index + 1)
                          .map((x, index) => ({ ...x, id: index + 1 }));
                        console.log("Filter: ", filterProducts);
                        handlePreticket({
                          ...preticketPurchase,
                          products: filterProducts,
                        });
                      }}
                    >
                      <Minus
                        width={22}
                        height={25}
                        styles={
                          "text-slate-800 dark:text-slate-400 cursor-pointer hover:text-slate-600 hover:transition-colors dark:hover:text-slate-100"
                        }
                      />
                    </span>
                    <span
                      className="ml-auto"
                      onClick={() =>
                        handlePreticket({
                          ...preticketPurchase,
                          products: [
                            ...preticketPurchase.products,
                            {
                              id: preticketPurchase.products.length + 1,
                              name: "",
                              category: "",
                              price: 0,
                              quantity: 1,
                              total: 0,
                            },
                          ],
                        })
                      }
                    >
                      <Create
                        width={25}
                        height={25}
                        styles={
                          "text-slate-800 dark:text-slate-100 cursor-pointer hover:text-teal-600 hover:transition-colors dark:hover:text-teal-400"
                        }
                      />
                    </span>
                  </div>
                </div>
              ))}
        </article>
      </section>
      {loading.createSale ? <Loader type={""} /> : null}
    </section>
  );
};

export default Ticket;
