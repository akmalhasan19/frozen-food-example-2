import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'success' | 'warning' | 'danger';
}

export function Badge({ children, variant = 'default', className = '', ...props }: BadgeProps) {
    const baseClasses = 'inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold';

    const variants = {
        default: 'bg-gray-100 text-gray-800',
        success: 'bg-green-100 text-green-800',
        warning: 'bg-orange-100 text-orange-800',
        danger: 'bg-red-100 text-red-800',
    };

    return (
        <span className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>
            {children}
        </span>
    );
}
