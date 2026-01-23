import { imageApi } from "@/lib/api/imageApi";
import { todoApi } from "@/lib/api/todoApi";
import { validateImageFile } from "@/util/validateImageFile";
import { useEffect, useState } from "react";

type TodoDetail = {
  id: number;
  name: string;
  isCompleted: boolean;
  memo?: string;
  imageUrl?: string;
};

export function useTodoDatail(id?: string | string[]) {
  const [todo, setTodo] = useState<TodoDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [memo, setMemo] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // 데이터 fetching
  useEffect(() => {
    if (!id || Array.isArray(id)) return;

    (async () => {
      try {
        const res = await todoApi.getItem(id);
        setTodo(res.data);
        setMemo(res.data.memo ?? "");
        if (res.data.imageUrl) {
          setPreviewUrl(res.data.imageUrl);
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id]);

  const isDirty = !!todo && (memo !== (todo.memo ?? "") || imageFile !== null);

  // 이미지 핸들링
  const handleImageChange = (file: File) => {
    validateImageFile(file);

    const url = URL.createObjectURL(file);
    setImageFile(file);
    setPreviewUrl(url);
  };

  // 업데이트 투두
  const updateTodo = async () => {
    if (!todo || isSubmitting) return;
    setIsSubmitting(true);

    try {
      const payload: { memo?: string; imageUrl?: string } = {};
      if (memo !== (todo.memo ?? "")) {
        payload.memo = memo;
      }
      if (imageFile) {
        const res = await imageApi.uploadImage(imageFile);
        payload.imageUrl = res.data.url;
      }
      if (Object.keys(payload).length > 0) {
        await todoApi.updateItem(todo.id, payload);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // 투두 완료 상태 변경
  const toggleComplete = async () => {
    if (!todo || isToggling) return;
    setIsToggling(true);
    setTodo({ ...todo, isCompleted: !todo.isCompleted });

    try {
      await todoApi.toggleItem(todo.id, !todo.isCompleted);
    } catch {
      setTodo({ ...todo, isCompleted: !todo.isCompleted });
    } finally {
      setIsToggling(false);
    }
  };

  // 투두 삭제
  const deleteTodo = async () => {
    if (!todo) return;
    await todoApi.deleteItem(todo.id);
  };

  // 삭제 모달 on/off
  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  return {
    // state
    todo,
    memo,
    setMemo,
    imageFile,
    setImageFile,
    previewUrl,
    isLoading,
    isSubmitting,
    isToggling,
    isDeleteModalOpen,
    isDirty,

    // actions
    handleImageChange,
    updateTodo,
    toggleComplete,
    deleteTodo,
    openDeleteModal,
    closeDeleteModal,
  };
}
