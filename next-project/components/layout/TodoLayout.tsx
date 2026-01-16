import Image from "next/image";
import ChecklistItem from "../todo/ChecklistItem";
import notodo from "@/assets/images/notodo.png";
import nodone from "@/assets/images/nodone.png";
import todo from "@/assets/images/todo.png";
import done from "@/assets/images/done.png";
import EmptyState from "../todo/EmptyState";

type Item = {
  id: number;
  name: string;
  isCompleted: boolean;
};

type TodoLayoutProps = {
  todos: Item[];
  dones: Item[];
  leavingId: number | null;
  onToggle: (item: Item) => void;
  onDelete: (id: number) => void;
};

export default function TodoLayout({
  todos,
  dones,
  leavingId,
  onToggle,
  onDelete,
}: TodoLayoutProps) {
  const hasTodo = todos.length > 0;
  const hasDone = dones.length > 0;

  return (
    <section className="grid grid-cols-2 gap-6">
      <div className="space-y-4">
        <Image src={todo} alt="todo" width={101} height={36} />
        {hasTodo ? (
          <div className="space-y-3">
            {todos.map((item) => (
              <ChecklistItem
                key={item.id}
                id={item.id}
                text={item.name}
                isChecked={false}
                isLeaving={leavingId === item.id}
                onToggle={() => onToggle(item)}
                onDelete={() => onDelete(item.id)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            image={notodo}
            title="할 일이 없어요."
            description="TODO를 새롭게 추가해주세요!"
          />
        )}
      </div>

      <div className="space-y-4">
        <Image src={done} alt="done" width={97} height={36} />
        {hasDone ? (
          <div className="space-y-3">
            {dones.map((item) => (
              <ChecklistItem
                key={item.id}
                id={item.id}
                text={item.name}
                isChecked
                isLeaving={leavingId === item.id}
                onToggle={() => onToggle(item)}
                onDelete={() => onDelete(item.id)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            image={nodone}
            title="아직 다 한 일이 없어요."
            description="해야 할 일을 체크해보세요!"
          />
        )}
      </div>
    </section>
  );
}
