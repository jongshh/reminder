import { useState } from "react";
import CharacterAvatar from "../components/character/CharacterAvatar";
import SectionTitle from "../components/ui/SectionTitle";
import Tag from "../components/ui/Tag";
import { useAppData } from "../data/AppDataProvider";
import { characters, getCharacterById } from "../data/characters";

function CharacterPage() {
  const { profile, updateProfile } = useAppData();
  const selectedCharacter = getCharacterById(profile.characterId);
  const [previewMotion, setPreviewMotion] = useState("auto");

  return (
    <div className="page character-page">
      <SectionTitle description="친구를 고르면 나의 방에 바로 반영돼요." eyebrow="캐릭터" title="캐릭터 선택" />

      <section className="character-selector" aria-label="캐릭터 목록">
        {characters.map((character) => {
          const isSelected = character.id === selectedCharacter.id;

          return (
            <button
              aria-pressed={isSelected}
              className="character-option"
              key={character.id}
              onClick={() => {
                updateProfile({ characterId: character.id });
                setPreviewMotion("auto");
              }}
              type="button"
            >
              <CharacterAvatar
                animated
                character={character}
                className="character-option__preview"
                motion="bounce"
              />
              <span className="character-option__copy">
                <strong>{character.name}</strong>
                <small>{character.species}</small>
              </span>
              <span className="character-option__state">{isSelected ? "선택됨" : "선택"}</span>
            </button>
          );
        })}
      </section>

      <section className="character-motion-showcase">
        <div className="character-motion-showcase__copy">
          <Tag tone="main">모션 프리뷰</Tag>
          <h2>{selectedCharacter.name}의 움직임</h2>
          <p>스토리보드에 있는 프레임만 순서대로 연결했어요. 원하는 동작을 눌러 확인해 보세요.</p>
          <div aria-label="미리 볼 모션 선택" className="character-motion-controls" role="group">
            <button
              aria-pressed={previewMotion === "auto"}
              onClick={() => setPreviewMotion("auto")}
              type="button"
            >
              자동 재생
            </button>
            {selectedCharacter.motions.map((motionItem) => (
              <button
                aria-pressed={previewMotion === motionItem.id}
                key={motionItem.id}
                onClick={() => setPreviewMotion(motionItem.id)}
                type="button"
              >
                {motionItem.label}
              </button>
            ))}
          </div>
        </div>
        <div className="character-motion-showcase__stage">
          <CharacterAvatar
            animated
            character={selectedCharacter}
            className="character-motion-showcase__avatar"
            motion={previewMotion}
          />
          <span>원본 스토리보드 모션</span>
        </div>
      </section>

      <section className="character-board">
        <div className="character-board__header">
          <div>
            <Tag tone="main">선택한 친구</Tag>
            <h2>{selectedCharacter.name} 캐릭터 보드</h2>
            <p>{selectedCharacter.description}</p>
          </div>
          <div className="character-board__features" aria-label="보드 구성">
            <span>표정</span>
            <span>행동</span>
            <span>모션</span>
          </div>
        </div>
        <div className="character-board__image-wrap">
          <img
            alt={`${selectedCharacter.name}의 표정, 행동, 모션을 담은 캐릭터 보드`}
            className="character-board__image"
            src={selectedCharacter.boardSrc}
          />
        </div>
      </section>
    </div>
  );
}

export default CharacterPage;
