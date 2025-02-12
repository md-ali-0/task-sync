"use client";

import CreateTaskModal from "@/components/task-dashboard/create-task-modal";
import { TaskColumn } from "@/components/task-dashboard/task-column";
import {
    useGetAllTasksQuery,
    useUpdateTasksMutation,
} from "@/redux/features/task/taskApi";
import { ErrorResponse, Task } from "@/types";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { SerializedError } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const STATUSES = ["TODO", "IN_PROGRESS", "DONE"];

export default function TaskManagerDashboard() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [previousTasks, setPreviousTasks] = useState<Task[]>([]);

    const { data, isError, isLoading, isSuccess, error } = useGetAllTasksQuery(
        []
    );

    useEffect(() => {
        if (isSuccess && data?.data) {
            setTasks(data.data);
        }
        if (isError) {
            toast.error("Something Went Wrong");
        }
    }, [isError, isSuccess, data]);

    const [
        updateTask,
        {
            isSuccess: isSuccessUpdate,
            isError: isErrorUpdate,
            error: errorUpdate,
        },
    ] = useUpdateTasksMutation();

    useEffect(() => {
        if (isErrorUpdate) {
            const errorResponse = errorUpdate as
                | ErrorResponse
                | SerializedError;
            const errorMessage =
                (errorResponse as ErrorResponse)?.data?.message ||
                "Something Went Wrong";
            toast.error(errorMessage);

            // Revert to the previous state if update fails
            setTasks(previousTasks);
        } else if (isSuccessUpdate) {
            toast.success("Task Successfully Updated");
        }
    }, [isErrorUpdate, isSuccessUpdate, errorUpdate]);

    const onDragEnd = async (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const taskId = draggableId.split("-")[1];
        const movedTaskStatus = destination.droppableId;

        // Store previous state before updating
        setPreviousTasks([...tasks]);

        // Optimistically update the task status
        const updatedTasks = tasks.map((task) =>
            task.id === taskId ? { ...task, status: movedTaskStatus } : task
        );
        setTasks(updatedTasks);

        // Make API call
        const updateTaskData = {
            id: taskId,
            data: { status: movedTaskStatus },
        };
        await updateTask(updateTaskData);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                    Task Dashboard
                </h1>
                <CreateTaskModal />
            </div>
            <div>
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="flex flex-col md:flex-row gap-4 pb-8">
                        {STATUSES.map((status) => (
                            <TaskColumn
                                key={status}
                                status={status}
                                tasks={tasks.filter(
                                    (task) => task.status === status
                                )}
                            />
                        ))}
                    </div>
                </DragDropContext>
                {data?.data && data?.data?.length <= 0 && (
                    <div className="flex items-center justify-center py-10">
                        <h3>No Task Available</h3>
                    </div>
                )}
            </div>
        </div>
    );
}
