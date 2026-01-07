"use client";

import { Vendor, Objective } from "@/types";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import {
    Calendar,
    FlaskConical,
    CheckCircle2,
    MessageSquare,
    Zap,
    Search
} from "lucide-react";

interface HistoryTimelineProps {
    vendors: Vendor[];
    okrs?: Objective[];
}

const MONTHS = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar']; // Rolling 6 month window for Demo

const EVENT_ICONS: Record<string, any> = {
    meeting: Calendar,
    poc_start: FlaskConical,
    poc_end: FlaskConical,
    status_change: CheckCircle2,
    contact: MessageSquare,
    task_done: CheckCircle2,
};

import { Modal } from "@/components/ui/Modal";
import { TaskBoard } from "./TaskBoard";
import { AddTaskForm } from "./AddTaskForm";
import { useState, useEffect } from "react";
import { VendorTask } from "@/types";
import { Plus } from "lucide-react";
import { addTask, updateTask, deleteTask } from "@/app/actions";

export function HistoryTimeline({ vendors, okrs = [] }: HistoryTimelineProps) {
    const [localVendors, setLocalVendors] = useState<Vendor[]>(vendors);
    const [selectedVendorId, setSelectedVendorId] = useState<string | null>(null);
    const [isAddingTask, setIsAddingTask] = useState(false);

    const [editingTask, setEditingTask] = useState<VendorTask | null>(null);

    // Sync if props change
    useEffect(() => {
        setLocalVendors(vendors);
    }, [vendors]);

    const selectedVendor = localVendors.find(v => v.id === selectedVendorId) || null;

    // Task Handlers
    const handleSaveTask = async (taskData: { title: string; assignee: string; dueDate: string }) => {
        if (!selectedVendor) return;

        // Optimistic Update
        const tempId = editingTask ? editingTask.id : `temp-${Date.now()}`;
        const newStatus = editingTask ? editingTask.status : 'todo';

        const optimisticTask: VendorTask = {
            id: tempId,
            status: newStatus,
            ...taskData
        };

        const updatedVendors = localVendors.map(v => {
            if (v.id === selectedVendor.id) {
                const tasks = v.tasks || [];
                const updatedTasks = editingTask
                    ? tasks.map(t => t.id === editingTask.id ? { ...t, ...taskData } : t)
                    : [...tasks, optimisticTask];
                return { ...v, tasks: updatedTasks };
            }
            return v;
        });
        setLocalVendors(updatedVendors);
        setIsAddingTask(false);
        setEditingTask(null);

        // Server Action
        try {
            if (editingTask) {
                await updateTask(editingTask.id, taskData);
            } else {
                await addTask(selectedVendor.id, taskData);
            }
        } catch (error) {
            console.error("Failed to save task", error);
            // Revert optimistic update? For now we assume success or page refresh handles it.
        }
    };

    const handleEditTask = (task: VendorTask) => {
        setEditingTask(task);
        setIsAddingTask(true);
    };

    const handleStatusChange = async (taskId: string, newStatus: VendorTask['status']) => {
        if (!selectedVendor) return;

        // Optimistic
        const updatedVendors = localVendors.map(v => {
            if (v.id === selectedVendor.id) {
                return {
                    ...v,
                    tasks: (v.tasks || []).map(t =>
                        t.id === taskId ? { ...t, status: newStatus } : t
                    )
                };
            }
            return v;
        });
        setLocalVendors(updatedVendors);

        // Server Action
        await updateTask(taskId, { status: newStatus });
    };

    const handleDeleteTask = async (taskId: string) => {
        if (!selectedVendor) return;

        // Optimistic
        const updatedVendors = localVendors.map(v => {
            if (v.id === selectedVendor.id) {
                return {
                    ...v,
                    tasks: (v.tasks || []).filter(t => t.id !== taskId)
                };
            }
            return v;
        });
        setLocalVendors(updatedVendors);

        // Server Action
        await deleteTask(taskId);
    };

    // 1. Calculate Time Range based on data (Start: Oct 2025, End: Mar 2026 for demo)
    // In a real app, this would be dynamic.
    const startDate = new Date('2025-10-01');
    const endDate = new Date('2026-03-31');
    const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

    const getPosition = (dateStr: string) => {
        const date = new Date(dateStr);
        const diff = (date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
        return Math.max(0, Math.min(100, (diff / totalDays) * 100));
    };

    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<string | "All">("All");
    const [okrFilter, setOkrFilter] = useState<string | "All">("All");

    const filteredVendors = useMemo(() => {
        return localVendors.filter(v => {
            const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                v.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                v.tasks?.some(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesStatus = statusFilter === 'All' || v.status === statusFilter;

            const matchesOkr = okrFilter === 'All' || (
                okrFilter === 'None'
                    ? (!v.keyResultIds || v.keyResultIds.length === 0)
                    : (v.keyResultIds && v.keyResultIds.some(krId => {
                        const objective = okrs?.find(o => o.keyResults.some(kr => kr.id === krId));
                        return objective?.id === okrFilter;
                    }))
            );

            return matchesSearch && matchesStatus && matchesOkr;
        });
    }, [localVendors, searchQuery, statusFilter, okrFilter, okrs]);

    return (
        <>
            <div className="space-y-6">
                {/* Filters */}
                <div className="flex items-center justify-between gap-4 bg-[#18181b] p-4 rounded-xl border border-[#ffffff10]">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search vendors or tasks..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-[#18181b] border border-[#ffffff10] rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="bg-[#18181b] border border-[#ffffff10] rounded-lg px-4 py-2 text-sm text-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        >
                            <option value="All">All Statuses</option>
                            <option value="POC">POC</option>
                            <option value="Working">Working</option>
                            <option value="Discovered">Discovered</option>
                        </select>
                        <select
                            value={okrFilter}
                            onChange={(e) => setOkrFilter(e.target.value)}
                            className="bg-[#18181b] border border-[#ffffff10] rounded-lg px-4 py-2 text-sm text-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 max-w-xs truncate"
                        >
                            <option value="All">All Objectives</option>
                            {okrs?.map(o => (
                                <option key={o.id} value={o.id}>{o.title}</option>
                            ))}
                            <option value="None">No Linked OKR</option>
                        </select>
                    </div>
                    <div className="text-xs text-gray-500 font-mono">
                        Showing {filteredVendors.length} vendors
                    </div>
                </div>

                <div className="bg-[#18181b] border border-[#ffffff10] rounded-2xl overflow-hidden">
                    {/* Header / Months Grid */}
                    <div className="flex border-b border-[#ffffff10] bg-[#ffffff02]">
                        <div className="w-48 p-4 border-r border-[#ffffff10] text-sm text-gray-500 font-medium">
                            Vendor
                        </div>
                        <div className="flex-1 relative h-12">
                            {MONTHS.map((month, i) => (
                                <div
                                    key={month}
                                    className="absolute top-0 bottom-0 border-l border-[#ffffff05] flex items-center pl-2 text-xs text-gray-600 font-mono uppercase tracking-wider"
                                    style={{ left: `${(i / 6) * 100}%`, width: `${100 / 6}%` }}
                                >
                                    {month}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Vendor Rows */}
                    <div className="divide-y divide-[#ffffff05]">
                        {filteredVendors.map(vendor => {
                            // Find first and last event for "Active" range bar
                            const sortedEvents = vendor.timeline?.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) || [];
                            const firstDate = sortedEvents[0]?.date || vendor.lastUpdated; // fallback
                            const lastDate = sortedEvents[sortedEvents.length - 1]?.date || new Date().toISOString();

                            const left = getPosition(firstDate);
                            const width = getPosition(lastDate) - left;

                            return (
                                <div
                                    key={vendor.id}
                                    className="flex hover:bg-[#ffffff03] transition-colors group cursor-pointer"
                                    onClick={() => setSelectedVendorId(vendor.id)}
                                >
                                    {/* Vendor Name Column */}
                                    <div className="w-48 p-4 border-r border-[#ffffff10] flex flex-col justify-center">
                                        <span className="text-sm font-semibold text-gray-200 group-hover:text-indigo-400 transition-colors">
                                            {vendor.name}
                                        </span>
                                        <span className="text-[10px] text-gray-500">{vendor.category}</span>
                                    </div>

                                    {/* Timeline Track */}
                                    <div className="flex-1 relative h-16">
                                        {/* Grid Lines */}
                                        {MONTHS.map((_, i) => (
                                            <div
                                                key={i}
                                                className="absolute top-0 bottom-0 border-l border-[#ffffff05]"
                                                style={{ left: `${(i / 6) * 100}%` }}
                                            />
                                        ))}

                                        {/* Duration Bar */}
                                        <div
                                            className={cn(
                                                "absolute top-5 h-2 rounded-full opacity-60 group-hover:opacity-100 transition-opacity",
                                                vendor.status === 'Working' ? "bg-emerald-500/50" :
                                                    vendor.status === 'POC' ? "bg-amber-500/50" :
                                                        "bg-blue-500/50"
                                            )}
                                            style={{ left: `${left}%`, width: `${Math.max(width, 1)}%` }}
                                        />

                                        {/* Combined Events (Timeline + Done Tasks) */}
                                        {(() => {
                                            // 1. Map Done Tasks to Timeline Events
                                            const taskEvents = (vendor.tasks || [])
                                                .filter(t => t.status === 'done')
                                                .map(t => ({
                                                    id: t.id,
                                                    date: t.dueDate,
                                                    title: `Completed: ${t.title}`,
                                                    type: 'task_done'
                                                }));

                                            // 2. Combine with existing timeline events
                                            const allEvents = [
                                                ...(vendor.timeline || []),
                                                ...taskEvents
                                            ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

                                            return allEvents.map(event => {
                                                const pos = getPosition(event.date);
                                                const Icon = EVENT_ICONS[event.type] || Zap;
                                                const isTask = event.type === 'task_done';

                                                return (
                                                    <div
                                                        key={event.id}
                                                        className={cn(
                                                            "absolute top-3 w-6 h-6 -ml-3 rounded-full border border-[#18181b] flex items-center justify-center shadow-lg group/point transition-all hover:z-10",
                                                            isTask
                                                                ? "bg-emerald-500/10 border-emerald-500/50 hover:bg-emerald-500 hover:border-emerald-400"
                                                                : "bg-[#27272a] hover:bg-indigo-600 hover:border-indigo-400"
                                                        )}
                                                        style={{ left: `${pos}%` }}
                                                    >
                                                        <Icon className={cn(
                                                            "w-3 h-3 transition-colors",
                                                            isTask ? "text-emerald-400 group-hover/point:text-white" : "text-gray-400 group-hover/point:text-white"
                                                        )} />

                                                        {/* Tooltip */}
                                                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 p-2 bg-[#09090b] border border-[#ffffff15] rounded-lg shadow-xl opacity-0 scale-95 group-hover/point:opacity-100 group-hover/point:scale-100 transition-all pointer-events-none z-20">
                                                            <div className="text-[10px] text-gray-500 font-bold mb-0.5 uppercase">{event.date}</div>
                                                            <div className="text-xs text-white font-medium">{event.title}</div>
                                                        </div>
                                                    </div>
                                                );
                                            });
                                        })()}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Task Details Modal */}
            <Modal
                isOpen={!!selectedVendor}
                onClose={() => {
                    setSelectedVendorId(null);
                    setIsAddingTask(false);
                }}
                title={selectedVendor ? `Project Plan: ${selectedVendor.name}` : ''}
                className="max-w-7xl"
            >
                {selectedVendor && (
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 p-4 rounded-lg bg-[#ffffff03] border border-[#ffffff05]">
                            <div className="flex-1">
                                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Status</h4>
                                <div className={cn(
                                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium border",
                                    selectedVendor.status === 'POC' ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                                        selectedVendor.status === 'Working' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                                            "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                )}>
                                    {selectedVendor.status}
                                </div>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Category</h4>
                                <div className="text-sm text-gray-300">{selectedVendor.category}</div>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Owner</h4>
                                <div className="text-sm text-gray-300">Internal Innovation Team</div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-white">Task Board</h3>
                                <button
                                    onClick={() => setIsAddingTask(true)}
                                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider rounded flex items-center gap-2 transition-colors"
                                >
                                    <Plus className="w-4 h-4" /> New Task
                                </button>
                            </div>

                            {isAddingTask && (
                                <AddTaskForm
                                    onAdd={handleSaveTask}
                                    onCancel={() => {
                                        setIsAddingTask(false);
                                        setEditingTask(null);
                                    }}
                                    initialData={editingTask || undefined}
                                />
                            )}

                            <TaskBoard
                                tasks={selectedVendor.tasks || []}
                                onStatusChange={handleStatusChange}
                                onDelete={handleDeleteTask}
                                onEdit={handleEditTask}
                            />
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
}
