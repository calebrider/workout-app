'use client'

import { MdEdit, MdDelete } from "react-icons/md";
import { deleteWorkoutById, upsertWorkout } from "@/app/lib/data";
import { useState } from "react";
import Modal from "../modal/page";
import { useSession } from "next-auth/react";

export default function Table(props: any) {
    const { data: session } = useSession();
    
    const [formState, setFormState] = useState<{id: any, title: any, description: any, to_char: any}>({
        id: null,
        title: null,
        description: null,
        to_char: null
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
            to_char: null
        })
    }

    function addModal() {
        formState.id = null
        formState.title = null
        formState.description = null

        let today = new Date().toISOString().slice(0, 10)
        formState.to_char = today

        props.openModal()
    }

    async function editModal(workout: any) {
        formState.id = workout.id
        formState.title = workout.title
        formState.description = workout.description
        formState.to_char = workout.to_char

        props.openModal()
    }

    async function handleDelete(workoutId: any, workouts: any[]) {
        await deleteWorkoutById(workoutId)
        const newWorkouts = workouts.filter((li: any) => li.id !== workoutId)
        props.setWorkouts(newWorkouts)
    }

    return (
        <>
            <div className="flex m-auto mt-12 mb-6 shadow-md border-1 rounded-md overflow-hidden">
                <table className="text-xs table-auto mx-auto border-collapse rounded-md shadow-xl">
                    <caption className="py-5 bg-white">
                        <div className="flex flex-row justify-between w-full">
                            <h1 className="mx-8 text-4xl font-semibold text-gray-700">Workouts</h1>
                            <button className="mx-8 bg-white font-semibold text-blue-600 hover:bg-blue-600 hover:text-white border-2 border-blue-600 py-2 px-6 rounded-lg" onClick={addModal}>
                                Add Workout
                            </button>
                        </div>
                    </caption>
                    <thead>
                    <tr className="bg-blue-600 text-white text-left text-sm border-y-2 border-blue-600">
                        <th className="pl-8 py-4">Title</th>
                        <th className="pl-8 py-4">Description</th>
                        <th className="pl-8 py-4">Date</th>
                        <th className="px-8 py-4">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {(props.workouts ?? []).map((workout: any) => (
                        <tr key={workout.id} className="bg-white text-gray-800 text-sm mx-2 border-t-2 border-gray-200">
                            <td className="pl-8">{workout.title}</td>
                            <td className="pl-8">{workout.description}</td>
                            <td className="pl-8">{workout.to_char}</td>
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
