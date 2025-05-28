
    import React from 'react';
    import { cn } from '@/lib/utils';

    const Card = React.forwardRef(({ className, ...props }, ref) => (
      <div
        ref={ref}
        className={cn(
          'rounded-xl border bg-card text-card-foreground shadow-lg transition-all hover:shadow-2xl hover:scale-[1.02] glassmorphic',
          className
        )}
        style={{
          backdropFilter: 'blur(10px) saturate(180%)',
          WebkitBackdropFilter: 'blur(10px) saturate(180%)',
          backgroundColor: 'hsla(var(--card) / 0.6)', 
          border: '1px solid hsla(var(--border) / 0.2)',
        }}
        {...props} />
    ));
    Card.displayName = 'Card';

    const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
      <div
        ref={ref}
        className={cn('flex flex-col space-y-1.5 p-6', className)}
        {...props} />
    ));
    CardHeader.displayName = 'CardHeader';

    const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
      <h3
        ref={ref}
        className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
        {...props} />
    ));
    CardTitle.displayName = 'CardTitle';

    const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
      <p
        ref={ref}
        className={cn('text-sm text-muted-foreground', className)}
        {...props} />
    ));
    CardDescription.displayName = 'CardDescription';

    const CardContent = React.forwardRef(({ className, ...props }, ref) => (
      <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
    ));
    CardContent.displayName = 'CardContent';

    const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
      <div
        ref={ref}
        className={cn('flex items-center p-6 pt-0', className)}
        {...props} />
    ));
    CardFooter.displayName = 'CardFooter';

    export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
  