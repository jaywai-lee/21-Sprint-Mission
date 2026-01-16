import { todoApi } from "@/lib/api/todoApi";
import { useCallback, useEffect, useState } from "react";

export type Item = {
  id: number;
  name: string;
  isCompleted: boolean;
};

export function useTodo() {
  const [items, setItems] = useState<Item[]>([]);
  const [leavingId, setLeavingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  async function prefetchItems() {
    await todoApi.getItems();
  }

  async function fetchItems() {
    const res = await todoApi.getItems();
    setItems(res.data);
  }

  useEffect(() => {
    fetchItems();
    prefetchItems();
  }, []);

  const addTodo = async (name: string) => {
    if (!name.trim() || isAdding) return;
    setIsAdding(true);
    try {
      const res = await todoApi.addItem(name);
      setItems((prev) => [...prev, res.data]);
      prefetchItems();
    } finally {
      setIsAdding(false);
    }
  };

  const toggleTodo = useCallback(async (item: Item) => {
    setLeavingId(item.id);
    setTimeout(async () => {
      const res = await todoApi.toggleItem(item.id, !item.isCompleted);
      const updated = res.data;
      setItems((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item))
      );
      setLeavingId(null);
    }, 200);
  }, []);

  const deleteTodo = useCallback(async (id: number) => {
    await todoApi.deleteItem(id);
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const todos = items.filter((item) => !item.isCompleted);
  const dones = items.filter((item) => item.isCompleted);

  return {
    todos,
    dones,
    addTodo,
    toggleTodo,
    deleteTodo,
    leavingId,
    isAdding,
  };
}
