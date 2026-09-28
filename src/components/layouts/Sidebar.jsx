import {
  LayoutDashboard, UserRound, Code2, Briefcase, FolderKanban,
  GraduationCap, Award, FileText, Mail, Settings, ExternalLink, ChevronRight
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "About", icon: UserRound, path: "/admin/about" },
  { name: "Skills", icon: Code2, path: "/dashboard/skills" },
  { name: "Experience", icon: Briefcase, path: "/admin/experience" },
  { name: "Projects", icon: FolderKanban, path: "/admin/project" },
  { name: "Education", icon: GraduationCap, path: "/dashboard/education" },
  { name: "Blog / Articles", icon: FileText, path: "/dashboard/blog" },
  { name: "Messages", icon: Mail, path: "/dashboard/messages" }
];

const bottomItems = [
  { name: "Settings", icon: Settings, path: "/dashboard/settings" },
  { name: "View Portfolio", icon: ExternalLink, path: "/portfolio" }
];

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 flex h-screen w-[230px] flex-col border-r border-slate-200 bg-white">

      <div className="flex h-[68px] items-center px-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 text-lg font-bold text-white">
            P
          </div>

          <h1 className="text-[19px] font-bold text-slate-900">
            Portfolio<span className="text-indigo-600">CMS</span>
          </h1>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4">
        <div className="space-y-1">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.name}
                href={item.path}
                className={`flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition ${
                  item.name === "About"
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-slate-700 hover:bg-slate-50 hover:text-indigo-600"
                }`}
              >
                <Icon size={19} strokeWidth={1.8} />
                <span>{item.name}</span>
              </a>
            );
          })}

        </div>

        <div className="my-4 border-t border-slate-200" />

        <div className="space-y-1">
          {bottomItems.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.name}
                href={item.path}
                className="flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600"
              >
                <Icon size={19} strokeWidth={1.8} />
                <span>{item.name}</span>
              </a>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-slate-200 p-4">
        <div className="flex items-center gap-2.5">
          <img
            src="/profile.jpg"
            alt="Profile"
            className="h-9 w-9 rounded-full object-cover"
          />

          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-900">
              Ruchi
            </p>

            <p className="text-[11px] text-slate-500">
              Admin
            </p>
          </div>

          <ChevronRight size={17} className="text-slate-500" />
        </div>
      </div>

    </aside>
  );
};
export default Sidebar;