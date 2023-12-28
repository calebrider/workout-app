import EditWorkout from "../edit-workout/page";
import Table from "../table/page";
import { fetchWorkouts } from "@/app/lib/data";

export default async function Display() {
    const workouts = await fetchWorkouts();

    return (
      <div className="fixed flex top-20 bottom-10 justify-center w-full rounded-md overflow-auto">
        <Table/>
        {/* <EditWorkout/> */}
      </div>
    )
  }
