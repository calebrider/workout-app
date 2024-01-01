'use client'

import { MdEdit, MdDelete } from "react-icons/md";
import { deleteWorkoutById, upsertWorkout } from "@/app/lib/data";
import { useState } from "react";
import Modal from "../modal/page";

export default function Table(props: any) {
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
        await upsertWorkout(formState)
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
        <table className="text-xs text-left mx-8 my-4 table-auto border-collapse rounded-md shadow-md overflow-hidden">
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
            {(props.workouts ?? []).map((workout: any) => (
            <tr key={workout.id} className="odd:bg-blue-500 even:bg-blue-600 hover:bg-blue-300 text-white">
                <td className="border-t-2 border-blue-200 pl-4">{workout.title}</td>
                <td className="border-t-2 border-blue-200 pl-4">{workout.description}</td>
                <td className="border-t-2 border-blue-200 pl-4">{workout.to_char}</td>
                <td className="border-t-2 border-blue-200 px-4">
                    <button onClick={() => editModal(workout)}>
                        <MdEdit/>
                    </button>
                    <button onClick={() => handleDelete(workout.id, props.workouts)}>
                        <MdDelete/>
                    </button>
                </td>
            </tr>
        ))}
        </tbody>
    </table>
    <button className="bg-blue-500 text-white py-2 px-4 rounded-md mx-auto" onClick={addModal}>
        Add
    </button>
    {props.modalOpen && (<Modal closeModal={props.closeModal} onSubmit={handleSubmit} workouts={props.workouts} setWorkouts={props.setWorkouts} formState={formState} setFormState={setFormState} handleChange={handleChange} handleSubmit={handleSubmit}/>)}
    </>
    )
  }
