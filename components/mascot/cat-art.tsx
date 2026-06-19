import type { BreedArt } from "@/lib/cat";

export type Expression = "normal" | "happy" | "think" | "wave" | "rock";
export type Accessory = "none" | "headphones" | "star" | "pick";

export type CatArtProps = {
  art: BreedArt;
  expression?: Expression;
  accessory?: Accessory;
  /** show the breed's accent collar + pick charm */
  collar?: boolean;
  className?: string;
  title?: string;
};

const PINK = "oklch(0.78 0.085 25)";
const INNER_EAR = "oklch(0.82 0.07 20)";

export function CatArt({
  art,
  expression = "normal",
  accessory = "none",
  collar = false,
  className,
  title,
}: CatArtProps) {
  const isPoints = art.pattern === "points";
  const earFill = isPoints ? art.furDark : art.fur;

  return (
    <svg
      viewBox="0 0 240 250"
      className={className}
      role="img"
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {/* ---- tail (behind body) ---- */}
      <path
        d="M172 200 C214 196 216 252 150 248 C116 246 92 240 88 224"
        fill="none"
        stroke={art.fur}
        strokeWidth={18}
        strokeLinecap="round"
      />
      {art.pattern === "tabby" || art.pattern === "rosette" ? (
        <path
          d="M172 200 C214 196 216 252 150 248 C116 246 92 240 88 224"
          fill="none"
          stroke={art.furDark}
          strokeWidth={4}
          strokeLinecap="round"
          strokeDasharray="2 20"
          opacity={0.5}
        />
      ) : null}

      {/* ---- body ---- */}
      <path
        d="M64 170 C52 226 74 246 120 246 C166 246 188 226 176 170 C170 150 152 144 120 144 C88 144 70 150 64 170 Z"
        fill={art.fur}
      />
      <ellipse cx={120} cy={206} rx={30} ry={34} fill={art.belly} opacity={0.9} />

      {/* collar + pick charm */}
      {collar ? (
        <g>
          <path
            d="M86 162 C96 176 144 176 154 162"
            fill="none"
            stroke={art.accentVar}
            strokeWidth={7}
            strokeLinecap="round"
          />
          <path
            d="M120 168 l7 11 l-7 5 l-7 -5 z"
            fill={art.accentVar}
          />
        </g>
      ) : null}

      {/* ---- front paws ---- */}
      <ellipse
        cx={expression === "wave" ? 92 : 100}
        cy={expression === "wave" ? 214 : 240}
        rx={expression === "wave" ? 13 : 14}
        ry={expression === "wave" ? 16 : 11}
        fill={isPoints ? art.furDark : art.fur}
      />
      <ellipse cx={142} cy={240} rx={14} ry={11} fill={isPoints ? art.furDark : art.fur} />
      <g stroke={art.furDark} strokeWidth={1.4} strokeLinecap="round" opacity={0.6}>
        <path d="M96 236 v4 M100 236 v4 M104 236 v4" />
        <path d="M138 236 v4 M142 236 v4 M146 236 v4" />
      </g>

      {/* ---- head ---- */}
      <circle cx={120} cy={98} r={56} fill={art.fur} />

      {/* cheek fluff (long-haired breeds) */}
      {art.cheekFluff ? (
        <g fill={art.fur}>
          <circle cx={70} cy={110} r={16} />
          <circle cx={64} cy={96} r={13} />
          <circle cx={170} cy={110} r={16} />
          <circle cx={176} cy={96} r={13} />
        </g>
      ) : null}

      {/* ---- ears ---- */}
      <g>
        {renderEar("left", art.ear, earFill)}
        {renderEar("right", art.ear, earFill)}
      </g>

      {/* ---- face pattern ---- */}
      {renderFacePattern(art)}

      {/* ---- muzzle ---- */}
      <ellipse cx={120} cy={116} rx={26} ry={18} fill={art.belly} opacity={0.85} />

      {/* ---- soft blush (Ghibli-cute) ---- */}
      {art.soft ? (
        <g fill="oklch(0.8 0.075 25)" opacity={0.5}>
          <ellipse cx={84} cy={112} rx={9} ry={5} />
          <ellipse cx={156} cy={112} rx={9} ry={5} />
        </g>
      ) : null}

      {/* ---- eyes ---- */}
      {renderEyes(expression, art)}

      {/* ---- nose + mouth ---- */}
      <path d="M114 112 l12 0 l-6 6 z" fill={PINK} />
      {expression === "happy" ? (
        <g>
          <path d="M120 118 v6" stroke={art.furDark} strokeWidth={2} strokeLinecap="round" />
          <path
            d="M120 124 C114 131 108 131 104 126 M120 124 C126 131 132 131 136 126"
            fill="none"
            stroke={art.furDark}
            strokeWidth={2}
            strokeLinecap="round"
          />
        </g>
      ) : art.soft ? (
        <path
          d="M120 119 C115 125 111 125 108 122 M120 119 C125 125 129 125 132 122"
          fill="none"
          stroke={art.furDark}
          strokeWidth={2}
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M120 118 C114 125 110 125 107 122 M120 118 C126 125 130 125 133 122"
          fill="none"
          stroke={art.furDark}
          strokeWidth={2}
          strokeLinecap="round"
        />
      )}

      {/* ---- whiskers ---- */}
      <g stroke={art.furDark} strokeWidth={1.2} strokeLinecap="round" opacity={0.45}>
        <path d="M92 116 C70 112 60 116 52 114" fill="none" />
        <path d="M92 120 C70 122 58 126 50 128" fill="none" />
        <path d="M148 116 C170 112 180 116 188 114" fill="none" />
        <path d="M148 120 C170 122 182 126 190 128" fill="none" />
      </g>

      {/* ---- accessory ---- */}
      {accessory === "headphones" ? renderHeadphones(art) : null}
      {accessory === "star" ? (
        <path
          d="M196 56 l3.2 6.6 7.2 1 -5.2 5.1 1.3 7.2 -6.5 -3.4 -6.5 3.4 1.3 -7.2 -5.2 -5.1 7.2 -1 z"
          fill={art.accentVar}
        />
      ) : null}
    </svg>
  );
}

