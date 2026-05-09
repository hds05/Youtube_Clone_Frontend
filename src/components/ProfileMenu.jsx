import React from "react";
// import routing tool Link for page navigation without page reload
import { Link } from "react-router-dom";
// import icons
import { FaGoogle } from "react-icons/fa";
import { MdOutlineSwitchAccount } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import { SiYoutubestudio } from "react-icons/si";
import { CiDollar } from "react-icons/ci";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdNightlightRound } from "react-icons/md";
import { IoLanguage } from "react-icons/io5";
import { RiUserSettingsLine } from "react-icons/ri";
import { TbCurrentLocationFilled } from "react-icons/tb";
import { FaKeyboard } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineHelpOutline } from "react-icons/md";
import { VscFeedback } from "react-icons/vsc";

export default function ProfileMenu({ open, setOpen, user, logout }) {
  // If menu is not open then render nothing
  if (!open) return null;

  return (
    <>
      {/* Clicking outside menu closes it */}
      <div className="fixed inset-0 z-50" onClick={() => setOpen(false)} />
      {/* Main dropdown menu */}
      <div
        className="absolute right-4 top-16 z-50 w-72 overflow-hidden rounded-2xl  bg-black p-1 text-white shadow-xl"
        // Prevent menu from closing when clicking inside it
        onClick={(e) => e.stopPropagation()}
      >
        {/* User info section */}
        <div className="flex items-start gap-3 p-4">
          {/* Avtar */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 font-bold text-white">
            {user.name?.charAt(0).toUpperCase()}
          </div>

          <div className="text-white">
            {/* Name */}
            <h3 className="text-lg font-semibold">{user.name}</h3>
            {/* Email */}
            <p className="text-md">{user.email}</p>
            {/* Channel page */}
            <Link
              to={"/channel"}
              className="w-full cursor-pointer text-left text-blue-500"
            >
              View your Channel
            </Link>
          </div>
        </div>
        <div className="my-2 mx-2 border-t"></div>

        {/* Scrollable menu items */}
        <div className="py-2 custom-scrollbar overflow-auto max-h-80">
          {/* Static Google account option */}
          <div className="w-full flex items-center gap-2 cursor-pointer rounded-xl px-4 py-2 text-left hover:bg-gray-900">
            <FaGoogle /> Google Account
          </div>
          {/* Static Switch account option */}
          <div className="w-full flex items-center gap-2 cursor-pointer cursor-pointer rounded-xl px-4 py-2 text-left hover:bg-gray-900">
            <MdOutlineSwitchAccount /> Switch Account
          </div>
          {/* Functional Sign Out button */}
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 cursor-pointer rounded-xl px-4 py-2 text-left hover:bg-gray-900 hover:text-red-700"
          >
            <FaSignOutAlt /> Sign Out
          </button>

          <div className="my-2 mx-2 border-t"></div>
          {/* Static Youtube studio option */}
          <div className="w-full flex items-center gap-2 cursor-pointer rounded-xl px-4 py-2 text-left hover:bg-gray-900">
            <SiYoutubestudio /> YouTube Studio
          </div>
          {/* Static Purchase option */}
          <div className="w-full flex items-center gap-2 cursor-pointer rounded-xl px-4 py-2 text-left hover:bg-gray-900">
            <CiDollar /> Purchase & memberships
          </div>

          <div className="my-2 mx-2 border-t"></div>
          {/* Static User data option */}
          <div className="w-full flex items-center gap-2 cursor-pointer rounded-xl px-4 py-2 text-left hover:bg-gray-900">
            <FaRegCircleUser /> Your data in YouTubee
          </div>
          {/* Static Appereance option */}
          <div className="w-full flex items-center gap-2 cursor-pointer rounded-xl px-4 py-2 text-left hover:bg-gray-900">
            <MdNightlightRound /> Appereance: Device Theme
          </div>
          {/* Static language option */}
          <div className="w-full flex items-center gap-2 cursor-pointer rounded-xl px-4 py-2 text-left hover:bg-gray-900">
            <IoLanguage /> Display language: English
          </div>
          {/* Static Restricted mode option */}
          <div className="w-full flex items-center gap-2 cursor-pointer rounded-xl px-4 py-2 text-left hover:bg-gray-900">
            <RiUserSettingsLine /> Restricted Mode: Off
          </div>
          {/* Static location option */}
          <div className="w-full flex items-center gap-2 cursor-pointer rounded-xl px-4 py-2 text-left hover:bg-gray-900">
            <TbCurrentLocationFilled /> Location: India
          </div>
          {/* Static keyboard shortcuts option */}
          <div className="w-full flex items-center gap-2 cursor-pointer rounded-xl px-4 py-2 text-left hover:bg-gray-900">
            <FaKeyboard /> Keyboard shortcuts
          </div>
          {/* Static Setting option */}
          <div className="my-2 mx-2 border-t"></div>
          <div className="w-full flex items-center gap-2 cursor-pointer rounded-xl px-4 py-2 text-left hover:bg-gray-900">
            <IoSettingsOutline /> Settings
          </div>

          <div className="my-2 mx-2 border-t"></div>
          {/* Static help option */}
          <div className="w-full flex items-center gap-2 cursor-pointer rounded-xl px-4 py-2 text-left hover:bg-gray-900">
            <MdOutlineHelpOutline /> Help
          </div>
          {/* Static feedback option */}
          <div className="w-full flex items-center gap-2 cursor-pointer rounded-xl px-4 py-2 text-left hover:bg-gray-900">
            <VscFeedback /> Send Feedback
          </div>
        </div>
      </div>
    </>
  );
}
