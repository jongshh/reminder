import { useAppData } from "../../data/AppDataProvider";
import Tag from "../ui/Tag";

function Header({ currentLabel }) {
  const { profile, todayStatus } = useAppData();

  return (
    <header className="app-header">
      <div className="app-header__title">
        <p className="app-header__eyebrow">{todayStatus.dateLabel}</p>
        <h1>{currentLabel}</h1>
      </div>
      <div className="app-header__profile">
        <Tag tone="success">{profile.className}</Tag>
        <span>Lv.{profile.level}</span>
      </div>
    </header>
  );
}

export default Header;
