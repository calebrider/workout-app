import { AuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import { upsertUser } from "./data";

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
    callbacks: {
        async signIn({ profile }) {
            if (!profile?.email) {
                throw new Error('No profile')
            }
            return true
        },
        async jwt({ token, account, user }) {
            if (account) {
                upsertUser(user.id, user.name, user.email)
            }
            return token
        }
    }
}
