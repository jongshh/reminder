import { useEffect, useState } from "react";
import { brand } from "../../config/brand";
import { useAppData } from "../../data/AppDataProvider";
import { getCharacterById } from "../../data/characters";
import CharacterAvatar from "../character/CharacterAvatar";
import Button from "../ui/Button";
import Tag from "../ui/Tag";

const INITIAL_SITUATION = "접속";
const IDLE_DIALOGUE_DELAYS = {
  접속: 7000,
  대기1: 11000,
};

const findDialogueIndex = (character, situation) => {
  const dialogueIndex = character.dialogues?.findIndex((dialogue) => dialogue.situation === situation) ?? -1;
  return Math.max(dialogueIndex, 0);
};

function RoomCanvas({ onSelectCharacter }) {
  const { profile, roomItems, spaceProfile } = useAppData();
  const safeRoomItems = Array.isArray(roomItems) ? roomItems : [];
  const equippedCount = safeRoomItems.filter((item) => item.equipped).length;
  const selectedCharacter = getCharacterById(profile.characterId);
  const [dialogueIndex, setDialogueIndex] = useState(() =>
    findDialogueIndex(selectedCharacter, INITIAL_SITUATION),
  );
  const dialogues = selectedCharacter.dialogues ?? [];
  const activeDialogue = dialogues[dialogueIndex] ?? dialogues[0];

  useEffect(() => {
    setDialogueIndex(findDialogueIndex(selectedCharacter, INITIAL_SITUATION));
  }, [selectedCharacter.id]);

  useEffect(() => {
    const delay = IDLE_DIALOGUE_DELAYS[activeDialogue?.situation];
    if (!delay) return undefined;

    const nextSituation = activeDialogue.situation === "접속" ? "대기1" : "대기2";
    const idleTimer = window.setTimeout(() => {
      setDialogueIndex(findDialogueIndex(selectedCharacter, nextSituation));
    }, delay);

    return () => window.clearTimeout(idleTimer);
  }, [activeDialogue?.situation, selectedCharacter]);

  const showNextDialogue = () => {
    if (dialogues.length < 2) return;
    setDialogueIndex((currentIndex) => (currentIndex + 1) % dialogues.length);
  };

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
        {activeDialogue ? (
          <div
            aria-atomic="true"
            aria-live="polite"
            className="character-dialogue"
            key={`${selectedCharacter.id}-${dialogueIndex}`}
            role="status"
          >
            <div className="character-dialogue__meta">
              <strong>{selectedCharacter.name}</strong>
              <span>{activeDialogue.situation}</span>
            </div>
            <p>{activeDialogue.line}</p>
          </div>
        ) : null}
        <button
          aria-label={`${selectedCharacter.name}의 다음 대사 듣기`}
          className="room-character-control"
          onClick={showNextDialogue}
          title="캐릭터를 눌러 다음 대사 보기"
          type="button"
        >
          <CharacterAvatar
            animated
            character={selectedCharacter}
            className={`room-character room-character--${spaceProfile.roomMood}`}
          />
        </button>
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
