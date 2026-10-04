import type React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "./theme";

export const fadeInOut = (frame: number, duration: number, edge = 16) =>
  interpolate(frame, [0, edge, duration - edge, duration - 1], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

export const rise = (frame: number, start = 0, distance = 36) =>
  interpolate(frame, [start, start + 22], [distance, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

export const FullBleedImage: React.FC<{
  src: string;
  scaleFrom?: number;
  scaleTo?: number;
  xFrom?: number;
  xTo?: number;
  opacity?: number;
}> = ({
  src,
  scaleFrom = 1.04,
  scaleTo = 1.12,
  xFrom = 0,
  xTo = 0,
  opacity = 1,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return (
    <Img
      src={staticFile(src)}
      style={{
        position: "absolute",
        inset: -70,
        width: "calc(100% + 140px)",
        height: "calc(100% + 140px)",
        objectFit: "cover",
        opacity,
        scale: interpolate(frame, [0, durationInFrames], [scaleFrom, scaleTo]),
        translate: `${interpolate(frame, [0, durationInFrames], [xFrom, xTo])}px 0px`,
      }}
    />
  );
};

export const Grade: React.FC<{ strength?: number }> = ({ strength = 0.7 }) => (
  <AbsoluteFill
    style={{
      background: `linear-gradient(180deg, rgba(2,13,24,${strength * 0.55}) 0%, rgba(2,13,24,${strength * 0.12}) 48%, rgba(2,13,24,${strength}) 100%)`,
      boxShadow: "inset 0 0 180px rgba(0,0,0,.62)",
    }}
  />
);
export const Texture: React.FC = () => {
  const frame = useCurrentFrame();
  const dots = Array.from({ length: 70 }, (_, index) => {
    const x = (Math.sin(index * 91.17 + frame * 0.27) * 0.5 + 0.5) * 1920;
    const y = (Math.sin(index * 37.41 + frame * 0.41) * 0.5 + 0.5) * 1080;
    return (
      <i
        key={index}
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: 2,
          height: 2,
          background: index % 3 ? "#fff" : theme.cyan,
          opacity: 0.1,
        }}
      />
    );
  });
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {dots}
      <div
        style={{
          position: "absolute",
          inset: 0,
          border: "46px solid rgba(0,0,0,.28)",
        }}
      />
    </AbsoluteFill>
  );
};

export const Compass: React.FC<{ size?: number }> = ({ size = 82 }) => (
  <div
    style={{
      position: "relative",
      width: size,
      height: size,
      borderRadius: "50%",
      border: `2px solid ${theme.cyan}`,
      boxShadow: `0 0 30px ${theme.cyan}55`,
    }}
  >
    <svg
      viewBox="0 0 100 100"
      style={{
        position: "absolute",
        inset: 15,
        width: size - 30,
        height: size - 30,
      }}
    >
      <path
        d="M50 0C58 34 66 42 100 50C66 58 58 66 50 100C42 66 34 58 0 50C34 42 42 34 50 0Z"
        fill={theme.cyan}
      />
    </svg>
  </div>
);

export const MeridianBrand: React.FC<{ compact?: boolean }> = ({
  compact = false,
}) => (
  <div
    style={{ display: "flex", alignItems: "center", gap: compact ? 20 : 30 }}
  >
    <Compass size={compact ? 64 : 92} />
    <div
      style={{
        fontFamily: theme.serif,
        fontWeight: 700,
        fontSize: compact ? 64 : 112,
        letterSpacing: compact ? 8 : 14,
        color: theme.ink,
        textShadow: "0 6px 36px #000",
      }}
    >
      MERIDIAN
    </div>
  </div>
);

export const Kicker: React.FC<React.PropsWithChildren<{ color?: string }>> = ({
  children,
  color = theme.cyan,
}) => (
  <div
    style={{
      fontFamily: theme.sans,
      fontSize: 24,
      fontWeight: 700,
      letterSpacing: 8,
      color,
      textTransform: "uppercase",
    }}
  >
    {children}
  </div>
);

export const SafeFrame: React.FC<React.PropsWithChildren> = ({ children }) => (
  <AbsoluteFill style={{ padding: "100px 110px" }}>{children}</AbsoluteFill>
);
