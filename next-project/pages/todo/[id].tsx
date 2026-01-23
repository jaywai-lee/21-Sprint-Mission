import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TodoHeader from "@/components/todoDetail/TodoHeader";
import TodoMemoBox from "@/components/todoDetail/TodoMemoBox";
import TodoImageBox from "@/components/todoDetail/TodoImageContainer";
import TodoActionButtons from "@/components/todoDetail/TodoActionButtons";
import ConfirmModal from "@/components/common/ConfirmModal";
import Spinner from "@/components/common/Spinner";
import { useTodoDatail } from "@/hooks/useTodoDetail";

export default function TodoDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const {
    todo,
    memo,
    setMemo,
    previewUrl,
    imageFile,
    isDirty,
    isLoading,
    isSubmitting,
    isToggling,

    handleImageChange,
    updateTodo,
    toggleComplete,
    deleteTodo,
    isDeleteModalOpen,
    openDeleteModal,
    closeDeleteModal,
  } = useTodoDatail(id);

  if (isLoading) {
    return <Spinner />;
  }

  if (!todo) {
    return <div className="p-6">해당 Todo를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="mx-auto max-w-[1200px] space-y-10 p-8">
      <TodoHeader
        title={todo.name}
        isCompleted={todo.isCompleted}
        onToggle={toggleComplete}
        isToggling={isToggling}
      />

      <div className="flex justify-center gap-6">
        <TodoImageBox
          previewUrl={previewUrl}
          imageFile={imageFile}
          onChangeImage={handleImageChange}
        />

        <div className="flex w-[589px] flex-col">
          <TodoMemoBox memo={memo} onChangeMemo={setMemo} />

          <TodoActionButtons
            isSubmitting={isSubmitting}
            isDisabled={!isDirty}
            onSubmit={async () => {
              await updateTodo();
              router.push("/");
            }}
            onDelete={openDeleteModal}
          />
        </div>
      </div>
      {isDeleteModalOpen && (
        <ConfirmModal
          title="Todo가 삭제됩니다."
          description="삭제된 Todo는 다시 복구할 수 없습니다."
          onCancel={closeDeleteModal}
          onConfirm={async () => {
            await deleteTodo();
            router.push("/");
          }}
        />
      )}
    </div>
  );
}
