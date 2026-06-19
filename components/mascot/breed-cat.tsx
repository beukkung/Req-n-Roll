import { CatArt, type Expression, type Accessory } from "./cat-art";
import { getBreedArt } from "@/lib/cat";

export type BreedCatProps = {
  breed: string;
  expression?: Expression;
  accessory?: Accessory;
  className?: string;
  title?: string;
};

export function BreedCat({
  breed,
  expression = "normal",
  accessory = "none",
  className,
  title,
}: BreedCatProps) {
  const art = getBreedArt(breed);
  return (
    <CatArt
      art={art}
      expression={expression}
      accessory={accessory}
      collar
      className={className}
      title={title}
    />
  );
}
