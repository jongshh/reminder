function BottomNav({ activePage, navItems, onNavigate }) {
  return (
    <nav className="bottom-nav" aria-label="주요 화면">
      {navItems.map((item) => (
        <button
          aria-current={activePage === item.id ? "page" : undefined}
          className="bottom-nav__item"
          key={item.id}
          onClick={() => onNavigate(item.id)}
          type="button"
        >
          <span aria-hidden="true">{item.icon}</span>
          <strong>{item.shortLabel}</strong>
        </button>
      ))}
    </nav>
  );
}

export default BottomNav;
