import Image from "next/image";
import checked from "@/assets/icons/checked.png";
import notchecked from "@/assets/icons/notchecked.png";
import { XIcon } from "../svg/XIcon";
import { memo } from "react";
import Link from "next/link";

type ChecklistItemProps = {
  id: number;
  text: string;
  isChecked?: boolean;
  isDeleting?: boolean;
  onToggle: () => void;
  onDelete: () => void;
};

export default memo(function ChecklistItem({
  id,
  text,
  isChecked = false,
  isDeleting,
  onToggle,
  onDelete,
}: ChecklistItemProps) {
  return (
    <Link
      href={`/todo/${id}`}
      className={`flex h-[50px] w-[588px] cursor-pointer items-center justify-between rounded-[27px] border-2 border-[var(--slate-900)] px-6 transition-all duration-200 ${isChecked ? "bg-violet-100 line-through" : ""}`}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={(e) => {
            e.preventDefault();
            onToggle();
          }}
        >
          {isChecked ? (
            <Image src={checked} width={32} height={32} alt="checked" />
          ) : (
            <Image src={notchecked} width={32} height={32} alt="notchecked" />
          )}
        </button>
        <span className="font-[var(--font-16-regular)]">{text}</span>
      </div>
      <button
        disabled={isDeleting}
        onClick={(e) => {
          e.preventDefault();
          onDelete();
        }}
      >
        <XIcon />
      </button>
    </Link>
  );
});
