
"use client";

import { VendorTask } from "@/types";
import { cn } from "@/lib/utils";
import { Calendar, User, Trash2, ArrowRight, ArrowLeft, Pencil } from "lucide-react";

interface TaskBoardProps {
    tasks: VendorTask[];
    onStatusChange?: (taskId: string, newStatus: VendorTask['status']) => void;
    onDelete?: (taskId: string) => void;
    onEdit?: (task: VendorTask) => void;
}

export function TaskBoard({ tasks, onStatusChange, onDelete, onEdit }: TaskBoardProps) {
    const columns = {
        todo: tasks.filter(t => t.status === 'todo'),
        in_progress: tasks.filter(t => t.status === 'in_progress'),
        done: tasks.filter(t => t.status === 'done'),
    };

    const StatusColumn = ({ title, items, color, status }: { title: string, items: VendorTask[], color: string, status: VendorTask['status'] }) => (
        <div className="flex-1 min-w-[200px]">
            <div className={cn("mb-3 pb-2 border-b-2 flex justify-between items-center", color)}>
                <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wider">{title}</h4>
                <span className="text-xs font-mono text-gray-500">{items.length}</span>
            </div>

            <div className="space-y-3">
                {items.map(task => (
                    <div key={task.id} className="group relative p-3 bg-[#ffffff05] border border-[#ffffff05] rounded-lg hover:border-[#ffffff10] transition-colors">
                        <div className="text-sm font-medium text-gray-200 mb-2 leading-snug pr-12">
                            {task.title}
                        </div>

                        {/* Actions - Hidden by default, visible on hover */}
                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                            {onEdit && (
                                <button
                                    onClick={() => onEdit(task)}
                                    className="p-1 text-gray-600 hover:text-indigo-400"
                                    title="Edit Task"
                                >
                                    <Pencil className="w-3 h-3" />
                                </button>
                            )}
                            {onDelete && (
                                <button
                                    onClick={() => onDelete(task.id)}
                                    className="p-1 text-gray-600 hover:text-rose-400"
                                    title="Delete Task"
                                >
                                    <Trash2 className="w-3 h-3" />
                                </button>
                            )}
                        </div>

                        <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                                <User className="w-3 h-3" />
                                <span>{task.assignee}</span>
                            </div>
                            <div className={cn("flex items-center gap-1.5 text-[10px] font-mono",
                                new Date(task.dueDate) < new Date() && task.status !== 'done' ? "text-rose-400" : "text-gray-500"
                            )}>
                                <Calendar className="w-3 h-3" />
                                <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                            </div>
                        </div>

                        {/* Move Actions */}
                        {onStatusChange && (
                            <div className="mt-3 pt-2 text-xs border-t border-[#ffffff05] flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                {status !== 'todo' && (
                                    <button
                                        onClick={() => onStatusChange(task.id, status === 'done' ? 'in_progress' : 'todo')}
                                        className="p-1 hover:bg-[#ffffff10] rounded text-gray-500 hover:text-white"
                                        title="Move Back"
                                    >
                                        <ArrowLeft className="w-3 h-3" />
                                    </button>
                                )}
                                {status !== 'done' && (
                                    <button
                                        onClick={() => onStatusChange(task.id, status === 'todo' ? 'in_progress' : 'done')}
                                        className="p-1 hover:bg-[#ffffff10] rounded text-gray-500 hover:text-white"
                                        title="Move Forward"
                                    >
                                        <ArrowRight className="w-3 h-3" />
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                ))}
                {items.length === 0 && (
                    <div className="h-24 rounded-lg border border-dashed border-[#ffffff05] flex items-center justify-center text-xs text-gray-600 italic">
                        No tasks
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="flex gap-4 overflow-x-auto pb-2">
            <StatusColumn
                title="To Do"
                items={columns.todo}
                color="border-gray-500/50"
                status="todo"
            />
            <StatusColumn
                title="In Progress"
                items={columns.in_progress}
                color="border-blue-500/50"
                status="in_progress"
            />
            <StatusColumn
                title="Done"
                items={columns.done}
                color="border-emerald-500/50"
                status="done"
            />
        </div>
    );
}

