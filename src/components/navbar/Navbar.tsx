"use client";

import React, { useEffect } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CiMail } from "react-icons/ci";
import { RxExit } from "react-icons/rx";
import { IoNotificationsOutline } from "react-icons/io5";
import InputField from "../InputField";
import { IoIosSearch } from "react-icons/io";
import { fetchDoctor, logout } from "@/store/slices/auth.slice";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import Text from "../Text";
import { IMAGES } from "@/constants/imgs";
import QuickIcon from "./QuickIcon";
import { TODAYS_DATE } from "@/constants/menu";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const doctor = useAppSelector(store => store.auth.doctor);
  const router = useRouter();
  console.log("Doctor(Nabar.tsx) =>", doctor);

  useEffect(() => {
    if (!doctor){
      dispatch(fetchDoctor());
    }
  }, [dispatch, doctor]);

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      toast.success("Successfully logged out!");
      dispatch(logout());
      router.push("/login");
    } catch (error) {
      console.error("Failed to sign out", error);
      toast.error("Successfully logged out!");
    }
  };

  return (
    <nav className="bg-white py-4 px-4 sm:px-6 flex justify-between items-center border-b border-gray-200 sticky top-0 left-0 w-full z-40">
      <div className="flex gap-2 items-center text-xl text-gray-500 font-bold sm:w-[30%] md:w-[20%]">
        <Image src={IMAGES.logo} width={40} height={40} alt="logo" />
        <span className="hidden sm:flex items-center">
          <Text text="Medicare" type="h2" className="sm:text-2xl lg:text-3xl" />
        </span>
      </div>

      {/* Search Bar (Optional) */}
      <div className="flex justify-end lg:justify-between xl:justify-end items-center space-x-4 sm:w-[70%] md:w-[80%]">
        <div className="hidden lg:flex max-w-[350px] xl:max-w-[80vh] w-[80%]">
          <InputField
            label={<IoIosSearch />}
            fieldType="search"
            inputType="secondary"
            placeholder="Search"
            value=""
            setValue={() => {}}
          />
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-end border-r-2 pr-[5px] border-r-light_gray">
            <p className="text-[13px] text-md_gray">{doctor?.name}</p>
            <p className="text-[14px] font-semibold">{doctor?.organization}</p>
          </div>

          <span className="hidden sm:inline-block border-2 rounded-md border-light_gray text-md_gray p-1 lg:px-3 lg:py-1 text-[11px] sm:text-[14px] sm:text-base ">
            {TODAYS_DATE}
          </span>

          <div className="flex  items-center text-gray-500 space-x-4 sm:space-x-6">
            <span className="hidden sm:flex items-center space-x-2">
              <QuickIcon
                icon={<CiMail />}
                cursor="not-allowed"
                handleClick={() => console.log("Mail clicked...")}
              />
            </span>
            <QuickIcon
              icon={<IoNotificationsOutline />}
              handleClick={() => console.log("Notification clicked...")}
            />
            <QuickIcon icon={<RxExit />} handleClick={handleLogout} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
