import Link from "next/link";

export default function Page() {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-6">
      <h1 className="text-4xl font-bold">404 Error</h1>
      <p className="text-gray-600">요청하신 페이지를 찾을 수 없습니다.</p>
      <Link href="/" className="rounded bg-slate-900 px-4 py-2 text-white">
        홈으로 돌아가기
      </Link>
    </div>
  );
}
