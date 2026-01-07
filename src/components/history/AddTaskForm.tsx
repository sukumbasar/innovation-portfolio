"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

interface AddTaskFormProps {
    onAdd: (task: { title: string; assignee: string; dueDate: string }) => void;
    onCancel: () => void;
    initialData?: { title: string; assignee: string; dueDate: string };
}

export function AddTaskForm({ onAdd, onCancel, initialData }: AddTaskFormProps) {
    const [title, setTitle] = useState(initialData?.title || "");
    const [assignee, setAssignee] = useState(initialData?.assignee || "");
    const [dueDate, setDueDate] = useState(initialData?.dueDate || "");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !assignee || !dueDate) return;
        onAdd({ title, assignee, dueDate });
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 rounded-lg bg-[#ffffff05] border border-[#ffffff10] mb-4">
            <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-semibold text-white">{initialData ? 'Edit Task' : 'New Task'}</h4>
                <button type="button" onClick={onCancel} className="text-gray-500 hover:text-white">
                    <X className="w-4 h-4" />
                </button>
            </div>

            <div className="space-y-3">
                <div>
                    <input
                        type="text"
                        placeholder="Task Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 bg-[#18181b] border border-[#ffffff10] rounded text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500"
                        autoFocus
                    />
                </div>
                <div className="flex gap-3">
                    <input
                        type="text"
                        placeholder="Assignee"
                        value={assignee}
                        onChange={(e) => setAssignee(e.target.value)}
                        className="flex-1 px-3 py-2 bg-[#18181b] border border-[#ffffff10] rounded text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500"
                    />
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-32 px-3 py-2 bg-[#18181b] border border-[#ffffff10] rounded text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500"
                    />
                </div>
                <button
                    type="submit"
                    disabled={!title || !assignee || !dueDate}
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {initialData ? 'Update Task' : 'Add Task'}
                </button>
            </div>
        </form>
    );
}
