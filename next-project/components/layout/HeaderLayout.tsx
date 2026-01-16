import SearchBar from "../common/SearchBar";
import { PlusIcon } from "../svg/PlusIcon";

type HeaderLayoutProps = {
  input: string;
  isAdding: boolean;
  onChange: (v: string) => void;
  onAddClick: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export default function HeaderLayout({
  input,
  isAdding,
  onChange,
  onAddClick,
  onKeyDown,
}: HeaderLayoutProps) {
  return (
    <section className="flex items-center gap-4">
      <SearchBar value={input} onChange={onChange} onKeyDown={onKeyDown} />
      <button
        onClick={onAddClick}
        disabled={!input.trim() || isAdding}
        className={`flex h-[56px] w-[168px] items-center justify-center gap-2 rounded-[24px] border-2 border-b-[6px] border-r-[6px] border-[var(--slate-900)] bg-[var(--slate-200)] px-6 font-medium ${input.trim() || isAdding ? "bg-violet-600 text-white" : ""}`}
      >
        {isAdding ? (
          <>
            <span className="animate-pulse">추가 중..</span>
          </>
        ) : (
          <>
            <PlusIcon color={input.trim() ? "white" : "var(--slate-900)"} />
            추가하기
          </>
        )}
      </button>
    </section>
  );
}
