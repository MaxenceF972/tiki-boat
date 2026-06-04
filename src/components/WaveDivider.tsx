interface Props {
  topColor: string;    // couleur de la section au-dessus
  bottomColor: string; // couleur de la section en-dessous
  flip?: boolean;      // inverse la vague
}

export default function WaveDivider({ topColor, bottomColor, flip = false }: Props) {
  return (
    <div className="relative -mb-px overflow-hidden leading-none" style={{ background: topColor }}>
      <svg
        viewBox="0 0 1440 70"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="block w-full"
        style={{
          height: "clamp(40px, 5vw, 70px)",
          transform: flip ? "scaleX(-1)" : undefined,
        }}
      >
        <path
          d="M0,35 C240,70 480,0 720,35 C960,70 1200,0 1440,35 L1440,70 L0,70 Z"
          fill={bottomColor}
        />
      </svg>
    </div>
  );
}
