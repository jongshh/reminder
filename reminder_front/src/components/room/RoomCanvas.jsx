import { brand } from "../../config/brand";
import { roomItems, spaceProfile } from "../../data/mockData";
import Button from "../ui/Button";
import Tag from "../ui/Tag";

function RoomCanvas() {
  return (
    <section className="room-card main-room-card" aria-label="나의 루틴 방">
      <div className="room-card__top">
        <div>
          <Tag tone="recovery">{brand.mascotName}</Tag>
          <h2>나의 방</h2>
          <p>{spaceProfile.ddayLabel}</p>
        </div>
        <div className="room-card__actions">
          <button aria-label="간식 주기" type="button">
            ✦
          </button>
          <button aria-label="공간 편집" type="button">
            +
          </button>
        </div>
      </div>

      <div className="room-scene">
        <svg className="room-illustration" viewBox="0 0 420 260" role="img" aria-label="창문과 식물이 있는 개인 루틴 방">
          <rect className="room-wall" x="24" y="16" width="372" height="198" rx="28" />
          <path className="room-floor" d="M52 168 C118 205 288 205 368 168 L388 218 C278 252 130 252 32 218 Z" />
          <rect className="room-window" x="72" y="44" width="86" height="72" rx="18" />
          <line className="room-window-line" x1="115" y1="48" x2="115" y2="112" />
          <line className="room-window-line" x1="78" y1="80" x2="152" y2="80" />
          <rect className="room-shelf" x="248" y="70" width="88" height="10" rx="5" />
          <circle className="room-lamp" cx="305" cy="58" r="16" />
          <path className="room-plant-pot" d="M72 172 H118 L112 210 H78 Z" />
          <path className="room-plant" d="M95 170 C66 150 76 122 99 149 C118 120 140 142 106 170" />
          <ellipse className="room-rug" cx="210" cy="214" rx="106" ry="20" />
          <rect className="room-table" x="252" y="164" width="76" height="14" rx="7" />
          <line className="room-table-leg" x1="268" y1="176" x2="258" y2="210" />
          <line className="room-table-leg" x1="312" y1="176" x2="322" y2="210" />
          <rect className="room-mug" x="276" y="138" width="22" height="24" rx="8" />
          <path className="room-mug-handle" d="M298 146 C314 146 314 162 298 162" />
        </svg>

        <div className={`mascot mascot--photo mascot--${spaceProfile.roomMood}`} aria-label={`${brand.mascotName} 캐릭터`}>
          <img className="mascot__photo mascot__photo--1" src="/mascot/mascot-happy.png" alt="" />
          <img className="mascot__photo mascot__photo--2" src="/mascot/mascot-thumbs.png" alt="" />
          <img className="mascot__photo mascot__photo--3" src="/mascot/mascot-shy.png" alt="" />
          <img className="mascot__photo mascot__photo--4" src="/mascot/mascot-pray.png" alt="" />
          <img className="mascot__photo mascot__photo--5" src="/mascot/mascot-sleepy.png" alt="" />
          <img className="mascot__photo mascot__photo--6" src="/mascot/mascot-sad.png" alt="" />
          <img className="mascot__photo mascot__photo--7" src="/mascot/mascot-angry.png" alt="" />
        </div>
      </div>

      <div className="room-card__bottom">
        <div>
          <strong>{roomItems.filter((item) => item.equipped).length}</strong>
          <span>개의 오브제</span>
        </div>
        <div className="room-currency">
          <span>✦</span>
          <strong>{spaceProfile.currency}</strong>
          <small>{brand.currencyName}</small>
        </div>
        <Button size="sm" variant="secondary">
          꾸미기
        </Button>
      </div>
    </section>
  );
}

export default RoomCanvas;
