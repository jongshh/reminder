import { brand } from "../../config/brand";
import { useAppData } from "../../data/AppDataProvider";
import Tag from "../ui/Tag";

function Header({ currentLabel, onNavigate }) {
  const { profile, todayStatus } = useAppData();

  return (
    <header className="app-header app-header--simple">
      <div className="app-header__title">
        <p className="app-header__eyebrow">
          {brand.appName} · {todayStatus.dateLabel}
        </p>
        <h1>{currentLabel}</h1>
      </div>
      <button
        className="app-header__profile"
        onClick={() => onNavigate("settings")}
        title="설정"
        type="button"
      >
        <Tag tone="success">회복력 {profile.recoveryRate}%</Tag>
        <span>↺ {profile.comebackCount}</span>
      </button>
    </header>
  );
}

export default Header;
