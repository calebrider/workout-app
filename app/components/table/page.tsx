'use client'

import { MdEdit, MdDelete } from "react-icons/md";
import { deleteWorkoutById, fetchWorkouts } from "@/app/lib/data";
import { useEffect, useState } from "react";

export default function Table() {
    const [workouts, setWorkouts] = useState<any[]>([])

    useEffect(() => {
        fetchWorkouts()
        .then((newWorkouts) => setWorkouts(newWorkouts))
    }, [])

    return (
    <table className="w-full text-xs text-left mx-8 my-4 table-auto border-collapse rounded-md shadow-md overflow-hidden">
        <caption className="p-4 text-lg font-semibold text-left text-white bg-blue-600">
            Workouts
            <p className="mt-1 text-sm font-normal text-white">View your workout history in the table below.</p>
        </caption>
        <thead>
        <tr className="bg-blue-600 text-white">
            <th className="border-y-2 border-blue-200 pl-4 py-4">Title</th>
            <th className="border-y-2 border-blue-200 pl-4 py-4">Description</th>
            <th className="border-y-2 border-blue-200 pl-4 py-4">Date</th>
            <th className="border-y-2 border-blue-200 px-4 py-4">Action</th>
        </tr>
        </thead>
        <tbody>
        {(workouts ?? []).map((workout: any) => (
            <tr key={workout.id} className="odd:bg-blue-500 even:bg-blue-600 hover:bg-blue-300 text-white">
                <td className="border-t-2 border-blue-200 pl-4">{workout.title}</td>
                <td className="border-t-2 border-blue-200 pl-4">{workout.description}</td>
                <td className="border-t-2 border-blue-200 pl-4">{workout.to_char}</td>
                <td className="border-t-2 border-blue-200 px-4">
                    <MdEdit/>
                    <button onClick={() => handleDelete(workout.id, workouts)}>
                        <MdDelete/>
                    </button>
                </td>
            </tr>
        ))}
        </tbody>
    </table>
    )

    async function handleDelete(workoutId: any, workouts: any[]) {
        await deleteWorkoutById(workoutId)
        const newWorkouts = workouts.filter((li: any) => li.id !== workoutId)
        setWorkouts(newWorkouts)
    }
  }
