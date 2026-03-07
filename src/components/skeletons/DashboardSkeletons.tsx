import { Skeleton } from '@/components/ui/skeleton';

export const EmployeeDashboardSkeleton = () => {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="bg-surface-1 p-6 rounded-xl border border-border flex flex-col md:flex-row items-start md:items-center gap-5">
                <Skeleton className="w-16 h-16 rounded-xl" />
                <div className="space-y-3 flex-1">
                    <Skeleton className="h-7 w-2/3 md:w-1/3" />
                    <Skeleton className="h-4 w-1/2 md:w-1/4" />
                </div>
                <Skeleton className="w-28 h-9 rounded-lg" />
            </div>

            <div className="bg-surface-1 p-6 rounded-xl border border-border">
                <div className="flex justify-between items-center mb-6">
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-40" />
                        <Skeleton className="h-3 w-56" />
                    </div>
                    <Skeleton className="h-9 w-28 rounded-lg" />
                </div>

                <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex gap-3 p-3 border border-border rounded-xl">
                            <Skeleton className="w-12 h-12 rounded-lg" />
                            <div className="space-y-2 flex-1 pt-1">
                                <Skeleton className="h-4 w-1/3" />
                                <Skeleton className="h-3 w-1/4" />
                            </div>
                            <Skeleton className="w-20 h-8 rounded-lg self-center" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const AdminOverviewSkeleton = () => {
    return (
        <div className="animate-fade-in w-full mb-8">
            <div className="mb-6 space-y-2">
                <Skeleton className="h-7 w-64" />
                <Skeleton className="h-4 w-80" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-surface-1 p-5 rounded-xl border border-border flex flex-col justify-between h-32">
                        <div className="flex justify-between items-start mb-3">
                            <Skeleton className="w-9 h-9 rounded-lg" />
                            <Skeleton className="w-14 h-5 rounded-md" />
                        </div>
                        <div>
                            <Skeleton className="h-3 w-20 mb-2" />
                            <Skeleton className="h-6 w-28" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                    <div className="bg-surface-1 p-5 rounded-xl border border-border h-[360px]">
                        <div className="flex justify-between items-center mb-6">
                            <Skeleton className="h-5 w-40" />
                            <Skeleton className="h-5 w-20 rounded-md" />
                        </div>
                        <div className="flex gap-3 items-end h-[260px]">
                            {[...Array(7)].map((_, i) => (
                                <Skeleton key={i} className="w-full rounded-t-sm" style={{ height: `${Math.floor(Math.random() * 60) + 20}%` }} />
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="bg-surface-1 p-5 rounded-xl border border-border h-[360px]">
                        <Skeleton className="h-5 w-36 mb-6" />
                        <div className="space-y-5">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <Skeleton className="w-9 h-9 rounded-full" />
                                    <div className="flex-1 space-y-1.5">
                                        <Skeleton className="h-3.5 w-28" />
                                        <Skeleton className="h-2.5 w-16" />
                                    </div>
                                    <Skeleton className="h-3.5 w-10" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
