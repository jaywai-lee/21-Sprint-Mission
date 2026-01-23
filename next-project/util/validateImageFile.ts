export function validateImageFile(file: File) {
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("이미지 파일은 5MB 이하만 업로드 가능합니다.");
  }

  if (!/^[a-zA-Z0-9._-]+$/.test(file.name)) {
    throw new Error("이미지 파일명은 영어만 가능합니다.");
  }
}
