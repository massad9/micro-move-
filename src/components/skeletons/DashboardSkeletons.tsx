import { Skeleton } from '@/components/ui/skeleton';

export const EmployeeDashboardSkeleton = () => {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Greeting Skeleton */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col md:flex-row items-start md:items-center gap-6">
                <Skeleton className="w-24 h-24 rounded-full" />
                <div className="space-y-4 flex-1">
                    <Skeleton className="h-10 w-2/3 md:w-1/3" />
                    <Skeleton className="h-5 w-1/2 md:w-1/4" />
                </div>
                <Skeleton className="w-32 h-12 rounded-xl" />
            </div>

            {/* Today's Moves Skeleton */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-8">
                    <div className="space-y-3">
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-4 w-64" />
                    </div>
                    <Skeleton className="h-10 w-32" />
                </div>

                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex gap-4 p-4 border border-slate-100 rounded-2xl animate-pulse">
                            <Skeleton className="w-16 h-16 rounded-xl" />
                            <div className="space-y-2 flex-1 pt-2">
                                <Skeleton className="h-5 w-1/3" />
                                <Skeleton className="h-4 w-1/4" />
                            </div>
                            <Skeleton className="w-24 h-10 rounded-xl self-center" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const AdminOverviewSkeleton = () => {
    return (
        <div className="animate-in fade-in duration-500 w-full mb-12">
            {/* Header Skeleton */}
            <div className="mb-8 space-y-3">
                <Skeleton className="h-10 w-80" />
                <Skeleton className="h-4 w-[450px]" />
            </div>

            {/* Stat Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm animate-pulse flex flex-col justify-between h-36">
                        <div className="flex justify-between items-start mb-4">
                            <Skeleton className="w-10 h-10 rounded-xl" />
                            <Skeleton className="w-16 h-6 rounded-full" />
                        </div>
                        <div>
                            <Skeleton className="h-4 w-24 mb-3" />
                            <Skeleton className="h-8 w-32" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts & Lists Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-[400px]">
                        <div className="flex justify-between items-center mb-8">
                            <Skeleton className="h-6 w-48" />
                            <Skeleton className="h-6 w-24 rounded-full" />
                        </div>
                        <div className="flex gap-4 items-end h-[280px]">
                            {[...Array(7)].map((_, i) => (
                                <Skeleton key={i} className="w-full rounded-t-sm" style={{ height: `${Math.floor(Math.random() * 60) + 20}%` }} />
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-[400px]">
                        <Skeleton className="h-6 w-40 mb-8" />
                        <div className="space-y-6">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <Skeleton className="w-10 h-10 rounded-full" />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-4 w-32" />
                                        <Skeleton className="h-3 w-20" />
                                    </div>
                                    <Skeleton className="h-4 w-12" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
