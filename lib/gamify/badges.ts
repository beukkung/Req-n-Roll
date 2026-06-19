import type { Badge, BadgeId, Profile } from "./types";

export const BADGES: Badge[] = [
  { id: "first_amp", nameTh: "ขึ้นเวทีครั้งแรก", descTh: "ทำ Skill Amp สำเร็จครั้งแรก", icon: "Gauge" },
  { id: "first_daily", nameTh: "อุ่นเครื่อง", descTh: "ทำ Daily Req ครั้งแรก", icon: "CalendarDays" },
  { id: "first_gym", nameTh: "เข้ายิม", descTh: "ทำ Req Gym ชุดแรก", icon: "Dumbbell" },
  { id: "gym_all", nameTh: "ครอบจักรวาล", descTh: "ฝึกครบทั้ง 6 knowledge areas", icon: "Medal" },
  { id: "streak_3", nameTh: "3 วันติด", descTh: "รักษาสตรีค 3 วัน", icon: "Flame" },
  { id: "streak_7", nameTh: "อาทิตย์ติด", descTh: "รักษาสตรีค 7 วัน", icon: "Flame" },
  { id: "streak_30", nameTh: "เดือนติด", descTh: "รักษาสตรีค 30 วัน", icon: "Flame" },
  { id: "template_use", nameTh: "หยิบใช้จริง", descTh: "ดาวน์โหลดเทมเพลตแรก", icon: "FileText" },
  { id: "feedback", nameTh: "เสียงสะท้อน", descTh: "ส่ง feedback ให้เรา", icon: "MessageSquareHeart" },
  { id: "level_5", nameTh: "แมวเปิดตัว", descTh: "ขึ้นเลเวล 5", icon: "Star" },
  { id: "level_10", nameTh: "ตำนานแมวร็อค", descTh: "ขึ้นเลเวล 10", icon: "Trophy" },
  { id: "breed_persian", nameTh: "ใจแมวเปอร์เซีย", descTh: "บุคลิก BA ของคุณคือเปอร์เซีย", icon: "Cat" },
  { id: "breed_bengal", nameTh: "ใจแมวเบงกอล", descTh: "บุคลิก BA ของคุณคือเบงกอล", icon: "Cat" },
  { id: "breed_mainecoon", nameTh: "ใจแมวเมนคูน", descTh: "บุคลิก BA ของคุณคือเมนคูน", icon: "Cat" },
  { id: "breed_siamese", nameTh: "ใจแมวสยาม", descTh: "บุคลิก BA ของคุณคือสยาม", icon: "Cat" },
  { id: "breed_abyssinian", nameTh: "ใจแมวอะบิสซิเนียน", descTh: "บุคลิก BA ของคุณคืออะบิสซิเนียน", icon: "Cat" },
];

export const BADGE_MAP: Record<BadgeId, Badge> = BADGES.reduce(
  (acc, b) => {
    acc[b.id] = b;
    return acc;
  },
  {} as Record<BadgeId, Badge>,
);

/** Derive which badges a profile has earned (pure). */
export function evaluateBadges(profile: Profile): BadgeId[] {
  const earned: BadgeId[] = [];
  const { stats, streak, level, personaSlug } = profile;

  if (stats.ampCount >= 1) earned.push("first_amp");
  if (stats.dailyCount >= 1) earned.push("first_daily");
  if (stats.gymSets >= 1) earned.push("first_gym");
  if (stats.gymAreas.length >= 6) earned.push("gym_all");
  if (stats.templateCount >= 1) earned.push("template_use");
  if (stats.feedbackCount >= 1) earned.push("feedback");
  if (streak >= 3) earned.push("streak_3");
  if (streak >= 7) earned.push("streak_7");
  if (streak >= 30) earned.push("streak_30");
  if (level >= 5) earned.push("level_5");
  if (level >= 10) earned.push("level_10");

  const breedBadge: Partial<Record<string, BadgeId>> = {
    clarifier: "breed_persian",
    shipper: "breed_bengal",
    facilitator: "breed_mainecoon",
    value_hunter: "breed_siamese",
    scope_slayer: "breed_abyssinian",
  };
  if (personaSlug && breedBadge[personaSlug]) {
    earned.push(breedBadge[personaSlug] as BadgeId);
  }

  return earned;
}
