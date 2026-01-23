import { imageApi } from "@/lib/api/imageApi";
import { todoApi } from "@/lib/api/todoApi";
import { validateImageFile } from "@/util/validateImageFile";
import { useReducer, useState } from "react";

type TodoDetail = {
  id: number;
  name: string;
  isCompleted: boolean;
  memo?: string;
  imageUrl?: string;
};

type UpdateTodoPayload = {
  name?: string;
  memo?: string;
  imageUrl?: string;
};

type TodoState = {
  current: TodoDetail;
  backup: TodoDetail | null;
  status: "idle" | "updating" | "error";
};

type TodoAction =
  | { type: "OPTIMISTIC_UPDATE"; payload: Partial<TodoDetail> }
  | { type: "COMMIT_SUCCESS"; payload?: TodoDetail }
  | { type: "ROLLBACK" };

function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case "OPTIMISTIC_UPDATE":
      return {
        current: { ...state.current, ...action.payload },
        backup: state.current,
        status: "updating",
      };
    case "COMMIT_SUCCESS":
      return {
        current: action.payload ?? state.current,
        backup: null,
        status: "idle",
      };
    case "ROLLBACK":
      return {
        current: state.backup ?? state.current,
        backup: null,
        status: "error",
      };
    default:
      return state;
  }
}

export function useTodoDetail(initialTodo: TodoDetail) {
  const [state, dispatch] = useReducer(todoReducer, {
    current: initialTodo,
    backup: null,
    status: "idle",
  });
  const [name, setName] = useState(initialTodo.name);
  const [memo, setMemo] = useState(initialTodo.memo ?? "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialTodo.imageUrl ?? null
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const todo = state.current;
  const isSubmitting = state.status === "updating";
  const isToggling = state.status === "updating";

  const isDirty =
    name !== todo.name || memo !== (todo.memo ?? "") || imageFile !== null;

  // 이미지 핸들링
  const handleImageChange = (file: File) => {
    validateImageFile(file);
    const url = URL.createObjectURL(file);
    setImageFile(file);
    setPreviewUrl(url);
  };

  // 업데이트 타이틀
  const updateTitle = async (newName: string) => {
    if (newName === todo.name) return;

    dispatch({
      type: "OPTIMISTIC_UPDATE",
      payload: { name: newName },
    });
    setName(newName);
    try {
      const res = await todoApi.updateItem(todo.id, { name: newName });
      dispatch({ type: "COMMIT_SUCCESS", payload: res?.data });
    } catch {
      dispatch({ type: "ROLLBACK" });
      setName(todo.name);
    }
  };

  // 업데이트 투두
  const updateTodo = async () => {
    if (!isDirty) return;

    dispatch({
      type: "OPTIMISTIC_UPDATE",
      payload: {
        memo,
        imageUrl: imageFile ? (previewUrl ?? todo.imageUrl) : todo.imageUrl,
      },
    });

    try {
      const payload: UpdateTodoPayload = {};
      if (memo !== (todo.memo ?? "")) {
        payload.memo = memo;
      }
      if (imageFile) {
        const res = await imageApi.uploadImage(imageFile);
        payload.imageUrl = res.data.url;
      }
      const res = Object.keys(payload).length
        ? await todoApi.updateItem(todo.id, payload)
        : null;
      dispatch({
        type: "COMMIT_SUCCESS",
        payload: res?.data,
      });
    } catch {
      dispatch({ type: "ROLLBACK" });
      setMemo(todo.memo ?? "");
    }
  };

  // 투두 완료 상태 변경
  const toggleComplete = async () => {
    const next = !todo.isCompleted;

    dispatch({
      type: "OPTIMISTIC_UPDATE",
      payload: { isCompleted: next },
    });

    try {
      await todoApi.toggleItem(todo.id, next);
      dispatch({ type: "COMMIT_SUCCESS" });
    } catch {
      dispatch({ type: "ROLLBACK" });
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
    name,
    setName,
    memo,
    setMemo,
    imageFile,
    setImageFile,
    previewUrl,
    isSubmitting,
    isToggling,
    isDeleteModalOpen,
    isDirty,

    // actions
    handleImageChange,
    updateTitle,
    updateTodo,
    toggleComplete,
    deleteTodo,
    openDeleteModal,
    closeDeleteModal,
  };
}
