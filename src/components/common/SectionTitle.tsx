import React from 'react';

interface SectionTitleProps {
    title: string;
}

export function SectionTitle({ title }: SectionTitleProps) {
    return (
        <div className="flex justify-center items-center mb-4 w-full mt-4">
            <h1 className="text-2xl font-bold">{title}</h1>
        </div>
    );
}
