import { brand } from "../../config/brand";
import { useAppData } from "../../data/AppDataProvider";
import { getCharacterById } from "../../data/characters";
import CharacterAvatar from "../character/CharacterAvatar";
import Button from "../ui/Button";
import Tag from "../ui/Tag";

function RoomCanvas({ onSelectCharacter }) {
  const { profile, roomItems, spaceProfile } = useAppData();
  const safeRoomItems = Array.isArray(roomItems) ? roomItems : [];
  const equippedCount = safeRoomItems.filter((item) => item.equipped).length;
  const selectedCharacter = getCharacterById(profile.characterId);

  return (
    <section className="room-card room-card--photo main-room-card" aria-label="나의 루틴 방">
      <div className="room-card__top">
        <div>
          <Tag tone="main">{selectedCharacter.name}</Tag>
          <h2>나의 루틴 방</h2>
          <p>{spaceProfile.ddayLabel}</p>
        </div>
        <div className="room-card__actions">
          <button aria-label="캐릭터 선택" onClick={onSelectCharacter} title="캐릭터 선택" type="button">
            C
          </button>
          <button aria-label="방 꾸미기" type="button">
            +
          </button>
        </div>
      </div>

      <div className="room-scene room-scene--photo">
        <img alt="" aria-hidden="true" className="photo-room__reference" src="/room-reference/beige-room-reference.png" />
        <CharacterAvatar character={selectedCharacter} className={`room-character room-character--${spaceProfile.roomMood}`} />
      </div>

      <div className="room-card__bottom">
        <div>
          <strong>{equippedCount}</strong>
          <span>개의 오브젝트</span>
        </div>
        <div className="room-currency">
          <span>XP</span>
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
