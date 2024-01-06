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
            <div className="fixed flex flex-col h-fit min-w-[184px] max-w-full w-min text-wrap top-20 right-0 bg-blue-600 dark:bg-neutral-800 text-white text-center px-4 items-center shadow-lg rounded-b-md z-10">
                <p className="text-md pt-2">Hi, {session?.user?.name?.split(" ")[0]}!</p>
                <p className="text-xs">{session?.user?.email}</p>
                <button className="text-white hover:text-blue-600 dark:hover:text-white bg-blue-600 hover:bg-white dark:text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:hover:border-blue-700 dark:border-blue-600 border-2 border-white rounded-md py-1 px-4 mx-auto my-4" onClick={() => signOut()}>Sign Out</button>
            </div>
            }
        </div>
        )
    }
    
    return (
        <>
        <button className="h-full w-40 text-white hover:text-blue-600 hover:bg-white dark:hover:text-white dark:hover:bg-neutral-900" onClick={() => signIn("google")}>Sign In</button>
        </>
    )
}
