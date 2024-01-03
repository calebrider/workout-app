import { AuthOptions, NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";

export const authOptions: AuthOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        Google({
            clientId: process.env.GOOGLE_ID ?? "",
            clientSecret: process.env.GOOGLE_SECRET ?? ""
        })
    ],
    // callbacks: {
    //     async signIn({ account, profile }) {
    //         if (!profile?.email) {
    //             throw new Error('No profile')
    //         }

    //         // upsert user


    //         return true
    //     }
    // }
}