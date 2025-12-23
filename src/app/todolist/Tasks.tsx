"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from "lucide-react";
import Date from "./Calendar";
import { supabase } from "@/lib/supabase";
import LoginRequiredDialog from "../components/LoginRequiredDialog";

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

export default function Tasks() {
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"active" | "completed" | "all">(
    "active"
  );
  const [loading, setLoading] = useState(true);
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  // Load tasks from Supabase
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (data) {
        setTasks(data);
      }
    } catch (error) {
      console.error("Error loading tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async () => {
    if (taskInput.trim()) {
      try {
        // Хэрэглэгчийн мэдээллийг авах
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.user) {
          setShowLoginDialog(true);
          return;
        }

        // Task нэмэх (user_id-г заавал илгээх)
        const { data, error } = await supabase
          .from("tasks")
          .insert([
            {
              text: taskInput.trim(),
              completed: false,
              user_id: session.user.id,
            },
          ])
          .select()
          .single();

        if (error) {
          console.error("Алдаа:", error);
          alert(`Алдаа: ${error.message}`);
          return;
        }

        if (data) {
          setTasks([data, ...tasks]);
          setTaskInput("");
        }
      } catch (error: any) {
        console.error("Task нэмэхэд алдаа гарлаа:", error);
        alert(`Алдаа: ${error.message || "Дахин оролдоно уу"}`);
      }
    }
  };

  const handleToggleTask = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    try {
      const { error } = await supabase
        .from("tasks")
        .update({ completed: !task.completed })
        .eq("id", id);

      if (error) throw error;
      setTasks(
        tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      const { error } = await supabase.from("tasks").delete().eq("id", id);

      if (error) throw error;
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="space-y-4">
      <LoginRequiredDialog
        open={showLoginDialog}
        onOpenChange={setShowLoginDialog}
      />
      <Date />
      {/* Task input */}
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Add a new task..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTask();
            }
          }}
          className="flex-1 rounded-xl"
        />
        <Button
          onClick={handleAddTask}
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl px-4"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Filter buttons */}
      <div className="flex justify-between gap-2">
        <button
          onClick={() => setFilter("active")}
          className={`border-2 border-purple-600 rounded-full px-3 py-1 font-bold transition-colors ${
            filter === "active"
              ? "bg-purple-600 text-[#eeeece]"
              : "bg-white text-purple-600"
          }`}
        >
          active
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`border-2 border-purple-600 rounded-full px-3 py-1 font-bold transition-colors ${
            filter === "completed"
              ? "bg-purple-600 text-[#eeeece]"
              : "bg-white text-purple-600"
          }`}
        >
          completed
        </button>
      </div>

      {/* Tasks list */}
      <div className="space-y-2">
        {loading ? (
          <p className="text-center text-gray-500 py-4">Loading tasks...</p>
        ) : filteredTasks.length === 0 ? (
          <p className="text-center text-gray-500 py-4">
            No{" "}
            {filter === "active"
              ? "active"
              : filter === "completed"
              ? "completed"
              : ""}{" "}
            tasks
          </p>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:bg-gray-50"
            >
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => handleToggleTask(task.id)}
              />
              <span
                className={`flex-1 font-bold ${
                  task.completed ? "line-through text-gray-400" : "text-black"
                }`}
              >
                {task.text}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteTask(task.id)}
                className="h-8 w-8 text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
