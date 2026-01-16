import Image from "next/image";
import checked from "@/assets/icons/checked.png";
import notchecked from "@/assets/icons/notchecked.png";
import { XIcon } from "../svg/XIcon";
import { memo } from "react";

type ChecklistItemProps = {
  id: number;
  text: string;
  isChecked?: boolean;
  isLeaving?: boolean;
  onToggle?: () => void;
  onDelete?: () => void;
};

export default memo(function ChecklistItem({
  text,
  isChecked = false,
  isLeaving = false,
  onToggle,
  onDelete,
}: ChecklistItemProps) {
  return (
    <div
      className={`flex h-[50px] w-[588px] items-center justify-between rounded-[27px] border-2 border-[var(--slate-900)] px-6 transition-all duration-200 ${isChecked ? "bg-violet-100 line-through" : ""} ${isLeaving ? "translate-x-4 opacity-0" : "translate-x-0 opacity-100"}`}
    >
      <div className="flex items-center gap-4">
        <button onClick={onToggle}>
          {isChecked ? (
            <Image src={checked} width={32} height={32} alt="checked" />
          ) : (
            <Image src={notchecked} width={32} height={32} alt="notchecked" />
          )}
        </button>
        <span className="font-[var(--font-16-regular)]">{text}</span>
      </div>
      <button onClick={onDelete}>
        <XIcon />
      </button>
    </div>
  );
});
