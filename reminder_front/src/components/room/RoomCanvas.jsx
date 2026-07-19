import { useState } from "react";
import { brand } from "../../config/brand";
import { useAppData } from "../../data/AppDataProvider";
import { getCharacterById } from "../../data/characters";
import CharacterAvatar from "../character/CharacterAvatar";
import Button from "../ui/Button";
import Tag from "../ui/Tag";

function RoomCanvas({ onSelectCharacter, rewardEvent }) {
  const { profile, quests, roomItems, spaceProfile, toggleRoomItem } = useAppData();
  const [isDecorating, setIsDecorating] = useState(false);
  const safeRoomItems = Array.isArray(roomItems) ? roomItems : [];
  const equippedCount = safeRoomItems.filter((item) => item.equipped).length;
  const selectedCharacter = getCharacterById(profile.characterId);
  const completedCount = quests.filter((quest) => quest.completed).length;
  const reaction = rewardEvent
    ? `${rewardEvent.title}, 해냈다! 방이 더 환해졌어.`
    : completedCount > 0
      ? `오늘 ${completedCount}번이나 나를 찾아왔네. 정말 멋져!`
      : "돌아온 것만으로도 오늘의 첫 퀘스트는 성공이야.";

  return (
    <section className={`room-card room-card--photo main-room-card ${rewardEvent ? "is-celebrating" : ""}`} aria-label="나의 회복 스튜디오">
      <div className="room-card__top">
        <div>
          <Tag tone="main">LIVE STUDIO</Tag>
          <h2>{selectedCharacter.name}와 만드는 오늘의 방</h2>
          <p>작은 완료 하나마다 방이 조금씩 깨어나요.</p>
        </div>
        <div className="room-card__actions">
          <button aria-label="캐릭터 선택" onClick={onSelectCharacter} title="캐릭터 선택" type="button">
            C
          </button>
          <button aria-label="방 꾸미기" onClick={() => setIsDecorating(true)} type="button">
            ✦
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

        <div className="character-speech" role="status">{reaction}</div>
        {rewardEvent ? <div className="room-celebration" aria-hidden="true"><i>✦</i><i>•</i><i>✦</i><i>•</i><i>✦</i></div> : null}
        <CharacterAvatar
          character={selectedCharacter}
          className={`room-character room-character--${spaceProfile.roomMood} ${rewardEvent ? "room-character--celebrate" : ""}`}
        />
      </div>

      <div className="room-card__bottom">
        <div>
          <strong>{completedCount}</strong>
          <span>오늘 방을 밝힌 순간</span>
        </div>
        <div className="room-currency">
          <span>XP</span>
          <strong>{spaceProfile.currency}</strong>
          <small>{brand.currencyName}</small>
        </div>
        <Button className="decorate-primary" onClick={() => setIsDecorating(true)} variant="secondary">
          <span aria-hidden="true">✦</span> 방 꾸미기
        </Button>
      </div>

      {isDecorating ? (
        <div className="decor-drawer" role="dialog" aria-modal="true" aria-label="방 꾸미기">
          <button aria-label="꾸미기 닫기" className="decor-drawer__backdrop" onClick={() => setIsDecorating(false)} type="button" />
          <div className="decor-drawer__panel">
            <div className="decor-drawer__header">
              <div><Tag tone="recovery">MY ITEMS</Tag><h3>오늘의 기분대로 꾸며요</h3><p>아이템을 눌러 방에 두거나 잠시 쉬게 할 수 있어요.</p></div>
              <button aria-label="닫기" onClick={() => setIsDecorating(false)} type="button">×</button>
            </div>
            <div className="decor-item-grid">
              {safeRoomItems.map((item, index) => (
                <button aria-pressed={item.equipped} disabled={!item.owned} key={item.id} onClick={() => toggleRoomItem(item.id)} type="button">
                  <span aria-hidden="true">{["▤", "♧", "☼", "◌"][index % 4]}</span>
                  <strong>{item.label}</strong>
                  <small>{item.equipped ? "배치 중" : "보관함"}</small>
                </button>
              ))}
            </div>
            <div className="decor-drawer__footer"><span>{equippedCount}개 배치 중</span><Button onClick={() => setIsDecorating(false)}>이대로 둘게요</Button></div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default RoomCanvas;
