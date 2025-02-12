import { Task } from "@/types";
import { Droppable } from "@hello-pangea/dnd";
import { TaskCard } from "./task-card";

interface TaskColumnProps {
    status: string;
    tasks: Task[] | [];
}

export function TaskColumn({ status, tasks }: TaskColumnProps) {
    return (
        <div
            className={`bg-white dark:bg-background border rounded-lg shadow-md p-4 flex flex-col ${
                status === "TODO" && "bg-red-500/5"
            } ${status === "DONE" && "bg-green-500/5"} ${
                status === "IN_PROGRESS" && "bg-yellow-500/5"
            }`}
        >
            <h2 className="text-xl font-semibold mb-4 text-primary">
                {status}
            </h2>
            <Droppable droppableId={status} direction="vertical">
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`flex-1 overflow-y-auto max-h-[50vh] space-y-4 transition-colors duration-200 ease-in-out ${
                            snapshot.isDraggingOver ? "bg-indigo-50" : ""
                        }`}
                    >
                        {tasks.map((task, index) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                index={index}
                                columnId={status}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}
