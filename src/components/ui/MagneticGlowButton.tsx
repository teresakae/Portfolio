"use client";

interface MagneticGlowButtonProps {
  text: string;
  href?: string;
  glowColor?: string;
  enableGlass?: boolean;
  glassColor?: string;
  blurAmount?: number;
  textColor?: string;
  borderWidth?: number;
  outerGlowColor?: string;
  showOuterGlow?: boolean;
  fontSize?: number;
  fontWeight?: number;
  paddingX?: number;
  paddingY?: number;
}

export default function MagneticGlowButton({
  text,
  href,
  textColor = "rgba(255,255,255,0.88)",
  fontSize = 13,
  fontWeight = 500,
  paddingX = 20,
  paddingY = 8,
}: MagneticGlowButtonProps) {
  return (
    <a
      href={href}
      style={{
        display: "inline-block",
        padding: `${paddingY}px ${paddingX}px`,
        fontSize,
        fontWeight,
        color: textColor,
        fontFamily: "var(--font-sans)",
        background: "rgba(105,155,255,0.08)",
        border: "1px solid rgba(105,155,255,0.2)",
        borderRadius: "999px",
        cursor: "pointer",
        textDecoration: "none",
        transition: "background 0.2s ease",
      }}
    >
      {text}
    </a>
  );
}