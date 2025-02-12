export type Task = {
    id: string;
    title: string;
    status: string;
    date: Date;
    priority: string;
    createdAt: Date;
    updatedAt: Date;
};

export enum TaskStatus {
    TODO,
    IN_PROGRESS,
    DONE,
}

export enum TaskPriority {
    LOW,
    MEDIUM,
    HIGH,
}
