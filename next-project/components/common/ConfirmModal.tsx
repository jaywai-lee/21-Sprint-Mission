import Portal from "./Portal";

type ConfirmModalProps = {
  title: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  title,
  description,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <Portal>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div onClick={onCancel} className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 w-[360px] rounded-2xl border-2 border-slate-900 bg-white p-6 shadow-[4px_4px_0_0_#0f172a]">
          <h2 className="mb-2 text-lg font-bold">{title}</h2>
          <p className="mb-6 text-sm text-slate-600">{description}</p>
          <div className="flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="rounded-xl border-2 border-slate-900 px-4 py-2"
            >
              취소
            </button>
            <button
              onClick={onConfirm}
              className="rounded-xl border-2 border-slate-900 bg-rose-500 px-4 py-2 text-white"
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
}
