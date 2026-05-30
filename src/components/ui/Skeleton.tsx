import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  shimmer?: boolean;
}

export function Skeleton({ className, shimmer = true }: SkeletonProps) {
  return (
    <div
      className={cn(shimmer ? 'skeleton-shimmer' : 'skeleton', className)}
      aria-hidden="true"
    />
  );
}

interface SkeletonTextProps {
  lines?: number;
  className?: string;
  lineClassName?: string;
  shimmer?: boolean;
}

export function SkeletonText({
  lines = 3,
  className,
  lineClassName,
  shimmer = true,
}: SkeletonTextProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn('h-4 w-full', i === lines - 1 && 'w-3/4', lineClassName)}
          shimmer={shimmer}
        />
      ))}
    </div>
  );
}

interface SkeletonCardProps {
  className?: string;
  header?: boolean;
  lines?: number;
  shimmer?: boolean;
}

export function SkeletonCard({
  className,
  header = true,
  lines = 3,
  shimmer = true,
}: SkeletonCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 p-6 rounded-xl border',
        className
      )}
      style={{
        background: 'var(--color-bg-surface)',
        borderColor: 'var(--color-border)',
      }}
      aria-hidden="true"
    >
      {header && (
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-full" shimmer={shimmer} />
          <Skeleton className="h-5 w-32" shimmer={shimmer} />
        </div>
      )}
      <SkeletonText lines={lines} lineClassName="h-3" shimmer={shimmer} />
      <div className="flex items-center justify-between mt-auto pt-3" style={{ borderTop: '1px solid var(--color-border)' }}>
        <Skeleton className="h-3 w-16" shimmer={shimmer} />
        <Skeleton className="h-3 w-12" shimmer={shimmer} />
      </div>
    </div>
  );
}
