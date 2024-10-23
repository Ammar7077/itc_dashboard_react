import React from 'react';

interface BreadcrumbProps {
    path: { id: string; name: string }[];
    onBreadcrumbClick: (folder: { id: string; name: string }) => void;
    onBackClick: () => void; // Add the onBackClick prop
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ path, onBreadcrumbClick, onBackClick }) => {
    return (
        <nav className="mb-4 mt-10 flex items-center justify-between pr-10 pl-5">
            <div className="flex items-center">
                {path.map((folder, index) => (
                    <span key={folder.id} className="flex items-center">
                        <button
                            onClick={() => onBreadcrumbClick(folder)}
                            className="text-blue-500 text-lg hover:underline"
                        >
                            {folder.name}
                        </button>
                        {index < path.length - 1 && <span className="mx-2">/</span>}
                    </span>
                ))}
            </div>
            
            { path.length > 1 &&
                <button 
                onClick={onBackClick} 
                className="flex gap-2 hover:shadow-lg hover:shadow-cyan-400/80 items-center shadow-cyan-500 space-x-2 text-blue-500 hover:bg-slate-300 hover:border-white hover:text-white cursor-pointer border-solid border-2 border-indigo-700 rounded-lg pr-5 pl-5 "
                disabled={path.length <= 1} // Disable button if there's no previous folder
            >
                <svg 
                    fill="#000000" 
                    height="10px" 
                    width="10px" 
                    version="1.1" 
                    id="Layer_1" 
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 490.693 490.693"
                >
                    <g>
                        <g>
                            <path d="M351.173,149.227H36.4L124.827,60.8c4.053-4.267,3.947-10.987-0.213-15.04c-4.16-3.947-10.667-3.947-14.827,0
                                L3.12,152.427c-4.16,4.16-4.16,10.88,0,15.04l106.667,106.667c4.267,4.053,10.987,3.947,15.04-0.213
                                c3.947-4.16,3.947-10.667,0-14.827L36.4,170.56h314.773c65.173,0,118.187,57.387,118.187,128s-53.013,128-118.187,128h-94.827
                                c-5.333,0-10.133,3.84-10.88,9.067c-0.96,6.613,4.16,12.267,10.56,12.267h95.147c76.907,0,139.52-66.987,139.52-149.333
                                S428.08,149.227,351.173,149.227z"/>
                        </g>
                    </g>
                </svg>
                <span className='text-lg'>Back</span>

            </button>
            }
        </nav>
    );
};

export default Breadcrumb;
