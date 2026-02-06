// Layout.tsx
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="grow">
        {/* This is where App.tsx (or other pages) will render */}
        <Outlet />
      </main>

      <footer className="p-4 border-t text-center">
        © 2026 Villa Prescilla Contract Automation
      </footer>
    </div>
  );
}
