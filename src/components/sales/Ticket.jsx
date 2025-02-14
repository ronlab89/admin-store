import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { formValidate } from "@/utils/formValidate";
import InputSelect from "@/components/InputSelect";
import { getCustomerList } from "../../utils/customerMethods";
import { useAuthStore } from "@/store/auth.store";
import { useCustomerStore } from "@/store/customer.store";
import { useSaleStore } from "@/store/sale.store";
import Button from "@/components/Button";
import Create from "@/icons/Create";
import { useToggleStore } from "@/store/toggle.store";
import { usePaymentMethodStore } from "@/store/paymentMethod.store";
import { formatterco } from "@/utils/formatter";

const Ticket = () => {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const customerList = useCustomerStore((state) => state.customerList);
  const handleCustomerList = useCustomerStore(
    (state) => state.handleCustomerList
  );
  const toggleModal = useToggleStore((state) => state.toggleModal);
  const handleToggleModal = useToggleStore((state) => state.handleToggleModal);
  const handleModalType = useToggleStore((state) => state.handleModalType);
  const preticket = useSaleStore((state) => state.preticket);
  const handlePreticket = useSaleStore((state) => state.handlePreticket);
  const paymentMethodList = usePaymentMethodStore(
    (state) => state.paymentMethodList
  );
  const resetPreticket = useSaleStore((state) => state.resetPreticket);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      customer: "",
    },
  });

  const { required, validateTrim, minLength, patternEmail } = formValidate();
  const [loading, setLoading] = useState({});
  const [errorAxios, setErrorAxios] = useState(null);

  useEffect(() => {
    if (customerList === null) {
      getCustomerList({
        setLoading,
        token,
        setErrorAxios,
        handleCustomerList,
      });
    }
  }, []);

  return (
    <section className="w-full h-full flex flex-col justify-center items-center px-[100px]">
      <section className="w-full h-full ">
        <article className="w-full h-full grid grid-cols-3 gap-10">
          <div className="w-full h-[25vh] col-span-2">
            <div className="w-full flex justify-between items-center">
              <span className="font-semibold">Cliente:</span>
              <span
                className="cursor-pointer font-medium text-sm flex justify-center items-center gap-0 text-teal-600 dark:text-teal-400"
                onClick={() => {
                  handleModalType("create-customer");
                  handleToggleModal(!toggleModal);
                }}
              >
                Nuevo cliente
                <Create
                  width={20}
                  height={20}
                  styles={"ml-2 text-teal-600 dark:text-teal-400"}
                />
              </span>
            </div>
            <div className="w-full mb-3">
              <select
                className={` lowercase flex h-9 w-full rounded-md border border-slate-100 dark:border-slate-900 ${"bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"} border-input px-3 py-1 text-xs shadow-sm transition-colors font-medium placeholder:text-slate-400 dark:placeholder:text-slate-600 placeholder:font-normal focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-600 dark:focus-visible:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50`}
                id={"customer"}
                onChange={(e) => {
                  console.log({ value: e.target.value });
                  const selectedCustomerId = e.target.value;
                  const selectedCustomer = customerList.find(
                    (customer) => customer._id === selectedCustomerId
                  );

                  if (selectedCustomer) {
                    handlePreticket({
                      ...preticket,
                      customer: {
                        name: selectedCustomer.name,
                        surname: selectedCustomer.surname,
                        email: selectedCustomer.email,
                        phone: selectedCustomer.phone,
                        addressline: selectedCustomer.address.addressline,
                        city: selectedCustomer.address.city,
                        province: selectedCustomer.address.province,
                        country: selectedCustomer.address.country,
                      },
                    });
                  }
                }}
                name={"customer"}
              >
                <option value="" disabled>
                  Seleccione el cliente
                </option>
                {customerList.map((opt, index) => (
                  <option key={index} value={opt._id}>
                    {opt.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-1 text-sm">
              <span>
                <span className="font-semibold">Nombre: </span>
                {preticket.customer.name ? preticket.customer.name : "--"}
              </span>
              <span>
                <span className="font-semibold">Apellido: </span>
                {preticket.customer.surname ? preticket.customer.surname : "--"}
              </span>
              <span>
                <span className="font-semibold">Correo electrónico: </span>
                {preticket.customer.email ? preticket.customer.email : "--"}
              </span>
              <span>
                <span className="font-semibold">Teléfono: </span>
                {preticket.customer.phone ? preticket.customer.phone : "--"}
              </span>
              <span>
                <span className="font-semibold">Dirección: </span>
                {preticket.customer.addressline
                  ? preticket.customer.addressline
                  : "--"}
              </span>
              <span>
                <span className="font-semibold">Ciudad: </span>
                {preticket.customer.city ? preticket.customer.city : "--"}
              </span>
              <span>
                <span className="font-semibold">Provincia: </span>
                {preticket.customer.province
                  ? preticket.customer.province
                  : "--"}
              </span>
              <span>
                <span className="font-semibold">País: </span>
                {preticket.customer.country ? preticket.customer.country : "--"}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-0">
            <span>
              <span className="font-semibold">Metodo de pago: </span>
              {preticket.paymentMethod ? preticket.paymentMethod : "--"}
            </span>
            <div className="w-full mb-10">
              <select
                className={` lowercase flex h-9 w-full rounded-md border border-slate-100 dark:border-slate-900 ${"bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"} border-input px-3 py-1 text-xs shadow-sm transition-colors font-medium placeholder:text-slate-400 dark:placeholder:text-slate-600 placeholder:font-normal focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-600 dark:focus-visible:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50`}
                id={"payment-method"}
                onChange={(e) => {
                  console.log({ value: e.target.value });
                  const selectedPaymentMethodId = e.target.value;
                  const selectedPayment = paymentMethodList.find(
                    (p) => p._id === selectedPaymentMethodId
                  );

                  if (selectedPayment) {
                    handlePreticket({
                      ...preticket,
                      paymentMethod: selectedPayment.name,
                    });
                  }
                }}
                name={"payment-method"}
              >
                <option value="" disabled>
                  Seleccione el metodo de pago
                </option>
                {paymentMethodList.map((opt, index) => (
                  <option key={index} value={opt._id}>
                    {opt.name}
                  </option>
                ))}
              </select>
            </div>
            <span className="font-semibold">Total venta: </span>
            <span className="font-semibold text-teal-600 dark:text-teal-400">
              {preticket.total
                ? formatterco.format(preticket.total)
                : formatterco.format(0)}
            </span>
          </div>
        </article>
      </section>
      <section className="w-full min-[40vh] h-[50vh] rounded-[.5rem] px-4 max-h-full bg-slate-200 dark:bg-slate-800">
        <article className="w-full flex justify-between items-center">
          <span className="font-semibold">Productos</span>
          <div className="flex justify-end items-end gap-4 p-0 border-t-0 border-slate-200 rounded-b-[.5rem] dark:border-slate-800">
            <Button
              text={"Limpiar"}
              onClick={() => resetPreticket()}
              icon={""}
              type={"button"}
              styles={"cursor-pointer mt-5"}
              mode={"default"}
              variant={"cancel"}
            />
            <Button
              text={"Guardar"}
              onClick={() => console.log("Guardar")}
              icon={""}
              type={"button"}
              styles={"cursor-pointer mt-5"}
              mode={"default"}
              variant={"primary"}
            />
          </div>
        </article>
        <article className="w-full h-full overflow-x-hidden overflow-y-auto mt-5">
          <div className="w-full h-fit grid grid-cols-6 place-items-center gap-2 bg-slate-100 dark:bg-slate-900 px-4 py-1 rounded-[.5rem]">
            <span>Select</span>
            <span>Categoria</span>
            <span>Precio</span>
            <span>Cantidad</span>
            <span>Total</span>
            <span className="ml-auto">
              <Create
                width={25}
                height={25}
                styles={
                  "text-slate-800 dark:text-slate-100 cursor-pointer hover:text-teal-600 hover:transition-colors dark:hover:text-teal-400"
                }
              />
            </span>
          </div>
        </article>
      </section>
    </section>
  );
};

export default Ticket;
