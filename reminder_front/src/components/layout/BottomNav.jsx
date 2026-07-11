function BottomNav({ activePage, navItems, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <span aria-hidden="true">✦</span>
        <strong>Routine Room</strong>
      </div>
      <nav className="sidebar-nav" aria-label="주요 기능">
        {navItems.map((item) => (
          <button
            aria-current={activePage === item.id ? "page" : undefined}
            className="sidebar-nav__item"
            key={item.id}
            onClick={() => onNavigate(item.id)}
            type="button"
          >
            <span aria-hidden="true">{item.icon}</span>
            <strong>{item.label}</strong>
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default BottomNav;
