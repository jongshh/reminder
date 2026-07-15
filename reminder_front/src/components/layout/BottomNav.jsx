function BottomNav({ activePage, navItems, onNavigate }) {
  return (
    <aside className="sidebar sidebar--simple">
      <div className="sidebar__brand">
        <span aria-hidden="true">✦</span>
        <div>
          <strong>루틴 포드</strong>
          <small>빠른 이동</small>
        </div>
      </div>

      <button className="sidebar__quick-start" onClick={() => onNavigate("quests")} type="button">
        <span aria-hidden="true">✓</span>
        <strong>오늘 할 일</strong>
      </button>

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
