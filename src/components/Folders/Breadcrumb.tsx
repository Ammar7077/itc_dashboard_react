import React from 'react';

interface BreadcrumbProps {
    path: { id: string; name: string }[];
    onNavigate: (id: string) => void;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ path, onNavigate }) => {
    return (
        <nav className="mb-4">
            {path.map((folder, index) => (
                <span key={folder.id}>
                    <button onClick={() => onNavigate(folder.id)} className="text-blue-500 hover:underline">
                        {folder.name}
                    </button>
                    {index < path.length - 1 && <span> / </span>}
                </span>
            ))}
        </nav>
    );
};

export default Breadcrumb;
