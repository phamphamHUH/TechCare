type SideBarProps = {
  open: boolean;
  page: string;
  setPage: (page: string) => void;
  navItems: { page: string; label: string; icon: React.ReactNode }[];
};

function SideBar({ open, page, setPage, navItems }: SideBarProps) {
  return (
    <aside
      className={`bg-white border-r border-gray-300 text-black h-screen overflow-hidden transition-all duration-300 ${
        open ? "w-64" : "w-0 p-0"
      }`}
    >
      {open && (
        <>
          <div className="flex items-center justify-start gap-2 h-24 border-b border-gray-300  px-2 mb-6">
            <img
              src="/assets/reyna-g-logo.png"
              alt="Logo"
              className="w-20 h-20 object-contain"
            />
            <p className="font-extrabold text-3xl tracking-wider">Reyna G</p>
          </div>

          <nav className="flex flex-col gap-3 px-5">
            {navItems.map((item) => (
              <a
                key={item.page}
                className={`hover:scale-101 active:scale-99 active:border-red-800 border rounded-[20px] py-5 px-2 ${
                  page === item.page
                    ? "bg-red-800 text-white border-red-800"
                    : ""
                }`}
                onClick={() => setPage(item.page)}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  {item.label}
                </div>
              </a>
            ))}
          </nav>
        </>
      )}
    </aside>
  );
}

export default SideBar;
