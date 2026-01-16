import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/Logo.png";

export default function Gnb() {
  return (
    <header className="border-(var[--slate-200]) w-full border-b border-solid bg-[#fff]">
      <div className="mx-auto flex h-[60px] max-w-6xl items-center">
        <Link href="/" className="flex items-center">
          <Image
            className="-ml-6"
            src={logo}
            width={151}
            height={40}
            alt="logo"
          />
        </Link>
      </div>
    </header>
  );
}
