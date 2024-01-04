"use client";

import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function AuthButton() {
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const { data: session } = useSession();

    if (session) {
        return(
        <div className="flex pr-16 justify-center">
            <div className="w-14 rounded-full overflow-auto shadow-md cursor-pointer" onClick={() => setIsProfileOpen(!isProfileOpen)}>
                <Image
                    src={session?.user?.image?.toString() ?? "public\next.svg"}
                    width={1000}
                    height={1000}
                    alt="Profile picture"
                    priority={true}
                />
            </div>
            {isProfileOpen &&
            <div className="fixed top-20 right-0 flex flex-col bg-blue-600 text-white justify-center p-4 items-center shadow-lg rounded-b-md z-10">
                <span className="text-md">Hi {session?.user?.name?.split(" ")[0]}!</span>
                <span className="text-xs ">{session?.user?.email}</span>
                <button className="flex w-full justify-center items-center text-white hover:text-blue-600 bg-blue-600 hover:bg-white border-2 border-white rounded-md py-1 mt-4" onClick={() => signOut()}>Sign Out</button>
            </div>
            }
        </div>
        )
    }
    
    return (
        <>
        <button className="h-full w-40 text-white hover:text-blue-600 hover:bg-white" onClick={() => signIn("google")}>Sign In</button>
        </>
    )
}
