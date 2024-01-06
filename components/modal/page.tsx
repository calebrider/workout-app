"use client"

import { AiTwotoneCloseCircle } from "react-icons/ai";

export default function Modal (props: any) {
    return (
      <>
        <div id="modal-container" className="fixed flex justify-center items-center w-full h-full z-1 bg-black/30 dark:bg-black/60">
            <div className="relative">
                <button className="absolute -top-4 -right-4" onClick={props.closeModal}>
                    <AiTwotoneCloseCircle size={32}/>
                </button>
                <div className="bg-white dark:bg-neutral-800 rounded-md p-8">
                    <form className="flex flex-col">
                        <div className="flex flex-col">
                            <label htmlFor="title" className="text-gray-700 dark:text-neutral-200">Title</label>
                            <input name="title" defaultValue={props.formState.title} onChange={props.handleChange} className="dark:bg-neutral-100 border-solid border-2 rounded-md border-gray-400 dark:border-neutral-950 focus:outline-none focus:border-blue-400 mb-4 p-2" required></input>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="description" className="text-gray-700 dark:text-neutral-200">Description</label>
                            <textarea name="description" defaultValue={props.formState.description} onChange={props.handleChange} className="dark:bg-neutral-100 border-solid border-2 rounded-md border-gray-400 dark:border-neutral-950 focus:outline-none focus:border-blue-400 mb-4 p-2"></textarea>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="date" className="text-gray-700 dark:text-neutral-200">Date</label>
                            <input name="date" type="date" defaultValue={props.formState.date} onChange={props.handleChange} className="dark:bg-neutral-100 border-solid border-2 rounded-md border-gray-400 dark:border-neutral-950 focus:outline-none focus:border-blue-400 mb-8 p-2" required></input>
                        </div>
                        <button type="submit" className="w-fit mx-auto bg-white font-semibold text-blue-600 hover:bg-blue-600 hover:text-white dark:text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:hover:border-blue-700 border-2 border-blue-600 py-2 px-6 rounded-lg" onClick={props.handleSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
      </>
    )
  }
