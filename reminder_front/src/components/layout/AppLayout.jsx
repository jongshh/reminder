import BottomNav from "./BottomNav";
import Header from "./Header";

function AppLayout({ activePage, children, currentLabel, navItems, onNavigate }) {
  return (
    <div className="app-shell">
      <Header currentLabel={currentLabel} />
      <main className="app-main">{children}</main>
      <BottomNav activePage={activePage} navItems={navItems} onNavigate={onNavigate} />
    </div>
  );
}

export default AppLayout;
