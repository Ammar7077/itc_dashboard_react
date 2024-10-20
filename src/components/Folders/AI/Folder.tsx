import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FOLDER } from '../../../types/folder';
import { useDispatch } from 'react-redux';
import { getMainFolder } from '../../../redux/AI/aisSlice';

interface FolderProps {
    folders: FOLDER[];
    title: string;
}

const Folder: React.FC<FolderProps> = ({ folders, title }) => {
    const [selectedFolder, setSelectedFolder] = useState<{ id: string; name: string } | null>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Load saved folder from localStorage on component mount
    useEffect(() => {
        const savedFolder = localStorage.getItem('selectedAIFolder');
        if (savedFolder) {
            try {
                const folderDetails = JSON.parse(savedFolder);
                setSelectedFolder(folderDetails);
                dispatch(getMainFolder(folderDetails));
            } catch (error) {
                console.error('Error parsing saved folder data:', error);
            }
        }
    }, [dispatch]);

    // Function to handle folder click and store the selected folder details
    const handleFolderClick = (folder: FOLDER) => {
        const folderDetails = { id: folder._id, name: folder.name };

        // Set the selected folder in local state
        setSelectedFolder(folderDetails);
        // Dispatch action to update Redux state
        dispatch(getMainFolder(folderDetails));
        // Save to localStorage
        localStorage.setItem('selectedAIFolder', JSON.stringify(folderDetails));

        // Navigate to the subfolder view
        navigate(`/consulting/${folder._id}`); // Ensure this route exists
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
                    {folders.map((folder) => (
                        <Link
                            key={folder._id}
                            to="#"
                            onClick={() => handleFolderClick(folder)}
                            className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                                selectedFolder?.id === folder._id
                                    ? 'bg-slate-900 text-white border-transparent' 
                                    : 'border-amber text-amber hover:bg-neutral-300 hover:border-white hover:text-black' 
                            }`}
                        >
                            <div className="flex flex-col">
                                <span className="font-medium text-lg">
                                    {folder.name} 
                                </span>
                                <div className='flex flex-1 gap-2'>
                                    <span className='mt-1 text-amber-500 dark:text-white'>
                                        {folder.total_files} Files 
                                    </span>
                                    <span className='mt-1 text-green-500 dark:text-white'>
                                        {folder.total_folders} Folders 
                                    </span>
                                </div>
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
