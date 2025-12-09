'use client';

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import DashboardSidebar from "@/components/ui/DashboardSidebar";
import NewHeader from "@/components/new-header";
import { Plus, Trash2, ListChecks } from "lucide-react";

const supabase = createClient();

interface ListItem {
  id: string;
  title: string;
  list_id: string;
}

interface TodoList {
  id: string;
  name: string;
  items: ListItem[];
  created_at: string;
}

export default function ListsPage() {
  const [lists, setLists] = useState<TodoList[]>([]);
  const [showNewList, setShowNewList] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [newItemsByList, setNewItemsByList] = useState<Record<string, string>>({});

  useEffect(() => {
    // Laeme listid Supabase'ist
    const fetchLists = async () => {
      const { data, error } = await supabase
        .from("lists")
        .select(`id, name, created_at, items(id, title, list_id)`);
      if (error) console.error(error);
      else setLists(data || []);
    };

    fetchLists();
  }, []);

  const handleCreateList = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newListName.trim()) return;

    const { data, error } = await supabase
      .from("lists")
      .insert([{ name: newListName }])
      .select()
      .single();

    if (error) return console.error(error);

    setLists([...lists, { ...data, items: [] }]);
    setNewListName("");
    setShowNewList(false);
  };

  const handleAddItem = async (listId: string, e: React.FormEvent) => {
    e.preventDefault();
    const itemText = newItemsByList[listId];
    if (!itemText?.trim()) return;

    const { data, error } = await supabase
      .from("items")
      .insert([{ title: itemText, list_id: listId }])
      .select()
      .single();

    if (error) return console.error(error);

    const updatedLists = lists.map((list) =>
      list.id === listId ? { ...list, items: [...list.items, data] } : list
    );
    setNewItemsByList({ ...newItemsByList, [listId]: "" });
    setLists(updatedLists);
  };

  const handleDeleteItem = async (listId: string, itemId: string) => {
    const { error } = await supabase.from("items").delete().eq("id", itemId);
    if (error) console.error(error);

    setLists(
      lists.map((list) =>
        list.id === listId
          ? { ...list, items: list.items.filter((item) => item.id !== itemId) }
          : list
      )
    );
  };

  const handleDeleteList = async (listId: string) => {
    const { error } = await supabase.from("lists").delete().eq("id", listId);
    if (error) console.error(error);

    setLists(lists.filter((list) => list.id !== listId));
  };

  return (
    <div className="flex min-h-screen bg-white text-black">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <NewHeader title="Lists" />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            {/* Page header */}
            <div className="mb-8 flex items-center gap-3">
              <ListChecks className="w-8 h-8" strokeWidth={2} />
              <h1 className="text-4xl font-bold">Lists</h1>
            </div>

            {/* New List Button/Form */}
            {!showNewList ? (
              <button
                onClick={() => setShowNewList(true)}
                className="mb-8 flex items-center gap-2 bg-black text-white px-6 py-3 rounded-sm font-semibold hover:bg-gray-900 transition-colors"
              >
                <Plus className="w-5 h-5" strokeWidth={2} />
                New List
              </button>
            ) : (
              <form
                onSubmit={handleCreateList}
                className="mb-8 p-6 border-2 border-black rounded-sm bg-gray-50"
              >
                <input
                  type="text"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  placeholder="List name"
                  className="w-full mb-4 px-4 py-2 border border-black/20 rounded-sm focus:outline-none focus:border-black text-lg font-semibold"
                  autoFocus
                  required
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 bg-black text-white py-2 rounded-sm font-semibold hover:bg-gray-900 transition-colors"
                  >
                    Create List
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowNewList(false);
                      setNewListName("");
                    }}
                    className="flex-1 bg-white border-2 border-black text-black py-2 rounded-sm font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Lists */}
            {lists.length > 0 ? (
              lists.map((list) => (
                <div key={list.id} className="border border-black/10 rounded-sm p-6 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">{list.name}</h2>
                    <button
                      onClick={() => handleDeleteList(list.id)}
                      className="p-2 hover:bg-red-100 rounded-sm transition-colors text-red-600"
                    >
                      <Trash2 className="w-5 h-5" strokeWidth={2} />
                    </button>
                  </div>

                  <form onSubmit={(e) => handleAddItem(list.id, e)} className="mb-4 flex gap-2">
                    <input
                      type="text"
                      value={newItemsByList[list.id] || ""}
                      onChange={(e) =>
                        setNewItemsByList({ ...newItemsByList, [list.id]: e.target.value })
                      }
                      placeholder="Add item..."
                      className="flex-1 px-4 py-2 border border-black/20 rounded-sm focus:outline-none focus:border-black"
                    />
                    <button
                      type="submit"
                      className="bg-black text-white px-4 py-2 rounded-sm font-semibold hover:bg-gray-900 transition-colors flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" strokeWidth={2} />
                      Add
                    </button>
                  </form>

                  {list.items.length > 0 ? (
                    <ul className="space-y-2">
                      {list.items.map((item) => (
                        <li key={item.id} className="flex justify-between items-center p-3 border border-black/10 rounded-sm hover:bg-gray-50">
                          <div className="flex items-center gap-3 flex-1">
                            <input type="checkbox" className="w-5 h-5 cursor-pointer accent-black" />
                            <span>{item.title}</span>
                          </div>
                          <button
                            onClick={() => handleDeleteItem(list.id, item.id)}
                            className="p-1 hover:bg-red-100 rounded-sm text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" strokeWidth={2} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-center py-8">No items yet.</p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center py-12 border-2 border-dashed border-black/20 rounded-sm">
                No lists yet. Create your first list above.
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
