type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export default function SearchBar({
  value,
  onChange,
  onKeyDown,
}: SearchBarProps) {
  return (
    <div className="w-full max-w-[1000px]">
      <div className="flex h-[56px] w-full items-center rounded-[24px] border-2 border-b-[6px] border-r-[6px] border-[var(--slate-900)] bg-[var(--slate-100)] px-5">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="할 일을 입력해주세요"
          className="w-full bg-transparent text-sm outline-none"
        />
      </div>
    </div>
  );
}
