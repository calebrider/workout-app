import Top from "./components/top/page"
import Display from "./components/display/page"
import { fetchWorkouts } from "./lib/data"

export default async function Home() {
  const workouts = await fetchWorkouts();
  return (
    <>
      <Top/>
      <Display workouts={workouts}/>
    </>
  )
}
