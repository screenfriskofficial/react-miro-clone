import { SidebarButton } from "./_components/sidebar-button";
import { SidebarList } from "./_components/sidebar-list";

const Sidebar = () => {
  return (
    <aside className="fixed z-[1] left-0 bg-blue-950 h-full w-[60px] flex p-3 flex-col gap-y-4 text-white">
      <SidebarList />
      <SidebarButton />
    </aside>
  );
};

export { Sidebar };