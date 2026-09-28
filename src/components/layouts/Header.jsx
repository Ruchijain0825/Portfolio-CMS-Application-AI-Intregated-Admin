import { Search, Moon, Bell } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-30 flex h-[84px] items-center justify-between border-b border-slate-200 bg-white px-9">

     
      <div className="relative w-[760px]">
        <Search
          size={21}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
        />

        <input
          type="text"
          placeholder="Search projects, skills, experience..."
          className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      <div className="flex items-center gap-7">

       
        <button className="text-slate-800 transition hover:text-indigo-600">
          <Moon size={24} strokeWidth={1.8} />
        </button>

      
        <button className="relative text-slate-800 transition hover:text-indigo-600">
          <Bell size={25} strokeWidth={1.8} />

          <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

       
        <button className="h-11 w-11 overflow-hidden rounded-full">
          <img
            src="/profile.jpg"
            alt="Profile"
            className="h-full w-full object-cover"
          />
        </button>

      </div>
    </header>
  );
};

export default Header;