"use client"

import EditWorkout from "../edit-workout/page";
import Modal from "../modal/page";
import Table from "../table/page";
import { fetchWorkouts } from "@/app/lib/data";
import { useState } from "react";

export default function Display() {
    return (
      <div className="fixed flex flex-col top-20 bottom-10 justify-center rounded-md overflow-auto">
        <Table/>
      </div>
    )
  }
