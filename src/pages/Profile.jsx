import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

import { useUserStore } from "@/store/user.store";
import { useToggleStore } from "@/store/toggle.store";
import { useAuthStore } from "@/store/auth.store";
import { useDashboardStore } from "@/store/dashboard.store";

import { consultDataProfile } from "@/utils/dashboardMethods";

import Heading from "@/components/Heading";
import ChartRadialBar from "@/components/dashboard/ChartRadialBar";
import ChartLine from "@/components/dashboard/ChartLine";

import User from "@/icons/User";
import Phone from "@/icons/Phone";
import EditUser from "@/icons/EditUser";
import Email from "@/icons/Email";
import Location from "@/icons/Location";
import Map from "@/icons/Map";
import City from "@/icons/City";
import Calendar from "@/icons/Calendar";

import moment from "moment/moment";
import "moment/locale/es";
import ChartArea from "../components/dashboard/ChartArea";

const Profile = () => {
  const dataProfile = useUserStore((state) => state.dataProfile);
  const toggleModal = useToggleStore((state) => state.toggleModal);
  const handleToggleModal = useToggleStore((state) => state.handleToggleModal);
  const handleModalType = useToggleStore((state) => state.handleModalType);
  const handleData = useToggleStore((state) => state.handleData);
  const user = useAuthStore((state) => state.user);
  const toggleSidebar = useToggleStore((state) => state.toggleSidebar);
  const token = useAuthStore((state) => state.token);
  const { profileProducts, profilevs } = useDashboardStore(
    useShallow((state) => ({
      profileProducts: state.profileProducts,
      profilevs: state.profilevs,
    }))
  );
  const handleProfileProducts = useDashboardStore(
    (state) => state.handleProfileProducts
  );
  const handleProfilevs = useDashboardStore((state) => state.handleProfilevs);

  const [loading, setLoading] = useState({});
  const [errorAxios, setErrorAxios] = useState(null);

  useEffect(() => {
    consultDataProfile({
      setLoading,
      token,
      employeeId: dataProfile?.id,
      setErrorAxios,
      handleProfileProducts,
      handleProfilevs,
    });
  }, []);

  return (
    <section
      className={`${
        toggleSidebar
          ? "lg:w-[76.5vw] xl:w-[81.2vw] min-[90rem]:w-[83.5vw] 2xl:w-[84.5vw] mt-[0px] px-[20px]"
          : "lg:w-[92.9vw] xl:w-[94.3vw] min-[90rem]:w-[95.15vw] 2xl:w-[95.45vw] px-[20px]"
      } overflow-hidden px-[40px]`}
    >
      <Heading type={"h3"} className={"text-start"}>
        Perfil
      </Heading>
      <section className="w-full h-full flex justify-between items-start pt-10 text-xs xl:text-sm gap-5">
        <article className="w-[30%] h-full pt-0 flex flex-col border-r-2 pr-5 xl:pr-10 border-slate-200 dark:border-slate-800">
          <div className="relative w-full flex justify-start items-end gap-2 2xl:gap-10 mb-5">
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
                className="cursor-pointer absolute top-0 right-0 text-slate-800 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 hover:transition-colors"
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
        <article className="w-[70%] min-h-[50vh] h-screen max-h-full overflow-x-hidden overflow-y-auto flex flex-col justify-center items-center gap-5 pb-[200px]">
          <div className="w-full lg:h-[250px] xl:h-[350px] bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-[.5rem] shadow">
            <ChartRadialBar />
          </div>
          <div className="w-full lg:h-[250px] xl:h-[350px] bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-[.5rem] shadow">
            <ChartArea />
          </div>
        </article>
      </section>
    </section>
  );
};

export default Profile;
