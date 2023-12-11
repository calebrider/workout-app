export default function Display(props: any) {
    return (
      <div className="fixed flex top-40 bottom-20 justify-center w-full rounded-md overflow-auto">
        <table className="w-full mx-8 my-4 table-auto border-collapse rounded-md shadow-md overflow-hidden">
          <thead>
            <tr className="bg-neutral-200">
              <th className="border-b-2 border-neutral-400 p-4 ">Title</th>
              <th className="border-b-2 border-neutral-400 p-4">Description</th>
              <th className="border-b-2 border-neutral-400 p-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {(props.workouts ?? []).map((workout: any) => (
              <tr key={workout.id} className="">
                <td className="border-t-2 border-neutral-200 p-2">{workout.title}</td>
                <td className="border-t-2 border-neutral-200 p-2">{workout.description}</td>
                <td className="border-t-2 border-neutral-200 p-2">{workout.to_char}</td>
              </tr>
            ))}
          </tbody>
          </table>
      </div>
    )
  }
