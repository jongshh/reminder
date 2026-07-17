function CharacterAvatar({ character, className = "", label }) {
  const style = {
    "--character-accent": character.accent,
  };

  return (
    <div
      aria-label={label ?? `${character.name} 캐릭터`}
      className={`character-avatar ${className}`.trim()}
      role="img"
      style={style}
    >
      <img alt="" aria-hidden="true" draggable="false" src={character.avatarSrc} />
    </div>
  );
}

export default CharacterAvatar;
