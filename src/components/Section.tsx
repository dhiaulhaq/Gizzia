import React from 'react';

interface SectionTitleProps {
    icon: React.ElementType;
    title: string;
}

export const SectionTitle = ({ icon: Icon, title }: SectionTitleProps) => (
    <div className="flex items-center gap-2 text-xl font-semibold text-gray-800 mb-4">
        <Icon className="w-6 h-6 text-blue-600" />
        <h2>{title}</h2>
    </div>
);