import BottomNav from "./BottomNav";
import Header from "./Header";

function AppLayout({ activePage, children, currentLabel, navItems, onNavigate }) {
  return (
    <div className="app-shell">
      <div className="app-frame">
        <BottomNav activePage={activePage} navItems={navItems} onNavigate={onNavigate} />
        <div className="app-content">
          <Header currentLabel={currentLabel} onNavigate={onNavigate} />
          <main className="app-main">{children}</main>
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
