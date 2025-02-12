import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import type { Task } from "@/types";
import { AlertCircle, CheckCircle2, Clock } from "lucide-react";

interface ViewDetailsDialogProps {
    task: Task;
    isOpen: boolean;
    onClose: () => void;
}

export function ViewDetailsDialog({
    task,
    isOpen,
    onClose,
}: ViewDetailsDialogProps) {
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

    const getStatusIcon = (status: string) => {
        switch (status.toString()) {
            case "DONE":
                return <CheckCircle2 className="h-5 w-5 text-green-500" />;
            case "IN_PROGRESS":
                return <Clock className="h-5 w-5 text-yellow-500" />;
            default:
                return <AlertCircle className="h-5 w-5 text-red-500" />;
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{task.title}</DialogTitle>
                    <DialogDescription>Task Details</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Status:</span>
                        <div className="flex items-center space-x-2">
                            {getStatusIcon(task.status)}
                            <span>{task.status}</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Priority:</span>
                        <Badge
                            className={`${getPriorityColor(
                                task.priority
                            )} text-white`}
                        >
                            {task.priority}
                        </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Due Date:</span>
                        <span>{new Date(task.date).toLocaleDateString()}</span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
