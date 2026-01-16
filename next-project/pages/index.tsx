import { useState } from "react";
import { useTodo } from "@/hooks/useTodo";
import HeaderLayout from "@/components/layout/HeaderLayout";
import TodoLayout from "@/components/layout/TodoLayout";

export default function Home() {
  const [input, setInput] = useState("");
  const { todos, dones, addTodo, toggleTodo, deleteTodo, leavingId, isAdding } =
    useTodo();

  const handleAddClick = async () => {
    if (!input.trim() || isAdding) return;
    await addTodo(input);
    setInput("");
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    if (!input.trim() || isAdding) return;
    await addTodo(input);
    setInput("");
  };

  return (
    <div className="h-[1000px] w-full bg-[#f9fafb] pt-6">
      <main className="mx-auto max-w-[1250px] space-y-10 bg-[#f9fafb] px-6">
        <HeaderLayout
          input={input}
          isAdding={isAdding}
          onChange={setInput}
          onAddClick={handleAddClick}
          onKeyDown={handleKeyDown}
        />

        <TodoLayout
          todos={todos}
          dones={dones}
          leavingId={leavingId}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      </main>
    </div>
  );
}
