export default function ProductSkeleton() {
    return (
        <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col h-full animate-pulse">
            <div className="w-full aspect-[4/3] bg-slate-200 relative overflow-hidden">
                {/* Placeholder image shape */}
            </div>
            <div className="p-5 flex flex-col flex-grow text-left">
                <div className="w-16 h-5 bg-slate-200 rounded-full mb-3"></div>
                <div className="w-3/4 h-6 bg-slate-200 rounded-md mb-2"></div>
                <div className="w-full h-4 bg-slate-200 rounded-md mb-2"></div>
                <div className="w-5/6 h-4 bg-slate-200 rounded-md mb-4"></div>
                <div className="mt-auto space-y-4">
                    <div className="w-1/2 h-7 bg-slate-200 rounded-md"></div>
                    <div className="w-full h-10 bg-slate-200 rounded-xl"></div>
                </div>
            </div>
        </div>
    );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: count }).map((_, i) => (
                <ProductSkeleton key={i} />
            ))}
        </div>
    );
}
