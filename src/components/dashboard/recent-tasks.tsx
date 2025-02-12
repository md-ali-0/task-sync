"use client";

import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useGetAllTasksQuery } from "@/redux/features/task/taskApi";
import { AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function RecentTasks() {
    const [search] = useState<string | undefined>(undefined);
    const [page] = useState(1);
    const [limit] = useState(10);

    const { data, isError, isSuccess, error } = useGetAllTasksQuery([
        {
            name: "limit",
            value: limit,
        },
        {
            name: "page",
            value: page,
        },
        {
            name: "searchTerm",
            value: search,
        },
    ]);

    useEffect(() => {
        if (isError) {
            toast.error("Something Went Wrong");
        }
    }, [isError, isSuccess, error]);

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
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Task ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead className="text-right">Due Date</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.data?.map((task, idx) => (
                    <TableRow key={task.id}>
                        <TableCell className="font-medium">Task-{idx + 1}</TableCell>
                        <TableCell>{task.title}</TableCell>
                        <TableCell>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                {getStatusIcon(task.status)}
                                <span>{task.status}</span>
                            </div>
                        </TableCell>
                        <TableCell>
                            <Badge
                                className={`${getPriorityColor(
                                    task.priority
                                )} text-white`}
                            >
                                {task.priority}
                            </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                            {new Date(task.date).toLocaleDateString()}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
