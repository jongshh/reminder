import { brand } from "../../config/brand";
import { roomItems, spaceProfile } from "../../data/mockData";
import Button from "../ui/Button";
import Tag from "../ui/Tag";

const mascotFrames = [
  "mascot-happy",
  "mascot-thumbs",
  "mascot-shy",
  "mascot-pray",
  "mascot-sleepy",
  "mascot-sad",
  "mascot-angry",
  "mascot-run",
];

function RoomCanvas() {
  const equippedCount = roomItems.filter((item) => item.equipped).length;

  return (
    <section className="room-card room-card--photo main-room-card" aria-label="나의 루틴 방">
      <div className="room-card__top">
        <div>
          <Tag tone="main">루틴 방</Tag>
          <h2>나의 루틴 방</h2>
          <p>{spaceProfile.ddayLabel}</p>
        </div>
        <div className="room-card__actions">
          <button aria-label="캐릭터 간식 주기" type="button">
            ◌
          </button>
          <button aria-label="방 꾸미기" type="button">
            +
          </button>
        </div>
      </div>

      <div className="room-scene room-scene--photo">
        <img
          alt=""
          aria-hidden="true"
          className="photo-room__reference"
          src="/room-reference/beige-room-reference.png"
        />

        <div className={`mascot mascot--photo mascot--reference mascot--${spaceProfile.roomMood}`} aria-label={`${brand.mascotName} 캐릭터`}>
          {mascotFrames.map((frame, index) => (
            <img
              alt=""
              className={`mascot__photo mascot__photo--${index + 1}`}
              key={frame}
              src={`/mascot/${frame}.png`}
            />
          ))}
        </div>
      </div>

      <div className="room-card__bottom">
        <div>
          <strong>{equippedCount}</strong>
          <span>개의 오브젝트</span>
        </div>
        <div className="room-currency">
          <span>✦</span>
          <strong>{spaceProfile.currency}</strong>
          <small>{brand.currencyName}</small>
        </div>
        <Button size="sm" variant="secondary">
          방 꾸미기
        </Button>
      </div>
    </section>
  );
}

export default RoomCanvas;
