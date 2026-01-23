import Image from "next/image";
import imgPlaceholder from "@/assets/images/img.svg";
import imgbtn from "@/assets/images/btn.png";
import editbtn from "@/assets/images/editbtn.png";

type TodoImageBoxProps = {
  previewUrl: string | null;
  imageFile: File | null;
  onChangeImage: (file: File) => void;
};

export default function TodoImageBox({
  previewUrl,
  imageFile,
  onChangeImage,
}: TodoImageBoxProps) {
  const hasImage =
    typeof previewUrl === "string" && previewUrl.trim().length > 0;
  return (
    <div className="relative flex h-[311px] w-[384px] items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50">
      {previewUrl ? (
        <img
          src={previewUrl}
          alt="preview"
          className="rounded-lg object-cover"
        />
      ) : (
        <Image src={imgPlaceholder} alt="placeholder" width={80} height={80} />
      )}

      <input
        type="file"
        accept="image/*"
        id="imageInput"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          onChangeImage(file);
        }}
      />

      <label
        htmlFor="imageInput"
        className="absolute bottom-3 right-3 cursor-pointer"
      >
        {hasImage ? (
          <Image src={editbtn} alt="editBtn" width={64} height={64} />
        ) : (
          <Image src={imgbtn} alt="addImage" width={64} height={64} />
        )}
      </label>
    </div>
  );
}
