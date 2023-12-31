"use client"

import { useEffect, useState } from "react"
import { fetchWorkouts } from "../lib/data"
import Table from "../components/table/page"

export default function Workouts() {
    const [workouts, setWorkouts] = useState<any[]>([])    
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        fetchWorkouts()
        .then((newWorkouts) => setWorkouts(newWorkouts))
    }, [])

    return (
        <div className="flex flex-col w-full justify-center rounded-md mt-20 overflow-auto">
            <Table workouts={workouts} setWorkouts={setWorkouts} modalOpen={modalOpen} openModal={() => {setModalOpen(true)}} closeModal={() => {setModalOpen(false)}}/>
        </div>
    )
}