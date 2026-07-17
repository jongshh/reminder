export const characters = [
  {
    id: "lavender-cat",
    name: "라일락",
    species: "보랏빛 고양이",
    description: "감정을 섬세하게 기록하고 조용히 곁을 지켜주는 친구예요.",
    boardSrc: "/characters/lavender-cat-board.png",
    avatarSrc: "/characters/lavender-cat-cutout.png",
    accent: "#e8ddfb",
  },
  {
    id: "sprout-bird",
    name: "새싹",
    species: "새싹 친구",
    description: "작은 실천도 성장으로 바꿔주는 밝고 다정한 친구예요.",
    boardSrc: "/characters/sprout-bird-board.png",
    avatarSrc: "/characters/sprout-bird-cutout.png",
    accent: "#dff2e3",
  },
  {
    id: "cream-bunny",
    name: "모모",
    species: "크림 토끼",
    description: "루틴을 가볍고 즐겁게 이어가도록 응원해주는 친구예요.",
    boardSrc: "/characters/cream-bunny-board.png",
    avatarSrc: "/characters/cream-bunny-cutout.png",
    accent: "#ffe8bf",
  },
];

export const defaultCharacterId = "cream-bunny";

export const getCharacterById = (characterId) =>
  characters.find((character) => character.id === characterId) ??
  characters.find((character) => character.id === defaultCharacterId);
