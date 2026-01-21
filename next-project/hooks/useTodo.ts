import { todoApi } from "@/lib/api/todoApi";
import { useCallback, useEffect, useState } from "react";

export type Item = {
  id: number;
  name: string;
  isCompleted: boolean;
};

export function useTodo() {
  const [items, setItems] = useState<Item[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingIds, setDeletingIds] = useState<number[]>([]);

  async function fetchItems() {
    setIsLoading(true);
    try {
      const res = await todoApi.getItems();
      setItems(res.data);
    } finally {
      setIsLoading(false);
    }
  }

  async function prefetchItems() {
    await todoApi.getItems();
  }

  useEffect(() => {
    fetchItems();
    prefetchItems();
  }, []);

  const addTodo = async (name: string) => {
    if (!name.trim() || isAdding) return;
    const tempId = Date.now();
    const tempItem: Item = {
      id: tempId,
      name,
      isCompleted: false,
    };
    setItems((prev) => [...prev, tempItem]);
    setIsAdding(true);
    try {
      const res = await todoApi.addItem(name);
      const realItem = res.data;
      setItems((prev) =>
        prev.map((item) => (item.id === tempId ? realItem : item))
      );
    } catch {
      setItems((prev) => prev.filter((item) => item.id !== tempId));
    } finally {
      setIsAdding(false);
    }
  };

  const toggleTodo = useCallback(async (item: Item) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === item.id ? { ...i, isCompleted: !i.isCompleted } : i
      )
    );

    try {
      await todoApi.toggleItem(item.id, !item.isCompleted);
    } catch {
      setItems((prev) => prev.map((i) => (i.id === item.id ? item : i)));
    }
  }, []);

  const deleteTodo = useCallback(
    async (id: number) => {
      if (deletingIds.includes(id)) return;
      const backup = items.find((item) => item.id === id);
      setItems((prev) => prev.filter((item) => item.id !== id));
      setDeletingIds((prev) => [...prev, id]);
      try {
        await todoApi.deleteItem(id);
      } catch {
        if (backup) {
          setItems((prev) => [...prev, backup]);
        }
      } finally {
        setDeletingIds((prev) => prev.filter((x) => x !== id));
      }
    },
    [deletingIds, items]
  );

  const todos = items.filter((item) => !item.isCompleted);
  const dones = items.filter((item) => item.isCompleted);

  return {
    todos,
    dones,
    addTodo,
    toggleTodo,
    deleteTodo,
    isAdding,
    isLoading,
    deletingIds,
  };
}
