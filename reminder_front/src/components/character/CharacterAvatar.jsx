import { useEffect, useMemo, useState } from "react";

const FRAME_INTERVAL_MS = 240;
const MOTION_INTERVAL_MS = 2800;

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return prefersReducedMotion;
}

function CharacterAvatar({
  animated = false,
  character,
  className = "",
  label,
  motion = "auto",
}) {
  const motions = useMemo(() => character.motions ?? [], [character.motions]);
  const prefersReducedMotion = usePrefersReducedMotion();
  const canAnimate = animated && motions.length > 0 && !prefersReducedMotion;
  const [motionIndex, setMotionIndex] = useState(0);
  const [frameIndex, setFrameIndex] = useState(0);

  const requestedMotionIndex = motions.findIndex((item) => item.id === motion);
  const activeMotionIndex = motion === "auto" ? motionIndex % Math.max(motions.length, 1) : Math.max(requestedMotionIndex, 0);
  const activeMotion = motions[activeMotionIndex];
  const activeFrames = activeMotion?.frames ?? [];

  useEffect(() => {
    setMotionIndex(0);
    setFrameIndex(0);
  }, [character.id, motion]);

  useEffect(() => {
    if (!canAnimate || activeFrames.length < 2) return undefined;

    const frameTimer = window.setInterval(() => {
      setFrameIndex((currentFrame) => (currentFrame + 1) % activeFrames.length);
    }, FRAME_INTERVAL_MS);

    return () => window.clearInterval(frameTimer);
  }, [activeFrames.length, activeMotion?.id, canAnimate]);

  useEffect(() => {
    if (!canAnimate || motion !== "auto" || motions.length < 2) return undefined;

    const motionTimer = window.setInterval(() => {
      setMotionIndex((currentMotion) => (currentMotion + 1) % motions.length);
      setFrameIndex(0);
    }, MOTION_INTERVAL_MS);

    return () => window.clearInterval(motionTimer);
  }, [canAnimate, motion, motions.length]);

  useEffect(() => {
    if (!canAnimate) return undefined;

    motions.flatMap((item) => item.frames).forEach((source) => {
      const image = new Image();
      image.src = source;
    });

    return undefined;
  }, [canAnimate, motions]);

  const style = {
    "--character-accent": character.accent,
  };
  const imageSource = canAnimate && activeFrames.length > 0
    ? activeFrames[frameIndex % activeFrames.length]
    : character.avatarSrc;

  return (
    <div
      aria-label={label ?? `${character.name} 캐릭터`}
      className={`character-avatar ${className}`.trim()}
      data-animated={canAnimate ? "true" : "false"}
      data-motion={canAnimate ? activeMotion?.id : "idle"}
      role="img"
      style={style}
    >
      <span aria-hidden="true" className="character-avatar__stage">
        <img
          alt=""
          className="character-avatar__image"
          draggable="false"
          src={imageSource}
        />
      </span>
    </div>
  );
}

export default CharacterAvatar;
