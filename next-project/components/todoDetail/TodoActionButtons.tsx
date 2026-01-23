import { CheckIcon } from "../svg/CheckIcon";
import { XIcon } from "../svg/XIcon";

type TodoActionButtonsProps = {
  isSubmitting: boolean;
  isDisabled: boolean;
  onSubmit: () => void;
  onDelete: () => void;
};

export default function TodoActionButtons({
  isSubmitting,
  isDisabled,
  onSubmit,
  onDelete,
}: TodoActionButtonsProps) {
  return (
    <div className="mt-6 flex justify-end gap-4">
      <button
        disabled={isDisabled || isSubmitting}
        onClick={onSubmit}
        className={`font-16-bold flex items-center gap-1 rounded-3xl border-[2px] border-slate-900 bg-lime-300 px-[44.5px] py-[17px] text-slate-900 shadow-[3px_3px_0_0_#0f172a] transition-all active:translate-y-[1px] disabled:cursor-not-allowed disabled:active:translate-y-0 ${isDisabled ? "bg-slate-200" : ""}`}
      >
        <CheckIcon color="var(--slate-900)" />
        수정 완료
      </button>
      <button
        onClick={onDelete}
        className="font-16-bold flex items-center gap-1 rounded-3xl border-[2px] border-slate-900 bg-rose-500 px-[44.5px] py-[17px] text-white shadow-[3px_3px_0_0_#0f172a] transition-all active:translate-y-[1px]"
      >
        <XIcon color="white" />
        삭제하기
      </button>
    </div>
  );
}
