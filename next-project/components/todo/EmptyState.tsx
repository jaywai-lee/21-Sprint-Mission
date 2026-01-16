import Image, { StaticImageData } from "next/image";

type EmptyStateProps = {
  image: StaticImageData;
  title: string;
  description: string;
};

export default function EmptyState({
  image,
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="mt-10 flex flex-col items-center text-center">
      <Image src={image} alt="notodo" width={240} height={240} />
      <p className="mt-6 text-slate-400 [font:var(--font-16-bold)]">
        {title}
        <br />
        {description}
      </p>
    </div>
  );
}
