import { cn } from "@/lib/utils";

interface DottedSeperatorProps {
  className?: string;
  color?: string; // light mode color
  darkColor?: string; // dark mode color
  height?: string;
  dotSize?: string;
  gapSize?: string;
  direction?: "horizontal" | "vertical";
}

export const DottedSeperator = ({
  className,
  color = "#d4d4d8",
  darkColor = "#52525b", 
  height = "1px",
  dotSize = "2px",
  gapSize = "2px",
  direction = "horizontal"
}: DottedSeperatorProps) => {
  const isHorizontal = direction === "horizontal";

  const dot = parseInt(dotSize, 10) || 2;
  const gap = parseInt(gapSize, 10) || 6;

  const backgroundSize = isHorizontal
    ? `${dot + gap}px ${height}`
    : `${height} ${dot + gap}px`;

  return (
    <div
      className={cn(
        isHorizontal ? "w-full flex items-center" : "h-full flex flex-col items-center",
        className
      )}
    >
      <div
        className={isHorizontal ? "flex-grow" : "flex-grow-0"}
        style={{
          width: isHorizontal ? "100%" : height,
          height: isHorizontal ? height : "100%",
        }}
      >
        <div
          className="h-full w-full dark:hidden"
          style={{
            backgroundImage: `radial-gradient(circle, ${color} 25%, transparent 25%)`,
            backgroundSize,
            backgroundRepeat: isHorizontal ? "repeat-x" : "repeat-y",
            backgroundPosition: "center",
          }}
        />
        <div
          className="hidden h-full w-full dark:block"
          style={{
            backgroundImage: `radial-gradient(circle, ${darkColor} 25%, transparent 25%)`,
            backgroundSize,
            backgroundRepeat: isHorizontal ? "repeat-x" : "repeat-y",
            backgroundPosition: "center",
          }}
        />
      </div>
    </div>
  );
};
