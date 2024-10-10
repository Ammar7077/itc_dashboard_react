import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FOLDER } from '../../types/folder';

interface FolderProps {
    folders: FOLDER[];
    title:string;
}

const Folder: React.FC<FolderProps> = ({ folders,title }) => {
    // State to store the selected folder ID
    const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);

    // Get the selected folder ID from localStorage when the component mounts
    useEffect(() => {
        const savedFolderId = localStorage.getItem('selectedFolderId');
        if (savedFolderId) {
            setSelectedFolderId(savedFolderId);
        }
    }, []);

    // Function to handle folder click and store the selected folder ID
    const handleFolderClick = (folderId: string) => {
        setSelectedFolderId(folderId); // Update state with the clicked folder ID
        localStorage.setItem('selectedFolderId', folderId); // Save selected folder ID to localStorage
    };

    return (
        <div className="mb-5 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    {title}
                </h3>
            </div>

            <div className="p-4 md:p-6 xl:p-9">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                    {folders.map(folder => (
                        <Link
                            key={folder._id}
                            to="#"
                            onClick={() => handleFolderClick(folder._id)}
                            className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                                selectedFolderId === folder._id
                                    ? 'bg-lime-900 text-white border-transparent' // Active folder style
                                    : 'border-lime text-primary hover:bg-neutral-300 hover:border-white hover:text-black' // Default and hover styles
                            }`}
                        >
                            <div className="flex flex-col">
                                <span className="font-medium text-lg">
                                    {folder.name} {/* Display folder name */}
                                </span>
                                <span className='mt-1 text-lime-300 dark:text-white'>
                                    {folder.total_files} Files {/* Display file count */}
                                </span>
                            </div>
                            <span className="ml-4 flex-shrink-0">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                    className="w-12 h-12"
                                    fill="none"
                                >
                                    {/* SVG content */}
                                    <path
                                        d="M183.295 123.586H55.05c-6.687 0-12.801-3.778-15.791-9.76l-12.776-25.55 12.776-25.55c2.99-5.982 9.103-9.76 15.791-9.76h128.246c6.687 0 12.801 3.778 15.791 9.76l12.775 25.55-12.776 25.55c-2.99 5.982-9.103 9.76-15.791 9.76z"
                                        className="fill-yellow-400"
                                    />
                                    <path
                                        d="M485.517 70.621H26.483c-4.875 0-8.828 3.953-8.828 8.828v44.138h476.69V79.448c0-4.875-3.953-8.827-8.828-8.827z"
                                        className="fill-gray-100"
                                    />
                                    <rect
                                        x="17.655"
                                        y="105.931"
                                        className="fill-gray-300"
                                        width="476.69"
                                        height="17.655"
                                    />
                                    <path
                                        d="M494.345 88.276H217.318c-3.343 0-6.4 1.889-7.895 4.879l-10.336 20.671c-2.99 5.982-9.105 9.76-15.791 9.76H55.05c-6.687 0-12.801-3.778-15.791-9.76L28.922 93.155c-1.495-2.99-4.552-4.879-7.895-4.879h-3.372C7.904 88.276 0 96.18 0 105.931v335.448c0 9.751 7.904 17.655 17.655 17.655h476.69c9.751 0 17.655-7.904 17.655-17.655V105.931c0-9.751-7.904-17.655-17.655-17.655z"
                                        className="fill-yellow-300"
                                    />
                                    <path
                                        d="M485.517 441.379H26.483c-4.875 0-8.828-3.953-8.828-8.828l0 0c0-4.875 3.953-8.828 8.828-8.828h459.034c4.875 0 8.828 3.953 8.828 8.828l0 0c0 4.875-3.953 8.828-8.828 8.828z"
                                        className="fill-yellow-400"
                                    />
                                    <path
                                        d="M326.621 220.69h132.414c4.875 0 8.828-3.953 8.828-8.828v-70.621c0-4.875-3.953-8.828-8.828-8.828H326.621c-4.875 0-8.828 3.953-8.828 8.828v70.621c0 4.875 3.953 8.828 8.828 8.828z"
                                        className="fill-gray-100"
                                    />
                                    <path
                                        d="M441.379 167.724h-97.103c-4.875 0-8.828-3.953-8.828-8.828l0 0c0-4.875 3.953-8.828 8.828-8.828h97.103c4.875 0 8.828 3.953 8.828 8.828l0 0c0 4.875-3.953 8.828-8.828 8.828z"
                                        className="fill-gray-200"
                                    />
                                    <path
                                        d="M441.379 203.034h-97.103c-4.875 0-8.828-3.953-8.828-8.828l0 0c0-4.875 3.953-8.828 8.828-8.828h97.103c4.875 0 8.828 3.953 8.828 8.828l0 0c0 4.875-3.953 8.828-8.828 8.828z"
                                        className="fill-gray-300"
                                    />
                                </svg>
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Folder;
