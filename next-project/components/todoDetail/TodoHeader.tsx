import Image from "next/image";
import checked from "@/assets/icons/checked.png";
import notchecked from "@/assets/icons/notchecked.png";
import { useState } from "react";

type TodoHeaderProps = {
  title: string;
  editingTitle: string;
  setEditingTitle: (v: string) => void;
  onSaveTitle: (title: string) => Promise<void>;
  isCompleted: boolean;
  isToggling: boolean;
  onToggle: () => void;
};

export default function TodoHeader({
  title,
  editingTitle,
  setEditingTitle,
  onSaveTitle,
  isCompleted,
  isToggling,
  onToggle,
}: TodoHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    if (!editingTitle.trim()) {
      setEditingTitle(title);
      setIsEditing(false);
      return;
    }
    setIsEditing(false);
    await onSaveTitle(editingTitle);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      await handleSave();
      return;
    }
    if (e.key === "Escape") {
      setEditingTitle(title);
      setIsEditing(false);
    }
  };
  return (
    <div
      className={`mx-auto flex max-w-[1000px] items-center justify-center gap-4 rounded-3xl border-2 border-slate-900 py-[16px] text-center ${isCompleted ? "bg-purple-200" : "bg-white"}`}
    >
      <button
        type="button"
        disabled={isToggling}
        onClick={onToggle}
        className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Image
          src={isCompleted ? checked : notchecked}
          alt="checkStatus"
          width={32}
          height={32}
        />
      </button>
      {!isEditing ? (
        <span
          onClick={() => setIsEditing(true)}
          className="cursur-pointer font-20-bold text-slate-900 underline"
        >
          {title}
        </span>
      ) : (
        <input
          value={editingTitle}
          autoFocus
          onChange={(e) => setEditingTitle(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="rounded.md font-20-bold border border-slate-400 px-2 py-1 text-slate-900 outline-none"
        />
      )}
    </div>
  );
}
