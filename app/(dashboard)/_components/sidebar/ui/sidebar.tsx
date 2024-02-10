import { SidebarButton } from "./_components/sidebar-button"
import { SidebarList } from "./_components/sidebar-list"

const Sidebar = () => {
  return (
    <aside className="fixed left-0 z-[1] flex h-full w-[60px] flex-col gap-y-4 bg-blue-950 p-3 text-white">
      <SidebarList />
      <SidebarButton />
    </aside>
  )
}

export { Sidebar }
