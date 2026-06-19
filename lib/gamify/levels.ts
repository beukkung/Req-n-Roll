export const XP_PER_LEVEL_BASE = 150;
export const XP_PER_LEVEL_STEP = 75;

/** XP needed to advance FROM `level` to `level + 1`. */
export function xpToAdvance(level: number): number {
  return XP_PER_LEVEL_BASE + XP_PER_LEVEL_STEP * (level - 1);
}

/** Cumulative XP required to *reach* a level (level 1 = 0). */
export function totalXpForLevel(level: number): number {
  let sum = 0;
  for (let l = 1; l < level; l++) sum += xpToAdvance(l);
  return sum;
}

export type LevelInfo = {
  level: number;
  title: string;
  intoLevel: number;
  neededForNext: number;
  progress: number; // 0..1 within the current level
};

export function levelFromTotalXp(xp: number): LevelInfo {
  let level = 1;
  let remaining = xp;
  while (remaining >= xpToAdvance(level)) {
    remaining -= xpToAdvance(level);
    level += 1;
  }
  const needed = xpToAdvance(level);
  return {
    level,
    title: LEVEL_TITLES[Math.min(level, LEVEL_TITLES.length) - 1],
    intoLevel: remaining,
    neededForNext: needed,
    progress: needed > 0 ? remaining / needed : 0,
  };
}

/** Kitten → rockstar cat arc, Thai. */
export const LEVEL_TITLES = [
  "ลูกแมวหัดเล่น",
  "ลูกแมวหัดเล่น",
  "แมวฝึกหัด",
  "แมวหนุ่มสาว",
  "แมวเดินสาย",
  "แมวเปิดตัว",
  "แมวฮิต",
  "แมวดัง",
  "แมวร็อค",
  "แมวร็อคสตาร์",
  "ตำนานแมวร็อค",
];

/** League tier by level (DataCamp-style). */
export type Tier = { key: string; nameTh: string; min: number; max: number };

export const TIERS: Tier[] = [
  { key: "bronze", nameTh: "บรอนซ์", min: 1, max: 3 },
  { key: "silver", nameTh: "ซิลเวอร์", min: 4, max: 6 },
  { key: "gold", nameTh: "โกลด์", min: 7, max: 9 },
  { key: "platinum", nameTh: "แพลทินัม", min: 10, max: 999 },
];

export function tierForLevel(level: number): Tier {
  return TIERS.find((t) => level >= t.min && level <= t.max) ?? TIERS[0];
}
