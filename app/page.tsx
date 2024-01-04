import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "./lib/authOptions"

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (session && session.user) {
    redirect("/workouts")
  }

  return (
    <div className="flex flex-col text-center w-4/5 mx-auto mt-40 gap-10">
      <h1 className="text-4xl font-semibold text-gray-700">Welcome to the Workout App!</h1>
    </div>
  )
}
