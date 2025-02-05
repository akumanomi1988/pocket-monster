import { cn } from "@/lib/utils";

interface TypeBadgeProps {
  type: string;
  className?: string;
}

const TypeBadge = ({ type, className }: TypeBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-block px-3 py-1 rounded-full text-white text-sm font-medium capitalize",
        `bg-pokemon-${type.toLowerCase()}`,
        className
      )}
    >
      {type}
    </span>
  );
};

export default TypeBadge;