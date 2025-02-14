import React from "react";
import Heading from "@/components/Heading";
import User from "@/icons/User";
import { useUserStore } from "@/store/user.store";
import Phone from "@/icons/Phone";
import EditUser from "@/icons/EditUser";
import { useToggleStore } from "@/store/toggle.store";
import { useAuthStore } from "@/store/auth.store";
import Email from "@/icons/Email";
import Location from "@/icons/Location";
import Map from "@/icons/Map";
import City from "@/icons/City";
import Calendar from "@/icons/Calendar";

import moment from "moment/moment";
import "moment/locale/es";

const Profile = () => {
  const dataProfile = useUserStore((state) => state.dataProfile);
  const toggleModal = useToggleStore((state) => state.toggleModal);
  const handleToggleModal = useToggleStore((state) => state.handleToggleModal);
  const modalType = useToggleStore((state) => state.modalType);
  const handleModalType = useToggleStore((state) => state.handleModalType);
  const handleData = useToggleStore((state) => state.handleData);
  const user = useAuthStore((state) => state.user);

  return (
    <section className="min-w-screen max-w-screen min-h-screen max-h-screen overflow-hidden px-[40px]">
      <Heading type={"h3"} className={"text-start"}>
        Perfil
      </Heading>
      <section className="w-full h-full flex justify-between items-start pt-10 text-sm">
        <article className="w-[30%] h-full pt-0 flex flex-col border-r-2 pr-10 border-slate-200 dark:border-slate-800">
          <div className="w-full flex justify-start items-end gap-10 mb-5">
            <div className="w-[60px] h-[60px] rounded-[.5rem] bg-teal-600 dark:bg-teal-600 flex justify-center items-center">
              <User width={50} height={50} styles={""} />
            </div>
            <div className="flex flex-col gap-0">
              <span>
                {dataProfile?.name} {dataProfile?.surname}
              </span>
              <span>{dataProfile?.role}</span>
            </div>
            {dataProfile?.type !== "loggued" ? null : (
              <span
                className="cursor-pointer ml-auto text-slate-800 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 hover:transition-colors"
                onClick={() => {
                  handleToggleModal(!toggleModal);
                  handleModalType("edit");
                  handleData({ ...user, type: "profile" });
                }}
              >
                <EditUser width={20} height={20} styles={""} />
              </span>
            )}
          </div>
          <div className="w-full flex flex-col justify-start items-start gap-1 py-4 border-b-2 border-slate-200 dark:border-slate-800">
            <p className="font-semibold text-md mb-4">Contacto</p>
            <p className="flex justify-start items-center mb-1">
              <Phone width={18} height={18} styles={""} />
              <span className="ml-2">{dataProfile?.phone}</span>
            </p>
            <p className="flex justify-start items-center">
              <Email width={18} height={18} styles={""} />
              <span className="ml-2">{dataProfile?.email}</span>
            </p>
          </div>
          <div className="w-full flex flex-col justify-start items-start gap-1 py-4 border-b-2 border-slate-200 dark:border-slate-800">
            <p className="font-semibold text-md mb-4">Dirección</p>
            <p className="flex justify-start items-center mb-1">
              <Location width={18} height={18} styles={""} />
              <span className="ml-2">{dataProfile?.address?.addressline}</span>
            </p>
            <p className="flex justify-start items-center mb-1">
              <City width={18} height={18} styles={""} />
              <span className="ml-2">{dataProfile?.address?.city}</span>
            </p>
            <p className="flex justify-start items-center mb-1">
              <Map width={18} height={18} styles={""} />
              <span className="ml-2">{dataProfile?.address?.province}</span>
            </p>
            <p className="flex justify-start items-center mb-1">
              <Map width={18} height={18} styles={""} />
              <span className="ml-2">{dataProfile?.address?.country}</span>
            </p>
          </div>
          <div className="w-full flex flex-col justify-start items-start gap-1 py-4 border-b-2 border-slate-200 dark:border-slate-800">
            <p className="font-semibold text-md mb-4">Detalles</p>
            <p className="flex justify-start items-center mb-1">
              <Calendar width={18} height={18} styles={""} />
              <span className="ml-2">
                {moment(dataProfile?.events_history?.user_created_at).format(
                  "LLL"
                )}
              </span>
            </p>
          </div>
        </article>
        <article className="w-[70%] h-full pt-20 flex justify-center items-center">
          Metricas
        </article>
      </section>
    </section>
  );
};

export default Profile;
