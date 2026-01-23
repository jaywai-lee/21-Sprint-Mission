import axios from "axios";

export type UploadImageResponse = {
  url: string;
};

const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID;
const BASE_URL = "https://assignment-todolist-api.vercel.app/api";

export const imageApi = {
  uploadImage: (file: File) => {
    const formData = new FormData();
    formData.append("image", file, file.name);

    return axios.post<UploadImageResponse>(
      `${BASE_URL}/${TENANT_ID}/images/upload`,
      formData,
      {
        timeout: 10000,
      }
    );
  },
};
