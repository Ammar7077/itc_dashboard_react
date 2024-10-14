import React from 'react';

interface BreadcrumbProps {
    path: { id: string; name: string }[];
    onBreadcrumbClick: (folder: { id: string; name: string }) => void;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ path, onBreadcrumbClick }) => {
    return (
        <nav className="mb-4">
            {path.map((folder, index) => (
                <span key={folder.id}>
                    <button
                        onClick={() => onBreadcrumbClick(folder)}
                        className="text-blue-500 hover:underline"
                    >
                        {folder.name}
                    </button>
                    {index < path.length - 1 && <span> / </span>}
                </span>
            ))}
        </nav>
    );
};

export default Breadcrumb;
