import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useUpdateTasksMutation } from "@/redux/features/task/taskApi";
import type { ErrorResponse, Task } from "@/types";
import { SerializedError } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface EditTaskDialogProps {
    task: Task;
    isOpen: boolean;
    onClose: () => void;
}

export function EditTaskDialog({ task, isOpen, onClose }: EditTaskDialogProps) {
    const [editedTask, setEditedTask] = useState<Task>(task);

    const [updatePackage, { isSuccess, isError, error }] =
        useUpdateTasksMutation();

    useEffect(() => {
        if (isError) {
            const errorResponse = error as ErrorResponse | SerializedError;
            const errorMessage =
                (errorResponse as ErrorResponse)?.data?.message ||
                "Something Went Wrong";
            toast.error(errorMessage);
        } else if (isSuccess) {
            toast.success("Task Successfully Updated");
        }
    }, [isError, isSuccess, error]);

    const handleSave = async () => {
        const loadingToast = toast.loading("Task is Updating...");

        if (editedTask) {
            await updatePackage({ data: editedTask, id: editedTask.id });
        }
        toast.dismiss(loadingToast);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Task</DialogTitle>
                    <DialogDescription>
                        Make changes to your task here. Click save when you&quotre
                        done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Title
                        </Label>
                        <Input
                            id="title"
                            value={editedTask.title}
                            onChange={(e) =>
                                setEditedTask({
                                    ...editedTask,
                                    title: e.target.value,
                                })
                            }
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="status" className="text-right">
                            Status
                        </Label>
                        <Select
                            onValueChange={(value) =>
                                setEditedTask({
                                    ...editedTask,
                                    status: value,
                                })
                            }
                            defaultValue={editedTask.status.toString()}
                        >
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select a status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="TODO">To Do</SelectItem>
                                <SelectItem value="IN_PROGRESS">
                                    In Progress
                                </SelectItem>
                                <SelectItem value="DONE">Done</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="priority" className="text-right">
                            Priority
                        </Label>
                        <Select
                            onValueChange={(value) =>
                                setEditedTask({
                                    ...editedTask,
                                    priority: value,
                                })
                            }
                            defaultValue={editedTask.priority.toString()}
                        >
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select a priority" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="LOW">Low</SelectItem>
                                <SelectItem value="MEDIUM">Medium</SelectItem>
                                <SelectItem value="HIGH">High</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="date" className="text-right">
                            Due Date
                        </Label>
                        <Input
                            id="date"
                            type="date"
                            defaultValue={
                                editedTask.date.toString().split("T")[0]
                            }
                            onChange={(e) =>
                                setEditedTask({
                                    ...editedTask,
                                    date: new Date(e.target.value),
                                })
                            }
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSave}>
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
