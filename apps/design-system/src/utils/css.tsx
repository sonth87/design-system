import { motion } from "motion/react";
import { particleAnimation } from "./animations";

export const ConfettiPiece = ({ index }: { index: number }) => {
  const colors = [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
  ];
  const color = colors[index % colors.length];

  return (
    <motion.div
      className="absolute h-1 w-1 rounded-full"
      style={{ backgroundColor: color }}
      {...particleAnimation(index)}
    />
  );
};
