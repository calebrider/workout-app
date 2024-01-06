'use client'

import { MdEdit, MdDelete } from "react-icons/md";
import { deleteWorkoutById, upsertWorkout } from "@/app/lib/data";
import { useState } from "react";
import Modal from "../modal/page";
import { useSession } from "next-auth/react";

export default function Table(props: any) {
    const { data: session } = useSession();
    
    const [formState, setFormState] = useState<{id: string | null, title: string | null, description: string | null, date: string | null}>({
        id: null,
        title: null,
        description: null,
        date: null
    })

    const handleChange = (e: any) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e: any) {
        e.preventDefault();
        const workoutToEditIndex = props.workouts.findIndex((workout: any) => workout.id === formState.id)

        if (workoutToEditIndex !== -1) {
            props.workouts[workoutToEditIndex] = formState
        } else {
            formState.id = crypto.randomUUID()
            props.workouts.unshift(formState)
        }

        props.closeModal()
        await upsertWorkout(formState, session?.user?.email)
        setFormState({
            id: null,
            title: null,
            description: null,
            date: null
        })
    }

    function addModal() {
        formState.id = null
        formState.title = null
        formState.description = null

        let today = new Date().toISOString().slice(0, 10)
        formState.date = today

        props.openModal()
    }

    async function editModal(workout: any) {
        formState.id = workout.id
        formState.title = workout.title
        formState.description = workout.description
        formState.date = new Date(workout.date).toISOString().slice(0, 10)

        props.openModal()
    }

    async function handleDelete(workoutId: any, workouts: any[]) {
        await deleteWorkoutById(workoutId)
        const newWorkouts = workouts.filter((li: any) => li.id !== workoutId)
        props.setWorkouts(newWorkouts)
    }

    return (
        <>
            <div className="flex min-w-[400px] m-auto mt-12 mb-6 shadow-md border-1 rounded-md overflow-hidden">
                <table className="w-full table-auto text-xs border-collapse rounded-md shadow-xl">
                    <caption className="py-5 bg-white dark:bg-neutral-800">
                        <div className="flex flex-row justify-between w-full">
                            <h1 className="mx-8 text-4xl font-semibold text-blue-600 dark:text-white">Workouts</h1>
                            <button className="mr-8 bg-white font-semibold text-blue-600 hover:bg-blue-600 hover:text-white dark:text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:hover:border-blue-700 border-2 border-blue-600 py-2 px-6 rounded-lg" onClick={addModal}>
                                Add Workout
                            </button>
                        </div>
                    </caption>
                    <thead>
                    <tr className="bg-blue-600 text-white text-left text-sm border-y-2 border-blue-600 dark:bg-neutral-900 dark:border-neutral-950">
                        <th className="pl-8 py-4">Title</th>
                        <th className="pl-8 py-4">Description</th>
                        <th className="pl-8 py-4">Date</th>
                        <th className="px-8 py-4 w-0">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {(props.workouts ?? []).map((workout: any) => (
                        <tr key={workout.id} className="bg-white text-gray-800 text-sm mx-2 border-t-2 border-gray-200 dark:bg-neutral-800 dark:text-white dark:border-neutral-950">
                            <td className="pl-8">{workout.title}</td>
                            <td className="pl-8">{workout.description}</td>
                            <td className="pl-8">{new Date(workout.date).toISOString().slice(0, 10)}</td>
                            <td className="pl-8 py-2">
                                <button onClick={() => editModal(workout)}>
                                    <MdEdit
                                        color='#32CD32'
                                        size={20}
                                    />
                                </button>
                                <button className="ml-1" onClick={() => handleDelete(workout.id, props.workouts)}>
                                    <MdDelete
                                        color='#FF033E'
                                        size={20}
                                    />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
        </div>
        {props.modalOpen && (<Modal closeModal={props.closeModal} onSubmit={handleSubmit} workouts={props.workouts} setWorkouts={props.setWorkouts} formState={formState} setFormState={setFormState} handleChange={handleChange} handleSubmit={handleSubmit}/>)}
    </>
    )
  }
