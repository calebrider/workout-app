import AuthButton from "../AuthButton/page";

export default function Navbar() {
    return (
      <>
        <div className="fixed items-center justify-between top-0 flex h-20 w-full bg-blue-600 shadow-md">
          <div className="text-center font-bold text-xl tracking-wide pl-16 text-white">Workout App</div>
          <AuthButton/>
        </div>
      </>
    )
  }