function renderEar(side: "left" | "right", type: BreedArt["ear"], fill: string) {
  const left = side === "left";
  const base = left ? { tip: [70, 36], inner: [92, 36], base: [80, 70] } : { tip: [170, 36], inner: [148, 36], base: [160, 70] };
  const innerEar = left
    ? "80 44 90 44 84 62"
    : "160 44 150 44 156 62";
  return (
    <g>
      <path
        d={`M${base.base[0]} ${base.base[1]} L${base.tip[0]} ${base.tip[1]} Q${(base.tip[0] + base.inner[0]) / 2} ${base.inner[1] + (type === "rounded" ? 8 : -2)} ${base.inner[0]} ${base.inner[1]} Z`}
        fill={fill}
      />
      <polygon points={innerEar} fill={INNER_EAR} opacity={0.8} />
      {type === "tufted" ? (
        <g stroke={fill} strokeWidth={2.4} strokeLinecap="round">
          <path d={`M${base.tip[0]} ${base.tip[1]} l${left ? -4 : 4} -8`} fill="none" />
          <path d={`M${base.tip[0]} ${base.tip[1]} l${left ? -1 : 1} -10`} fill="none" />
          <path d={`M${base.tip[0]} ${base.tip[1]} l${left ? 2 : -2} -9`} fill="none" />
        </g>
      ) : null}
    </g>
  );
}

function renderFacePattern(art: BreedArt) {
  switch (art.pattern) {
    case "tabby":
      return (
        <g stroke={art.furDark} strokeWidth={3} strokeLinecap="round" opacity={0.55} fill="none">
          <path d="M110 64 l-4 -8 M120 62 v-9 M130 64 l4 -8" />
          <path d="M84 104 h12 M84 112 h10" />
          <path d="M144 104 h12 M150 112 h10" />
        </g>
      );
    case "rosette":
      return (
        <g fill={art.furDark} opacity={0.55}>
          <ellipse cx={92} cy={84} rx={6} ry={5} />
          <ellipse cx={106} cy={72} rx={5} ry={4} />
          <ellipse cx={134} cy={72} rx={5} ry={4} />
          <ellipse cx={148} cy={84} rx={6} ry={5} />
          <ellipse cx={150} cy={150} rx={7} ry={5} />
          <ellipse cx={92} cy={150} rx={7} ry={5} />
        </g>
      );
    case "ticked":
      return (
        <g stroke={art.furDark} strokeWidth={2.4} strokeLinecap="round" opacity={0.5} fill="none">
          <path d="M104 66 h12 M132 66 h8" />
        </g>
      );
    case "points":
      return (
        <ellipse cx={120} cy={124} rx={30} ry={22} fill={art.furDark} opacity={0.18} />
      );
    default:
      return null;
  }
}

function renderEyes(expression: Expression, art: BreedArt) {
  if (expression === "happy") {
    return (
      <g stroke={art.furDark} strokeWidth={3.4} strokeLinecap="round" fill="none">
        <path d="M86 96 q9 -10 18 0" />
        <path d="M136 96 q9 -10 18 0" />
      </g>
    );
  }
  if (expression === "rock") {
    return (
      <g fill={art.accentVar}>
        <path d="M95 90 l3 6 6 1 -4.5 4.4 1 6 -5.5 -3 -5.5 3 1 -6 -4.5 -4.4 6 -1 z" />
        <path d="M145 90 l3 6 6 1 -4.5 4.4 1 6 -5.5 -3 -5.5 3 1 -6 -4.5 -4.4 6 -1 z" />
      </g>
    );
  }
  const think = expression === "think";
  const lx = think ? 99 : 95;
  const rx = think ? 149 : 145;
  const soft = art.soft;
  return (
    <g>
      {[lx, rx].map((cx, i) => (
        <g key={i}>
          <ellipse cx={cx} cy={94} rx={soft ? 11.5 : 10} ry={12} fill={art.eye} />
          {soft ? (
            <>
              <ellipse cx={cx} cy={95} rx={8.5} ry={9.2} fill="#1c1c22" />
              <circle cx={cx - 3} cy={90.5} r={3.4} fill="#fff" opacity={0.95} />
              <circle cx={cx + 2.6} cy={98} r={1.7} fill="#fff" opacity={0.8} />
            </>
          ) : (
            <>
              <ellipse cx={cx} cy={96} rx={3.4} ry={8} fill="#1c1c22" />
              <circle cx={cx - 2.5} cy={89} r={2.6} fill="#fff" opacity={0.9} />
            </>
          )}
        </g>
      ))}
    </g>
  );
}

function renderHeadphones(art: BreedArt) {
  return (
    <g>
      <path
        d="M74 70 C74 30 166 30 166 70"
        fill="none"
        stroke="#2b2b33"
        strokeWidth={7}
        strokeLinecap="round"
      />
      <rect x={50} y={62} width={26} height={30} rx={11} fill="#2b2b33" />
      <rect x={164} y={62} width={26} height={30} rx={11} fill="#2b2b33" />
      <rect x={56} y={70} width={14} height={14} rx={5} fill={art.accentVar} opacity={0.9} />
      <rect x={170} y={70} width={14} height={14} rx={5} fill={art.accentVar} opacity={0.9} />
    </g>
  );
}
