import Image from "next/image";
import memoBg from "@/assets/images/memo.svg";

type TodoMemoBoxProps = {
  memo: string;
  onChangeMemo: (value: string) => void;
};

export default function TodoMemoBox({ memo, onChangeMemo }: TodoMemoBoxProps) {
  return (
    <div className="relative h-[311px] overflow-hidden rounded-2xl">
      <Image src={memoBg} alt="memoBg" fill className="object-cover" />
      <div className="relative z-10 flex h-full flex-col px-[10px] py-4">
        <p className="text-16-bold mb-2 text-center font-extrabold text-amber-800">
          Memo
        </p>
        <textarea
          value={memo}
          placeholder="메모 입력 영역"
          onChange={(e) => onChangeMemo(e.target.value)}
          className="font-16-regular memo-textarea font-regular flex-1 resize-none bg-transparent pt-[110px] text-center leading-[28px] text-slate-800 outline-none placeholder:text-slate-400"
        />
      </div>
    </div>
  );
}
