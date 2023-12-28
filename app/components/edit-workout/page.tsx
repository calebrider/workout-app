export default async function EditWorkout(props: any) {
    return (
      <div className="fixed flex justify-center rounded-md bg-white border-2 border-black z-10">
        <form>
            <div>
                <label htmlFor="title">Title</label>
                <input name="title"/>
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <textarea name="description"/>
            </div>
            <div>
                <label htmlFor="date">Date</label>
                <input type="date" name="date"/>
            </div>
            <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
