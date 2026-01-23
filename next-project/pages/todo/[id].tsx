import { useRouter } from "next/router";
import TodoHeader from "@/components/todoDetail/TodoHeader";
import TodoMemoBox from "@/components/todoDetail/TodoMemoBox";
import TodoImageBox from "@/components/todoDetail/TodoImageBox";
import TodoActionButtons from "@/components/todoDetail/TodoActionButtons";
import ConfirmModal from "@/components/common/ConfirmModal";
import { useTodoDetail } from "@/hooks/useTodoDetail";
import { todoApi } from "@/lib/api/todoApi";
import { GetServerSidePropsContext } from "next";

type TodoDetail = {
  id: number;
  name: string;
  isCompleted: boolean;
  memo?: string;
  imageUrl?: string;
};

type PageProps = {
  initialTodo: TodoDetail;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.params ?? {};

  if (!id || Array.isArray(id)) {
    return { notFound: true };
  }

  try {
    const res = await todoApi.getItem(id);

    return {
      props: {
        initialTodo: res.data,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
}

export default function TodoDetailPage({ initialTodo }: PageProps) {
  const router = useRouter();
  const {
    todo,
    memo,
    name,
    setName,
    setMemo,
    previewUrl,
    imageFile,
    isDirty,
    isSubmitting,
    isToggling,

    handleImageChange,
    updateTitle,
    updateTodo,
    toggleComplete,
    deleteTodo,
    isDeleteModalOpen,
    openDeleteModal,
    closeDeleteModal,
  } = useTodoDetail(initialTodo);

  const handleSubmit = async () => {
    await updateTodo();
    router.push("/");
  };

  const handleDelete = async () => {
    await deleteTodo();
    router.push("/");
  };

  return (
    <div className="mx-auto max-w-[1200px] space-y-10 p-8">
      <TodoHeader
        title={todo.name}
        editingTitle={name}
        setEditingTitle={setName}
        onSaveTitle={updateTitle}
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
            onSubmit={handleSubmit}
            onDelete={openDeleteModal}
          />
        </div>
      </div>
      {isDeleteModalOpen && (
        <ConfirmModal
          title="Todo가 삭제됩니다."
          description="삭제된 Todo는 다시 복구할 수 없습니다."
          onCancel={closeDeleteModal}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
