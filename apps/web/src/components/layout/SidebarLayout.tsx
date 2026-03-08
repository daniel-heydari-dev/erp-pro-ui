import Sidebar from "../navs/Sidebar";
import { BorderBeam } from "../common/BorderBeam";
import Header from "../navs/Header";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  return (
    <main className='app-container relative' >
      <BorderBeam
        duration={10}
        size={300}
        colorFrom="var(--beam-color-from)"
        colorTo="var(--beam-color-to)"
        className="fixed! inset-0 z-50 pointer-events-none"
      />
      {/* <div className="fixed! inset-0 z-50 pointer-events-none antigravity-glow rounded-none" /> */}

      <Header />
      <section className="category-wrapper relative z-10">
        <Sidebar />
        {children}
      </section>

    </main>
  )
}

export default SidebarLayout;
