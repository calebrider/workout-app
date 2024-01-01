"use client"

import { AiTwotoneCloseCircle } from "react-icons/ai";

export default function Modal (props: any) {
    console.log("FORM STATE: ")
    console.log(props.formState)
    // props.formState.title = ""
    // props.formState.description = ""
    // props.formState.to_char = ""

    return (
      <>
        <div id="modal-container" className="fixed flex justify-center items-center w-full h-full z-1 bg-black/30">
            <div className="relative">
                <button className="absolute -top-4 -right-4" onClick={props.closeModal}>
                    <AiTwotoneCloseCircle size={32}/>
                </button>
                <div className="bg-white rounded-md p-8">
                    <form className="flex flex-col">
                        <div className="flex flex-col">
                            <label htmlFor="title">Title</label>
                            <input name="title" defaultValue={props.formState.title} onChange={props.handleChange} className="border-solid border-2 rounded-md border-blue-200 mb-4"></input>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="description">Description</label>
                            <textarea name="description" defaultValue={props.formState.description} onChange={props.handleChange} className="border-solid border-2 rounded-md border-blue-200 mb-4"></textarea>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="to_char">Date</label>
                            <input name="to_char" type="date" defaultValue={props.formState.to_char} onChange={props.handleChange} className="border-solid border-2 rounded-md border-blue-200 mb-8"></input>
                        </div>
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md mx-auto" onClick={props.handleSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
      </>
    )
  }
