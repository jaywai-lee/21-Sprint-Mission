import Image from "next/image";
import checked from "@/assets/icons/checked.png";
import notchecked from "@/assets/icons/notchecked.png";

type TodoHeaderProps = {
  title: string;
  isCompleted: boolean;
  isToggling: boolean;
  onToggle: () => void;
};

export default function TodoHeader({
  title,
  isCompleted,
  isToggling,
  onToggle,
}: TodoHeaderProps) {
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
      <span className="font-20-bold text-slate-900 underline">{title}</span>
    </div>
  );
}
