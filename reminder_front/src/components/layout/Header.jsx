import { todayStatus, userProfile } from "../../data/mockData";
import Tag from "../ui/Tag";

function Header({ currentLabel }) {
  return (
    <header className="app-header">
      <div>
        <p className="app-header__eyebrow">{todayStatus.dateLabel}</p>
        <h1>{currentLabel}</h1>
      </div>
      <div className="app-header__profile">
        <Tag tone="success">{userProfile.className}</Tag>
        <span>Lv.{userProfile.level}</span>
      </div>
    </header>
  );
}

export default Header;
