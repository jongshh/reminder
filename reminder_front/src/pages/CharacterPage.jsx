import CharacterAvatar from "../components/character/CharacterAvatar";
import SectionTitle from "../components/ui/SectionTitle";
import Tag from "../components/ui/Tag";
import { useAppData } from "../data/AppDataProvider";
import { characters, getCharacterById } from "../data/characters";

function CharacterPage() {
  const { profile, updateProfile } = useAppData();
  const selectedCharacter = getCharacterById(profile.characterId);

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
              onClick={() => updateProfile({ characterId: character.id })}
              type="button"
            >
              <CharacterAvatar character={character} className="character-option__preview" />
              <span className="character-option__copy">
                <strong>{character.name}</strong>
                <small>{character.species}</small>
              </span>
              <span className="character-option__state">{isSelected ? "선택됨" : "선택"}</span>
            </button>
          );
        })}
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
