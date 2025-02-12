import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function TaskCardSkeleton() {
    return (
        <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    <Skeleton className="h-4 w-32" />
                </CardTitle>
                <Skeleton className="h-5 w-14 rounded-md" />
            </CardHeader>
            <CardContent>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-20" />
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-24 rounded-md" />
            </CardFooter>
        </Card>
    );
}
