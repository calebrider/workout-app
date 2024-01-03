import AuthButton from "../AuthButton/page";

export default function Navbar(props: any) {
    return (
      <>
        <div className="fixed items-center justify-between top-0 flex h-20 w-full bg-blue-600">
          <div className="text-center w-40 text-white">Workout App</div>
          <AuthButton/>
        </div>
      </>
    )
  }