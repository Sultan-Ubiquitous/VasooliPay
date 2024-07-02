

export default function Header() {
  return (
    <nav className="text-black text-base bg-slate-300 px-6">
        <div className="flex items-center justify-between p-2 bg-slate-300 border-gray-400">
        <div className="drop-shadow-sm">VasooliTM</div>
        <div className="space-x-1 flex items-center">
            <div className="drop-shadow-sm">Hello</div>
            <div className="flex drop-shadow-sm justify-center items-center h-8 w-8 rounded-full p-2 bg-slate-500 text-white">
                U
            </div>
        </div>
        </div>
        <div className="border-b-[0.5px] border-slate-100 px-2 rounded-full">
        </div>
        <div className=" shadow-md px-2">
        </div>
    </nav>
  )
}
