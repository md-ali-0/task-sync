"use client";

import { Badge } from "@/components/ui/badge";
import { Task } from "@/types";
import { Draggable } from "@hello-pangea/dnd";
import {
    CalendarIcon,
    ClockIcon,
    MoreVertical,
    Pencil,
    Trash2
} from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DeleteTaskAlert } from "./delete-task-alert";
import { EditTaskDialog } from "./edit-task-dialog";
import { ViewDetailsDialog } from "./view-details-dialog";

interface TaskCardProps {
    task: Task;
    index: number;
    columnId: string;
}

export function TaskCard({ task, index, columnId }: TaskCardProps) {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);

    const getPriorityColor = (priority: string) => {
        switch (priority.toString()) {
            case "HIGH":
                return "bg-red-500";
            case "MEDIUM":
                return "bg-yellow-500";
            case "LOW":
                return "bg-green-500";
            default:
                return "bg-blue-500";
        }
    };
    
    return (
        <>
            <Draggable draggableId={`${columnId}-${task.id}`} index={index}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`bg-white dark:bg-background rounded-md shadow-sm p-4 border transition-all duration-200 ease-in-out ${
                            snapshot.isDragging
                                ? "shadow-lg -translate-y-2 rotate-1"
                                : "hover:shadow-md"
                        }`}
                    >
                        <div className="flex">
                            <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-300">
                                {task.title}
                            </h3>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <MoreVertical className="h-4 w-4" />
                                        <span className="sr-only">
                                            Open menu
                                        </span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                        onClick={() =>
                                            setIsEditDialogOpen(true)
                                        }
                                    >
                                        <Pencil className="mr-2 h-4 w-4" />
                                        Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() =>
                                            setIsDeleteAlertOpen(true)
                                        }
                                    >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                                <CalendarIcon className="w-4 h-4 text-primary" />
                                <span className="text-sm text-gray-500">
                                    {new Date(task.date).toLocaleDateString()}
                                </span>
                            </div>
                            <Badge
                                className={`${getPriorityColor(
                                    task.priority
                                )} text-white`}
                            >
                                {task.priority}
                            </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                            <ClockIcon className="w-4 h-4 text-primary" />
                            <span className="text-sm text-gray-500">
                                Due: {new Date(task.date).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                )}
            </Draggable>
            <EditTaskDialog
                task={task}
                isOpen={isEditDialogOpen}
                onClose={() => setIsEditDialogOpen(false)}
            />

            <DeleteTaskAlert
                task={task}
                isOpen={isDeleteAlertOpen}
                onClose={() => setIsDeleteAlertOpen(false)}
            />
            <ViewDetailsDialog
                task={task}
                isOpen={isViewDetailsOpen}
                onClose={() => setIsViewDetailsOpen(false)}
            />
        </>
    );
}
