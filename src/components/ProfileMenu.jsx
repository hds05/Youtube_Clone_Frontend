import React from "react";
import { Link } from "react-router-dom";

export default function ProfileMenu({
    open,
    setOpen,
    user,
    logout,
}) {
    if (!open) return null;

    return (
        <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <div className="absolute right-4 top-16 z-50 w-72 overflow-hidden rounded-2xl  bg-black p-1 text-white shadow-xl" onClick={(e) => e.stopPropagation()} >
                <div className="flex items-start gap-3 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 font-bold text-white">
                        {user.name?.charAt(0).toUpperCase()}
                    </div>

                    <div className="text-white">
                        <h3 className="text-lg font-semibold">
                            {user.name}
                        </h3>
                        <p className="text-md">
                            {user.email}
                        </p>
                        <Link to={'/channel'} className="w-full cursor-pointer text-left text-blue-500">
                            View your Channel
                        </Link>
                    </div>
                </div>
                <div className="my-2 mx-2 border-t"></div>

                <div className="py-2 custom-scrollbar overflow-auto max-h-80">
                    <div className="w-full cursor-pointer rounded-xl px-4 py-2 text-left hover:bg-gray-900">
                        Google Account
                    </div>
                    <div className="w-full cursor-pointer rounded-xl px-4 py-2 text-left hover:bg-gray-900">
                        Switch Account
                    </div>
                    <button
                        onClick={logout}
                        className="w-full cursor-pointer rounded-xl px-4 py-2 text-left hover:bg-gray-900 hover:text-red-700"
                    >
                        Sign Out
                    </button>

                    <div className="my-2 mx-2 border-t"></div>
                    
                    <div className="w-full cursor-pointer rounded-xl px-4 py-2 text-left hover:bg-gray-900">
                        YouTube Studio
                    </div>
                    <div className="w-full cursor-pointer rounded-xl px-4 py-2 text-left hover:bg-gray-900">
                        Purchase & memberships
                    </div>

                    <div className="my-2 mx-2 border-t"></div>
                    
                    <div className="w-full cursor-pointer rounded-xl px-4 py-2 text-left hover:bg-gray-900">
                        Your data in YouTubee
                    </div>
                    <div className="w-full cursor-pointer rounded-xl px-4 py-2 text-left hover:bg-gray-900">
                        Appereance: Device Theme
                    </div>
                    <div className="w-full cursor-pointer rounded-xl px-4 py-2 text-left hover:bg-gray-900">
                        Display language: English
                    </div>
                    <div className="w-full cursor-pointer rounded-xl px-4 py-2 text-left hover:bg-gray-900">
                        Restricted Mode: Off
                    </div>
                    <div className="w-full cursor-pointer rounded-xl px-4 py-2 text-left hover:bg-gray-900">
                        Location: India
                    </div>
                    <div className="w-full cursor-pointer rounded-xl px-4 py-2 text-left hover:bg-gray-900">
                        Keyboard shortcuts
                    </div>
                    <div className="my-2 mx-2 border-t"></div>
                    <div className="w-full cursor-pointer rounded-xl px-4 py-2 text-left hover:bg-gray-900">
                        Settings
                    </div>

                    <div className="my-2 mx-2 border-t"></div>
                    
                    <div className="w-full cursor-pointer rounded-xl px-4 py-2 text-left hover:bg-gray-900">
                        Help
                    </div>
                    <div className="w-full cursor-pointer rounded-xl px-4 py-2 text-left hover:bg-gray-900">
                        Send Feedback
                    </div>
                </div>
            </div>
        </>
    );
}